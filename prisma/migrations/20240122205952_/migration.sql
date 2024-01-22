/*
  Warnings:

  - You are about to drop the column `friendId` on the `Friends` table. All the data in the column will be lost.
  - The `friendsId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "friendId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "friendsId",
ADD COLUMN     "friendsId" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "friendsId" ON "User"("friendsId");
