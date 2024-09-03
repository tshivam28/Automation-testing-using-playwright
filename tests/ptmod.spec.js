const fs = require('fs');    
const { test, expect } = require('@playwright/test');
const { allowedNodeEnvironmentFlags } = require('process');  
const crNumbers = []; 
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));

test.describe.parallel('Fill Form with JSON Data', () => {  
  for (const userData of userDataArray) { 
    test(`Fill Form with Data: ${userData.mobileNo}`, async ({ page }) => {
      await page.goto("http://10.10.10.61:8083/AHIMSG5/hissso/loginLogin"); 
      // Fill login details   
      await page.locator('#UserName').fill(userData.username);  
      await page.locator("[type='password']").fill(userData.password);  
      await page.locator("[type='submit']").click();
      const framePage2 = page.frameLocator("[id='frmMainMenu']");  
      await framePage2.locator("[id='Patient_Detail_Modification']").click();    
      const framePage = page.frameLocator("[id='Patient Detail Modification_iframe']");   
      await framePage.locator("[id='btnClose']").click();      
      await framePage.locator("[name='patCrNo']").fill("331052400001871");                                                                                                                                                                                                                                    
      await framePage.locator("[id='btnGoIDCrInput']").click();    
      // Click on the "Verification Documents" button
      await framePage.locator("img.button[title='Verification Documents']").click(); 
      
      // Wait for the iframe to load
      await page.waitForTimeout(5000);
      
     // const verificationDocIframe = await page.frame({ url:  '/HISRegistration/registration/transactions/verificationDoc.action?fbArrSelectedVerifyDocs=@&fbIsAffdivate=0&callerName=PatientDetailModificationAction'}); // Use regex for flexibility
     // await framePage.getByAltText('Verification Documents').click();
      // await framePage2.locator("[name='verificationDocumentList']").check();
      //await framePage2.frameLocator('#VrfDocModal iframe').locator("input[value='8#18#3|Other']").check();
      await framePage.locator("//div[@id='VrfDocModal']//iframe input[value='8#18#3|Other']").check();
      // if (verificationDocIframe) {
      //   // Click the radio button for "Affidavit" (assuming unique value)
      //   await verificationDocIframe.locator("input[type='radio'][value='99#10#2|Affidavit']").check();

      //   // Click the "Ok" button to save the selection
      //   await verificationDocIframe.locator("a.btn.btn-success").click();
      // } else {
      //   console.error("Error: The iframe was not found.");
      // }      
      await framePage.locator("[id='PatientDetailModificationAction_requestBy']").selectOption({ value: userData.primaryCatCode });
      await framePage.locator("[name='PatientDetailModificationAction_patFirstName']").fill(userData.firstName);
      await framePage.locator("[name='PatientDetailModificationAction_patGuardianName']").fill(userData.middleName);
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

      // Fill other fields similarly...
      await framePage.locator("[id='submitId']").click();         
    });
  }
});
