// scripts/seed-database.js
const { PrismaClient } = require("@prisma/client");
const { projects, skills, profile } = require("./dummy-data.js");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("データベースのシード処理を開始します...");

    // プロジェクトデータのインポート
    console.log("プロジェクトデータを登録中...");
    for (const project of projects) {
      await prisma.project.create({
        data: {
          name: project.name,
          description: project.description,
          longDescription: project.longDescription || "",
          technologies: project.technologies,
          screenshots: project.screenshots || [],
          demoLink: project.demoLink || "",
          githubLink: project.githubLink || "",
          featured: project.featured || false,
          createdAt: new Date(project.createdAt),
          userId: "dummy-user-id", // 仮のユーザーID
        },
      });
      console.log(`プロジェクト「${project.name}」を登録しました`);
    }

    // スキルデータのインポート
    console.log("スキルデータを登録中...");
    for (const skill of skills) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          level: skill.level,
          icon: skill.icon,
          category: skill.category,
          userId: "dummy-user-id", // 仮のユーザーID
        },
      });
      console.log(`スキル「${skill.name}」を登録しました`);
    }

    // プロフィールデータのインポート
    console.log("プロフィールデータを登録中...");
    await prisma.profile.create({
      data: {
        id: "dummy-user-id", // 仮のユーザーID
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        email: profile.email,
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        twitter: profile.twitter || "",
        avatar: profile.avatar || "",
      },
    });
    console.log("プロフィールデータを登録しました");

    console.log("データベースのシード処理が完了しました！");
  } catch (error) {
    console.error("シード処理中にエラーが発生しました:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
