// src/components/admin/ProjectForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Grid,
  Chip,
  Autocomplete,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Project } from "@prisma/client";
import { technologyCategories } from "@/data/dummyData";
// インポート追加
import ImageUploader from "@/components/ui/ImageUploader";
interface ProjectFormProps {
  project?: Project | null;
  onSave: (
    project: Omit<Project, "id" | "createdAt"> & { id?: string }
  ) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<
    Omit<Project, "id" | "createdAt"> & { id?: string }
  >({
    name: "",
    description: "",
    longDescription: "",
    technologies: [],
    screenshots: [],
    demoLink: "",
    githubLink: "",
    featured: false,
    userId: "dummy-user-id", // 将来的には認証されたユーザーIDを使用
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 初期値の設定
  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        name: project.name,
        description: project.description,
        longDescription: project.longDescription || "",
        technologies: project.technologies || [],
        screenshots: project.screenshots || [],
        demoLink: project.demoLink || "",
        githubLink: project.githubLink || "",
        featured: project.featured || false,
        userId: project.userId || "dummy-user-id",
      });
    }
  }, [project]);

  // 入力フィールド変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // エラーがあれば削除
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // チェックボックス変更ハンドラ
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // 技術スタック変更ハンドラ
  const handleTechChange = (
    _event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    setFormData((prev) => ({ ...prev, technologies: newValue }));

    // エラーがあれば削除
    if (errors.technologies) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.technologies;
        return newErrors;
      });
    }
  };

  // スクリーンショットの追加
  const handleAddScreenshot = () => {
    const url = prompt("スクリーンショットのURLを入力してください:");
    if (url && url.trim()) {
      setFormData((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), url.trim()],
      }));
    }
  };

  // スクリーンショットの削除
  const handleRemoveScreenshot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "プロジェクト名は必須です";
    }

    if (!formData.description.trim()) {
      newErrors.description = "説明は必須です";
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = "少なくとも1つの技術を選択してください";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 保存処理
    onSave(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {formData.id ? "プロジェクトの編集" : "プロジェクトの新規作成"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* プロジェクト名 */}
          <Grid item xs={12}>
            <TextField
              name="name"
              label="プロジェクト名"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          {/* 説明 */}
          <Grid item xs={12}>
            <TextField
              name="description"
              label="簡単な説明"
              fullWidth
              required
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {/* 詳細説明 */}
          <Grid item xs={12}>
            <TextField
              name="longDescription"
              label="詳細な説明"
              fullWidth
              multiline
              rows={4}
              value={formData.longDescription || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* 技術スタック */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={technologyCategories}
              value={formData.technologies}
              onChange={handleTechChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="使用技術"
                  required
                  error={!!errors.technologies}
                  helperText={errors.technologies}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Grid>

          {/* デモリンク */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="demoLink"
              label="デモリンク"
              fullWidth
              value={formData.demoLink || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/demo"
            />
          </Grid>

          {/* GitHubリンク */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="githubLink"
              label="GitHubリンク"
              fullWidth
              value={formData.githubLink || ""}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername/repo"
            />
          </Grid>

          {/* スクリーンショット */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              スクリーンショット
            </Typography>
            <Box sx={{ mb: 2 }}>
              <ImageUploader
                bucket="projects"
                path={formData.id || "new-project"}
                onUploadComplete={(url) => {
                  setFormData((prev) => ({
                    ...prev,
                    screenshots: [...(prev.screenshots || []), url],
                  }));
                }}
                label="スクリーンショットをアップロード"
              />
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {formData.screenshots.map((screenshot, index) => (
                <Chip
                  key={index}
                  label={`スクリーンショット${index + 1}`}
                  onDelete={() => handleRemoveScreenshot(index)}
                />
              ))}
            </Stack>
          </Grid>

          {/* 注目プロジェクト */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="注目プロジェクトとして表示"
            />
          </Grid>

          {/* ボタン */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={onCancel}
                startIcon={<CloseIcon />}
              >
                キャンセル
              </Button>
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
    </Paper>
  );
}
