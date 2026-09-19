import { execSync } from 'child_process';
import fs from 'fs';

try {
  const out = execSync('npx eslint . --format json', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const data = JSON.parse(out);
  const counts = {};
  for (const file of data) {
    for (const msg of file.messages) {
      counts[msg.ruleId] = (counts[msg.ruleId] || 0) + 1;
    }
  }
  console.log('RULE_COUNTS:', JSON.stringify(counts));
} catch (e) {
  if (e.stdout) {
    try {
      const data = JSON.parse(e.stdout.toString());
      const counts = {};
      for (const file of data) {
        for (const msg of file.messages) {
          counts[msg.ruleId] = (counts[msg.ruleId] || 0) + 1;
        }
      }
      console.log('RULE_COUNTS:', JSON.stringify(counts));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.error(e);
  }
}
