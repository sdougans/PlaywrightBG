import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

let context: any;
let page: any;
let base_url = process.env.BASE_URL;

let locator_nudger: any;
let locator_audienceSelector: any;
let locator_audienceSelectorRegion: any;
let locator_currentCountry: any;

test.beforeAll("Setup", async ({browser}) => {
    context = await browser.newContext();

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);
    const cookieStamp = await apiUtils.GetCookieToken();
    await context.addCookies([{name:"CookieConsent", value: cookieStamp, url: base_url}]);

    page = await context.newPage();
    locator_nudger = page.locator('[class^="AudienceNudger_audienceNudger"][role="alert"]');
    locator_audienceSelector = page.locator('#audience-selector');
    locator_audienceSelectorRegion = page.locator('[class^="AudienceSelector_selectorSection"][class*="region"] h2');
    locator_currentCountry = page.locator('[data-testid="currentRegionLabel"]');

});

test.describe('Landing experience is nudger or forced audience selector for new users', () => {
    
    test('should be nudger for /en/uk/individual-investors/', async () => {
        await page.goto(base_url + "/en/uk/individual-investors/");
        expect(await locator_nudger).toBeInViewport();
        const nudger_text = await locator_nudger.textContent();
        expect(await nudger_text).toContain("You are viewing this site as an Individual investor in UK.");
    });

    test('should be nudger for /en/uk/institutional-investor/', async () => {
        await page.goto(base_url + "/en/uk/institutional-investor/");
        expect(await locator_nudger).toBeInViewport();
        const nudger_text = await locator_nudger.textContent();
        expect(await nudger_text).toContain("You are viewing this site as an Institutional investor in UK.");
    });

    test('should be nudger for /en/uk/intermediaries/', async () => {
        await page.goto(base_url + "/en/uk/intermediaries/");
        expect(await locator_nudger).toBeInViewport();
        const nudger_text = await locator_nudger.textContent();
        expect(await nudger_text).toContain("You are viewing this site as an Intermediaries in UK.");
    });

    test('should be Forced Audience Selector for USA channel', async () => {
        await page.goto(base_url + "/en/usa/professional-investor/");
        expect(await locator_audienceSelector).toBeInViewport();
        expect(await locator_audienceSelector.getAttribute("aria-hidden")).toBe("false");
        expect(await locator_audienceSelectorRegion).toBeInViewport();
        expect(await locator_audienceSelectorRegion.textContent()).toContain("01. Your location");
        expect(await locator_currentCountry.textContent()).toContain("USA");
    });

    test('should be Forced Audience Selector for Global channel', async () => {
        await page.goto(base_url + "/en/global/all-users/");
        expect(await locator_audienceSelector).toBeInViewport();
        expect(await locator_audienceSelector.getAttribute("aria-hidden")).toBe("false");
        expect(await locator_audienceSelectorRegion).toBeInViewport();
        expect(await locator_audienceSelectorRegion.textContent()).toContain("01. Your location");
        expect(await locator_currentCountry.textContent()).toContain("Global");
    });

});

test.describe('Suppressed landing experience for returning users', () => {

    test('should be no nudger for /en/uk/individual-investors/', async () => {

    });

    test('should be no nudger for /en/uk/institutional-investor/', async () => {

    });

    test('should be no nudger for /en/uk/intermediaries/', async () => {

    });

    test('should be no Forced Audience Selector for USA channel', async () => {

    });

    test('should be no Forced Audience Selector for Global channel', async () => {

    });

});
