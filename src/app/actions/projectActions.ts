// src/app/actions/projectActions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/services/projectService";
import { Project } from "@prisma/client";

// 型定義
type ProjectInput = Omit<Project, "id" | "createdAt"> & {
  id?: string;
};

// プロジェクト作成アクション
export async function createProjectAction(data: ProjectInput) {
  try {
    // createdAtフィールドを現在の日時で設定
    const newProject = await createProject({
      ...data,
      userId: "dummy-user-id", // 将来的には認証されたユーザーIDを使用
    });

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${newProject.id}`);

    return { success: true, data: newProject };
  } catch (error) {
    console.error("プロジェクト作成中にエラーが発生しました:", error);
    return {
      success: false,
      error: "保存に失敗しました。もう一度お試しください。",
    };
  }
}

// プロジェクト更新アクション
export async function updateProjectAction(
  id: string,
  data: Partial<ProjectInput>
) {
  try {
    const updatedProject = await updateProject(id, data);

    if (!updatedProject) {
      return { success: false, error: "プロジェクトが見つかりませんでした。" };
    }

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${id}`);

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error(
      `プロジェクト(ID: ${id})の更新中にエラーが発生しました:`,
      error
    );
    return {
      success: false,
      error: "更新に失敗しました。もう一度お試しください。",
    };
  }
}

// プロジェクト削除アクション
export async function deleteProjectAction(id: string) {
  try {
    const result = await deleteProject(id);

    if (!result) {
      return { success: false, error: "プロジェクトが見つかりませんでした。" };
    }

    // キャッシュを再検証してUIを更新
    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (error) {
    console.error(
      `プロジェクト(ID: ${id})の削除中にエラーが発生しました:`,
      error
    );
    return {
      success: false,
      error: "削除に失敗しました。もう一度お試しください。",
    };
  }
}
