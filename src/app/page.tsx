// src/app/page.tsx
import { Suspense } from "react";
import { getProjects } from "@/services/projectService";
import { getAllTechnologies } from "@/services/categoryService";
import { Box, CircularProgress } from "@mui/material";
import HomeClient from "@/components/home/HomeClient";
import { technologyCategories } from "@/data/dummyData";

export default async function HomePage() {
  try {
    // サーバーサイドでデータベースからプロジェクト情報を取得
    const projects = await getProjects();

    // 技術カテゴリー一覧を取得
    const technologies = await getAllTechnologies();

    return (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <HomeClient initialProjects={projects} technologies={technologies} />
      </Suspense>
    );
  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    // エラーが発生した場合はバックアップとしてダミーデータを使用
    return (
      <HomeClient initialProjects={[]} technologies={technologyCategories} />
    );
  }
}
