import { expect, type Locator, type Page } from '@playwright/test';

export class StrategyPage {
  readonly page: Page;

  readonly pageHeading1: Locator;
  readonly searchBar: Locator;
  readonly searchBar_searchButton: Locator;
  readonly searchFilters_title: Locator;
  readonly searchFilters_list: Locator;
  readonly searchFilters_listButtons: Locator;
  readonly strategyCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading1 = page.locator('h1');
    this.searchBar = page.locator('[class^="PageSearchBar_page-search-bar-container"]');
    this.searchBar_searchButton = page.locator('.search-button');
    this.searchFilters_title = page.locator('h3[class^="SearchDropdownFilters_desktopBarHeading"]');
    this.searchFilters_list = page.locator('ul[class^="SearchDropdownFilters_desktopBarMenu"]');
    this.searchFilters_listButtons = page.locator('button[class^="LinkButtonStyles_dropdownButton"]');
    this.strategyCards = page.locator('#intersection-search-entry [class^="CardGridListing_gridResultsItem"]');

  }

  async pageTitleIsCorrect(title: string){
    expect(await this.pageHeading1.first().textContent()).toContain(title);
  }

  async searchBarIsInViewport(){
    await expect(this.searchBar).toBeInViewport();
  }

  async searchBarSearchButtonIsInViewport(){
    await expect(this.searchBar_searchButton).toBeInViewport();
  }

  async searchFiltersTitleIsInViewport(){
    await expect(this.searchFilters_title).toBeInViewport();
  }

  async searchFiltersListIsInViewport(){
    await expect(this.searchFilters_list).toBeInViewport();
  }

  async multipleSearchFiltersButtonsExist(){
    let numberOfFilterButtons = (await this.searchFilters_listButtons.all()).length;
    expect(numberOfFilterButtons).toBeGreaterThan(0);
  }

  async multipleStrategyCardsExist(){
    let numberOfStrategyCards = (await this.strategyCards.all()).length;
    expect(numberOfStrategyCards).toBe(15);
  }

}