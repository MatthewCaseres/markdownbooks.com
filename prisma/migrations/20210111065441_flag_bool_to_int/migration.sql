/*
  Warnings:

  - You are about to alter the column `flagged` on the `Problem` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.

*/
-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "flagged" DROP DEFAULT;
ALTER TABLE "Problem" ALTER "flagged" TYPE INTEGER USING flagged::integer;
ALTER TABLE "Problem" ALTER COLUMN "flagged" SET DEFAULT 0;
