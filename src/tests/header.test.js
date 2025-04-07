import { chromium } from 'playwright';

test('should display header', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Your Next.js app URL
    const header = await page.textContent('header'); // Adjust selector as needed
    expect(header).toBe('Expected Header Text');
    await browser.close();
});
