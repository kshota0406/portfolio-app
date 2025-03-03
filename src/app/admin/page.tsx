// src/app/admin/page.tsx
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
} from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AdminPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        管理ダッシュボード
      </Typography>

      <Typography paragraph color="text.secondary">
        プロジェクトやプロフィールの管理が行えます。
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea
              component={Link}
              href="/admin/projects"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                }}
              >
                <EditIcon sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  プロジェクト管理
                </Typography>
                <Typography color="text.secondary">
                  プロジェクトの追加・編集・削除
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea
              component={Link}
              href="/admin/profile"
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                }}
              >
                <AccountCircleIcon
                  sx={{ fontSize: 60, mb: 2, color: "primary.main" }}
                />
                <Typography variant="h5" component="h2" gutterBottom>
                  プロフィール編集
                </Typography>
                <Typography color="text.secondary">
                  プロフィール情報の更新
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
