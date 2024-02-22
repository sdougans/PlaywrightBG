import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils/ApiUtils';
import { StrategyPage } from '../page-objects/strategies-pageObject';

let context: any;
let page: any;
let base_url = process.env.BASE_URL;
let strategyPage: StrategyPage;

test.beforeAll("Setup", async ({browser}) => {
    context = await browser.newContext();
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);
    const cookieStamp = await apiUtils.GetCookieToken();
    await context.addCookies([{name:"CookieConsent", value: cookieStamp, url: base_url}]);
    page = await context.newPage();
    strategyPage = new StrategyPage(page);
});

test.describe('Strategy landing pages', () => {
    
    test.fixme('Can navigate to strategies landing page from mega menu', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/");

        // open mega menu

        // click strategies

        // confirm search and ilters are present

        // confirm strategies are listed
    });

    test.fixme('Can open strategy from strategy landing page', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/investment-strategies/");

        // confirm strategies are listed

        // click into a strategy

        // confirm strategy heading

    });

    test.fixme('Strategy detail introduction tab', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/investment-strategies/asia-ex-japan/");

        // check introduction tab is selected

        // check video URL

        // check meet the managers

        // check documents

        // check related insights

    });

    test.fixme('Strategy detail portfolio tab', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/investment-strategies/asia-ex-japan/");

        // click portfolio tab

        // check top holdings

        // check holdings by region

    });

    test.fixme('Strategy detail how to invest tab', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/investment-strategies/asia-ex-japan/");

        // click how to invest tab

        // check how to invest panel

    });

    test.fixme('Can load strategy detail tab from URL', async () => {
        await context.addCookies([{name:"cookieSelectedRegion", value: "UK", url: base_url}]);
        await context.addCookies([{name:"cookieSelectedChannel", value: "Institutional investor", url: base_url}]);
        await page.goto(base_url + "/en/uk/institutional-investor/investment-strategies/asia-ex-japan/?tab=tab-1");

        // change URL tab to name 

        // check top holdings

        // check holdings by region

    });

});