// src/services/skillService.ts
import { prisma } from "@/lib/prisma";
import { Skill } from "@prisma/client";

// すべてのスキルを取得
export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { level: "desc" }],
    });

    return skills;
  } catch (error) {
    console.error("スキルの取得に失敗しました:", error);
    return [];
  }
}

// カテゴリー別のスキルを取得
export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: { category },
      orderBy: { level: "desc" },
    });

    return skills;
  } catch (error) {
    console.error(
      `カテゴリー「${category}」のスキル取得に失敗しました:`,
      error
    );
    return [];
  }
}
