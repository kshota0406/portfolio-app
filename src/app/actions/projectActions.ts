// src/app/actions/projectActions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/services/projectService";
import { Project } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

// 型定義
type ProjectInput = Omit<Project, "id" | "createdAt"> & {
  id?: string;
};

// 認証チェック関数
async function checkAuth() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("認証されていません。ログインしてください。");
  }
  return userId;
}

// プロジェクト作成アクション
export async function createProjectAction(data: ProjectInput) {
  try {
    // 認証チェック
    const userId = await checkAuth();

    // createdAtフィールドを現在の日時で設定
    const newProject = await createProject({
      ...data,
      userId, // 認証されたユーザーIDを使用
    });

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${newProject.id}`);

    return { success: true, data: newProject };
  } catch (error: any) {
    console.error("プロジェクト作成中にエラーが発生しました:", error);
    return {
      success: false,
      error: error.message || "保存に失敗しました。もう一度お試しください。",
    };
  }
}

// プロジェクト更新アクション
export async function updateProjectAction(
  id: string,
  data: Partial<ProjectInput>
) {
  try {
    // 認証チェック
    await checkAuth();

    const updatedProject = await updateProject(id, data);

    if (!updatedProject) {
      return { success: false, error: "プロジェクトが見つかりませんでした。" };
    }

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${id}`);

    return { success: true, data: updatedProject };
  } catch (error: any) {
    console.error(
      `プロジェクト(ID: ${id})の更新中にエラーが発生しました:`,
      error
    );
    return {
      success: false,
      error: error.message || "更新に失敗しました。もう一度お試しください。",
    };
  }
}

// プロジェクト削除アクション
export async function deleteProjectAction(id: string) {
  try {
    // 認証チェック
    await checkAuth();

    const result = await deleteProject(id);

    if (!result) {
      return { success: false, error: "プロジェクトが見つかりませんでした。" };
    }

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (error: any) {
    console.error(
      `プロジェクト(ID: ${id})の削除中にエラーが発生しました:`,
      error
    );
    return {
      success: false,
      error: error.message || "削除に失敗しました。もう一度お試しください。",
    };
  }
}
