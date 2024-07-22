/*
  Warnings:

  - The `tipoCedula` column on the `cooperador` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cooperador" DROP COLUMN "tipoCedula",
ADD COLUMN     "tipoCedula" TEXT;

-- DropEnum
DROP TYPE "TipoCedula";
