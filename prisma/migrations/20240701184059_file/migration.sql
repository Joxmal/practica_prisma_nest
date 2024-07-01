-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_postId_fkey";

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
