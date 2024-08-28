-- CreateTable
CREATE TABLE "Measure" (
    "measure_id" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_id")
);
