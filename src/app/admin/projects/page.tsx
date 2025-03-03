// src/app/admin/projects/page.tsx
import { Suspense } from "react";
import { getProjects } from "@/services/projectService";
import { Box, CircularProgress } from "@mui/material";
import ProjectAdminClient from "@/components/admin/ProjectAdminClient";

export default async function ProjectAdminPage() {
  // データベースからプロジェクトを取得
  const projects = await getProjects();

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
      <ProjectAdminClient initialProjects={projects} />
    </Suspense>
  );
}
