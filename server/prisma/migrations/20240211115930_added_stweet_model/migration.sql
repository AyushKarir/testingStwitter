-- CreateTable
CREATE TABLE "Stweet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageURL" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stweet" ADD CONSTRAINT "Stweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
