-- CreateTable
CREATE TABLE "RoutePermission" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "RoutePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoutePermission_route_key" ON "RoutePermission"("route");
