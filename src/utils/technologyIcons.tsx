import React from "react";
import {
  DiReact,
  DiJavascript1,
  DiHtml5,
  DiCss3,
  DiNodejsSmall,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiDocker,
  DiNpm,
} from "react-icons/di";
import {
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiMui,
  SiSupabase,
  SiStripe,
  SiSocketdotio,
  SiExpo,
} from "react-icons/si";
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Language as LanguageIcon,
  DeveloperMode as DeveloperModeIcon,
  CloudOutlined as CloudIcon,
  HttpOutlined as ApiIcon,
} from "@mui/icons-material";

// 技術アイコンのマッピング
export const getTechnologyIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    React: <DiReact size={20} color="#61DAFB" />,
    "Next.js": <SiNextdotjs size={18} />,
    TypeScript: <SiTypescript size={18} color="#3178C6" />,
    JavaScript: <DiJavascript1 size={20} color="#F7DF1E" />,
    HTML5: <DiHtml5 size={20} color="#E34F26" />,
    CSS3: <DiCss3 size={20} color="#1572B6" />,
    "Node.js": <DiNodejsSmall size={20} color="#339933" />,
    Express: <SiExpress size={18} />,
    PostgreSQL: <DiPostgresql size={20} color="#336791" />,
    MongoDB: <DiMongodb size={20} color="#47A248" />,
    Supabase: <SiSupabase size={18} color="#3ECF8E" />,
    "Material-UI": <SiMui size={18} color="#0081CB" />,
    "Tailwind CSS": <SiTailwindcss size={18} color="#06B6D4" />,
    Docker: <DiDocker size={20} color="#2496ED" />,
    Git: <DiGit size={20} color="#F05032" />,
    LocalStorage: <StorageIcon fontSize="small" />,
    Prisma: <CodeIcon fontSize="small" />,
    "React Native": <DiReact size={20} color="#61DAFB" />,
    Expo: <SiExpo size={18} />,
    "API Integration": <ApiIcon fontSize="small" />,
    "Socket.IO": <SiSocketdotio size={18} />,
    Stripe: <SiStripe size={18} color="#008CDD" />,
    npm: <DiNpm size={20} color="#CB3837" />,
  };

  return iconMap[tech] || <LanguageIcon fontSize="small" />;
};

// 技術カテゴリのアイコン
export const getCategoryIcon = (category: string) => {
  const categoryMap: { [key: string]: React.ReactElement } = {
    frontend: <CodeIcon />,
    backend: <DeveloperModeIcon />,
    database: <StorageIcon />,
    devops: <CloudIcon />,
    other: <LanguageIcon />,
  };

  return categoryMap[category] || <LanguageIcon />;
};
