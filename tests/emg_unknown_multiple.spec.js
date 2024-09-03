const fs = require('fs').promises;
const { test, expect } = require('@playwright/test'); 
const userData = JSON.parse(JSON.stringify(require("../testdata/data1.json")))[0];  
 // Use the first set of data
test.describe.configure({ mode: 'serial' });
test.describe('test suite emergency Registration ', () => {      
  let crNumber1;   
   // Variable to store the CR number  
  test.beforeEach(async ({ page }) => {  
    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
    await page.locator('#UserName').fill("adm_gandhi");
    await page.locator("[type ='password']").fill("123456");
    await page.locator("[type='submit']").click();  
  }); 
  test.afterEach(async ({ page }) => {  
    await page.waitForTimeout(1000);
  }); 
  test('unknown', async ({ page }) => {     
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
    await registrationFrame.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 10000 });  
    const crNumberElement = await registrationFrame.locator('#divNormalMsgId');
    crNumber1 = await crNumberElement.innerText();    
    const numericCRNumber = crNumber1.replace(/\D/g, '' );    
    const crData1 = { crNumbers: [numericCRNumber] };
    const crDataJSON1 = JSON.stringify(crData1, null, 2); 
    try {
      await fs.writeFile('numericCRNumberData.json', crDataJSON1, 'utf8');
      console.log('Numeric CR number has been saved!');
    } catch (err) {  
      console.error('Error writing file:', err); 
    }  
    await registrationFrame.locator("#divNormalMsgId:has-text('Patient Registered with CR No')").waitFor({ state: 'visible', timeout: 10000 });
    //await browser.close();
    //registration page cancel 
    //await framePage.locator("[id='cancelid']").click();
    //  await browser.close();
    //await printPreviewWindow.close();
  }); 
  test(`known: `, async ({ page }) => {
    let crNumber_re;
    const crDataJSON_re = await fs.readFile('numericCRNumberData.json', 'utf8');
    const crData_re = JSON.parse(crDataJSON_re);  
    crNumber_re = crData_re.crNumbers[0];     
    const emergencyRegistrationFrame = page.frameLocator("[id='frmMainMenu']");  
    await emergencyRegistrationFrame.locator("[id='Unknown_To_Known_Conversion']").click();  
    const unknownToKnownFrame = page.frameLocator("[id='Unknown To Known Conversion_iframe']");   
    await unknownToKnownFrame.locator("[id='btnClose']").click();  
    await unknownToKnownFrame.locator("[name='patCrNo']").fill(crNumber_re);  
    await unknownToKnownFrame.locator("[id='btnGoIDCrInput']").click(); 
      // await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 20000 });      
    await unknownToKnownFrame.locator("#divNormalMsgId:has-text('Patient Visit Saved Successfully')").waitFor({ state: 'visible', timeout: 10000 });
    // await framePage5.locator("[id='clearId']").click();
    //await framePage5.locator("[id='cancelId']").click();
    });
});