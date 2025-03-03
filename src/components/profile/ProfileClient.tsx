"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  Fade,
  Link as MuiLink,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import type { Profile, Skill } from "@prisma/client";
import SkillGraph from "@/components/profile/SkillGraph";
import TechStackIcons from "@/components/profile/TechStackIcons";

// スキルカテゴリータブの値を定義
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`skill-tabpanel-${index}`}
      aria-labelledby={`skill-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface ProfileClientProps {
  profile: Profile | null;
  skills: Skill[];
}

export default function ProfileClient({ profile, skills }: ProfileClientProps) {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // タブの切り替え処理
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // プロフィールがない場合の表示
  if (!profile) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            プロフィール情報が見つかりません
          </Typography>
        </Box>
      </Container>
    );
  }

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
            プロフィール
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            スキルと経歴の詳細情報
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {/* プロフィール情報 */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar
                src={profile.avatar || "/images/icon.png"}
                alt={profile.name}
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="h5" component="h2" gutterBottom>
                {profile.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {profile.title}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                {profile.email && (
                  <IconButton
                    color="primary"
                    component="a"
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                  >
                    <EmailIcon />
                  </IconButton>
                )}
                {profile.github && (
                  <IconButton
                    color="primary"
                    component="a"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
                {profile.linkedin && (
                  <IconButton
                    color="primary"
                    component="a"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}
                {profile.twitter && (
                  <IconButton
                    color="primary"
                    component="a"
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconButton>
                )}
              </Box>

              <Typography variant="body1" align="left" paragraph>
                {profile.bio}
              </Typography>

              <MuiLink
                href="/files/resume.pdf"
                target="_blank"
                color="primary"
                sx={{
                  display: "inline-block",
                  mt: 2,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                履歴書をダウンロード
              </MuiLink>
            </CardContent>
          </Card>
        </Grid>

        {/* スキルと技術スタック */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                スキルと技術スタック
              </Typography>

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="スキルカテゴリー"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="すべて" />
                  <Tab label="フロントエンド" />
                  <Tab label="バックエンド" />
                  <Tab label="データベース" />
                  <Tab label="DevOps" />
                </Tabs>
              </Box>

              {/* すべてのスキル */}
              <TabPanel value={tabValue} index={0}>
                <SkillGraph skills={skills} />
                <TechStackIcons skills={skills} />
              </TabPanel>

              {/* フロントエンド */}
              <TabPanel value={tabValue} index={1}>
                <SkillGraph
                  skills={skills.filter(
                    (skill) => skill.category === "frontend"
                  )}
                />
                <TechStackIcons
                  skills={skills.filter(
                    (skill) => skill.category === "frontend"
                  )}
                />
              </TabPanel>

              {/* バックエンド */}
              <TabPanel value={tabValue} index={2}>
                <SkillGraph
                  skills={skills.filter(
                    (skill) => skill.category === "backend"
                  )}
                />
                <TechStackIcons
                  skills={skills.filter(
                    (skill) => skill.category === "backend"
                  )}
                />
              </TabPanel>

              {/* データベース */}
              <TabPanel value={tabValue} index={3}>
                <SkillGraph
                  skills={skills.filter(
                    (skill) => skill.category === "database"
                  )}
                />
                <TechStackIcons
                  skills={skills.filter(
                    (skill) => skill.category === "database"
                  )}
                />
              </TabPanel>

              {/* DevOps */}
              <TabPanel value={tabValue} index={4}>
                <SkillGraph
                  skills={skills.filter((skill) => skill.category === "devops")}
                />
                <TechStackIcons
                  skills={skills.filter((skill) => skill.category === "devops")}
                />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
