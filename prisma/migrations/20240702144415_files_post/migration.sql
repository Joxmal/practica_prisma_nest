/*
  Warnings:

  - You are about to drop the `_FileToPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_FileToPost" DROP CONSTRAINT "_FileToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileToPost" DROP CONSTRAINT "_FileToPost_B_fkey";

-- DropTable
DROP TABLE "_FileToPost";

-- CreateTable
CREATE TABLE "_PostTofilesPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostTofilesPost_AB_unique" ON "_PostTofilesPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PostTofilesPost_B_index" ON "_PostTofilesPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "_PostTofilesPost" ADD CONSTRAINT "_PostTofilesPost_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostTofilesPost" ADD CONSTRAINT "_PostTofilesPost_B_fkey" FOREIGN KEY ("B") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
