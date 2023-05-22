/*
  Warnings:

  - Added the required column `locationId` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Devices_deviceAddress_idx` ON `devices`;

-- AlterTable
ALTER TABLE `devices` ADD COLUMN `locationId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Devices_locationId_idx` ON `Devices`(`locationId`);
