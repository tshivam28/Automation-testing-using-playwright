const fs = require('fs');
const { test, expect } =  require('@playwright/test');
const { allowedNodeEnvironmentFlags } = require('process');
const crNumbers = [];
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
test.describe.parallel('Fill Form with JSON Data', () => {
    for (const userData of userDataArray) {
    test(`Fill Form with Data: ${ userData.mobileNo }`, async ({ page }) => {
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      // Fill login details
      await page.locator('#UserName').fill(userData.username);       
      await page.locator("[type ='password']").fill(userData.password);
      await page.locator("[type='submit']").click();
      await page.click('a[aria-controls="Emergency"]');
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();
      const framePage2 = page.frameLocator("[id='frmMainMenu']");
      await framePage2.locator("[id='Emg_Patient_Modification']").click();
      const framePage = page.frameLocator("[id='Emg Patient Modification_iframe']");  
      // Fill form fields using userData
      await framePage.locator("[id='btnClose']").click(); 
      await framePage.locator("[name='patCrNo']").fill("331052400006121");
      await framePage.locator("[id='btnGoIDCrInput']").click();
      await framePage.locator("[id='EmgPatDetailMod_patFirstName']").fill(userData.firstName); 
      await framePage.locator("[id='EmgPatDetailMod_patMotherName']").fill(userData.motherName); 
      await framePage.locator("[id='EmgPatDetailMod_patMiddleName']").fill(userData.motherName);    //middlename 
      await framePage.locator("[id='EmgPatDetailMod_patLastName']").fill(userData.motherName);   //lastname
      await framePage.locator("[id='EmgPatDetailMod_patBirthPlace']").fill(userData.motherName);    //BirthPlace
      await framePage.locator("[id='EmgPatDetailMod_patMotherName']") //pa_mother name
      await framePage.locator("[id='EmgPatDetailMod_patHusbandName']").fill(userData.motherName);  //HusbandName'
      await framePage.locator("[id='EmgPatDetailMod_patMaritalStatusCode']").fill(userData.motherName);  //maritalstatus __ value 
      await framePage.locator("[id='EmgPatDetailMod_patReligionCode']").fill(userData.motherName);  //religion_value option
      await framePage.locator("[id='EmgPatDetailMod_patCasteCode']").fill(userData.motherName);     //Castecode
      await framePage.locator("[id='patOccupationId']").fill(userData.motherName); //occupation
      await framePage.locator("[id='EmgPatDetailMod_patMonthlyIncome']").fill(userData.Month_income);//mothly  income 
      await framePage.locator("[id='EmgPatDetailMod_patNationalId']").fill(userData.Month_income);// aadhar card id 
      await framePage.locator("[id='EmgPatDetailMod_patNationalId']").fill(userData.Month_income);//  
      await framePage.locator("[id='  EmgPatDetailMod_patNationalId']");
      await framePage.locator("['id='Shivam_kumar_tiwari']");
      await framePage.locator("[id='patfcodek']")
      await framePage.locator()
      await framePage.locator("[name='patGuardianName']").fill(userData.guardianName);
      await framePage.locator("[id='patDOBId_Dup']").fill(userData.age);
      await framePage.locator("[id='EmgPatDetailMod_patGenderCode']").selectOption({ value: userData.gender });      
      await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: userData.countryCode });
      await framePage.locator("[id='patAddStateCodeId']").selectOption({value: userData.StateCode});     
      await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userData.districtCode });
      // Fill other fields similarly...
      await framePage.locator("[id='submitId']").click();
      await page.pause();

    });
  }
});

