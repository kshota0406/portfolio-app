// src/app/actions/profileActions.ts
"use server";

import { revalidatePath } from "next/cache";
import { updateProfile } from "@/services/profileService";
import { Profile } from "@prisma/client";

// プロフィール更新アクション
export async function updateProfileAction(data: Partial<Profile>) {
  try {
    const updatedProfile = await updateProfile(data);

    if (!updatedProfile) {
      return { success: false, error: "プロフィールが見つかりませんでした。" };
    }

    // キャッシュを再検証
    revalidatePath("/profile");
    revalidatePath("/admin/profile");

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("プロフィール更新中にエラーが発生しました:", error);
    return {
      success: false,
      error: "更新に失敗しました。もう一度お試しください。",
    };
  }
}
