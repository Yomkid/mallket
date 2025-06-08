-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'INFO';
ALTER TYPE "NotificationType" ADD VALUE 'PAYMENT';
ALTER TYPE "NotificationType" ADD VALUE 'SHIPPING';
ALTER TYPE "NotificationType" ADD VALUE 'CART';
ALTER TYPE "NotificationType" ADD VALUE 'REVIEW';
ALTER TYPE "NotificationType" ADD VALUE 'SUPPORT';
ALTER TYPE "NotificationType" ADD VALUE 'REFUND';
ALTER TYPE "NotificationType" ADD VALUE 'INVENTORY';
