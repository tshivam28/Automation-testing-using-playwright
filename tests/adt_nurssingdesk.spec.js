const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');
const userDataArray = require("../testdata/data5.json");
const userData = userDataArray[0]; // Access the first object in the array 
test(`Fill Form with Data: `, async ({ page }) => {
    console.log("User Data: ", userData); // Print the entire JSON object
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
    const buttonEnabled = await framePage.locator('button[type="button"]').nth(0).isEnabled(); // Assuming it's the first button
    if (buttonEnabled) {
        console.log("Clicking the Acceptance button");
        await framePage.locator('button[type="button"]').nth(0).click(); // Click the first button
    } else {
        console.log("Acceptance button is disabled!");
    }
    console.log("Checking the radio button");
    await page.waitForTimeout(1000);
    await framePage.locator("[id='strchk2']").check();
    // Handle alert
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });
    // Trigger the alert
    await page.evaluate(() => {
        var c = confirm("Do You Want to Proceed...");
    });
    // Continue with selecting the consultant
    console.log("Selecting the consultant from the dropdown");
    await framePage.locator("[id='strConsultantCodeId2']").selectOption({ value: "331059700098" });
    // Selecting the bed from the dropdown
    console.log("Selecting the bed from the dropdown");
    await framePage.locator("[id='strbed2']").selectOption({ value: "1201^12^999120108^1^4^0" });
    console.log("Clicking the Save button");
    await framePage.locator('a.button:has-text("Save")').click();
    console.log("Form filled with data successfully");
    await page.pause();  

});
