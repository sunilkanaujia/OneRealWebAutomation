import * as fs from 'fs';
import * as path from 'path';

export interface SignUpTestData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  testCase: string;
}

export class TestDataReader {
  static readSignUpTestData(): SignUpTestData[] {
    const csvFilePath = path.join(__dirname, '../test-data/signupTestData.csv');
    
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSV file not found at ${csvFilePath}`);
    }

    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 2) {
      throw new Error('CSV file must have header and at least one data row');
    }

    const headers = lines[0].split(',').map((h: string) => h.trim());
    const data: SignUpTestData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v: string) => v.trim());
      const row: any = {};
      
      headers.forEach((header: string, index: number) => {
        row[header] = values[index];
      });

      data.push({
        firstName: row.firstName,
        lastName: row.lastName,
        username: row.username,
        email: row.email,
        password: row.password,
        testCase: row.testCase,
      });
    }

    return data;
  }
}
