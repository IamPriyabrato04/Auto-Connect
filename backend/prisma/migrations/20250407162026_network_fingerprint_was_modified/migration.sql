/*
  Warnings:

  - You are about to drop the column `signature` on the `NetworkFingerprint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fingerprintHash,roomId]` on the table `NetworkFingerprint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fingerprintHash` to the `NetworkFingerprint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NetworkFingerprint_signature_roomId_key";

-- AlterTable
ALTER TABLE "NetworkFingerprint" DROP COLUMN "signature",
ADD COLUMN     "fingerprintHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NetworkFingerprint_fingerprintHash_roomId_key" ON "NetworkFingerprint"("fingerprintHash", "roomId");
