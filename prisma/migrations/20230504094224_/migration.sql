/*
  Warnings:

  - You are about to drop the column `latitude` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `devices` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `staf` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `VarChar(191)`.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `devices` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`;

-- AlterTable
ALTER TABLE `staf` MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(225) NOT NULL,
    MODIFY `username` VARCHAR(225) NOT NULL,
    MODIFY `password` VARCHAR(225) NOT NULL,
    MODIFY `email` VARCHAR(225) NOT NULL;

-- CreateTable
CREATE TABLE `DevicePosition` (
    `deviceId` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(225) NULL,
    `latitude` VARCHAR(225) NULL,

    UNIQUE INDEX `DevicePosition_deviceId_key`(`deviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
