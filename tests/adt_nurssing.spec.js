const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');
const userDataArray = require("../testdata/data5.json");
const userData = userDataArray[0]; // Access the first object in the array
test(`Fill Form with Data: `, async ({ page }) => {
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
      const firstCheckbox = checkboxes[1];
      await firstCheckbox.check();
      const crNumber = await firstCheckbox.evaluate(node => node.closest('tr').querySelector('td:nth-child(1)').innerText); // Adjust the nth-child to the correct column number for CR number
      const checkboxValue = await firstCheckbox.getAttribute('value'); 
      console.log("Accepted CR Number: ", crNumber);
      console.log("Checkbox Value: ", checkboxValue);  
    } else {  
        console.log("No checkboxes found."); 
    } 
    const movementButton = framePage.locator('div#Movementenable > button:has-text("Movement")').nth(0); // Adjust the nth index as necessary
    const buttonEnabled = await movementButton.isEnabled();
    if (buttonEnabled) {
        console.log("Clicking the Movement button");
        await movementButton.click();
    } else { 
        console.log("Movement button is disabled!");  
    }   
   //await page.waitForTimeout(2000); 
    await framePage.locator("[name='strDepartment']").selectOption({ value: userData.changedepartment });
    await framePage.locator("[name='strUnit']").selectOption({ value: userData.changeunit });
    await page.waitForTimeout(2000); 
    await framePage.locator("[id='curWrdBedCode1']").selectOption({ value: userData.changeward });
    await framePage.locator("[name='strConsultantUnit']").selectOption({ value: userData.cunsultantunit });
    await framePage.locator("[name='strRoom']").selectOption({ value: userData.changeroom });
    await framePage.locator("[name='strRmk']").selectOption({ value: userData.adviceby });
    await framePage.locator("[name='strRsn']").fill("dcvsdvdsvv");
    const saveButton = framePage.locator('#savebutton');
    const saveButtonVisible = await saveButton.isVisible();
    if (saveButtonVisible) {
        console.log("Clicking the Save button");
        await saveButton.click();
    } else {
        console.log("Save button is not visible!");
    }
    await page.pause(); 
});
