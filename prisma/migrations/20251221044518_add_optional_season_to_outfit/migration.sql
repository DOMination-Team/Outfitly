-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'FALL', 'WINTER', 'ALL_YEAR');

-- AlterTable
ALTER TABLE "Outfit" ADD COLUMN     "season" "Season";
