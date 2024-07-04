-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'superAdmin');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" DEFAULT 'user',
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(255),
    "published" BOOLEAN DEFAULT false,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorID" INTEGER,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "patch" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostTofilesPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_PostTofilesPost_AB_unique" ON "_PostTofilesPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PostTofilesPost_B_index" ON "_PostTofilesPost"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostTofilesPost" ADD CONSTRAINT "_PostTofilesPost_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostTofilesPost" ADD CONSTRAINT "_PostTofilesPost_B_fkey" FOREIGN KEY ("B") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
