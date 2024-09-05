
//shivamconst { test, expect } = require('@playwright/test');
const userDataArray = require("../testdata/addmission.json");
const crNumbers = require("../testdata/allCRNumbersDatacopy.json").crNumbers;
test.describe.parallel('Fill Form with JSON Data', () => { 
  for (let i = 0; i < userDataArray.length; i++) {
    const userData = userDataArray[i];
    const crNumber = crNumbers[i];
    test(`Fill Form with Data: ${userData.mobileNo}`, async ({ page }) => {
      await page.goto("http://10.10.10.61:8083/AHIMSG5/hissso/loginLogin");
      // Fill login details
      await page.locator('#UserName').fill(userData.username);
      await page.locator("[type='password']").fill(userData.password);
      await page.locator("[type='submit']").click();
      await page.locator("[type='submit']").click();
      await page.click('a[aria-controls="A D T"]');
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Patient_Admission']").click();
      const framePage = page.frameLocator("[id='Patient Admission_iframe']");
      // Fill CR number from crNumbersArray
      if (!crNumber) {
        throw new Error(`CR number is undefined for userData: ${JSON.stringify(userData)}`);
      }  
      await framePage.locator("[id='strCrNoId']").fill(crNumber);
      await framePage.locator("[id='goBtnId']").click();
      await page.waitForTimeout(2000);
      await framePage.locator("[name='strDeptCode']").selectOption(userData.department);
      await page.waitForTimeout(2000);
      await framePage.locator("[name='strConsultantCode']").selectOption(userData.unit);
      await page.waitForTimeout(2000);
      await framePage.locator("[name='strWardCode']").selectOption(userData.ward);
      await page.waitForTimeout(2000);
      userData.Casesheetno = Math.floor(10000 + Math.random() * 90000).toString();
      await framePage.locator("[name='strCaseSheetNo']").fill(userData.Casesheetno);
      async function selectRandomBed(framePage) {
        console.log("Attempting to click the dropdown");
        await framePage.locator("[name='strBed']").click();
        const bedOptions = await framePage.locator("[name='strBed'] option").elementHandles();
        console.log(`Found ${bedOptions.length} options in the dropdown`);
        const validOptions = await Promise.all(bedOptions.map(async (option) => {
          const value = await option.getAttribute('value');
          return value !== "0" ? option : null;
        })).then(options => options.filter(option => option !== null));

        if (validOptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * validOptions.length);
          const selectedOptionValue = await validOptions[randomIndex].getAttribute('value');
          console.log(`Selected option value: ${selectedOptionValue}`);
          await framePage.locator("[name='strBed']").selectOption({ value: selectedOptionValue });
        } else {
          throw new Error("No valid bed options available to select");
        }
      }
      await selectRandomBed(framePage);
      await page.waitForTimeout(1000);
      await framePage.locator('#savebutton').click();
      console.log("Save button clicked");
      await page.pause();
    });
  }
});
