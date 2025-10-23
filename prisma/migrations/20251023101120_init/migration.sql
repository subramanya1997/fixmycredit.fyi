-- CreateTable
CREATE TABLE "WaitlistUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_email_key" ON "WaitlistUser"("email");

-- CreateIndex
CREATE INDEX "WaitlistUser_email_idx" ON "WaitlistUser"("email");

-- CreateIndex
CREATE INDEX "WaitlistUser_createdAt_idx" ON "WaitlistUser"("createdAt");
