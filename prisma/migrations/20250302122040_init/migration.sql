-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT,
    "technologies" TEXT[],
    "screenshots" TEXT[],
    "demo_link" TEXT,
    "github_link" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "icon" TEXT,
    "category" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "email" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "avatar" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
