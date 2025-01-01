-- CreateTable
CREATE TABLE "Spell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SpellComponent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "spellId" INTEGER NOT NULL,
    CONSTRAINT "SpellComponent_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
