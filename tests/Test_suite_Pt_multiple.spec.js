
// To iterate over multiple sets of data from your JSON file and run the tests for each set, you can modify your code to loop through the userData array and execute the tests inside this loop. Here's how you can do it:

// javascript
// Copy code        
const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');
// Read the data from the JSON file
const userData = require("../testdata/data4.json");
test.describe.configure({ mode: 'serial' });
test.describe('test suite Patient Registration ', () => {
  let crNumber1;  
  test.beforeEach(async ({ page }) => {
    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
    await page.locator('#UserName').fill("adm_gandhi");
    await page.locator("[type ='password']").fill("123456");
    await page.locator("[type='submit']").click();
  }); 
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });  
  userData.forEach((userData, index) => {          
    test(`Registration - Test ${index + 1}`, async ({ page }) => {
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Patient_Registration']").click();
      const framePage = page.frameLocator("[id='Patient Registration_iframe']");
      await framePage.locator("[id='btnClose_portal']").click();
      await framePage.locator("[name='departmentCode']").selectOption({ value: userData.departmentCode });
      await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: userData.primaryCatCode });
      await framePage.locator("[name='patFirstName']").fill(userData.firstName);
      await framePage.locator("[name='patMiddleName']").fill(userData.middleName);
      await framePage.locator("[id='patGuardianName']").fill(userData.guardianName);
      await framePage.locator("[id='patAgeId']").fill(userData.age);
      await framePage.locator("[id='patGenderCodeId']").selectOption({ value: userData.gender });
      await framePage.locator("[name='patLastName']").fill(userData.lastName);
      await framePage.locator("[name='patBirthPlace']").fill(userData.birthPlace);
      await framePage.locator("[name='patAddMobileNo']").fill(userData.mobileNo);
      await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: userData.countryCode });
      await framePage.locator("[name='patAddStreet']").fill(userData.street);
      await framePage.locator("[name='patAddCity']").fill(userData.city);
      await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userData.districtCode });
      await framePage.locator("[id='submitId']").click();
      await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 10000 });
      const crNumberElement = await framePage.locator('#divNormalMsgId');
      const crNumber1 = await crNumberElement.innerText();
      const numericCRNumber = crNumber1.replace(/\D/g, '' );
      const crData1 = { crNumbers: [numericCRNumber] };
      const crDataJSON1 = JSON.stringify(crData1, null, 2);
      try {
        await fs.writeFile(`numericCRNumberData_${index}.json`, crDataJSON1, 'utf8');  
        console.log(`Numeric CR number for Test ${index + 1} has been saved!`);
      } catch (err) {
        console.error('Error writing file:', err);
      }
      await framePage.locator("#divNormalMsgId:has-text('Patient Registered with CR No')").waitFor({ state: 'visible', timeout: 10000 });
    });
  });    

  userData.forEach((userData, index) => {
    test(`Visit - Test ${index + 1}`, async ({ page }) => {
      const crDataJSON_re = await fs.readFile(`numericCRNumberData_${index}.json`, 'utf8');
      const crData_re = JSON.parse(crDataJSON_re);
      const crNumber_re = crData_re.crNumbers[0];
      const framePage4 = page.frameLocator("[id='frmMainMenu']");
      await framePage4.locator("[id='Patient_Visit']").click();
      const framePage5 = page.frameLocator("[id='Patient Visit_iframe']");
      await framePage5.locator("[id='btnClose']").click();
      await framePage5.locator("[name='patCrNo']").fill(crNumber_re);
      await framePage5.locator("[id='btnGoIDCrInput']").click(); 
      await framePage5.locator("[id='btnClose_portal_Popup']").click();
      await framePage5.locator("input[type='checkbox'][name='newDepartmentVisit']").check();
      await framePage5.locator("select[name='departmentCode']").selectOption({ value: "200#20011#1461#0#0##-1#" });
      await framePage5.locator("select[name='departmentUnitCode']").selectOption({ value: "200#20011#1461#0#0##-1#0#1#Family" });
      await framePage5.locator("[id='submitBothId']").click();
      await framePage5.locator("#divNormalMsgId:has-text('Patient Visit Saved Successfully')").waitFor({ state: 'visible', timeout: 10000 });
    });
  });        
  userData.forEach((userData, index) => {
    test(`Duplicate - Test ${index + 1}`, async ({ page }) => {
      const crDataJSON = await fs.readFile(`numericCRNumberData_${index}.json`, 'utf8');
      const crData = JSON.parse(crDataJSON);
      const crNumber = crData.crNumbers[0];
      const framePage3 = page.frameLocator("[id='frmMainMenu']");
      await framePage3.locator("[id='Duplicate_Card_Printing']").click();
      const framePage1 = page.frameLocator("[id='Duplicate Card Printing_iframe']");
      await framePage1.locator("[id='btnClose']").click();
      await framePage1.locator("[name='patCrNo']").fill(crNumber);
      await framePage1.locator("[id='btnGoIDCrInput']").click(); 
      await framePage1.locator("[name='duplicateRenewRemarks']").fill("jhvdhv");
      await framePage1.locator("[id='submitId']").click();
      await framePage1.locator("[id='CancelId']");
      await page.pause(); 
    });
  });
});      


