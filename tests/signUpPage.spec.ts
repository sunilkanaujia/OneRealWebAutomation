import {test, expect} from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPages.ts';
import { TestDataReader, SignUpTestData } from '../utils/testDataReader';

test.describe('Agent Sign Up - Multiple Users', () => {
    const testData = TestDataReader.readSignUpTestData();

    testData.forEach((data: SignUpTestData, index: number) => {
        test(`TC${index + 1}: ${data.testCase}`, async ({page}) => {
            const signUpPage = new SignUpPage(page);
            
            console.log(`Running test case ${index + 1}: ${data.testCase}`);
            console.log(`User: ${data.firstName} ${data.lastName}, Email: ${data.email}`);
            
            await signUpPage.goto();
            
            // Fill sign up form with test data
            await signUpPage.fillSignUpForm(
                data.firstName,
                data.lastName,
                data.username,
                data.email,
                data.password
            );
            
            // Check terms and privacy
            await signUpPage.checkTermsAndConditions();
            await signUpPage.checkPrivacyPolicy();
            
            // Submit the form
            await signUpPage.submit();
            
            // Verify signup was successful (customize based on expected behavior)
            console.log(`Test case ${index + 1} completed successfully`);
        });
    });
});
