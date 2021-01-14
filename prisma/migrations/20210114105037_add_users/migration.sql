/*
  Warnings:

  - The migration will change the primary key for the `Problem` table. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_pkey",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD PRIMARY KEY ("userId", "id");

-- AddForeignKey
ALTER TABLE "Problem" ADD FOREIGN KEY("userId")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
