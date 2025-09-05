-- CreateTable
CREATE TABLE "public"."events" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
