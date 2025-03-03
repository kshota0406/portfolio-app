// src/app/projects/[id]/page.tsx
import { getProjectById } from "@/services/projectService";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "@/components/projects/ProjectDetails";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // データベースからプロジェクト情報を取得
  const project = await getProjectById(params.id);

  // プロジェクトが見つからない場合は404ページを表示
  if (!project) {
    notFound();
  }

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
      <ProjectDetailsClient project={project} />
    </Suspense>
  );
}
