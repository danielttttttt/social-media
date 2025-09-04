/*
  Warnings:

  - The values [ANNOUNCEMENT,EVENT] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('ANNOUNCEMENTS', 'EVENTS', 'ACADEMIC', 'SOCIAL', 'CAMPUS_LIFE', 'MARKETPLACE');
ALTER TABLE "Post" ALTER COLUMN "postType" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "postType" TYPE "PostType_new" USING ("postType"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
ALTER TABLE "Post" ALTER COLUMN "postType" SET DEFAULT 'SOCIAL';
COMMIT;
