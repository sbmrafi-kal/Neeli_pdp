#!/usr/bin/env node
/** Responsive interaction smoke test for the v3 PDP running on port 5174. */

import { chromium } from 'playwright';

const url = process.argv[2] || 'http://127.0.0.1:5174';
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};
const report = {};

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const failedResponses = [];
  const failedRequests = [];
  page.on('console', message => {
    if (message.type() === 'error') {
      const location = message.location();
      consoleErrors.push(`${message.text()}${location.url ? ` @ ${location.url}:${location.lineNumber}` : ''}`);
    }
  });
  page.on('response', response => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', request => {
    failedRequests.push(`${request.failure()?.errorText || 'failed'} ${request.url()}`);
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('.story-selector button').nth(1).click();
  const galleryFrame = await page.locator('.story-selector button').nth(1).getAttribute('aria-current');

  const size100 = page.locator('.size-option').filter({ hasText: '100 ml' });
  await size100.click();
  const selectedPrice = (await page.locator('.hero-price strong').textContent())?.trim();

  await page.locator('.hero-purchase-action.add').click();
  await page.waitForSelector('.hero-purchase-action.quantity');
  await page.locator('.hero-purchase-action .viewbag').click();
  await page.waitForSelector('.scrim.open');
  const cartText = (await page.locator('.drawer').innerText()).replace(/\s+/g, ' ').trim();
  await page.getByRole('button', { name: 'Close cart' }).click();

  const faqButton = page.locator('#faq .faq-list article').nth(1).getByRole('button');
  await faqButton.scrollIntoViewIfNeeded();
  await faqButton.click();
  const faqExpanded = await faqButton.getAttribute('aria-expanded');
  const faqAnswerVisible = await page.locator('#faq .faq-list article').nth(1).locator('.faq-answer').isVisible();

  const differenceButton = page.locator('#difference .diff-acc-header').nth(1);
  await differenceButton.scrollIntoViewIfNeeded();
  await differenceButton.click();
  const differenceExpanded = await differenceButton.getAttribute('aria-expanded');

  const zoomTrigger = page.locator('.pack-zoom-trigger');
  await zoomTrigger.scrollIntoViewIfNeeded();
  await zoomTrigger.click();
  const zoomOpen = await page.locator('.pack-zoom-dialog').evaluate(dialog => dialog.open);
  await page.getByRole('button', { name: 'Close enlarged pack label' }).click();

  const layout = await page.evaluate(() => ({
    viewportWidth: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    comparisonScrolls: (() => {
      const element = document.querySelector('.comparison-v3__table-container');
      return element ? element.scrollWidth > element.clientWidth : false;
    })(),
  }));

  report[name] = {
    galleryFrame,
    selectedPrice,
    cartHasSelectedVariant: cartText.includes('100 ml') && cartText.includes('₹195'),
    faqExpanded,
    faqAnswerVisible,
    differenceExpanded,
    zoomOpen,
    layout,
    consoleErrors,
    failedResponses,
    failedRequests,
  };
  await page.close();
}

await browser.close();
process.stdout.write(JSON.stringify(report, null, 2));
