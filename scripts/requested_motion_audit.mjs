#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const url = process.argv[2] || 'http://127.0.0.1:5174/';
const output = '/tmp/neeli-requested-motion-audit';
await mkdir(output, { recursive: true });

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
  const browserErrors = [];
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(`console:${message.text()}`);
  });
  page.on('pageerror', error => browserErrors.push(`pageerror:${error.message}`));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(url, { waitUntil: 'networkidle' });

  const subtitle = await page.locator('.identity-subtitle').boundingBox();
  const gallery = await page.locator('#product .story-gallery').boundingBox();
  const proof = await page.locator('#product .product-proof').boundingBox();
  const commerce = await page.locator('#product .hero-commerce').boundingBox();
  assert.ok(subtitle && gallery && proof && commerce);
  if (viewport.width < 900) {
    assert.ok(subtitle.y + subtitle.height <= gallery.y + 2, 'gallery must immediately follow the subtitle');
    assert.ok(gallery.y + gallery.height <= proof.y + 2, 'proof must follow the gallery');
    assert.ok(proof.y + proof.height <= commerce.y + 2, 'commerce must follow product proof');
  }
  await page.locator('#product').screenshot({ path: `${output}/${name}-hero.png` });

  const faqBackground = await page.locator('#faq .faq-list article:first-child button > span')
    .evaluate(element => getComputedStyle(element).backgroundColor);
  assert.equal(faqBackground, 'rgba(0, 0, 0, 0)');

  await page.locator('#results').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const resultBefore = await page.locator('#results').getAttribute('data-active-stage');
  await page.waitForTimeout(4850);
  const resultAfter = await page.locator('#results').getAttribute('data-active-stage');
  assert.notEqual(resultBefore, resultAfter, 'result focus rail should advance');
  await page.locator('#results').screenshot({ path: `${output}/${name}-results.png` });

  const scienceScroll = page.locator('#science .sv3-scroll');
  await scienceScroll.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  assert.equal(await scienceScroll.count(), 1);
  assert.equal(await page.locator('#science .sv3-static-sequence').count(), 0);
  const scenes = await page.locator('#science .sv3-scenes').boundingBox();
  const copy = await page.locator('#science .sv3-copy-stack').boundingBox();
  assert.ok(scenes && copy);
  if (viewport.width < 900) {
    assert.ok(scenes.y + scenes.height <= copy.y + 2, 'science copy must not cover its image');
  }
  const scienceMetrics = await scienceScroll.evaluate(element => ({
    top: element.getBoundingClientRect().top + scrollY,
    height: element.offsetHeight,
  }));
  const scienceTarget = scienceMetrics.top + (scienceMetrics.height - viewport.height) * .58;
  await page.evaluate(target => scrollTo(0, target), scienceTarget);
  await page.waitForTimeout(600);
  const activeScience = await page.locator("#science .sv3-progress li[aria-current='step'] span").innerText();
  assert.notEqual(activeScience, '01', 'science scrub should move beyond its first scene');
  await page.locator('#science .sv3-stage').screenshot({ path: `${output}/${name}-science.png` });

  await page.locator('#reviews').scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const reviewBefore = await page.locator('#reviews').getAttribute('data-review-index');
  await page.waitForTimeout(5500);
  const reviewAfter = await page.locator('#reviews').getAttribute('data-review-index');
  assert.notEqual(reviewBefore, reviewAfter, 'review loading bar should advance the carousel');
  assert.equal(await page.locator('#reviews .review-score').count(), 0);
  assert.equal(await page.locator('#reviews .review-progress-controls button').count(), 3);
  await page.locator('#reviews').screenshot({ path: `${output}/${name}-reviews.png` });

  assert.deepEqual(browserErrors, []);
  report[name] = {
    viewport,
    faqBackground,
    resultTransition: `${resultBefore}->${resultAfter}`,
    activeScience,
    reviewTransition: `${reviewBefore}->${reviewAfter}`,
  };
  await page.close();
}

await browser.close();
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
