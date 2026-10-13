import fs from 'fs';
import { execSync } from 'child_process';

interface ControlledTest {
  name: string;
  fileToMutate: string;
  originalText: string;
  mutatedText: string;
  expectedResult: 'FAIL';
}

const CONTROLLED_TESTS: ControlledTest[] = [
  {
    name: '1. Duplicate BreadcrumbList',
    fileToMutate: './src/components/CityPage.tsx',
    originalText: '{JSON.stringify(defaultFaqSchema)}',
    mutatedText: '{JSON.stringify(defaultFaqSchema)}\n<script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>',
    expectedResult: 'FAIL'
  },
  {
    name: '2. Invalid Canonical Host (Insecure HTTP)',
    fileToMutate: './src/App.tsx',
    originalText: 'const canonicalUrl = `https://mavibasim.com${path}${querySuffix}`;',
    mutatedText: 'const canonicalUrl = `http://insecure-domain.com${path}${querySuffix}`;',
    expectedResult: 'FAIL'
  }
];

function runControlledFailureSuite() {
  console.log('🧪 RUNNING CONTROLLED MUTATION FAILURE TESTS...');
  console.log('Testing that validators correctly catch schema and metadata defects...\n');

  const results: any[] = [];

  for (const test of CONTROLLED_TESTS) {
    console.log(`--------------------------------------------------`);
    console.log(`Running Mutation Test: [${test.name}]`);

    const originalContent = fs.readFileSync(test.fileToMutate, 'utf-8');

    if (!originalContent.includes(test.originalText)) {
      console.log(`⚠️ Skip: original text not found in ${test.fileToMutate}`);
      continue;
    }

    // Apply mutation
    const mutatedContent = originalContent.replace(test.originalText, test.mutatedText);
    fs.writeFileSync(test.fileToMutate, mutatedContent, 'utf-8');

    let scriptFailed = false;

    try {
      execSync('npx tsx validate-city-routes.ts', { encoding: 'utf-8', stdio: 'pipe' });
    } catch {
      scriptFailed = true;
    } finally {
      // Revert mutation immediately
      fs.writeFileSync(test.fileToMutate, originalContent, 'utf-8');
    }

    const testPassed = scriptFailed === (test.expectedResult === 'FAIL');

    results.push({
      name: test.name,
      expected: test.expectedResult,
      actual: scriptFailed ? 'FAIL (Detected)' : 'PASS (Undetected - Defect)',
      status: testPassed ? '🟢 VERIFIED (Validator Caught Defect)' : '🔴 FAILED (Validator Missed Defect)'
    });

    console.log(` -> Outcome: ${scriptFailed ? 'FAIL (Caught as expected)' : 'PASS'}`);
  }

  console.log('\n==================================================');
  console.log('📊 CONTROLLED MUTATION TEST SUMMARY:');
  console.log('==================================================');
  console.table(results);
}

runControlledFailureSuite();
