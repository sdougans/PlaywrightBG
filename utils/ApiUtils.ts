import { expect } from '@playwright/test';

export class ApiUtils{

    apiContext: any;
 
    constructor(apiContext)
    {
        this.apiContext = apiContext;
    }

    async GetCookieToken(){
        const cookieResponse = await this.apiContext.get("https://consent.cookiebot.com/logconsent.ashx?action=accept&nocache=1707958113257&dnt=false&clp=true&cls=true&clm=true&cbid=9361a0f9-87ea-41a3-aa1f-2e20e0f65fbe&cbt=leveloptin&ticket=&bulk=false&hasdata=true&method=strict&usercountry=GB&referer=https%3A%2F%2Fwww.bailliegifford.com&rc=false");
        expect(cookieResponse.ok()).toBeTruthy();
        let cookieResponseText = await cookieResponse.text();

        const startIndex = cookieResponseText.toString().indexOf("CookieConsent.setCookie(\"");
        const endIndex = cookieResponseText.toString().indexOf("}\",");
        const cookieStamp = cookieResponseText.substring(startIndex+25, endIndex+1);

        return cookieStamp;
    };
}

module.exports = {ApiUtils}