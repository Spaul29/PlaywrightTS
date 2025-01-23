import { expect, test } from '@playwright/test';
import { Env } from '@e2e/frameworkConfig/env';
import LoginPage from '@pages/loginPage';
import AddEmployeePage from '@pages/addEmployeePage';
import { getRandomEmployeeDetails } from '@e2e/testdata/random';

test(
  'Add Employee',
  {
    annotation: [
      {
        type: 'info',
        description: 'Add employee with snapshots validation',
      },
    ],
    tag: ['@releasev1.1.0'],
  },
  async ({ page }) => {
    await page.goto(Env.BASE_URL);
    await expect(page.locator('#app')).toMatchAriaSnapshot(`
      - img "company-branding"
      - heading "Login" [level=5]
      - paragraph: "Username : Admin"
      - paragraph: "Password : admin123"
      - text:  Username
      - textbox "Username"
      - text:  Password
      - textbox "Password"
      - button "Login"
      - paragraph: Forgot your password?
      - link
      - link
      - link
      - link
      - paragraph: OrangeHRM OS 5.7
      - paragraph:
        - text: /© \\d+ - \\d+/
        - link "OrangeHRM, Inc"
        - text: . All rights reserved.
      - img "orangehrm-logo"
    `);
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.login(Env.USERNAME, Env.PASSWORD);
    await expect(page.getByLabel('Sidepanel')).toMatchAriaSnapshot(`
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin"
      - listitem:
        - link "PIM"
      - listitem:
        - link "Leave"
      - listitem:
        - link "Time"
      - listitem:
        - link "Recruitment"
      - listitem:
        - link "My Info"
      - listitem:
        - link "Performance"
      - listitem:
        - link "Dashboard"
      - listitem:
        - link "Directory"
      - listitem:
        - link "Maintenance"
      - listitem:
        - link "Claim":
          - img
      - listitem:
        - link "Buzz"
    `);
    await homePage.getLeftMenuComponent().selectLeftMenuItem('PIM');
    await homePage.getTopMenuComponent().selectTopMenuItem('Add Employee');

    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.addEmployee(getRandomEmployeeDetails());

    await expect(addEmployeePage.successMessage).toBeVisible();
  }
);
