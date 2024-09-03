const { test, expect } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
test.describe('Fill Form with JSON Data', () => { 
test.beforeEach(async ({ page }) => {
    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin"); 
    await page.locator('#UserName').fill("adm_gandhi");
    await page.locator("[type ='password']").fill("123456");           
    await page.locator("[type='submit']").click();
  });

    test(`name validation: `, async ({ page }) => {

    const framePage2 = page.frameLocator("[id='frmMainMenu']");   
    await framePage2.locator("[id='Patient_Registration']").click();    
    const framePage = page.frameLocator("[id='Patient Registration_iframe']");
    await framePage.locator("[id='btnClose_portal']").click();
    await framePage.locator("[name='departmentCode']").selectOption({ value: '103' });    
    await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75' });
    await framePage.locator("[name='patFirstName']").fill("hdhfjhdsf");
    // Use page.screenshot instead of framePage.screenshot
    //await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await framePage.locator("[name='patMiddleName']").fill("scsccs");
    await framePage.locator("[id='patGuardianName']").fill("sccscser");
    await framePage.locator("[id='patAgeId']").fill("5800");
    await page.waitForTimeout(2000);
    // Use page.screenshot instead of framePage.screenshot
    await page.screenshot({ path: 'screenshot1.png', fullPage: true });
    await framePage.locator("[id='patGenderCodeId']").selectOption({ value: 'F' }); 
    await framePage.locator("[name='patLastName']").fill("dcvsd343v");
    await framePage.locator("[name='patBirthPlace']").fill("dsvds34v");
    await framePage.locator("[name='patAddMobileNo']").fill("123456789");
    await page.waitForTimeout(2000); 
       // Use page.screenshot instead of framePage.screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: 'IND' });
    await framePage.locator("[id='patGuardianName']").fill('jjksd#');
    await framePage.locator("[name='patAddStreet']").fill("fdfgvdfb");
    await framePage.locator("[name='patAddCity']").fill("dffdb");
    await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: '536' });
    // Click the save button

    await framePage.locator("[id='submitId']").click();

    const divNormalMsgId = await framePage.locator("[id='divNormalMsgId']").first();        
        try {

            // Attempt to wait for the element to be visible
            await divNormalMsgId.waitFor({ state: 'visible', timeout: 10000 });

            console.log("CR generated");

        } catch (error) {
            // Log a message if the element is not visible within the timeout
            console.log("CR not generated");
        }
            // ... rest of your test code
  });
});
