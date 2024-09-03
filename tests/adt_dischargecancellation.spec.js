const fs = require('fs').promises;  
const { test, expect } = require('@playwright/test');
let secondValue; // Variable to store the second value
let firstValue;
test.describe.configure({ mode: 'serial' }); 
test(`Fill Form with Data: `, async ({ page }) => {  
    const userDataArray = require("../testdata/data5.json"); 
    const userData = userDataArray[0];  // Access the first object in the array
    console.log("User Data: ", userData);  // Print the entire JSON object
    await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
    await page.locator('#UserName').fill(userData.username);
    await page.locator("[type ='password']").fill(userData.password);
    await page.locator("[type='submit']").click();
    await page.click('a[aria-controls="A D T"]'); 
    const framePage2 = page.frameLocator("[id='frmMainMenu']"); 
    await framePage2.locator("[id='Nursing_Desk']").click();   
    await page.waitForTimeout(2000);
    const framePage = page.frameLocator("[id='Nursing Desk_iframe']");
    await page.waitForTimeout(5000);
    console.log("User Data Department: ", userData.department);
    await framePage.locator("[id='comboid0']").selectOption({ value: userData.department });
    await page.waitForTimeout(5000); 
    console.log("User Data Unit: ", userData.unit);
    await framePage.locator("[id='comboid1']").selectOption({ value: userData.unit });
    await page.waitForTimeout(3000);
    console.log("User Data Ward: ", userData.ward);
    await framePage.locator("[id='comboid2']").selectOption({ value: userData.ward });  
    await page.waitForTimeout(2000); 
    console.log("User Data Room: ", userData.room);
    await framePage.locator("[id='comboid3']").selectOption({ value: userData.room });
    await page.waitForTimeout(2000);
    console.log("User Data Service: ", userData.service);
    await framePage.locator("[id='comboid4']").selectOption({ value: userData.service });
    await page.waitForTimeout(2000);     
    // Selecting the checkbox in the first row  
    const checkboxes = await framePage.locator('tbody tr input[type="checkbox"]').elementHandles();
    if (checkboxes.length > 0) { 
        const firstCheckbox = checkboxes[3];
        await firstCheckbox.check();
        const crNumber = await firstCheckbox.evaluate(node => node.closest('tr').querySelector('td:nth-child(1)').innerText); // Adjust the nth-child to the correct column number for CR number
        const checkboxValue = await firstCheckbox.getAttribute('value'); 
        console.log("Accepted CR Number: ", crNumber);
        console.log("Checkbox Value: ", checkboxValue);  
        const values = checkboxValue.split('@');
        firstValue = values[0];
        secondValue = values[1];
        console.log("First Value: ", firstValue);  
        console.log("Second Value: ", secondValue);  
        // Save the values to a JSON file
        //await fs.writeFile('../testdata/values.json', JSON.stringify({ firstValue, secondValue }, null, 2));
      }  
    const closeButton = page.locator('a.tabs-close');
    const closeButtonVisible = await closeButton.isVisible();
    if (closeButtonVisible) {
        console.log("Closing the Nursing Desk tab");
        await closeButton.click();
    } else {
        console.log("Close button is not visible!");        
    }  
// });
// test('Discharge', async ({ page }) => {
//     const userDataArray = require("../testdata/data5.json");
//     const userData = userDataArray[0]; // Access the first object in the array

//     await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
//     await page.locator('#UserName').fill(userData.username);
//     await page.locator("[type ='password']").fill(userData.password);
//     await page.locator("[type='submit']").click();
//     await page.click('a[aria-controls="A D T"]'); 
    const framePage3 = page.frameLocator("[id='frmMainMenu']"); 
    await framePage3.locator("[id='Patient_Final_Discharge']").click();  
    const framePage4 = page.frameLocator("[id='Patient Final Discharge_iframe']");
    await framePage4.locator("[id='strCrNoId']").fill(firstValue); 
    const goButton = framePage4.locator('img[src="../../hisglobal/images/Go.png"]'); // Make sure we're looking in the correct frame
    await goButton.scrollIntoViewIfNeeded(); // Ensure the button is in the viewport
    const goButtonVisible = await goButton.isVisible();
    if (goButtonVisible) {
        console.log("Clicking the Go button");
        await goButton.click();
    } else {  
        console.log("Go button is not visible!");  
    } 
    await page.waitForTimeout(2000); 
    await framePage4.locator("[name='strTransferUnit']").selectOption({ value: userData.transferunit}); "[name='strDepartment']"
    await page.waitForTimeout(2000);
    await framePage4.locator("[name='strRmk']").selectOption({ value: userData.dischargeby }); 
    await framePage4.locator("[name='strRsn']").fill("hgsdcvjhds"); 
    await framePage4.locator("[name='strTreatmentResult']").selectOption({ value: userData.treatmentresult }); 
    const saveButton = page.locator('a.button span.save');
    const saveButtonVisible = await saveButton.isVisible();
    if (saveButtonVisible) {    
        console.log("Clicking the Save button");
        await saveButton.click();
    } else {     
        console.log("Save button is not visible!");
    } 
    await page.pause();     
});  
// test('Dischargecanellation', async ({ page }) => {
//     const userDataArray = require("../testdata/data5.json");
//     const userData = userDataArray[0]; // Access the first object in the array

//     await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
//     await page.locator('#UserName').fill(userData.username);
//     await page.locator("[type ='password']").fill(userData.password);
//     await page.locator("[type='submit']").click();
//     await page.click('a[aria-controls="A D T"]');  
//     const framePage5 = page.frameLocator("[id='frmMainMenu']"); 
//     await framePage5.locator("[id='Discharge_Cancellation']").click();  
//     const framePage6 = page.frameLocator("[id='Patient Final Discharge_iframe']");
//     await framePage6.locator("[name='strAdmnNo']").fill(secondValue); 
//     await framePage6.locator('a.btn.btn-sm.btn-success.go').click();
//     await page.pause();   
// });  