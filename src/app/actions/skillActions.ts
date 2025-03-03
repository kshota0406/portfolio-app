"use server";

import { revalidatePath } from "next/cache";
import { createSkill, updateSkill, deleteSkill } from "@/services/skillService";
import { Skill } from "@prisma/client";

// スキル作成アクション
export async function createSkillAction(
  data: Omit<Skill, "id">
): Promise<{ success: boolean; data?: Skill; error?: string }> {
  try {
    const skill = await createSkill(data);
    // キャッシュを更新してUIに反映
    revalidatePath("/profile");
    revalidatePath("/admin/skills");
    return { success: true, data: skill };
  } catch (error) {
    console.error("Failed to create skill:", error);
    return { success: false, error: "スキルの作成に失敗しました" };
  }
}

// スキル更新アクション
export async function updateSkillAction(
  id: string,
  data: Partial<Omit<Skill, "id">>
): Promise<{ success: boolean; data?: Skill | null; error?: string }> {
  try {
    const skill = await updateSkill(id, data);
    revalidatePath("/profile");
    revalidatePath("/admin/skills");
    return { success: true, data: skill };
  } catch (error) {
    console.error(`Failed to update skill ${id}:`, error);
    return { success: false, error: "スキルの更新に失敗しました" };
  }
}

// スキル削除アクション
export async function deleteSkillAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await deleteSkill(id);
    revalidatePath("/profile");
    revalidatePath("/admin/skills");
    return { success: result };
  } catch (error) {
    console.error(`Failed to delete skill ${id}:`, error);
    return { success: false, error: "スキルの削除に失敗しました" };
  }
}
