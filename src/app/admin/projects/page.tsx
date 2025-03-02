'use client';

import { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { Project, projects as initialProjects } from '@/data/dummyData';
import ProjectForm from '@/components/projects/ProjectForm';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const router = useRouter();

  // ローカルストレージからプロジェクトデータを読み込む
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (error) {
        console.error('プロジェクトデータの読み込みに失敗しました:', error);
      }
    }
  }, []);

  // プロジェクトデータをローカルストレージに保存
  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
  };

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

  // 削除ダイアログを閉じる
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  // プロジェクト削除処理
  const handleDelete = () => {
    if (selectedProject) {
      const updatedProjects = projects.filter(p => p.id !== selectedProject.id);
      setProjects(updatedProjects);
      saveProjectsToStorage(updatedProjects);
      
      setSnackbar({
        open: true,
        message: 'プロジェクトが削除されました',
        severity: 'success',
      });
    }
    setIsDeleteDialogOpen(false);
  };

  // フォームを閉じる
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  // プロジェクト保存処理
  const handleSaveProject = (project: Project) => {
    let updatedProjects;
    const existingIndex = projects.findIndex(p => p.id === project.id);
    
    if (existingIndex >= 0) {
      // 既存プロジェクトの更新
      updatedProjects = [...projects];
      updatedProjects[existingIndex] = project;
      setSnackbar({
        open: true,
        message: 'プロジェクトが更新されました',
        severity: 'success',
      });
    } else {
      // 新規プロジェクトの追加
      updatedProjects = [...projects, project];
      setSnackbar({
        open: true,
        message: 'プロジェクトが作成されました',
        severity: 'success',
      });
    }
    
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
    setIsFormOpen(false);
  };

  // プロジェクトフォームからの削除処理
  const handleFormDelete = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
    
    setSnackbar({
      open: true,
      message: 'プロジェクトが削除されました',
      severity: 'success',
    });
    setIsFormOpen(false);
  };

  // スナックバーを閉じる
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Chip key={tech} label={tech} size="small" />
                    ))}
                    {project.technologies.length > 3 && (
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
            project={selectedProject || undefined}
            onSave={handleSaveProject}
            onDelete={handleFormDelete}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>
      
      {/* プロジェクト削除確認ダイアログ */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>プロジェクトの削除</DialogTitle>
        <DialogContent>
          <Typography>
            「{selectedProject?.name}」を削除してもよろしいですか？この操作は元に戻せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="inherit">
            キャンセル
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* 通知スナックバー */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}