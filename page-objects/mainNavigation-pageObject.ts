import { expect, type Locator, type Page } from '@playwright/test';

export class MainNavigationPage {
  readonly page: Page;
  
  readonly audienceSelectorText: string;
  readonly audienceSelector: Locator;
  readonly audienceSelector_nudger: Locator;
  readonly audienceSelector_regionHeading: Locator;
  readonly audienceSelector_currentCountry: Locator;

  readonly globalNavigationText: string;
  readonly globalNavigation: Locator;
  readonly globalNavigation_strategies: Locator;
  readonly globalNavigation_viewAllStrategies: Locator;
  readonly globalNavigation_funds: Locator;
  readonly globalNavigation_insights: Locator;
  readonly globalNavigation_search: Locator;

  constructor(page: Page) {
    this.page = page;
    this.audienceSelectorText = '#audience-selector';
    this.audienceSelector = page.locator(this.audienceSelectorText);
    this.audienceSelector_nudger = page.locator('[class^="AudienceNudger_audienceNudger"][role="alert"]');
    this.audienceSelector_regionHeading = page.locator('[class^="AudienceSelector_selectorSection"][class*="region"] h2');
    this.audienceSelector_currentCountry = page.locator('[data-testid="currentRegionLabel"]');;

    this.globalNavigationText = '#global-navigation';
    this.globalNavigation = page.locator(this.globalNavigationText);
    this.globalNavigation_strategies = page.locator(this.globalNavigationText + ' button', {hasText: 'Strategies'});
    this.globalNavigation_viewAllStrategies = page.locator('#primary-nav-0 a', {hasText: 'View all investment strategies'});
    this.globalNavigation_funds = page.locator(this.globalNavigationText + ' a', {hasText: 'Funds'});
    this.globalNavigation_insights = page.locator(this.globalNavigationText + ' a', {hasText: 'Insights'});
    this.globalNavigation_search = page.locator(this.globalNavigationText + ' [data-testid="Typeahead-Toggle"]');
  }

  async audienceSelectorIsInViewport(){
    await expect(this.audienceSelector).toBeInViewport();
  }

  async audienceSelector_RegionHeadingIsInViewport(){
    await expect(this.audienceSelector_regionHeading).toBeInViewport();
  }

  async audienceSelector_RegionHeadingIsNotInViewport(){
    await expect(this.audienceSelector_regionHeading).not.toBeInViewport();
  }

  async audienceSelector_RegionHeadingTextIsCorrect(){
    expect(await this.audienceSelector_regionHeading.textContent()).toContain("01. Your location");
  }

  async audienceSelector_SelectedCountryIsCorrect(country: string){
    expect(await this.audienceSelector_currentCountry.textContent()).toContain(country);
  }

  async nudgerIsInViewport(){
    await expect(this.audienceSelector_nudger).toBeInViewport();
  }

  async nudgerIsNotInViewport(){
    await expect(this.audienceSelector_nudger).not.toBeInViewport();
  }

  async getNudgerText(){
    const nudger_text = await this.audienceSelector_nudger.textContent();
    return nudger_text;
  }

  async globalNavigationIsInViewport(){
    await expect(this.globalNavigation).toBeInViewport();
  }

  async searchIconIsInViewport(){
    await expect(this.globalNavigation_search).toBeInViewport();
  }

  async megaMenuIsOpen(){
    expect(await this.audienceSelector.getAttribute("aria-hidden")).toBe("false");
  }

  async openStrategyMegaMenu() {
    await this.globalNavigation_strategies.click();
  }

  async clickToViewAllStrategies() {
    await this.globalNavigation_viewAllStrategies.click();
  }

}