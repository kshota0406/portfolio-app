'use client';

import { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Divider,
  useTheme
} from '@mui/material';
import { gsap } from 'gsap';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Project } from '@/data/dummyData';
import { getTechnologyIcon } from '@/utils/technologyIcons';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // GSAPを使用したアニメーション
  useEffect(() => {
    if (!contentRef.current) return;
    
    const elements = contentRef.current.querySelectorAll('.animate-item');
    
    gsap.fromTo(
      elements,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, [project]);

  return (
    <Box ref={contentRef}>
      {/* ヘッダー */}
      <Box className="animate-item" sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          component={Link} 
          href="/" 
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          戻る
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {project.name}
        </Typography>
        {project.featured && (
          <Chip 
            label="Featured" 
            color="secondary" 
            size="small"
            sx={{ ml: 2 }}
          />
        )}
      </Box>
      
      <Grid container spacing={3} className="animate-item">
  {project.screenshots.map((screenshot, index) => (
    <Grid item xs={12} md={index === 0 ? 12 : 6} key={index}>
      <Card>
        <CardMedia
          component="img"
          image={screenshot || '/images/placeholder.png'}
          alt={`${project.name} screenshot ${index + 1}`}
          sx={{ 
            height: index === 0 ? 500 : 300,
            objectFit: 'cover'
          }}
        />
      </Card>
    </Grid>
  ))}
</Grid>
      
      {/* プロジェクト詳細情報 */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          {/* 詳細説明 */}
          <Box className="animate-item" sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              プロジェクト詳細
            </Typography>
            <Typography variant="body1" paragraph>
              {project.longDescription || project.description}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
    {/* 技術スタック */}
<Card className="animate-item" variant="outlined" sx={{ mb: 3 }}>
  <CardContent>
    <Typography variant="h6" component="h3" gutterBottom>
      使用技術
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {project.technologies.map((tech) => (
        <Chip 
          key={tech} 
          label={tech} 
          icon={getTechnologyIcon(tech)} 
          sx={{ mb: 1 }}
        />
      ))}
    </Box>
  </CardContent>
</Card>
          
          {/* リンク情報 */}
          <Card className="animate-item" variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                プロジェクトリンク
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {project.demoLink && (
                  <Button 
                    startIcon={<LinkIcon />}
                    variant="contained"
                    color="primary"
                    fullWidth
                    component="a"
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    デモを見る
                  </Button>
                )}
                {project.githubLink && (
                  <Button 
                    startIcon={<GitHubIcon />}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    component="a"
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHubリポジトリ
                  </Button>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="caption" color="text.secondary" display="block">
                公開日: {new Date(project.createdAt).toLocaleDateString('ja-JP')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetails;