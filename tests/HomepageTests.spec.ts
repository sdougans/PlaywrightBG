import { test, expect } from '@playwright/test';

let context;

test.beforeAll("", async ({browser}) => {
    context = await browser.newContext();
});

test.describe('Landing experience is nudger or forced audience selector', () => {
    test('should be nudger for UK channels', async () => {
        // const page = await context.newPage();
        // await page.goto();
    });

    test('should be Forced Audience Selector for USA channel', async ({ page }) => {
    });

    test('should be Forced Audience Selector for Global channel', async ({ page }) => {
    });

});