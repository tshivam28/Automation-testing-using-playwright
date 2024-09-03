//test for cr number store in json file 
const fs = require('fs').promises; 
// Import fs.promises for Promise-based file operations
const { test, expect } = require('@playwright/test');  
const crNumbers = [];
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data1.json")));
test.describe.configure({ mode: 'serial' });   
      test.describe('Fill Form with JSON Data', () => {
     // Create an array of promises for each test
      const testPromises = userDataArray.map(async (userData) => {
      //  const randomUsername = generateRandomString(8); // You can adjust the length as needed
      return test(`Emergency Registration : ${userData.mobileNo}`, async ({ page }) => { 
      await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
       // Fill login details
       await page.locator('#UserName').fill(userData.username);
       await page.locator("[type ='password']").fill(userData.password);
       await page.locator("[type='submit']").click();
       await page.click('a[aria-controls="Emergency"]'); 
       const framePage2 = page.frameLocator("[id='frmMainMenu']");
       await framePage2.locator("[id='Emergency_Registration']").click();  
       const framePage = page.frameLocator("[id='Emergency Registration_iframe']"); 
      //await framePage.locator("[id='btnClose_portal']").click();  
       await framePage.locator("[name='departmentUnitCode']").selectOption({ value: userData.departmentCode });         
       await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: userData.primaryCatCode });    
       await framePage.locator("[name='patFirstName']").fill(userData.firstName);  
       await framePage.locator("[name='patMiddleName']").fill(userData.middleName);
       await framePage.locator("[id='patGuardianName']").fill(userData.guardianName);
       await framePage.locator("[id='patAgeId']").fill(userData.age);      
       await framePage.locator("[id='patGenderCodeId']").selectOption({ value: userData.gender }); 
       await framePage.locator("[name='patLastName']").fill(userData.lastName);
       await framePage.locator("[name='patBirthPlace']").fill(userData.birthPlace);
       await framePage.locator("[name='patAddMobileNo']").fill(userData.mobileNo);
       await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: userData.countryCode });
       //await framePage.locator("[id='patAddStateCodeId']").selectOption({ value: userData.countryCode });
      await framePage.locator("[name='patAddStreet']").fill(userData.street);
      await framePage.locator("[name='patAddCity']").fill(userData.city);
      await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userData.districtCode });    
      await framePage.locator("[id='submitId']").click(); 
       //await page.click("[id='Patient_Registration']");
       //await framePage.locator("[id='Patient_Registration']").click();
       // Fill other fields similarly... 
      await framePage.locator("[id='submitId']").click();    
      await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 20000 });
      const crNumberElement = await framePage.locator('#divNormalMsgId');      
      const crNumber = await crNumberElement.innerText();

      // Push the CR number into the array
      crNumbers.push(crNumber);
      //await page.pause();
    });    
  });   
  test.afterEach(async ({ page }) => {
    // Wait for any pending asynchronous operations to complete before moving on to the next test
    await page.waitForTimeout(1000); // Adjust the timeout as needed
  });
  // Wait for all test promises to resolve
  test.afterAll(async () => {   
    await Promise.all(testPromises);
    // Create an object with all CR numbers
    const crData = { crNumbers: crNumbers };
    // Convert the object to JSON format
    const crDataJSON = JSON.stringify(crData, null, 2);
     // 2 is for indentation
    // Write the JSON data to a new file
    try {
      await fs.writeFile('allCRNumbersData1.json', crDataJSON, 'utf8');
      console.log('All CR numbers data have been saved!');
    } catch (err) {
      console.error('Error writing file:', err);
    }
  });
});