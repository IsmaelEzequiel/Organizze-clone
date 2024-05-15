-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PLUS', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissons" "Role" NOT NULL DEFAULT 'USER';
