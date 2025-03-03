// src/components/ui/ImageUploader.tsx
"use client";

import { useState, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadFile } from "@/lib/supabaseStorage";

interface ImageUploaderProps {
  bucket: string;
  path: string;
  onUploadComplete: (url: string) => void;
  label?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

export default function ImageUploader({
  bucket,
  path,
  onUploadComplete,
  label = "アップロード",
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handleFileSelect 関数を修正
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // ファイルサイズのチェック
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`ファイルサイズは${maxFileSizeMB}MB以下にしてください`);
      return;
    }

    // プレビュー表示
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // アップロード処理
    setIsUploading(true);
    setError(null);

    try {
      console.log("アップロード処理開始:", {
        bucket,
        path,
        fileName: file.name,
      });

      // ファイル名からサポートされていない文字を削除
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const safeFile = new File([file], safeFileName, { type: file.type });

      const uploadedUrl = await uploadFile(bucket, path, safeFile);

      if (uploadedUrl) {
        console.log("アップロード成功:", uploadedUrl);
        onUploadComplete(uploadedUrl);
      } else {
        console.error("アップロードに失敗しました");
        setError(
          "アップロードに失敗しました。ネットワーク接続とアクセス権限を確認してください。"
        );
      }
    } catch (err) {
      console.error("ファイルアップロード中にエラーが発生しました:", err);
      setError("ファイルのアップロード中にエラーが発生しました");
    } finally {
      setIsUploading(false);
    }
  };
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFileTypes}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {previewUrl ? (
        <Card sx={{ maxWidth: 345, mb: 2 }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="200"
              image={previewUrl}
              alt="アップロードプレビュー"
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
              onClick={handleRemovePreview}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ) : (
        <Button
          variant="outlined"
          startIcon={
            isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
          }
          onClick={handleBrowseClick}
          disabled={isUploading}
          sx={{ mb: 2 }}
        >
          {isUploading ? "アップロード中..." : label}
        </Button>
      )}

      <Typography variant="caption" color="text.secondary" display="block">
        {acceptedFileTypes.replace("*", "").replace("/", "")}形式、最大
        {maxFileSizeMB}MBまで
      </Typography>
    </Box>
  );
}
