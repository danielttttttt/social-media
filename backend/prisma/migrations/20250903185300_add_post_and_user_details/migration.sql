/*
  Warnings:

  - The values [GENERAL,LOST_FOUND] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('ANNOUNCEMENT', 'EVENT', 'ACADEMIC', 'SOCIAL', 'CAMPUS_LIFE', 'MARKETPLACE');
ALTER TABLE "Post" ALTER COLUMN "postType" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "postType" TYPE "PostType_new" USING ("postType"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
ALTER TABLE "Post" ALTER COLUMN "postType" SET DEFAULT 'SOCIAL';
COMMIT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "postType" SET DEFAULT 'SOCIAL';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePictureUrl" TEXT;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
