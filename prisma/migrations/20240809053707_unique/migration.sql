/*
  Warnings:

  - A unique constraint covering the columns `[cedula,tipoCedula]` on the table `cooperador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cooperador_cedula_tipoCedula_key" ON "cooperador"("cedula", "tipoCedula");
