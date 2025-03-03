// src/services/projectService.ts
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

// プロジェクト一覧の取得
export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("プロジェクトの取得に失敗しました:", error);
    return [];
  }
}

// 特定のプロジェクトの取得
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    return project;
  } catch (error) {
    console.error(`プロジェクト(ID: ${id})の取得に失敗しました:`, error);
    return null;
  }
}

// プロジェクトの作成
export async function createProject(
  data: Omit<Project, "id" | "createdAt">
): Promise<Project> {
  return await prisma.project.create({
    data,
  });
}

// プロジェクトの更新
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project | null> {
  return await prisma.project.update({
    where: { id },
    data,
  });
}

// プロジェクトの削除
export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    return false;
  }
}
