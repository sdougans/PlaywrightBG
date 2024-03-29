import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';

let context: any;
let page: any;
let base_url = process.env.BASE_URL;

let locator_nudger: any;
let locator_audienceSelector: any;
let locator_audienceSelectorRegion: any;
let locator_currentCountry: any;
let locator_globalNavigation: any;
let locator_search: any;

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
    locator_globalNavigation = page.locator('#global-navigation');
    locator_search = page.locator('[data-testid="Typeahead-Toggle"]');
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
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Individual investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/individual-investors/");
        expect(await locator_nudger).not.toBeInViewport();
    });

    test('should be no nudger for /en/uk/institutional-investor/', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/");
        expect(await locator_nudger).not.toBeInViewport();
    });

    test('should be no nudger for /en/uk/intermediaries/', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Intermediaries", url: base_url}]);
        await page.goto(base_url + "/en/uk/intermediaries/");
        expect(await locator_nudger).not.toBeInViewport();
    });

    test('should be no Forced Audience Selector for USA channel', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "USA", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Professional investor", url: base_url}]);
        await page.goto(base_url + "/en/usa/professional-investor/");
        expect(await locator_audienceSelector).toBeInViewport();
        expect(await locator_audienceSelectorRegion).not.toBeInViewport();
    });

    test('should be no Forced Audience Selector for Global channel', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "Global", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "All users", url: base_url}]);
        await page.goto(base_url + "/en/global/all-users/");
        expect(await locator_audienceSelector).toBeInViewport();
        expect(await locator_audienceSelectorRegion).not.toBeInViewport();
    });

});

test('Homepage has navigation, content and footer', async () => {
    await page.goto(base_url + "/en/uk/individual-investors/");
    expect(await locator_audienceSelector).toBeInViewport();
    expect(await locator_globalNavigation).toBeInViewport();
    expect(await locator_search).toBeInViewport();
    expect(await page.locator('h1').textContent()).toContain("Imagine the future")
    expect(await page.locator('footer').textContent()).toContain("Learn about Baillie Gifford")
});