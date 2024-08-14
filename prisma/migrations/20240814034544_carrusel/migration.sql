/*
  Warnings:

  - You are about to drop the `_PostImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostImages" DROP CONSTRAINT "_PostImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostImages" DROP CONSTRAINT "_PostImages_B_fkey";

-- DropTable
DROP TABLE "_PostImages";

-- AddForeignKey
ALTER TABLE "imagesCarrusel" ADD CONSTRAINT "imagesCarrusel_id_fkey" FOREIGN KEY ("id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
