// src/components/home/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Fade,
} from "@mui/material";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@prisma/client";

interface HomeClientProps {
  initialProjects: Project[];
  technologies: string[];
}

export default function HomeClient({
  initialProjects = [],
  technologies = [],
}: HomeClientProps) {
  // 選択された技術カテゴリー
  const [selectedTechnology, setSelectedTechnology] = useState<string>("");
  // フィルタリングされたプロジェクトリスト
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects);

  // 技術カテゴリーの選択変更ハンドラ
  const handleTechnologyChange = (event: SelectChangeEvent) => {
    setSelectedTechnology(event.target.value);
  };

  // 選択された技術カテゴリーでプロジェクトをフィルタリング
  useEffect(() => {
    if (!selectedTechnology) {
      setFilteredProjects(initialProjects);
    } else {
      const filtered = initialProjects.filter(
        (project) =>
          project.technologies &&
          project.technologies.includes(selectedTechnology)
      );
      setFilteredProjects(filtered);
    }
  }, [selectedTechnology, initialProjects]);

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={1000}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            プロジェクト ポートフォリオ
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            これまでに手がけた主要なプロジェクトをご紹介します。各プロジェクトの詳細ページでより詳しい情報をご覧いただけます。
          </Typography>
        </Box>
      </Fade>

      {/* 技術カテゴリーフィルター */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="technology-filter-label">技術でフィルター</InputLabel>
          <Select
            labelId="technology-filter-label"
            id="technology-filter"
            value={selectedTechnology}
            label="技術でフィルター"
            onChange={handleTechnologyChange}
          >
            <MenuItem value="">
              <em>すべて表示</em>
            </MenuItem>
            {technologies.map((tech) => (
              <MenuItem key={tech} value={tech}>
                {tech}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* フィーチャードプロジェクト（注目のプロジェクト） */}
      {selectedTechnology === "" && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            注目のプロジェクト
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {initialProjects
              .filter((project) => project.featured)
              .map((project, index) => (
                <Grid item key={project.id} xs={12} sm={6} md={6}>
                  <ProjectCard project={project} index={index} />
                </Grid>
              ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {/* すべてのプロジェクト */}
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedTechnology
          ? `${selectedTechnology} プロジェクト`
          : "すべてのプロジェクト"}
      </Typography>

      {filteredProjects.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProjects.map((project, index) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ py: 4, textAlign: "center" }}
        >
          選択された技術を使用したプロジェクトは見つかりませんでした。
        </Typography>
      )}
    </Container>
  );
}
