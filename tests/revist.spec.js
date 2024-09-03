const { test, expect } =  require('@playwright/test');

const { allowedNodeEnvironmentFlags } = require('process');

//const crNumbers = [];
//const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
    test(`Patient Registration visit : `, async ({ page }) => {
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      // Fill login details

      await page.locator('#UserName').fill("adm_gandhi");

      await page.locator("[type ='password']").fill("123456");
      await page.locator("[type='submit']").click();
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();
      
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Patient_Visit']").click();      
      const framePage = page.frameLocator("[id='Patient Visit_iframe']");
      // Fill form fields using userData
            
      await framePage.locator("[id='btnClose']").click();
      await framePage.locator("[name='patCrNo']").fill("331052400005796");
      await framePage.locator("[id='btnGoIDCrInput']").click(); 
      await framePage.locator("[id='btnClose_portal_Popup']").click();
      await framePage.locator("input[type='checkbox'][name='newDepartmentVisit']").check();
      await framePage.locator("select[name='departmentCode']").selectOption({ value: "200#20011#1461#0#0##-1#" });
      await framePage.locator("select[name='departmentUnitCode']").selectOption({ value: "200#20011#1461#0#0##-1#0#1#Family" });
      await framePage.locator("[id='submitBothId']").click();
      await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 10000 });
      // await page.waitForTimeout(5000);
     // await framePage.locator("[id='cancelId']").click();
    //  await framePage.pause();
      

      // await framePage.locator("[id='btnGoIDCrInput']").click(); 
      //await framePage.locator("img.button[title='Verification Documents']").click(); 

    });