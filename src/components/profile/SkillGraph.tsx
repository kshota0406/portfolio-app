'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { gsap } from 'gsap';
import { Skill } from '@/data/dummyData';
import { getCategoryIcon } from '@/utils/technologyIcons';

interface SkillGraphProps {
  skills: Skill[];
  category?: string;
}

// カスタムツールチップコンポーネント
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          p: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">
          <strong>{payload[0].payload.name}</strong>: {payload[0].value}%
        </Typography>
      </Box>
    );
  }

  return null;
};

const SkillGraph = ({ skills, category }: SkillGraphProps) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  // フィルタリングされたスキル
  const filteredSkills = category 
    ? skills.filter(skill => skill.category === category)
    : skills;
  
  // スキルを降順でソート
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);

  // グラフのアニメーション
  useEffect(() => {
    if (!chartRef.current) return;
    
    gsap.fromTo(
      chartRef.current,
      { 
        opacity: 0,
        y: 50 
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out" 
      }
    );
  }, [category]);

  return (
    <Box ref={chartRef} sx={{ width: '100%', height: 400, opacity: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sortedSkills}
          margin={{
            top: 20,
            right: 30,
            left: 80,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            tickCount={6} 
            stroke={theme.palette.text.secondary}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            scale="band" 
            stroke={theme.palette.text.secondary}
            tickFormatter={(value) => {
              return value.length > 12 ? `${value.substring(0, 12)}...` : value;
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="level" 
            fill={theme.palette.primary.main} 
            barSize={20} 
            radius={[0, 4, 4, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SkillGraph;