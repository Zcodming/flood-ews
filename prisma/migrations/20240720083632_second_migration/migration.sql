/*
  Warnings:

  - A unique constraint covering the columns `[deviceName]` on the table `Devices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `regency` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `locations` ADD COLUMN `regency` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Devices_deviceName_key` ON `Devices`(`deviceName`);

-- CreateIndex
CREATE UNIQUE INDEX `Locations_address_key` ON `Locations`(`address`);
