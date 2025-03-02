"use client";

import { useEffect, useState } from "react";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { Project } from "@/data/dummyData";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { useRouter } from "next/navigation";

interface ProjectClientPageProps {
  projectId: string;
  initialProject?: Project;
}

export default function ProjectClientPage({
  projectId,
  initialProject,
}: ProjectClientPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | undefined>(initialProject);

  useEffect(() => {
    // プロジェクトデータの取得シミュレーション
    const timer = setTimeout(() => {
      setLoading(false);

      // プロジェクトが見つからない場合はトップページにリダイレクト
      if (!project) {
        router.push("/");
      }
    }, 500); // 読み込み感を出すための遅延

    return () => clearTimeout(timer);
  }, [project, router]);

  // ローカルストレージからプロジェクトデータを読み込む（編集後のデータを反映するため）
  useEffect(() => {
    const storedProjects = localStorage.getItem("portfolio-projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        const updatedProject = parsedProjects.find(
          (p: Project) => p.id === projectId
        );
        if (updatedProject) {
          setProject(updatedProject);
        }
      } catch (error) {
        console.error("プロジェクトデータの読み込みに失敗しました:", error);
      }
    }
  }, [projectId]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            プロジェクトが見つかりませんでした。
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <ProjectDetails project={project} />
    </Container>
  );
}
