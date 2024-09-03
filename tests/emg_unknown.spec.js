const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');
async function readCRNumbersFromFile() {       
    try {  
    const data = await fs.readFile('allCRNumbersData.json', 'utf8');
    const crData = JSON.parse(data);
    return crData.crNumbers;
  } catch (err) {  
    console.error('Error reading file:', err);
    return [];            
  }   
}      
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
test.describe('Emergency Registration and CR Number Storage', async () => {
  for (const userData of userDataArray) {   
    test(`Emergency Registration: ${userData.mobileNo}`, async ({ page }) => {
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      await page.locator('#UserName').fill(userData.username);
      await page.locator("[type ='password']").fill(userData.password);
      await page.locator("[type='submit']").click();
      await page.click('a[aria-controls="Emergency"]');
      const emergencyRegistrationFrame = page.frameLocator("[id='frmMainMenu']");
      await emergencyRegistrationFrame.locator("[id='Emergency_Registration']").click();
      const registrationFrame = page.frameLocator("[id='Emergency Registration_iframe']");
      await registrationFrame.locator("//input[@name='isUnknown' and @type='checkbox']").check();
      await registrationFrame.locator("[id='patAgeId']").fill(userData.age);
      await registrationFrame.locator("[id='patGenderCodeId']").selectOption({ value: userData.gender });
      await registrationFrame.locator("[name='patIdMark1']").fill(userData.mark1);
      await registrationFrame.locator("[name='patIdMark2']").fill(userData.mark2);
      await registrationFrame.locator("[id='isRelativeKnownId']").selectOption({ value: userData.relative });
      await registrationFrame.locator("[name='broughtByName']").fill(userData.bname);
      await registrationFrame.locator("[id='submitId']").click();
      await registrationFrame.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 20000 });
      const crNumberElement = await registrationFrame.locator('#divNormalMsgId');
      const crNumberMessage = await crNumberElement.innerText();
      const crNumberMatch = crNumberMessage.match(/\d+/);
      if (crNumberMatch) {
        const extractedCrNumber = crNumberMatch[0];
        console.log(`Extracted CR number for ${userData.mobileNo}: ${extractedCrNumber}`);
      }
    });     
  }
});   
test.describe('Known Registration using CR Numbers', async () => {
  let crNumbers;
  test.beforeAll(async () => {
    try {
      crNumbers = await readCRNumbersFromFile();
    } catch (err) {
      console.error('Error reading CR numbers file:', err);
    }
  }); 
  for (const crNumber of crNumbers || []) {
    test(`Known Registration for CR Number: ${crNumber}`, async ({ page }) => {
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
      await page.locator('#UserName').fill(userData.username); 
      await page.locator("[type ='password']").fill(userData.password); 
      await page.locator("[type='submit']").click();
      await page.click('a[aria-controls="Emergency"]');
      const emergencyRegistrationFrame = page.frameLocator("[id='frmMainMenu']");
      await emergencyRegistrationFrame.locator("[id='Unknown_To_Known_Conversion']").click();
      const unknownToKnownFrame = page.frameLocator("[id='Unknown To Known Conversion_iframe']");   
      await unknownToKnownFrame.locator("[id='btnClose']").click();
      await unknownToKnownFrame.locator("[name='patCrNo']").fill(crNumber);
      await unknownToKnownFrame.locator("[id='btnGoIDCrInput']").click();
      // Add your logic here to update details based on the specific functionality of the application
    });
  } 
});