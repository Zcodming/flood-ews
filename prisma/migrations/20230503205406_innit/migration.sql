/*
  Warnings:

  - Added the required column `channelId` to the `Devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceName` to the `Devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` ADD COLUMN `channelId` VARCHAR(191) NOT NULL,
    ADD COLUMN `deviceName` VARCHAR(191) NOT NULL,
    ADD COLUMN `field` ENUM('field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7', 'field8') NOT NULL;

-- AlterTable
ALTER TABLE `locations` ADD COLUMN `details` VARCHAR(225) NULL;

-- CreateTable
CREATE TABLE `Staf` (
    `id` VARCHAR(225) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `details` VARCHAR(225) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staf_phoneNumber_key`(`phoneNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
