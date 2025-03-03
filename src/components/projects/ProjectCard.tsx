"use client";

import { useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { gsap } from "gsap";
import { Project } from "@prisma/client";
import { getTechnologyIcon } from "@/utils/technologyIcons";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  console.log("Project in card:", project);

  // GSAPを使用したアニメーション
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1, // カードが順番に表示される
        ease: "power3.out",
      }
    );
  }, [index]);

  return (
    <Card
      ref={cardRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: 0,
      }}
    >
      {project.screenshots && project.screenshots.length > 0 && (
        <CardMedia
          component="img"
          height="180"
          image={project.screenshots[0] || "/images/placeholder.png"}
          alt={project.name}
          sx={{
            objectFit: "cover",
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          {project.featured && (
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                mr: 1,
              }}
            />
          )}
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {project.description}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {project.technologies &&
            project.technologies
              .slice(0, 4)
              .map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  icon={getTechnologyIcon(tech)}
                  sx={{ mb: 0.5, mr: 0.5 }}
                />
              ))}
          {project.technologies && project.technologies.length > 4 && (
            <Chip
              label={`+${project.technologies.length - 4}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          href={`/projects/${project.id}`}
        >
          詳細を見る
        </Button>
        {project.demoLink && (
          <Button
            size="small"
            color="secondary"
            component="a"
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            デモを見る
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
