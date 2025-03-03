// src/services/profileService.ts
import { prisma } from "@/lib/prisma";
import { Profile } from "@prisma/client";

// デフォルトのプロフィールを取得
export async function getDefaultProfile(): Promise<Profile | null> {
  try {
    // ユーザーIDが'dummy-user-id'のプロフィールを取得
    // 将来的にはログインユーザーのIDに基づいて取得するよう変更可能
    const profile = await prisma.profile.findUnique({
      where: { id: "dummy-user-id" },
    });

    return profile;
  } catch (error) {
    console.error("プロフィールの取得に失敗しました:", error);
    return null;
  }
}

// プロフィールの更新
export async function updateProfile(
  data: Partial<Profile>
): Promise<Profile | null> {
  try {
    const updatedProfile = await prisma.profile.update({
      where: { id: "dummy-user-id" },
      data,
    });

    return updatedProfile;
  } catch (error) {
    console.error("プロフィールの更新に失敗しました:", error);
    return null;
  }
}
