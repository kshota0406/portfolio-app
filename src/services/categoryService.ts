// src/services/categoryService.ts
import { prisma } from "@/lib/prisma";
import { technologyCategories } from "@/data/dummyData";

// プロジェクトから一意の技術リストを取得
export async function getAllTechnologies(): Promise<string[]> {
  try {
    const projects = await prisma.project.findMany({
      select: {
        technologies: true,
      },
    });

    // 配列をフラット化して一意の技術名を取得
    const allTechnologies = projects.flatMap((project) => project.technologies);
    const uniqueTechnologies = [...new Set(allTechnologies)];

    return uniqueTechnologies.sort();
  } catch (error) {
    console.error("技術カテゴリーの取得に失敗しました:", error);
    // エラーが発生した場合はダミーデータを返す
    return technologyCategories;
  }
}
