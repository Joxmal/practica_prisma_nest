-- CreateTable
CREATE TABLE "_CategoriaToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToPost_AB_unique" ON "_CategoriaToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToPost_B_index" ON "_CategoriaToPost"("B");

-- AddForeignKey
ALTER TABLE "_CategoriaToPost" ADD CONSTRAINT "_CategoriaToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToPost" ADD CONSTRAINT "_CategoriaToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
