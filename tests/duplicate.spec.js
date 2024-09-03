const { test, expect } =  require('@playwright/test');

const { allowedNodeEnvironmentFlags } = require('process');
//const crNumbers = [];
//const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
    test(`Patient Registration duplicate card priting : `, async ({ page }) => {
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");      
      // Fill login details
      await page.locator('#UserName').fill("adm_gandhi");
      await page.locator("[type ='password']").fill("123456");
      await page.locator("[type='submit']").click();
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Duplicate_Card_Printing']").click();
      const framePage = page.frameLocator("[id='Duplicate Card Printing_iframe']");
      // Fill form fields using userData
      await framePage.locator("[id='btnClose']").click();
      await framePage.locator("[name='patCrNo']").fill("331052400001871");
      await framePage.locator("[id='btnGoIDCrInput']").click(); 
      await framePage.locator("[name='duplicateRenewRemarks']").fill("jhvdhv");
      await framePage.locator("[id='submitId']").click();
      await page.pause();  
     // await framePage.locator("[id='btnGoIDCrInput']").click(); 
      //await framePage.locator("img.button[title='Verification Documents']").click(); 
    });