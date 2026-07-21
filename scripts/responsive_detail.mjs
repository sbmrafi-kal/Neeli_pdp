#!/usr/bin/env node
/** Inspect the v3 hero, science story, and consultation layout across breakpoints. */

import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const url = process.argv[2] || 'http://127.0.0.1:5174';
const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'expanded-mobile', width: 850, height: 1500 },
  { name: 'desktop', width: 1440, height: 1000 },
];
const selectors = [
  '#product', '.product-identity', '.product-identity h1', '.identity-subtitle',
  '.identity-rating', '.identity-benefits-list', '.story-gallery', '.story-frame',
  '.hero-commerce', '#science', '.sv3-intro h2', '.sv3-scroll', '.sv3-static-sequence',
  '.sv3-stage', '.sv3-scenes', '.sv3-scene__media', '.sv3-copy-stack', '.sv3-copy h3',
  '.comparison-v3__consult', '.comparison-v3__consult-grid',
  '.comparison-v3__consult-content', '.comparison-v3__consult-content h3',
  '.comparison-v3__consult-image-wrap',
];
const result = {};

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  result[viewport.name] = await page.evaluate(currentSelectors => {
    const detail = {};
    for (const selector of currentSelectors) {
      const element = document.querySelector(selector);
      if (!element) continue;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      detail[selector] = {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        padding: style.padding,
        margin: style.margin,
        minHeight: style.minHeight,
        position: style.position,
        inset: `${style.top} ${style.right} ${style.bottom} ${style.left}`,
        display: style.display,
        grid: style.gridTemplateColumns,
        objectFit: style.objectFit,
      };
    }
    return detail;
  }, selectors);
  await page.close();
}

await browser.close();
process.stdout.write(JSON.stringify(result, null, 2));
