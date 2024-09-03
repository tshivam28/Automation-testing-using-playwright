// const fs = require('fs').promises;
// function createUser(username, password, departmentCode, primaryCatCode, firstName, middleName, guardianName, age, gender, lastName, birthPlace, mobileNo, countryCode, street, city, districtCode) {
//     return {
//         username,
//         password,
//         departmentCode,
//         primaryCatCode,
//         firstName,
//         middleName,
//         guardianName,
//         age,
//         gender,
//         lastName,
//         birthPlace,
//         mobileNo,
//         countryCode,
//         street,
//         city,
//         districtCode
//     };
// }
// function generateRandomString(length) {
//     const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY';
//     let randomString = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         randomString += characters.charAt(randomIndex);
//     }
//     return randomString;
// }
// function generateUniqueMobileNumber(existingNumbers) {
//     let newNumber;
//     do {
//         // Generates a 10-digit number starting with 6, 7, 8, or 9
//         newNumber = '6' + Math.floor(Math.random() * 9000000000 + 1000000000).toString().substring(1);
//     } while (existingNumbers.includes(newNumber));
//     existingNumbers.push(newNumber);
//     return newNumber;
// }
// const userDataArray = [];
// const generatedMobileNumbers = [];
// for (let i = 0; i < 5; i++) {
//     const uniqueMobileNo = generateUniqueMobileNumber(generatedMobileNumbers);
//     userDataArray.push(createUser(
//         "adm_gandhi", "123456", "214", "75", generateRandomString(8), "Kumar", "Kumssar", "25", "F", "Tiwari",
//         "jaunpur", uniqueMobileNo, "IND", "jhsdjga", "fsdfsdf", "536"
//     ));
// }  
// // Print the created array
// console.log(userDataArray);
// // ... Your createUser function and userDataArray creation code ...
// // Write the userDataArray to a file named data.json
// const writeToFile = async () => {
//     try {
//         const dataJSON = JSON.stringify(userDataArray, null, 2); // 2 is for indentation
//         await fs.writeFile('data.json', dataJSON, 'utf8');
//         console.log('Data has been saved to data.json');
//     } catch (error) {
//         console.error('Error writing file:', error);
//     }
// };
// // Call the function to write data to the file
// writeToFile();
