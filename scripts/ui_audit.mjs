#!/usr/bin/env node
/** Capture responsive PDP screenshots and report computed-style outliers. */

import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const outputFlag = process.argv.indexOf('--output');
const urlFlag = process.argv.indexOf('--url');
const output = outputFlag >= 0 ? process.argv[outputFlag + 1] : '/tmp/neeli-ui-audit';
const url = urlFlag >= 0 ? process.argv[urlFlag + 1] : 'http://127.0.0.1:5174';
const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};

await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const report = {};

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const consoleErrors = [];
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .8) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 35));
    }
    scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 250));
  });
  const sectionTargets = {
    hero: '#product',
    results: '#results',
    reviews: '#reviews',
    ritual: '#ritual',
    formula: '#formula',
    science: '#science',
    comparison: '#comparison',
    faq: '#faq',
    details: '#details',
    heritage: '.adapted-heritage',
  };
  for (const [sectionName, selector] of Object.entries(sectionTargets)) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await locator.screenshot({ path: `${output}/${name}-${sectionName}.png` });
    }
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
  const audit = await page.evaluate(() => {
    const visible = el => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const describe = el => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        selector: el.id ? `#${el.id}` : (el.classList.length ? `.${[...el.classList].slice(0, 3).join('.')}` : el.tagName.toLowerCase()),
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90),
        font: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        color: style.color,
        background: style.backgroundColor,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
      };
    };
    const headings = [...document.querySelectorAll('h1,h2,h3')].filter(visible).map(describe);
    const controls = [...document.querySelectorAll('button,a,input,summary')].filter(visible).map(describe);
    const undersizedControls = controls.filter(item => item.height < 44 || item.width < 44);
    const sections = [...document.querySelectorAll('main > section, main > div > section, footer')].filter(visible).map(describe);
    const overflow = [...document.querySelectorAll('body *')].filter(visible).map(describe).filter(item => item.left < -1 || item.right > innerWidth + 1);
    const styleCounts = {};
    [...document.querySelectorAll('body *')].filter(visible).forEach(el => {
      const style = getComputedStyle(el);
      const key = [style.fontFamily, style.fontSize, style.fontWeight, style.color].join(' | ');
      styleCounts[key] = (styleCounts[key] || 0) + 1;
    });
    return {
      title: document.title,
      viewport: { width: innerWidth, height: innerHeight },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      headings,
      sections,
      undersizedControls: undersizedControls.slice(0, 80),
      overflow: overflow.slice(0, 80),
      commonTextStyles: Object.entries(styleCounts).sort((a, b) => b[1] - a[1]).slice(0, 24),
    };
  });
  report[name] = { ...audit, consoleErrors };
  await page.close();
}

await browser.close();
process.stdout.write(JSON.stringify(report, null, 2));
