// src/components/admin/ProfileEditClient.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Profile } from "@prisma/client";
import { updateProfileAction } from "@/app/actions/profileActions";
import ImageUploader from "@/components/ui/ImageUploader";

interface ProfileEditClientProps {
  profile: Profile | null;
}

export default function ProfileEditClient({ profile }: ProfileEditClientProps) {
  const [formData, setFormData] = useState<Partial<Profile>>(
    profile || {
      name: "",
      title: "",
      bio: "",
      email: "",
      github: "",
      linkedin: "",
      twitter: "",
      avatar: "",
    }
  );

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateProfileAction(formData);

      if (result.success) {
        setSnackbar({
          open: true,
          message: "プロフィールが更新されました",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.error || "更新に失敗しました",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("プロフィール更新中にエラーが発生しました:", error);
      setSnackbar({
        open: true,
        message: "更新中にエラーが発生しました",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" component="h1" gutterBottom>
        プロフィール編集
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* アバター画像 */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={2}
          >
            <Avatar
              src={formData.avatar || "/images/icon.png"}
              alt={formData.name || "プロフィール"}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <ImageUploader
              bucket="avatars"
              path="profile"
              onUploadComplete={handleAvatarUpload}
              label="アバター画像をアップロード"
            />
          </Grid>

          {/* 名前 */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="名前"
              fullWidth
              required
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* 肩書き */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              label="肩書き"
              fullWidth
              value={formData.title || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* 自己紹介 */}
          <Grid item xs={12}>
            <TextField
              name="bio"
              label="自己紹介"
              fullWidth
              multiline
              rows={4}
              value={formData.bio || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* メールアドレス */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="メールアドレス"
              fullWidth
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* GitHub */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="github"
              label="GitHub"
              fullWidth
              value={formData.github || ""}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername"
            />
          </Grid>

          {/* LinkedIn */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="linkedin"
              label="LinkedIn"
              fullWidth
              value={formData.linkedin || ""}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </Grid>

          {/* Twitter */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="twitter"
              label="Twitter"
              fullWidth
              value={formData.twitter || ""}
              onChange={handleInputChange}
              placeholder="https://twitter.com/yourusername"
            />
          </Grid>

          {/* 送信ボタン */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                保存
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 通知スナックバー */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
