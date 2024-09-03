const fs = require('fs');

const { test, expect } = require('@playwright/test');

// Read JSON file

const crDataJSON = fs.readFileSync('F:/fox/newtesting/testdata/allCRNumbersDatacopy.json', 'utf8');
const crData = JSON.parse(crDataJSON);
test.describe.configure({ mode: 'serial' });
test.describe('Fill Form with JSON Data', () => {
    test.beforeEach(async ({ page }) => {   
        await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");
        await page.locator('#UserName').fill("adm_gandhi");
        await page.locator("[type='password']").fill("123456");
        await page.locator("[type='submit']").click();       
        // await page.locator("['zxc']");

        });
    for (const crNumber of crData.crNumbers) {
        // Patient Visit Test
        test(`Patient Visit: CR Number ${crNumber}`, async ({ page }) => {
            const framePage4 = page.frameLocator("[id='frmMainMenu']");
            await framePage4.locator("[id='Patient_Visit']").click();     
            const framePage5 = page.frameLocator("[id='Patient Visit_iframe']");
            await framePage5.locator("[id='btnClose']").click();
            await framePage5.locator("[name='patCrNo']").fill(crNumber);
            await framePage5.locator("[id='btnGoIDCrInput']").click();
            await framePage5.locator("[id='btnClose_portal_Popup']").click();
            await framePage5.locator("input[type='checkbox'][name='newDepartmentVisit']").check();
            await framePage5.locator("select[name='departmentCode']").selectOption({ value: "200#20011#1461#0#0##-1#" });
            await framePage5.locator("select[name='departmentUnitCode']").selectOption({ value: "200#20011#1461#0#0##-1#0#1#Family" });
           // await framePage5.locator('#btn btn-danger btn-circle').click();
            await framePage5.locator("[id='submitBothId']").click();
            await framePage5.locator("#divNormalMsgId:has-text('Patient Visit Saved Successfully')").waitFor({ state: 'visible', timeout: 10000 });          
            await framePage5.locator("id='cancelId'").click();
        });
    }
});
