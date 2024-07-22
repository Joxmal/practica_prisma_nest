/*
  Warnings:

  - You are about to drop the column `especialidad` on the `patrocinadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patrocinadores" DROP COLUMN "especialidad";

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatrocinadorCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_name_key" ON "categorias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PatrocinadorCategoria_AB_unique" ON "_PatrocinadorCategoria"("A", "B");

-- CreateIndex
CREATE INDEX "_PatrocinadorCategoria_B_index" ON "_PatrocinadorCategoria"("B");

-- AddForeignKey
ALTER TABLE "_PatrocinadorCategoria" ADD CONSTRAINT "_PatrocinadorCategoria_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatrocinadorCategoria" ADD CONSTRAINT "_PatrocinadorCategoria_B_fkey" FOREIGN KEY ("B") REFERENCES "patrocinadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
