/*
  Warnings:

  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `measure_id` on the `Measure` table. All the data in the column will be lost.
  - The required column `measure_uuid` was added to the `Measure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `measure_value` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_pkey",
DROP COLUMN "measure_id",
ADD COLUMN     "measure_uuid" TEXT NOT NULL,
ADD COLUMN     "measure_value" INTEGER NOT NULL,
ADD CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid");
