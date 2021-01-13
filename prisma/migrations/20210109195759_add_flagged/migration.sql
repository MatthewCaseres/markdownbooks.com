-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "flagged" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "completed" SET DEFAULT false;
