const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });
test.describe('Fill Form with JSON Data', () => {
    test.beforeEach(async ({ page }) => {    


    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
    await page.locator('#UserName').fill("adm_gandhi");
    await page.locator("[type ='password']").fill("123456");
    await page.locator("[type='submit']").click();       
});



    test.only(`name validation: `, async ({ page }) => {

    const framePage2 = page.frameLocator("[id='frmMainMenu']");
    
    await framePage2.locator("[id='Patient_Registration']").click();
    const framePage = page.frameLocator("[id='Patient Registration_iframe']");
    await framePage.locator("[name='departmentCode']").selectOption({ value: '103' });
    await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75' });   
    await framePage.locator("[name='patFirstName']").fill("mlmlmlyjty#");
    await framePage.locator("[name='patMiddleName']").fill("scsccs");
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
    // Click the save button 


    await framePage.locator("[id='submitId']").click();
     // Wait for the success message div to be visible
     const divNormalMsgId = await framePage.locator("[id='divNormalMsgId']").first();

        
        try {
            // Attempt to wait for the element to be visible
            await divNormalMsgId.waitFor({ state: 'visible', timeout: 10000 });
            console.log("CR generated");
        } catch (error) {

            // Log a message if the element is not visible within the timeout
            console.log("CR not generated");
        }

  });
});
