import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

let context: any;
let page: any;
let base_url = process.env.BASE_URL;

let locator_nudger: any;

test.beforeAll("Setup", async ({browser}) => {
    context = await browser.newContext();

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);
    const cookieStamp = await apiUtils.GetCookieToken();
    await context.addCookies([{name:"CookieConsent", value: cookieStamp, url: base_url}]);

    page = await context.newPage();
    locator_nudger = page.locator('[class^="AudienceNudger_audienceNudger"][role="alert"]');

});

test.describe('Landing experience is nudger or forced audience selector', () => {
    
    test('should be nudger for /en/uk/individual-investors/', async () => {
        await page.goto(base_url + "/en/uk/individual-investors/");
        await expect(locator_nudger).toBeVisible;
        const nudger_text = await locator_nudger.textContent();
        expect(nudger_text).toContain("You are viewing this site as an Individual investor in UK.");
    });

    test('should be nudger for /en/uk/institutional-investor/', async () => {
        await page.goto(base_url + "/en/uk/institutional-investor/");
        await expect(locator_nudger).toBeVisible;
        const nudger_text = await locator_nudger.textContent();
        expect(nudger_text).toContain("You are viewing this site as an Institutional investor in UK.");
    });

    test('should be nudger for /en/uk/intermediaries/', async () => {
        await page.goto(base_url + "/en/uk/intermediaries/");
        await expect(locator_nudger).toBeVisible;
        const nudger_text = await locator_nudger.textContent();
        expect(nudger_text).toContain("You are viewing this site as an Intermediaries in UK.");
    });

    // test('should be Forced Audience Selector for USA channel', async ({ page }) => {
    // });

    // test('should be Forced Audience Selector for Global channel', async ({ page }) => {
    // });

});