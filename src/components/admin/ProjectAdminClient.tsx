// src/components/admin/ProjectAdminClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "@prisma/client";
import ProjectForm from "./ProjectForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/app/actions/projectActions";

interface ProjectAdminClientProps {
  initialProjects: Project[];
}

export default function ProjectAdminClient({
  initialProjects,
}: ProjectAdminClientProps) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  // 認証状態チェック
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(
        "/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname)
      );
    }
  }, [isSignedIn, isLoaded, router]);

  // もし認証されていなければローディング表示かリダイレクト
  if (!isLoaded || !isSignedIn) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>認証情報を確認中...</Typography>
      </Box>
    );
  }
  // 新規プロジェクト作成フォームを開く
  const handleCreateNew = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  // プロジェクト編集フォームを開く
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  // 削除ダイアログを開く
  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  // フォームを閉じる
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  // 削除ダイアログを閉じる
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  // プロジェクト保存処理
  const handleSaveProject = async (
    project: Omit<Project, "id" | "createdAt"> & { id?: string }
  ) => {
    try {
      if (project.id) {
        // 既存プロジェクトの更新
        const { id, ...data } = project;
        const result = await updateProjectAction(id, data);

        if (result.success) {
          // 成功時はプロジェクト一覧を更新
          setProjects((prev) =>
            prev.map((p) => (p.id === id ? result.data! : p))
          );
          setSnackbar({
            open: true,
            message: "プロジェクトが更新されました",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: result.error || "更新に失敗しました",
            severity: "error",
          });
        }
      } else {
        // 新規プロジェクトの作成
        const result = await createProjectAction(project);

        if (result.success) {
          // 成功時はプロジェクト一覧に追加
          setProjects((prev) => [...prev, result.data!]);
          setSnackbar({
            open: true,
            message: "プロジェクトが作成されました",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: result.error || "作成に失敗しました",
            severity: "error",
          });
        }
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("プロジェクト保存中にエラーが発生しました:", error);
      setSnackbar({
        open: true,
        message: "保存中にエラーが発生しました",
        severity: "error",
      });
    }
  };

  // プロジェクト削除処理
  const handleDelete = async () => {
    if (!selectedProject) return;

    try {
      const result = await deleteProjectAction(selectedProject.id);

      if (result.success) {
        // 成功時はプロジェクト一覧から削除
        setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
        setSnackbar({
          open: true,
          message: "プロジェクトが削除されました",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.error || "削除に失敗しました",
          severity: "error",
        });
      }
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("プロジェクト削除中にエラーが発生しました:", error);
      setSnackbar({
        open: true,
        message: "削除中にエラーが発生しました",
        severity: "error",
      });
    }
  };

  // スナックバーを閉じる
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2">
          プロジェクト管理
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          新規プロジェクト
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>プロジェクト名</TableCell>
              <TableCell>説明</TableCell>
              <TableCell>技術</TableCell>
              <TableCell align="center">注目</TableCell>
              <TableCell align="right">アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {project.technologies &&
                      project.technologies
                        .slice(0, 3)
                        .map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
                    {project.technologies &&
                      project.technologies.length > 3 && (
                        <Chip
                          label={`+${project.technologies.length - 3}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {project.featured && (
                    <Chip label="注目" color="secondary" size="small" />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(project)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(project)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  プロジェクトがありません。新規プロジェクトを作成してください。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* プロジェクト作成・編集ダイアログ */}
      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ProjectForm
            project={selectedProject}
            onSave={handleSaveProject}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      {/* プロジェクト削除確認ダイアログ */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        title="プロジェクトの削除"
        message={`「${selectedProject?.name}」を削除してもよろしいですか？この操作は元に戻せません。`}
        onConfirm={handleDelete}
        onCancel={handleDeleteDialogClose}
      />

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
    </Box>
  );
}
