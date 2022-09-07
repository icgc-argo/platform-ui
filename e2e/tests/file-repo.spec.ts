import { test, expect } from '@playwright/test';
import { BASE_URL } from 'e2e/config';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  // Click nav >> text=File Repository
  await page.locator('nav >> text=File Repository').click();
});

test.describe('File Repo', () => {
  test('expect page to have default filters', async ({ page }) => {
    await expect(page).toHaveURL(
      `${BASE_URL}repository?filters=%7B%22content%22%3A%5B%5D%2C%22op%22%3A%22and%22%7D`,
    );
  });

  test('expect selected program checkbox to move to top', async ({ page }) => {
    // Click div:nth-child(5) > .css-u14glq-Uikit-StyledOption > .css-1m5hp70-Uikit-StyledCheckbox
    // get the 5th checkbox program id
    const selectedElementProgramId = await page
      .locator(
        'div:nth-child(5) > .css-u14glq-Uikit-StyledOption > .css-1m5hp70-Uikit-StyledCheckbox > input',
      )
      .first()
      .inputValue();

    await page
      .locator(
        'div:nth-child(5) > .css-u14glq-Uikit-StyledOption > .css-1m5hp70-Uikit-StyledCheckbox',
      )
      .first()
      .click();

    const firstInListProgramId = await page
      .locator('.css-u14glq-Uikit-StyledOption >> nth=0')
      .innerText();

    await expect(selectedElementProgramId).toEqual(firstInListProgramId);
  });
});
