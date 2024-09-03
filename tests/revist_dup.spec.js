const fs = require('fs').promises;
const { test, expect } = require('@playwright/test');

    const crDataJSON = await fs.readFile('numericCRNumberData.json', 'utf8');

    const crData = JSON.parse(crDataJSON);
    test.describe.configure({ mode: 'serial' });
    test.describe('Fill Form with JSON Data', () => {
    test.beforeEach(async ({ page }) => {      

            await page.goto("http://10.10.10.61:8081/AHIMSG5/hissso/loginLogin");

            await page.locator('#UserName').fill("adm_gandhi");
            
            await page.locator("[type='password']").fill("123456");
            await page.locator("[type='submit']").click();
            await page.locator("['zxc']");
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
                await framePage5.locator("[id='submitBothId']").click();
                //await framePage5.locator("[id='SubmmitID']").click().
                await framePage5.locator("#divNormalMsgId:has-text('Patient Visit Saved Successfully')").waitFor({ state: 'visible', timeout: 10000 });
            });
            // Duplicate Card Printing Test

            test(`Duplicate Card Printing: CR Number ${crNumber}`, async ({ page }) => {

                const framePage3 = page.frameLocator("[id='frmMainMenu']");
                await framePage3.locator("[id='Duplicate_Card_Printing']").click();

                const framePage1 = page.frameLocator("[id='Duplicate Card Printing_iframe']");
                await framePage1.locator("[id='btnClose']").click();
                await framePage1.locator("[name='patCrNo']").fill(crNumber);
                await framePage1.locator("[id='btnGoIDCrInput']").click();
                await framePage1.locator("[name='duplicateRenewRemarks']").fill("jhvdhv");
                await framePage1.locator("[id='submitId']").click();
                await framePage1.locator("[id='CancelId']");

                await page.pause();
            });
        }

        test.afterAll(async () => {
            // Perform any cleanup or finalization steps if needed
        });
    });





