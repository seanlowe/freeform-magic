-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'player'
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "proficienciesId" INTEGER NOT NULL,
    "statsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Character_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "CharacterStatistics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_proficienciesId_fkey" FOREIGN KEY ("proficienciesId") REFERENCES "CharacterProficiencies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CharacterStatistics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CharacterProficiencies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "athletics" INTEGER NOT NULL,
    "acrobatics" INTEGER NOT NULL,
    "sleightOfHand" INTEGER NOT NULL,
    "stealth" INTEGER NOT NULL,
    "arcana" INTEGER NOT NULL,
    "history" INTEGER NOT NULL,
    "investigation" INTEGER NOT NULL,
    "nature" INTEGER NOT NULL,
    "religion" INTEGER NOT NULL,
    "animalHandling" INTEGER NOT NULL,
    "insight" INTEGER NOT NULL,
    "medicine" INTEGER NOT NULL,
    "perception" INTEGER NOT NULL,
    "survival" INTEGER NOT NULL,
    "deception" INTEGER NOT NULL,
    "intimidation" INTEGER NOT NULL,
    "performance" INTEGER NOT NULL,
    "persuasion" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Character_proficienciesId_key" ON "Character"("proficienciesId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_statsId_key" ON "Character"("statsId");
