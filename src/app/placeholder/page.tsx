'use client';

import { useState } from 'react';
import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';

// ダミー画像の定義
const dummyImages = [
  { name: 'ecommerce1.jpg', text: 'Eコマースサイト', color1: '#3f51b5', color2: '#9c27b0' },
  { name: 'ecommerce2.jpg', text: 'Eコマース管理画面', color1: '#9c27b0', color2: '#3f51b5' },
  { name: 'taskapp1.jpg', text: 'タスク管理アプリ', color1: '#4caf50', color2: '#009688' },
  { name: 'taskapp2.jpg', text: 'タスク詳細画面', color1: '#009688', color2: '#4caf50' },
  { name: 'blog1.jpg', text: 'ブログサイト', color1: '#ff9800', color2: '#ffeb3b' },
  { name: 'blog2.jpg', text: 'ブログ記事ページ', color1: '#ffeb3b', color2: '#ff9800' },
  { name: 'weather1.jpg', text: '天気予報アプリ', color1: '#03a9f4', color2: '#0d47a1' },
  { name: 'weather2.jpg', text: '5日間予報画面', color1: '#0d47a1', color2: '#03a9f4' },
  { name: 'chat1.jpg', text: 'チャットアプリ', color1: '#f44336', color2: '#e91e63' },
  { name: 'chat2.jpg', text: 'グループチャット画面', color1: '#e91e63', color2: '#f44336' },
];

export default function PlaceholderPage() {
  const [message, setMessage] = useState('');

  const copyInstructions = () => {
    const instructions = `
プロジェクトでダミー画像を使用するには、以下の方法で対応できます：

1. 画像をブラウザで直接確認し、スクリーンショットを撮影してpublic/images/dummyフォルダに保存

2. 以下のようにスタイルをコンポーネントに適用して対応：

// ProjectCard.tsx など
<Box 
  sx={{ 
    height: 180, 
    background: 'linear-gradient(45deg, #3f51b5, #f50057)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    mb: 2
  }}
>
  <Typography>{project.name}</Typography>
</Box>

// スクリーンショット画像の代わりにこちらを使用
`.trim();
    
    navigator.clipboard.writeText(instructions)
      .then(() => setMessage('コピーしました！'))
      .catch(() => setMessage('コピーに失敗しました'));
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          ダミー画像プレースホルダー
        </Typography>
        <Typography paragraph>
          以下は、アプリケーションで使用できるダミー画像のプレビューです。
          スクリーンショットを撮って保存するか、グラデーションスタイルを直接コンポーネントに適用できます。
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={copyInstructions}
          sx={{ mb: 2 }}
        >
          使用方法をコピー
        </Button>
        
        {message && (
          <Typography color="primary" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}
        
        <Grid container spacing={3}>
          {dummyImages.map((img) => (
            <Grid item xs={12} sm={6} md={4} key={img.name}>
              <Paper 
                sx={{ 
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {img.name}
                </Typography>
                <Box 
                  sx={{ 
                    height: 200, 
                    background: `linear-gradient(45deg, ${img.color1}, ${img.color2})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: 1,
                    mb: 2,
                    flexGrow: 1
                  }}
                >
                  <Typography>{img.text}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  パス: /images/dummy/{img.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
          
          {/* アバタープレースホルダー */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              sx={{ 
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" gutterBottom>
                avatar-placeholder.jpg
              </Typography>
              <Box 
                sx={{ 
                  height: 200, 
                  backgroundColor: 'lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  mb: 2,
                  flexGrow: 1,
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: 'gray',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      top: 20,
                      left: 30
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: 60,
                      height: 20,
                      backgroundColor: 'white',
                      bottom: 20,
                      left: 20,
                      borderRadius: 5
                    }
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                パス: /images/avatar-placeholder.jpg
              </Typography>
            </Paper>
          </Grid>
          
          {/* 一般プレースホルダー */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              sx={{ 
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" gutterBottom>
                placeholder.jpg
              </Typography>
              <Box 
                sx={{ 
                  height: 200, 
                  background: 'linear-gradient(45deg, #9e9e9e, #616161)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  borderRadius: 1,
                  mb: 2,
                  flexGrow: 1
                }}
              >
                <Typography>イメージプレースホルダー</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                パス: /images/placeholder.jpg
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}