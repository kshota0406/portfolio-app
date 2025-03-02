// プロジェクトタイプの定義
export interface Project {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    screenshots: string[];
    demoLink?: string;
    githubLink?: string;
    featured?: boolean;
    createdAt: string;
  }
  
  // スキルタイプの定義
  export interface Skill {
    name: string;
    level: number; // 0-100
    icon: string; // アイコン名またはパス
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  }
  
  // プロフィールタイプの定義
  export interface Profile {
    name: string;
    title: string;
    bio: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
  }
  
  // ダミープロジェクトデータ
  export const projects: Project[] = [
    {
      id: '1',
      name: 'Eコマースサイト',
      description: 'Next.jsとSupabaseを使用した完全なEコマースプラットフォーム',
      longDescription: 'このプロジェクトでは、Next.jsとSupabaseを使用して完全なEコマースプラットフォームを構築しました。ユーザー認証、商品の閲覧、カート機能、注文処理など、Eコマースサイトの主要機能をすべて実装しています。また、管理者ダッシュボードでは商品の追加、在庫管理、注文状況の確認が可能です。',
      technologies: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Material-UI', 'Stripe'],
      screenshots: ['/images/dummy/icon.png', '/images/dummy/icon.png'],
      demoLink: 'https://example.com/ecommerce-demo',
      githubLink: 'https://github.com/yourusername/ecommerce-project',
      featured: true,
      createdAt: '2023-08-15',
    },
    {
      id: '2',
      name: 'タスク管理アプリ',
      description: 'Reactとローカルストレージを使用したシンプルなタスク管理アプリ',
      longDescription: 'このタスク管理アプリは、Reactを使用して構築されています。ユーザーはタスクの追加、編集、削除、完了のマークができます。また、タスクをカテゴリー別に分類したり、期限でソートしたりすることも可能です。データはローカルストレージに保存されるため、ページを更新してもタスクは保持されます。',
      technologies: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
      screenshots: ['/images/dummy/icon.png', '/images/dummy/icon.png'],
      demoLink: 'https://example.com/task-app-demo',
      githubLink: 'https://github.com/yourusername/task-manager',
      createdAt: '2023-05-20',
    },
    {
      id: '3',
      name: 'ブログサイト',
      description: 'Next.jsとPrismaを使用した個人ブログサイト',
      longDescription: 'このブログサイトは、Next.jsとPrismaを使用して構築されています。記事の投稿、編集、削除機能があり、マークダウン形式での記事作成をサポートしています。また、カテゴリーやタグでの記事の分類、検索機能も実装しています。コメント機能も備えており、読者とのインタラクションが可能です。',
      technologies: ['React', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      screenshots: ['/images/dummy/icon.png', '/images/dummy/icon.png'],
      demoLink: 'https://example.com/blog-demo',
      githubLink: 'https://github.com/yourusername/blog-site',
      featured: true,
      createdAt: '2023-11-10',
    },
    {
      id: '4',
      name: '天気予報アプリ',
      description: 'React NativeとWeather APIを使用したモバイル天気予報アプリ',
      longDescription: 'このモバイルアプリは、React Nativeを使用して構築され、Weather APIと連携して現在の天気と5日間の予報を表示します。ユーザーは位置情報を共有するか、手動で都市を検索して天気を確認できます。また、お気に入りの都市を保存して素早くアクセスすることも可能です。',
      technologies: ['React Native', 'JavaScript', 'API Integration', 'Expo'],
      screenshots: ['/images/dummy/icon.png', '/images/dummy/icon.png'],
      demoLink: 'https://example.com/weather-app-demo',
      githubLink: 'https://github.com/yourusername/weather-app',
      createdAt: '2023-03-05',
    },
    {
      id: '5',
      name: 'チャットアプリ',
      description: 'Node.jsとSocket.IOを使用したリアルタイムチャットアプリ',
      longDescription: 'このチャットアプリは、Node.jsとSocket.IOを使用して構築されたリアルタイム通信が可能なウェブアプリケーションです。ユーザーは登録してログインした後、異なるチャットルームに参加して他のユーザーとメッセージをやり取りできます。また、プライベートメッセージやファイル共有機能も実装しています。',
      technologies: ['Node.js', 'Express', 'Socket.IO', 'MongoDB', 'React'],
      screenshots: ['/images/dummy/icon.png', '/images/dummy/icon.png'],
      demoLink: 'https://example.com/chat-app-demo',
      githubLink: 'https://github.com/yourusername/chat-application',
      createdAt: '2023-09-30',
    }
  ];
  
  // ダミースキルデータ
  export const skills: Skill[] = [
    {
      name: 'React',
      level: 85,
      icon: 'react',
      category: 'frontend'
    },
    {
      name: 'Next.js',
      level: 80,
      icon: 'nextjs',
      category: 'frontend'
    },
    {
      name: 'TypeScript',
      level: 75,
      icon: 'typescript',
      category: 'frontend'
    },
    {
      name: 'JavaScript',
      level: 90,
      icon: 'javascript',
      category: 'frontend'
    },
    {
      name: 'HTML5',
      level: 95,
      icon: 'html5',
      category: 'frontend'
    },
    {
      name: 'CSS3',
      level: 90,
      icon: 'css3',
      category: 'frontend'
    },
    {
      name: 'Node.js',
      level: 70,
      icon: 'nodejs',
      category: 'backend'
    },
    {
      name: 'Express',
      level: 65,
      icon: 'express',
      category: 'backend'
    },
    {
      name: 'PostgreSQL',
      level: 60,
      icon: 'postgresql',
      category: 'database'
    },
    {
      name: 'MongoDB',
      level: 55,
      icon: 'mongodb',
      category: 'database'
    },
    {
      name: 'Supabase',
      level: 75,
      icon: 'supabase',
      category: 'database'
    },
    {
      name: 'Git',
      level: 85,
      icon: 'git',
      category: 'devops'
    },
    {
      name: 'Docker',
      level: 50,
      icon: 'docker',
      category: 'devops'
    },
    {
      name: 'Material-UI',
      level: 80,
      icon: 'materialui',
      category: 'frontend'
    },
    {
      name: 'Tailwind CSS',
      level: 70,
      icon: 'tailwindcss',
      category: 'frontend'
    }
  ];
  
  // ダミープロフィールデータ
  export const profile: Profile = {
    name: '山田 太郎',
    title: 'フロントエンドデベロッパー',
    bio: 'フロントエンド開発に情熱を持つ開発者です。ユーザー体験を重視したWebアプリケーションの構築を得意としています。新しい技術を学ぶことが好きで、常に最新のトレンドをキャッチアップしています。以前はIT企業でフルスタック開発者として3年間勤務した経験があり、現在はフリーランスとして様々なプロジェクトに携わっています。',
    email: 'example@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    avatar: '/images/icon.png'
  };
  
  // 使用可能な技術カテゴリー
  export const technologyCategories = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'Supabase',
    'PostgreSQL',
    'MongoDB',
    'Material-UI',
    'Tailwind CSS',
    'React Native',
    'Socket.IO',
    'Stripe',
    'API Integration'
  ];