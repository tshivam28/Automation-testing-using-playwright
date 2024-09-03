const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');
const crNumbers = [];  
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data.json")));   
test(`Fill Form with Data: `, async ({ page }) => {   
    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
    await page.locator('#UserName').fill("adm_gandhi");
    await page.locator("[type ='password']").fill("123456");        
    await page.locator("[type='submit']").click(); 
    await page.click('a[aria-controls="A D T"]');   
       //await page.click("[id='Patient_Registration']");
       //await framePage.locator("[id='Patient_Registration']").click();
    const framePage2 = page.frameLocator("[id='frmMainMenu']");  
    await framePage2.locator("[id='Admission_Cancellation']").click();   
    const framePage = page.frameLocator("[id='Admission Cancellation_iframe']"); 
    await framePage.locator("[id='strCrNoId']").fill("331052400013896");
    await framePage.locator('img[src="../../hisglobal/images/Go.png"]').click();  
    await page.waitForTimeout(2000);  
    await page.waitForTimeout(2000);  
    await framePage.locator("select[name='strConsultantName']").selectOption({ value: "331059700098" });
    await framePage.locator("[name='strRemarks']").fill('jhgdfjhsdfj');     
    await page.waitForTimeout(4000);   
    //handling alert 
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });
    // Click the save button and wait for the confirmation dialog
    await framePage.locator('a.button:has(span.save)').click(); 
    // Wait for some time to ensure the dialog event is caught
    await page.waitForTimeout(10000);  // Wait for 10 seconds

    // Log console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.pause();     
});