import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';
import { MainNavigationPage } from '../page-objects/mainNavigation-pageObject';

let context: any;
let page: any;
let base_url = process.env.BASE_URL;
let mainNavigationPage: MainNavigationPage;

test.beforeAll("Setup", async ({browser}) => {
    context = await browser.newContext();
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);
    const cookieStamp = await apiUtils.GetCookieToken();
    await context.addCookies([{name:"CookieConsent", value: cookieStamp, url: base_url}]);
    page = await context.newPage();
    mainNavigationPage = new MainNavigationPage(page);
});

test.describe('Landing experience is nudger or forced audience selector for new users', () => {
    
    test('should be nudger for /en/uk/individual-investors/', async () => {
        await page.goto(base_url + "/en/uk/individual-investors/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
        const nudger_text = await mainNavigationPage.getNudgerText();
        expect(nudger_text).toContain("You are viewing this site as an Individual investor in UK.");
    });

    test('should be nudger for /en/uk/institutional-investor/', async () => {
        await page.goto(base_url + "/en/uk/institutional-investor/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
        const nudger_text = await mainNavigationPage.getNudgerText();
        expect(nudger_text).toContain("You are viewing this site as an Institutional investor in UK.");
    });

    test('should be nudger for /en/uk/intermediaries/', async () => {
        await page.goto(base_url + "/en/uk/intermediaries/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
        const nudger_text = await mainNavigationPage.getNudgerText();
        expect(nudger_text).toContain("You are viewing this site as an Intermediaries in UK.");
    });

    test('should be Forced Audience Selector for USA channel', async () => {
        await page.goto(base_url + "/en/usa/professional-investor/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingTextIsCorrect();
        await mainNavigationPage.audienceSelector_SelectedCountryIsCorrect("USA");
    });

    test('should be Forced Audience Selector for Global channel', async () => {
        await page.goto(base_url + "/en/global/all-users/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingTextIsCorrect();
        await mainNavigationPage.audienceSelector_SelectedCountryIsCorrect("Global");
    });

});

test.describe('Suppressed landing experience for returning users', () => {

    test('should be no nudger for /en/uk/individual-investors/', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Individual investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/individual-investors/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
    });

    test('should be no nudger for /en/uk/institutional-investor/', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
    });

    test('should be no nudger for /en/uk/intermediaries/', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Intermediaries", url: base_url}]);
        await page.goto(base_url + "/en/uk/intermediaries/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
    });

    test('should be no Forced Audience Selector for USA channel', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "USA", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Professional investor", url: base_url}]);
        await page.goto(base_url + "/en/usa/professional-investor/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
    });

    test('should be no Forced Audience Selector for Global channel', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "Global", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "All users", url: base_url}]);
        await page.goto(base_url + "/en/global/all-users/");
        await mainNavigationPage.audienceSelectorIsInViewport();
        await mainNavigationPage.nudgerIsNotInViewport();
        await mainNavigationPage.audienceSelector_RegionHeadingIsNotInViewport();
    });
    
});

test('Homepage has navigation, content and footer', async () => {
    await page.goto(base_url + "/en/uk/individual-investors/");
    await mainNavigationPage.audienceSelectorIsInViewport();
    await mainNavigationPage.globalNavigationIsInViewport();
    await mainNavigationPage.searchIconIsInViewport();
    expect(await page.locator('h1').textContent()).toContain("Imagine the future")
    expect(await page.locator('footer').textContent()).toContain("Learn about Baillie Gifford")
});