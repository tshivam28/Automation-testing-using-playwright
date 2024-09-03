
// const { test, expect } = require('@playwright/test');
// //const { allowedNodeEnvironmentFlags } = require('process');

// test.describe('Automate Form Filling', () => {
//     const userData = [
//         {
//             "username": "adm_gandhi",
//             "password": "123456",
//             "departmentCode": "214",
//             "primaryCatCode": "75",
//             "firstName": "Shivmfsdsf",
//             "middleName": "Kumar",
//             "guardianName": "Kumssar",
//             "age": "25",
//             "gender": "F",
//             "lastName": "Tiwari",
//             "birthPlace": "jaunpur",
//             "mobileNo": "8965664471",
//             "countryCode": "IND",
//             "street": "jhsdjga",
//             "city": "fsdfsdf",
//             "districtCode": "536" 
//         },
//         {
//             "username": "adm_gandhi",
//             "password": "123456",
//             "departmentCode": "214",
//             "primaryCatCode": "75",
//             "firstName": "Shivdsfmfsf",
//             "middleName": "Kumar",
//             "guardianName": "Kumssar",
//             "age": "25",
//             "gender": "F",
//             "lastName": "Tiwari",
//             "birthPlace": "jaunpur",
//             "mobileNo": "8965467471",
//             "countryCode": "IND",
//             "street": "jhsdjga",
//             "city": "fsdfsdf",
//             "districtCode": "536"
//         },
//         // Add more data as needed
//     ];
//     test('Fill Form with JSON Data', async ({ page }) => {
//         async function fillForm(userData) {
//             await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
//             // Fill login details
//             await page.locator('#UserName').fill(userData.username);
//             await page.locator("[type ='password']").fill(userData.password);
//             await page.locator("[type='submit']").click();
//             const framePage = page.frameLocator("[id='Patient Registration_iframe']");
//             // Fill form fields using userData
//             await framePage.locator("[name='departmentCode']").selectOption({ value: userData.departmentCode });
//             await framePage.locator("[id='patPrimaryCatCodeId']").selectOption({ value: userData.primaryCatCode });
//             await framePage.locator("[name='patFirstName']").fill(userData.firstName);
//             await framePage.locator("[name='patMiddleName']").fill(userData.middleName);
//             await framePage.locator("[id='patGuardianName']").fill(userData.guardianName);
//             await framePage.locator("[id='patAgeId']").fill(userData.age);
//             await framePage.locator("[id='patGenderCodeId']").selectOption({ value: userData.gender });
//             await framePage.locator("[name='patLastName']").fill(userData.lastName);
//             await framePage.locator("[name='patBirthPlace']").fill(userData.birthPlace);
//             await framePage.locator("[name='patAddMobileNo']").fill(userData.mobileNo);
//             await framePage.locator("[id='patAddCountryCodeId']").selectOption({ value: userData.countryCode });
//             await framePage.locator("[name='patAddStreet']").fill(userData.street);
//             await framePage.locator("[name='patAddCity']").fill(userData.city);
//             await framePage.locator("[id='patAddDistrictCodeId']").selectOption({ value: userData.districtCode });
//             // Fill other fields similarly...
//             await framePage.locator("[id='submitId']").click();
//             await page.waitForNavigation();
//         }
//         for (const data of userData) {
//             await fillForm(data);
//             // Add any assertions or validation here if needed
//         }
//     });
// });
// // Run the test
// (async () => {

//     const result = await test.run();
//     console.log(result);
// })();
