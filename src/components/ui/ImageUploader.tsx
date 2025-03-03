// src/components/ui/ImageUploader.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
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
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  // 認証状態チェック
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setError("ログインが必要です。ログインしてください。");
    } else {
      setError(null);
    }
  }, [isSignedIn, isLoaded]);

  // ファイル選択ハンドラ
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 認証チェック
    if (!isSignedIn) {
      setError("ログインが必要です。ログインしてください。");
      router.push("/sign-in");
      return;
    }

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
      // FormDataの作成
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("path", path);

      // APIエンドポイントにアップロード - 認証情報を含める
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include", // 認証Cookieを含める
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setError(
            "ログインセッションが切れました。再度ログインしてください。"
          );
          router.push("/sign-in");
          return;
        }
        throw new Error(errorData.error || "アップロードに失敗しました");
      }

      const data = await response.json();

      if (data.url) {
        console.log("アップロード成功:", data.url);
        onUploadComplete(data.url);
      } else {
        throw new Error("URLが返されませんでした");
      }
    } catch (err: any) {
      console.error("ファイルアップロード中にエラーが発生しました:", err);
      setError(err.message || "ファイルのアップロード中にエラーが発生しました");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    if (!isSignedIn) {
      setError("ログインが必要です。ログインしてください。");
      router.push("/sign-in");
      return;
    }

    fileInputRef.current?.click();
  };

  const handleRemovePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2">認証情報を確認中...</Typography>
      </Box>
    );
  }

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
          disabled={isUploading || !isSignedIn}
          sx={{ mb: 2 }}
        >
          {isUploading
            ? "アップロード中..."
            : !isSignedIn
            ? "ログインが必要です"
            : label}
        </Button>
      )}

      <Typography variant="caption" color="text.secondary" display="block">
        {acceptedFileTypes.replace("*", "").replace("/", "")}形式、最大
        {maxFileSizeMB}MBまで{!isSignedIn && " (ログインが必要です)"}
      </Typography>
    </Box>
  );
}
