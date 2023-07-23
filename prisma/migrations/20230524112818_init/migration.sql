/*
  Warnings:

  - Added the required column `locationId` to the `Staf` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Staf_stafLocation_idx` ON `staf`;

-- AlterTable
ALTER TABLE `staf` ADD COLUMN `locationId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Staf_locationId_idx` ON `Staf`(`locationId`);
