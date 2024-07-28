/*
  Warnings:

  - You are about to drop the column `locationId` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `apiKey` on the `deviceposition` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `deviceposition` table. All the data in the column will be lost.
  - You are about to alter the column `longitude` on the `deviceposition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `deviceposition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(9,6)`.
  - You are about to drop the column `apiKey` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `apiKey` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceName]` on the table `DevicePosition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceName` to the `DevicePosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Contact_locationId_idx` ON `contact`;

-- DropIndex
DROP INDEX `DevicePosition_deviceId_idx` ON `deviceposition`;

-- AlterTable
ALTER TABLE `contact` DROP COLUMN `locationId`,
    ADD COLUMN `deviceName` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `deviceposition` DROP COLUMN `apiKey`,
    DROP COLUMN `deviceId`,
    ADD COLUMN `deviceName` VARCHAR(191) NOT NULL,
    MODIFY `longitude` DECIMAL(9, 6) NULL,
    MODIFY `latitude` DECIMAL(9, 6) NULL;

-- AlterTable
ALTER TABLE `devices` DROP COLUMN `apiKey`,
    DROP COLUMN `channelId`,
    ADD COLUMN `channel` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `apiKey`;

-- CreateIndex
CREATE INDEX `Contact_contactLocation_idx` ON `Contact`(`contactLocation`);

-- CreateIndex
CREATE INDEX `Contact_deviceName_idx` ON `Contact`(`deviceName`);

-- CreateIndex
CREATE UNIQUE INDEX `DevicePosition_deviceName_key` ON `DevicePosition`(`deviceName`);

-- CreateIndex
CREATE INDEX `DevicePosition_deviceName_idx` ON `DevicePosition`(`deviceName`);
