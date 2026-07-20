import { test, expect } from '@playwright/test';

test.describe('Neeli PDP Premium E-Commerce Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the local prototype server
    await page.goto('http://localhost:5173');
  });

  test('should load the page with correct main title and elements', async ({ page }) => {
    // Phase 4: Main Product Title check
    const title = page.locator('h1.hero-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Neelibhringadi Keram');
  });

  test('should toggle product variants and update pricing', async ({ page }) => {
    // Phase 4: Variant Selection check
    const size100 = page.locator('button.size-option:has-text("100 ml")');
    const size200 = page.locator('button.size-option:has-text("200 ml")');
    const priceDisplay = page.locator('.hero-price strong');

    // Default price is 200ml (₹338)
    await expect(priceDisplay).toContainText('₹338');

    // Click 100ml
    await size100.click();
    await expect(priceDisplay).toContainText('₹195');

    // Click 200ml
    await size200.click();
    await expect(priceDisplay).toContainText('₹338');
  });

  test('should increase and decrease product quantity', async ({ page }) => {
    // Phase 4: Quantity Control check
    const qtySpan = page.locator('.hero-qty-control span');
    const plusBtn = page.locator('.hero-qty-control button:has-text("+")');
    const minusBtn = page.locator('.hero-qty-control button:has-text("−")');

    await expect(qtySpan).toContainText('1');

    await plusBtn.click();
    await expect(qtySpan).toContainText('2');

    await minusBtn.click();
    await expect(qtySpan).toContainText('1');
  });

  test('should add product and companion cross-sell to bag', async ({ page }) => {
    // Phase 4 & 14: Add to Cart and Cross-sell Check
    const crossSellCheckbox = page.locator('.cross-sell-checkbox-label input');
    const addToBagBtn = page.locator('.hero-purchase-action');
    const cartBadge = page.locator('.header-bag span');

    // Select cross-sell
    await crossSellCheckbox.check();
    
    // Add to bag
    await addToBagBtn.click();

    // Cart badge should update to show 2 items (1 oil + 1 cleanser powder)
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toContainText('2');
  });

  test('should toggle accordions in product information sections', async ({ page }) => {
    // Phase 15: Accordion check
    const firstAccordionBtn = page.locator('.go-deeper-acc-item button').first();
    const firstAccordionPanel = page.locator('.go-deeper-panel').first();

    // Default state: open
    await expect(firstAccordionPanel).toBeVisible();

    // Click to close
    await firstAccordionBtn.click();
    await expect(firstAccordionPanel).toBeHidden();
  });

  test('should toggle mobile menu drawer', async ({ page, isMobile }) => {
    // Mobile menu navigation check
    if (!isMobile) {
      test.skip();
    }
    const hamburger = page.locator('.hamburger-btn');
    const drawer = page.locator('.mobile-nav-drawer');
    const closeBtn = page.locator('.mobile-nav-close');

    await expect(drawer).toBeHidden();
    await hamburger.click();
    await expect(drawer).toBeVisible();

    await closeBtn.click();
    await expect(drawer).toBeHidden();
  });

  test('should support ESC key to close cart bag drawer', async ({ page }) => {
    const bagBtn = page.locator('.header-bag');
    const drawer = page.locator('.drawer');
    
    // Set cart to 1 item to allow opening drawer
    await page.locator('.hero-purchase-action').click();
    
    // Open drawer
    await bagBtn.click();
    await expect(drawer).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });
});
