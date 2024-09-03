const fs = require('fs');
const { test, expect } =  require('@playwright/test');

const { allowedNodeEnvironmentFlags } = require('process');
const crNumbers = [];

const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data.json")));

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
      await framePage2.locator("[id='Patient_Registration']").click();
      
      const framePage = page.frameLocator("[id='Patient Registration_iframe']");
      // Fill form fields using userData
      await framePage.locator("[name='departmentCode']").selectOption({ value: userData.departmentCode });
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
      await framePage.locator("[name='patAddStreet']").fill(userData.street);
      await framePage.locator("[name='patAddCity']").fill(userData.city);
      await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userData.districtCode });
      // Fill other fields similarly...

      await framePage.locator("[id='submitId']").click();

      //const framePage3 = page.frame("[id='Patient Registration_iframe']");
      //await framePage.locator.waitForSelector("[id='divNormalMsgId']", { state: 'visible' });
      //await framePage.waitForTimeout(2000);

      // // Check if the CR number exists after form submission

      // const crNumberElement = await framePage.locator("[id='divNormalMsgId']");
      
      // const crNumber = await crNumberElement.innerText();
      
      

      const crNumberElement = await framePage.locator('#divNormalMsgId');
      const crNumber = await crNumberElement.innerText();

      // Push the CR number into the array
      crNumbers.push(crNumber);
      //await page.pause();
    });
    }
    test.afterAll(async () => {
      // Create an object with all CR numbers
      const crData = { crNumbers: crNumbers };
      // Convert the object to JSON format
      const crDataJSON = JSON.stringify(crData, null, 2); // 2 is for indentation
  
      // Write the JSON data to a new file
      fs.writeFile('allCRNumbersData.json', crDataJSON, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('All CR numbers data have been saved!');
      });  
      });
    });
   
    test.describe.serial('serial tests', () => {
      test('serial one', async ({ page }) => { await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin")
    
      await page.locator('#UserName').fill("adm_gandhi");
      await page.locator("[type ='password']").fill("123456");
      await page.locator("[type ='submit']").click();
   
      const framePage = page.frameLocator("[id='Patient Registration_iframe']");});

      //console.log(await page.locator("[style=]") )
    });
    // test("select valuse from dropdown_visiting department", async function({page})
    // {
    
    //    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin")
    
    //    await page.locator('#UserName').fill("adm_gandhi");
    //    await page.locator("[type ='password']").fill("123456");
    //    await page.locator("[type ='submit']").click();
    
    //    const framePage = page.frameLocator("[id='Patient Registration_iframe']");
    // });





//});