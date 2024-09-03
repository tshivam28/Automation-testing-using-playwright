

const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');

const crNumbers = [];
const userDataArray = JSON.parse(JSON.stringify(require("../testdata/data.json")));

test(`Fill Form with Data: `, async ({ page }) => {
        await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
        // Add any other setup code you may need

        await page.locator('#UserName').fill("adm_gandhi");

        await page.locator("[type ='password']").fill("123456");
        
        await page.locator("[type='submit']").click();

        const framePage2 = page.frameLocator("[id='frmMainMenu']");

        await framePage2.locator("[id='Patient_Registration']").click();



      const framePage = page.frameLocator("[id='Patient Registration_iframe']");

      // Fill form fields using userDataArray
      
      await framePage.locator("[name='patFirstName']").fill(userDataArray.firstName);

      await framePage.locator("[id='patAgeId']").fill(userDataArray.age);

      await framePage.locator("[name='departmentCode']").selectOption({ value: userDataArray.departmentCode });

      await framePage.locator("[name='departmentCode']").selectOption({ value: userDataArray.departmentCode });
      await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: userDataArray.primaryCatCode });
      await framePage.locator("[name='patFirstName']").fill(userDataArray.firstName);
      await framePage.locator("[name='patMiddleName']").fill(userDataArray.middleName);
      await framePage.locator("[id='patGuardianName']").fill(userDataArray.guardianName);
      await framePage.locator("[id='patAgeId']").fill(userDataArray.age);
      await framePage.locator("[id='patGenderCodeId']").selectOption({ value: userDataArray.gender });
      await framePage.locator("[name='patLastName']").fill(userDataArray.lastName);
      await framePage.locator("[name='patBirthPlace']").fill(userDataArray.birthPlace);
      await framePage.locator("[name='patAddMobileNo']").fill(userDataArray.mobileNo);
      await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: userDataArray.countryCode });
      await framePage.locator("[name='patAddStreet']").fill(userDataArray.street);
      await framePage.locator("[name='patAddCity']").fill(userDataArray.city);
      await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userDataArray.districtCode });
      await framePage.locator("[id='submitId']").click();


      // Wait for the CR number element to appear
      await framePage.locator("[id='divNormalMsgId']").waitFor({ state: 'visible', timeout: 10000 });

      const crNumberElement = await framePage.locator('#divNormalMsgId');
      const crNumber = await crNumberElement.innerText();

      // Push the CR number into the array
      crNumbers.push(crNumber);
      await page.pause();
    });


  test.afterAll(async () => {
    const crData = { crNumbers: crNumbers };
    const crDataJSON = JSON.stringify(crData, null, 2);

    try {
      await fs.writeFile('allCRNumbersData.json', crDataJSON, 'utf8');
      console.log('All CR numbers data have been saved!');
    } catch (err) {

      console.error('Error writing file:', err);
    }
  });

