-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "newsletterId" TEXT NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
