// scripts/export-dummy-data.js
const fs = require("fs");
const path = require("path");

// ダミーデータファイルを読み込む
const dummyDataPath = path.join(__dirname, "../src/data/dummyData.ts");
const content = fs.readFileSync(dummyDataPath, "utf8");

// プロジェクトの抽出
const projectsMatch = content.match(
  /export const projects[^=]+=\s*(\[[\s\S]*?\n\];)/
);
const projectsStr = projectsMatch
  ? projectsMatch[1].replace(/export interface [^{]*{[^}]*}/g, "")
  : "[]";

// スキルの抽出
const skillsMatch = content.match(
  /export const skills[^=]+=\s*(\[[\s\S]*?\n\];)/
);
const skillsStr = skillsMatch ? skillsMatch[1] : "[]";

// プロフィールの抽出
const profileMatch = content.match(
  /export const profile[^=]+=\s*({[\s\S]*?\n};)/
);
const profileStr = profileMatch ? profileMatch[1] : "{}";

// JavaScriptファイルとして出力
const outputContent = `
// このファイルは自動生成されています
const projects = ${projectsStr}

const skills = ${skillsStr}

const profile = ${profileStr}

module.exports = { projects, skills, profile };
`;

const outputPath = path.join(__dirname, "dummy-data.js");
fs.writeFileSync(outputPath, outputContent);

console.log(`ダミーデータをJavaScriptとして出力しました: ${outputPath}`);
