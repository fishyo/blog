#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// 获取已修改的 Markdown 文件
const modifiedFiles = execSync('git diff --cached --name-only --diff-filter=M')
  .toString()
  .split('\n')
  .filter(file => file.endsWith('.md') && file.includes('src/content/blog/'));

modifiedFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否已经有 modDatetime
  if (content.includes('modDatetime:')) {
    // 更新现有的 modDatetime
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, '.000+08:00');
    const updatedContent = content.replace(
      /modDatetime:.*(\r?\n)/,
      `modDatetime: ${now}$1`
    );
    fs.writeFileSync(file, updatedContent);
    execSync(`git add "${file}"`);
  }
});
