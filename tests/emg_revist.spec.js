const { test, expect } =  require('@playwright/test');
const { allowedNodeEnvironmentFlags } = require('process');
//const crNumbers = [];
//const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
    test(`Emergency revist : `, async ({ page }) => { 
      
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin"); 
      // Fill login details
      await page.locator('#UserName').fill("adm_gandhi"); 
      await page.locator("[type ='password']").fill("123456");  
      await page.locator("[type='submit']").click();
      await page.click('a[aria-controls="Emergency"]'); 
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();
      const framePage2 = page.frameLocator("[id='frmMainMenu']");    
      await framePage2.locator("[id='Emergency_Patient_Visit']").click();
      const framePage = page.frameLocator("[id='Emergency Patient Visit_iframe']");  
      // Fill form fields using userData     
      //await framePage.locator("[id='btnClose']").click();
      await framePage.locator("[name='patCrNo']").fill("331052400005354")
      await framePage.locator("[id='btnGoIDCrInput']").click();
      //await framePage.locator("[id='departmentsToVisitStamp']").click();  
      //await framePage.locator("id='departmentsToVisitStamp'").check();
      // const checkbox = await framePage.locator('id="departmentsToVisitStamp"');
      // await checkbox.check();
      await framePage.locator("//input[@name='departmentsToVisitStamp' and @type='checkbox']").check();       
     // expect(await page.locator("//input[@name='departmentsToVisitStamp' and @type='checkbox']")).toBeChecked();
      await framePage.locator("[id='arrPatVisitReasonId0']").fill("hgsad");
      await framePage.locator("[id='submitBothId']").click();      

      await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 10000 });     
      // await page.waitForTimeout(5000);
      await framePage.locator("[id='cancelId']").click();
      //await framePage.pause();
      // await framePage.locator("[id='btnGoIDCrInput']").click(); 
      //await framePage.locator("img.button[title='Verification Documents']").click();  

        });