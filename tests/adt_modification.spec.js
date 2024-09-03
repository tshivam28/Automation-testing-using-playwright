const fs = require('fs');
const { test, expect } =  require('@playwright/test');
const { allowedNodeEnvironmentFlags } = require('process');
const crNumbers = [];
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data3.json")));     
test.describe('Fill Form with JSON Data', () => {   
  for (const userData of userDataArray) {   
    test(`Fill Form with Data: ${userData.mobileNo}`, async ({ page }) => {
       await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      // Fill login details 
       await page.locator('#UserName').fill(userData.username);   
       await page.locator("[type ='password']").fill(userData.password); 
       await page.locator("[type='submit']").click();
       await page.click('a[aria-controls="A D T"]'); 
      //await page.click("[id='Patient_Registration']");
      //await framePage.locator("[id='Patient_Registration']").click();   
       const framePage2 = page.frameLocator("[id='frmMainMenu']");
       await framePage2.locator("[id='Admission_Modification']").click();
       const framePage = page.frameLocator("[id='Admission Modification_iframe']"); 
       await framePage.locator('span.btn.btn-light.input-group-append.border.align-items-center').click(); 
      //await framePage.click('.btn');   
      // await framePage.locator("[id='btn btn-light input-group-append border align-items-center']").click();  
       await framePage.locator("[id='strCrNoId']").fill("331052400013772");
       await framePage.locator('button.btn.btn-sm.btn-success').click();
       //await framePage.locator("[id='goBtnId']").click(); 
       await framePage.locator("[name='strHouseNo']").fill(userData.hosuename );                                             //house name 
       await framePage.locator("[name='strStreet']").fill(userData.street );                                                 //street
       await framePage.locator("[name='strCity']").fill(userData.city);                                                      // city  
       await framePage.locator("[name='strCityLocation']").fill(userData.location);                                          //location
       await framePage.locator("[name='strDeptCode']").selectOption({value: userData.department});  
       await page.waitForTimeout(2000);                                                                  //DEPARTMENT 
       await framePage.locator("[name='strDeptUnitCode']").selectOption({ value: userData.unit});  
       await page.waitForTimeout(2000);                            //uint
       await framePage.locator("[name='strConsultantCode']").selectOption({ value: userData.consultant });                 //consultant
       //await framePage.locator("[name='strState']").fill(userData.state);                                                    //state 
       await framePage.locator("[name='strWardCode']").selectOption({ value: userData.ward });      
       await page.waitForTimeout(2000);                          //ward  
       await framePage.locator("[name='strCountry']").selectOption({ value: userData.countryCode });   
       await page.waitForTimeout(2000);                           // country   
       await framePage.locator("[name='strMobileNo']").fill(userData.mobileNo); 
       await framePage.locator('button[name="patientAdmissionModiTransBean"].float-right.btn.btn-outline-success.mt-1.btn-circle').click();
       await page.pause(); 
    });
}
});