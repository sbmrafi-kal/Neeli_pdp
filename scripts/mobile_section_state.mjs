#!/usr/bin/env node
/** Report mobile reveal/layout state for the lower v3 sections. */

import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(process.argv[2] || 'http://127.0.0.1:5174', { waitUntil: 'networkidle' });
const selectors = [
  '#product',
  '#results',
  '#formula',
  '#science',
  '#comparison',
  '#ritual',
  '.difference-section',
  '#reviews',
  '#faq',
  '#details',
  '.adapted-heritage',
  '.theme-footer',
];
const report = [];

for (const selector of selectors) {
  const locator = page.locator(selector).first();
  if (!(await locator.count())) continue;
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  report.push(await locator.evaluate((element, currentSelector) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const visibleChildren = [...element.children].map(child => {
      const childStyle = getComputedStyle(child);
      const childRect = child.getBoundingClientRect();
      return {
        selector: child.id ? `#${child.id}` : `.${[...child.classList].join('.')}`,
        display: childStyle.display,
        opacity: childStyle.opacity,
        visibility: childStyle.visibility,
        width: Math.round(childRect.width),
        height: Math.round(childRect.height),
      };
    }).slice(0, 10);
    return {
      selector: currentSelector,
      classes: element.className,
      display: style.display,
      opacity: style.opacity,
      visibility: style.visibility,
      background: style.backgroundColor,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      top: Math.round(rect.top),
      children: visibleChildren,
    };
  }, selector));
}

await browser.close();
process.stdout.write(JSON.stringify(report, null, 2));
