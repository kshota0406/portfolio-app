// src/app/not-found.tsx
import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          ページが見つかりませんでした
        </Typography>
        <Typography paragraph color="text.secondary">
          お探しのコンテンツは存在しないか、移動した可能性があります。
        </Typography>
        <Button variant="contained" component={Link} href="/">
          トップページに戻る
        </Button>
      </Box>
    </Container>
  );
}
