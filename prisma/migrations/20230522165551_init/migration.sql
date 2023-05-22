/*
  Warnings:

  - You are about to alter the column `field` on the `devices` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.
  - Added the required column `userName` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stafLocation` to the `Staf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` MODIFY `field` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `locations` ADD COLUMN `userName` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `staf` ADD COLUMN `stafLocation` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Staf_stafLocation_idx` ON `Staf`(`stafLocation`);
