/*
  Warnings:

  - You are about to drop the `_PatrocinadorCategoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PatrocinadorToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patrocinadores` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoCooperador" AS ENUM ('patrocinador', 'colaborador');

-- DropForeignKey
ALTER TABLE "_PatrocinadorCategoria" DROP CONSTRAINT "_PatrocinadorCategoria_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatrocinadorCategoria" DROP CONSTRAINT "_PatrocinadorCategoria_B_fkey";

-- DropForeignKey
ALTER TABLE "_PatrocinadorToPost" DROP CONSTRAINT "_PatrocinadorToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatrocinadorToPost" DROP CONSTRAINT "_PatrocinadorToPost_B_fkey";

-- DropTable
DROP TABLE "_PatrocinadorCategoria";

-- DropTable
DROP TABLE "_PatrocinadorToPost";

-- DropTable
DROP TABLE "patrocinadores";

-- CreateTable
CREATE TABLE "cooperador" (
    "id" SERIAL NOT NULL,
    "tipoCedula" "TipoCedula" DEFAULT 'V',
    "cedula" INTEGER NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "ubicacion" TEXT,
    "tipo" "TipoCooperador" NOT NULL,

    CONSTRAINT "cooperador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CooperadorToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoriaToCooperador" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cooperador_cedula_key" ON "cooperador"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "_CooperadorToPost_AB_unique" ON "_CooperadorToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CooperadorToPost_B_index" ON "_CooperadorToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToCooperador_AB_unique" ON "_CategoriaToCooperador"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToCooperador_B_index" ON "_CategoriaToCooperador"("B");

-- AddForeignKey
ALTER TABLE "_CooperadorToPost" ADD CONSTRAINT "_CooperadorToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "cooperador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CooperadorToPost" ADD CONSTRAINT "_CooperadorToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToCooperador" ADD CONSTRAINT "_CategoriaToCooperador_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToCooperador" ADD CONSTRAINT "_CategoriaToCooperador_B_fkey" FOREIGN KEY ("B") REFERENCES "cooperador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
