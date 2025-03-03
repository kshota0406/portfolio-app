// scripts/inspect-project-data.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // 1件のプロジェクトを取得して詳細に表示
    const project = await prisma.project.findFirst();

    if (project) {
      console.log("プロジェクトデータの詳細:");
      console.log(JSON.stringify(project, null, 2));

      // データの型を確認
      console.log("\nデータ型の確認:");
      Object.entries(project).forEach(([key, value]) => {
        console.log(
          `${key}: ${typeof value} ${Array.isArray(value) ? "(配列)" : ""}`
        );
      });

      // technologies フィールドが配列であることを確認
      if (project.technologies) {
        console.log("\ntechnologies の内容:");
        project.technologies.forEach((tech, index) => {
          console.log(`[${index}] ${tech} (${typeof tech})`);
        });
      }

      // screenshots フィールドが配列であることを確認
      if (project.screenshots) {
        console.log("\nscreenshots の内容:");
        project.screenshots.forEach((screenshot, index) => {
          console.log(`[${index}] ${screenshot}`);
        });
      }
    } else {
      console.log("プロジェクトが見つかりませんでした。");
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
