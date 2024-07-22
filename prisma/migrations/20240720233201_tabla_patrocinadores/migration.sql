-- CreateEnum
CREATE TYPE "TipoCedula" AS ENUM ('V', 'J', 'E');

-- CreateTable
CREATE TABLE "patrocinadores" (
    "id" SERIAL NOT NULL,
    "tipoCedula" "TipoCedula" DEFAULT 'V',
    "cedula" INTEGER NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "ubicacion" TEXT,
    "especialidad" TEXT,

    CONSTRAINT "patrocinadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatrocinadorToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patrocinadores_cedula_key" ON "patrocinadores"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "_PatrocinadorToPost_AB_unique" ON "_PatrocinadorToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PatrocinadorToPost_B_index" ON "_PatrocinadorToPost"("B");

-- AddForeignKey
ALTER TABLE "_PatrocinadorToPost" ADD CONSTRAINT "_PatrocinadorToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "patrocinadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatrocinadorToPost" ADD CONSTRAINT "_PatrocinadorToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
