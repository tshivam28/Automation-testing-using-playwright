const fs = require('fs'); 
const { test, expect } =  require('@playwright/test'); 
const { allowedNodeEnvironmentFlags } = require('process');
const crNumbers = []; 
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json"))); 
test.describe.parallel('Fill Form with JSON Data', () => { 
  for (const userData of userDataArray) { 
    test(`Fill Form with Data: ${userData.mobileNo}`, async ({ page }) => {  
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");   
      // Fill login details  
      await page.locator('#UserName').fill(userData.username);
      await page.locator("[type ='password']").fill(userData.password);
      await page.locator("[type='submit']").click();   
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Patient_Detail_Modification']").click();
      const framePage = page.frameLocator("[id='Patient Detail Modification_iframe']");  
      // Fill form fields using userData
      await framePage.locator("[id='btnClose']").click(); 
      await framePage.locator("[name='patCrNo']").fill("331052400001871");  
      await framePage.locator("[id='btnGoIDCrInput']").click(); 
      await framePage.locator("img.button[title='Verification Documents']").click();    
     
      //await framePage.locator("input[type='radio'][name='verificationDocumentList'][value='99#10#2|Affidavit']").check();
      // await framePage.locator("input[type='radio'][name='verificationDocumentList'][value='4#10#2|Driving License']").check();
      //await framePage.waitFor("input[type='radio'][name='verificationDocumentList'][value='5#6#2|Govt Authority Identifier']", { state: 'visible' });
      // await framePage.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for network to be idle    
      const iframe = await page.frameLocator({ url: '/HISRegistration/registration/transactions/verificationDoc.action?fbArrSelectedVerifyDocs=@&fbIsAffdivate=0&callerName=PatientDetailModificationAction' });
if (iframe) { 
  await iframe.locator("input[type='radio'][name='verificationDocumentList'][value='99#10#2|Affidavit']").check();
  await iframe.locator("a.btn.btn-success[onclick='return verificationDocumentsSelected()']").click();
} else {
  console.error("Error: The iframe was not found.");
}    
     //await framePage.locator("[name='departmentCode']").selectOption({ value: userData.departmentCode });
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

