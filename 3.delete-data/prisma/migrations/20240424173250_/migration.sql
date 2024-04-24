-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "houseName" CHAR(20) NOT NULL,
    "housePrice" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);
