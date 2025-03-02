// サーバーコンポーネント（'use client'を使用しない）
import { projects } from '@/data/dummyData';
import ProjectClientPage from '@/components/projects/ProjectClientPage';

export default function ProjectPage({ params }: { params: { id: string } }) {
  // サーバーサイドでプロジェクトを検索
  const project = projects.find(p => p.id === params.id);
  
  // 見つかったプロジェクトと共にクライアントコンポーネントをレンダリング
  return <ProjectClientPage projectId={params.id} initialProject={project} />;
}