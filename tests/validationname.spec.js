const { test, expect } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });
test.describe('Fill Form with JSON Data', () => {      
    test.beforeEach(async ({ page }) => {  
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      await page.locator('#UserName').fill("adm_gandhi");
      await page.locator("[type ='password']").fill("123456");      
      await page.locator("[type='submit']").click();
    });         
test(`@name validation: `, async ({ page }) => {    
    const framePage2 = page.frameLocator("[id='frmMainMenu']"); 
    await framePage2.locator("[id='Patient_Registration']").click();
    const framePage = page.frameLocator("[id='Patient Registration_iframe']");
    await framePage.locator("[id='btnClose_portal']").click();
    await framePage.locator("[name='departmentCode']").selectOption({ value: '214' });
    await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75'});
    await framePage.locator("[name='patFirstName']").fill('sdfsd#@f');
    await framePage.locator("[name='patMiddleName']").fill('fdsdsfsdf');
    await framePage.locator("[id='patGuardianName']").fill('dsfsdf');
    await framePage.locator("[id='patAgeId']").fill('45');
    await framePage.locator("[id='patGenderCodeId']").selectOption({ value: 'F' });
    await framePage.locator("[name='patLastName']").fill('dsfgsdfg');
    await framePage.locator("[name='patBirthPlace']").fill('dfgdfg');
    await framePage.locator("[name='patAddMobileNo']").fill('8965213456');
    await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: 'IND' });
    await framePage.locator("[name='patAddStreet']").fill('hthrth');
    await framePage.locator("[name='patAddCity']").fill('hsrthrthrthrt');
    await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: '536' });
    await framePage.locator("[id='submitId']").click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot5.png', fullPage: true });
  await framePage.locator("[id='divErrorMsgId']").waitFor({ state: 'visible', timeout: 10000 });
  // Check if the validation message is displayed
  const isValidationMessageVisible = await framePage.locator('#divErrorMsgId').isVisible();
  if (isValidationMessageVisible) {
    const validationMessage = await framePage.locator('#divErrorMsgId').innerText();
    console.log(`Validation message: ${validationMessage}`);
    // Assertion: Check if the validation message contains the expected error message
    expect(validationMessage).toContain('First Name Is Required. It Accept Alphabets Only.');
  } else {
    console.log('Name field is valid!');
  }        // Assert whether the validation message is displayed
  expect(isValidationMessageVisible).toBe(true);
});
test(`fathername validation: `, async ({ page }) => {
    const framePage2 = page.frameLocator("[id='frmMainMenu']");
    await framePage2.locator("[id='Patient_Registration']").click();
    const framePage = page.frameLocator("[id='Patient Registration_iframe']");
    await framePage.locator("[id='btnClose_portal']").click();
    await framePage.locator("[name='departmentCode']").selectOption({ value: '214' });
    await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75'});
    await framePage.locator("[name='patFirstName']").fill('sdfsdf');
    await framePage.locator("[name='patMiddleName']").fill('fdsdsfsdf');
    await framePage.locator("[id='patGuardianName']").fill('dsfsdf#$#@');
    await framePage.locator("[id='patAgeId']").fill('45');
    await framePage.locator("[id='patGenderCodeId']").selectOption({ value: 'F' });
    await framePage.locator("[name='patLastName']").fill('dsfgsdfg');
    await framePage.locator("[name='patBirthPlace']").fill('dfgdfg');
    await framePage.locator("[name='patAddMobileNo']").fill('8965213456');
    await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: 'IND' });
    await framePage.locator("[name='patAddStreet']").fill('hthrth');
    await framePage.locator("[name='patAddCity']").fill('hsrthrthrthrt');
    await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: '536' });
    await framePage.locator("[id='submitId']").click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot4.png', fullPage: true });  
    await framePage.locator("[id='divErrorMsgId']").waitFor({ state: 'visible', timeout: 10000 });  
    // Check if the validation message is displayed
    const isValidationMessageVisible1 = await framePage.locator('#divErrorMsgId').isVisible();  
    if (isValidationMessageVisible1) {
      const validationMessage1 = await framePage.locator('#divErrorMsgId').innerText();
      console.log(`Validation message: ${validationMessage1}`);
      // Assertion: Check if the validation message contains the expected error message
      expect(validationMessage1).toContain('Fathers Name Is Required. It Accept Alphabets with Spaces Only');
    } else {
      console.log('Name field is valid!');  
    }  

    // Assert whether the validation message is displayed
    expect(isValidationMessageVisible1).toBe(true);
});  
    test(`mobile_pin validation: `, async ({ page }) => {    

        const framePage2 = page.frameLocator("[id='frmMainMenu']");
        await framePage2.locator("[id='Patient_Registration']").click();
        
        const framePage = page.frameLocator("[id='Patient Registration_iframe']");
        await framePage.locator("[id='btnClose_portal']").click();
    
        await framePage.locator("[name='departmentCode']").selectOption({ value: '214' });
        await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: '75'});
        await framePage.locator("[id='patGuardianName']").fill('');
        await framePage.locator("[name='patFirstName']").fill('sdfswqqreXX');
        await framePage.locator("[name='patMiddleName']").fill('fdsdsfsdf');
        await framePage.locator("[id='patGuardianName']").fill('dsfsdf');
        await framePage.locator("[id='patGuardianName']").click;
        await framePage.locator("[id='patAgeId']").fill('315');
        await page.waitForTimeout(2000);
    // Use page.screenshot instead of framePage.screenshot
        await page.screenshot({ path: 'screenshot1.png', fullPage: true });
        await framePage.locator("[id='patGenderCodeId']").selectOption({ value: 'F' });
        await framePage.locator("[name='patLastName']").fill('dsfgsdfg');
        await framePage.locator("[name='patBirthPlace']").fill('dfgdfg');
        await framePage.locator("[name='patAddMobileNo']").fill('1965213450');
        await page.waitForTimeout(2000); 
       // Use page.screenshot instead of framePage.screenshot
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
        await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: 'IND' });
        await framePage.locator("[name='patAddStreet']").fill('hthrth');
        await framePage.locator("[name='patAddCity']").fill('hsrthrthrthrt');
        await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: '536' });
        await framePage.locator("[name='patAddPIN']").fill("1234");
        await page.waitForTimeout(2500); 
    
        await page.screenshot({ path: 'screenshot3.png', fullPage: true });
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