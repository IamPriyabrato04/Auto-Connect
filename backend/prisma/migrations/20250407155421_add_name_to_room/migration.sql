/*
  Warnings:

  - You are about to drop the `NetworkFingerPrint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NetworkFingerPrint" DROP CONSTRAINT "NetworkFingerPrint_roomId_fkey";

-- DropTable
DROP TABLE "NetworkFingerPrint";

-- CreateTable
CREATE TABLE "NetworkFingerprint" (
    "id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NetworkFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NetworkFingerprint_signature_roomId_key" ON "NetworkFingerprint"("signature", "roomId");

-- AddForeignKey
ALTER TABLE "NetworkFingerprint" ADD CONSTRAINT "NetworkFingerprint_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
