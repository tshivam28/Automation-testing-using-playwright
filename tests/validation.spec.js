const { test, expect } = require('@playwright/test');
test(`Fill Form with Data: `, async ({ page }) => {
await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");

// Add any other setup code you may need

await page.locator('#UserName').fill("adm_gandhi");
await page.locator("[type ='password']").fill("123456");
await page.locator("[type='submit']").click();
const framePage2 = page.frameLocator("[id='frmMainMenu']");
await framePage2.locator("[id='Patient_Registration']").click();
const framePage = page.frameLocator("[id='Patient Registration_iframe']");
await framePage.locator("[name='departmentCode']").selectOption({ value: '103' });
await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75'});
await framePage.locator("[name='patFirstName']").fill("mlmlml");
await framePage.locator("[name='patMiddleName']").fill("scsccs@#");
await framePage.locator("[id='patGuardianName']").fill("sccscser");
await framePage.locator("[id='patAgeId']").fill("58");
await framePage.locator("[id='patGenderCodeId']").selectOption({ value: 'F' });
await framePage.locator("[name='patLastName']").fill("dcvsdv");
await framePage.locator("[name='patBirthPlace']").fill("dsvdsv");
await framePage.locator("[name='patAddMobileNo']").fill("1234567890");   
await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: 'IND' });
await framePage.locator("[name='patAddStreet']").fill("fdfgvdfb");
await framePage.locator("[name='patAddCity']").fill("dffdb");
await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: '536' });
await framePage.locator("[id='submitId']").click();

// Check if the validation message is displayed
const validationMessageLocator = framePage.locator('#validatebox-tip-content');

const isValidationMessageVisible = await validationMessageLocator.isVisible();

if (isValidationMessageVisible) {
  const validationMessage = await validationMessageLocator.innerText();
  console.error(`Validation message: ${validationMessage}`);
} else {
  console.log('Phone number is valid!');
}

// Assert whether the validation message is displayed
expect(isValidationMessageVisible).toBe(true);
});