'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { Skill } from '@/data/dummyData';
import { getCategoryIcon, getTechnologyIcon } from '@/utils/technologyIcons';

interface TechStackIconsProps {
  skills: Skill[];
  category?: string;
}

// スキルカテゴリーの表示名
const categoryNames: { [key: string]: string } = {
  'frontend': 'フロントエンド',
  'backend': 'バックエンド',
  'database': 'データベース',
  'devops': 'DevOps',
  'other': 'その他'
};

const TechStackIcons = ({ skills, category }: TechStackIconsProps) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // フィルタリングされたスキル
  const filteredSkills = category 
    ? skills.filter(skill => skill.category === category)
    : skills;

  // スキルをカテゴリーごとにグループ化
  const groupedSkills = filteredSkills.reduce<{ [key: string]: Skill[] }>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // アイコングリッドのアニメーション
  useEffect(() => {
    if (!containerRef.current) return;
    
    const icons = containerRef.current.querySelectorAll('.skill-icon');
    
    gsap.fromTo(
      icons,
      { 
        scale: 0.8,
        opacity: 0,
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }
    );
  }, [category]);

  return (
    <Box ref={containerRef} sx={{ mt: 4 }}>
      {Object.entries(groupedSkills).map(([categoryKey, categorySkills]) => (
        <Box key={categoryKey} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 1 }}>
              {getCategoryIcon(categoryKey)}
            </Box>
            <Typography variant="h6" component="h3">
              {categoryNames[categoryKey] || categoryKey}
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {categorySkills.map((skill) => (
              <Grid item key={skill.name} xs={6} sm={4} md={3} lg={2}>
                <Paper
                  className="skill-icon"
                  sx={{ 
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    opacity: 0,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? `rgba(${skill.level * 0.7 + 50}, 100, 255, ${skill.level * 0.005})`
                      : `rgba(63, 81, 181, ${skill.level * 0.005})`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box sx={{ fontSize: 40, mb: 1, height: 50, display: 'flex', alignItems: 'center' }}>
                    {getTechnologyIcon(skill.name)}
                  </Box>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    {skill.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{
                      display: 'inline-block',
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.05)',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      mt: 'auto'
                    }}
                  >
                    {skill.level}%
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TechStackIcons;