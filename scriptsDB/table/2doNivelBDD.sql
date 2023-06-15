
------------------------------------------------------------------------
-- *SEGUNDO NIVEL DE TABLAS (Que tienen FK) + (Las tablas de Pertenencia Disjunta)
------------------------------------------------------------------------

-- *Tabla de Objetos
CREATE TABLE IF NOT EXISTS "Object" (
    "name" varchar(64) NOT NULL PRIMARY KEY,
    "description" varchar(256) NOT NULL,
    "material" varchar(64) NOT NULL,
    "objectTypeId" uuid NOT NULL,
    CONSTRAINT "objectType_FK" FOREIGN KEY ("objectTypeId") REFERENCES "ObjectType"("id")
);

-- *Tabla de Ciudad
CREATE TABLE IF NOT EXISTS "City" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "nameCity" varchar(64) NOT NULL,
    "nameCountry" varchar(64) NOT NULL,
    CONSTRAINT "country_FK" FOREIGN KEY ("nameCountry") REFERENCES "Country"("name")
);

-- *Tabla de Personajes
CREATE TABLE IF NOT EXISTS "Character" (
    "id" int NOT NULL PRIMARY KEY,
    "eyeColorId" uuid NOT NULL,
    "hairColorId" uuid NOT NULL,
    CONSTRAINT "eyeColor_FK" FOREIGN KEY ("eyeColorId") REFERENCES "Color"("id"),
    CONSTRAINT "hairColor_FK" FOREIGN KEY ("hairColorId") REFERENCES "Color"("id")
);

-- *Tabla de Villanos
CREATE TABLE IF NOT EXISTS "Villain" (
    "characterId" int NOT NULL PRIMARY KEY,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "gender" varchar NOT NULL,
    "phrase" varchar(128) NOT NULL,
    "maritialStatus" varchar NOT NULL,
    "firstApparition" varchar(64) NOT NULL,
    "nameVillain" varchar(64) NOT NULL,
    "objective" varchar(128) NOT NULL,
    CONSTRAINT "gender_CHK" CHECK ("gender" IN ('M', 'F', 'Desc','Otro')),
    CONSTRAINT "maritialStatus_CHK" CHECK ("maritialStatus" IN ('Soltero', 'Casado', 'Viudo','Divorciado')),
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id")
);

-- *Tabla de Heroes
CREATE TABLE IF NOT EXISTS "Hero" (
    "characterId" int NOT NULL PRIMARY KEY,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "phrase" varchar(128) NOT NULL,
    "firstApparition" varchar(64) NOT NULL,
    "nameHero" varchar(64) NOT NULL,
    "logo" varchar(128) NOT NULL,
    "gender" varchar NOT NULL,
    "maritialStatus" varchar NOT NULL,
    "archEnemy" int NOT NULL UNIQUE,
    CONSTRAINT "gender_CHK" CHECK ("gender" IN ('M', 'F', 'Desc','Otro')),
    CONSTRAINT "maritialStatus_CHK" CHECK ("maritialStatus" IN ('Soltero', 'Casado', 'Viudo','Divorciado')),
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "villain_FK" FOREIGN KEY ("archEnemy") REFERENCES "Villain"("characterId")
);

-- *Tabla de Civiles
CREATE TABLE IF NOT EXISTS "Civil" (
    "characterId" int NOT NULL PRIMARY KEY ,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "gender" varchar NOT NULL,
    "phrase" varchar(128) NOT NULL,
    "maritialStatus" varchar NOT NULL,
    "firstApparition" varchar(64) NOT NULL,
    "heroId" int,
    "villainId" int,
    CONSTRAINT "gender_CHK" CHECK ("gender" IN ('M', 'F', 'Desc','Otro')),
    CONSTRAINT "maritialStatus_CHK" CHECK ("maritialStatus" IN ('Soltero', 'Casado', 'Viudo','Divorciado')),
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "hero_FK" FOREIGN KEY ("heroId") REFERENCES "Hero"("characterId"),
    CONSTRAINT "villain_FK" FOREIGN KEY ("villainId") REFERENCES "Villain"("characterId")  
);

-- *Tabla de Organización
CREATE TABLE IF NOT EXISTS "Organization" (
    "name" varchar(64) NOT NULL PRIMARY KEY,
    "slogan" varchar(64) NOT NULL,
    "objetive" varchar(128) NOT NULL,
    "firstApparition" varchar(64) NOT NULL,
    "placeCreation" uuid NOT NULL,
    "founder" int NOT NULL,
    "leader" int NOT NULL,
    CONSTRAINT "place_FK" FOREIGN KEY ("placeCreation") REFERENCES "Place"("id"),
    CONSTRAINT "founderCharacter_FK" FOREIGN KEY ("founder") REFERENCES "Character"("id"),
    CONSTRAINT "leaderCharacter_FK" FOREIGN KEY ("leader") REFERENCES "Character"("id")
);

-- *Tabla de Sedes
CREATE TABLE IF NOT EXISTS "Headquarter" (
    "nameHeadquarter" varchar(64) NOT NULL,
    "nameOrg" varchar(64) NOT NULL,
    "ubication" uuid NOT NULL,
    "edificationType" uuid NOT NULL,
    CONSTRAINT "place_FK" FOREIGN KEY ("ubication") REFERENCES "Place"("id"),
    CONSTRAINT "edificationType_FK" FOREIGN KEY ("edificationType") REFERENCES "EdificationType"("id"),
    CONSTRAINT "organization_FK" FOREIGN KEY ("nameOrg") REFERENCES "Organization"("name"),
    PRIMARY KEY ("nameHeadquarter","nameOrg")
);

-- *Tabla de Medio
CREATE TABLE IF NOT EXISTS "Medio" (
    "id" int NOT NULL PRIMARY KEY,
    "companyProduction" uuid NOT NULL,
    CONSTRAINT "company_FK" FOREIGN KEY ("companyProduction") REFERENCES "Company"("id")
);

-- *Tabla de Peliculas
CREATE TABLE IF NOT EXISTS "Movie" (
    "medioId" int NOT NULL PRIMARY KEY,
    "title" varchar(64) NOT NULL,
    "releaseDate" date NOT NULL,
    "synopsis" varchar(256) NOT NULL,
    "duration" int4 NOT NULL,
    "based" varchar(64) NOT NULL,
    "cost" real NOT NULL,
    "revenue" real NOT NULL,
    "director" uuid NOT NULL,
    "companyDist" uuid NOT NULL,
    "audiovisualType" uuid NOT NULL,
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "director_FK" FOREIGN KEY ("director") REFERENCES "Director"("id"),
    CONSTRAINT "company_FK" FOREIGN KEY ("companyDist") REFERENCES "Company"("id"),
    CONSTRAINT "audiovisualType_FK" FOREIGN KEY ("audiovisualType") REFERENCES "AudiovisualType"("id"),
    CONSTRAINT "duration_CHK" CHECK ("duration" > 0),
    CONSTRAINT "cost_CHK" CHECK ("cost" > 0),
    CONSTRAINT "revenue_CHK" CHECK ("revenue" > 0)
);

-- *Tabla de Series
CREATE TABLE IF NOT EXISTS "Serie" (
    "medioId" int NOT NULL PRIMARY KEY,
    "title" varchar(64) NOT NULL,
    "releaseDate" date NOT NULL,
    "synopsis" varchar(256) NOT NULL,
    "based" varchar(64) NOT NULL,
    "channel" varchar(64) NOT NULL,
    "episodes" int4 NOT NULL,
    "creator" uuid NOT NULL,
    "audiovisualType" uuid NOT NULL,
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "creator_FK" FOREIGN KEY ("creator") REFERENCES "Creator"("id"),
    CONSTRAINT "audiovisualType_FK" FOREIGN KEY ("audiovisualType") REFERENCES "AudiovisualType"("id"),
    CONSTRAINT "episodes_CHK" CHECK ("episodes" > 0)
);

-- *Tabla de Video Juego
CREATE TABLE IF NOT EXISTS "VideoGame" (
    "medioId" int NOT NULL PRIMARY KEY,
    "title" varchar(64) NOT NULL,
    "releaseDate" date NOT NULL,
    "synopsis" varchar(256) NOT NULL,
    "based" varchar(64) NOT NULL,
    "type" varchar(64) NOT NULL,
    "companyPublisher" uuid NOT NULL,
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "company_FK" FOREIGN KEY ("companyPublisher") REFERENCES "Company"("id")
);

CREATE TABLE IF NOT EXISTS "Users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "username" varchar(64) NOT NULL UNIQUE,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "birthdate" date NOT NULL,
    "isActive" bool NOT NULL DEFAULT true,
    "creditCardCardNumber" varchar(16) NOT NULL,
    "cityId" uuid NOT NULL,
    CONSTRAINT "card_fk" FOREIGN KEY ("creditCardCardNumber") REFERENCES "CreditCards"("cardNumber"),
    CONSTRAINT "city_fk" FOREIGN KEY ("cityId") REFERENCES "City"("id"),
    PRIMARY KEY ("id")
);

-- *Tabla de Perfiles
CREATE TABLE IF NOT EXISTS "Profiles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid NOT NULL,
    "nickname" varchar(64) NOT NULL,
    "language" varchar(64) NOT NULL,
    "hourConexion" int4 NOT NULL DEFAULT 0,
    "device" varchar(64) NOT NULL,
    "timeWatched" int4 NOT NULL DEFAULT 0,
    "emailProfile" varchar NOT NULL,
    "avatar" varchar(64) NOT NULL,
    "isActive" bool NOT NULL DEFAULT true,
    CONSTRAINT "user_FK" FOREIGN KEY ("userId") REFERENCES "Users"("id"),
    CONSTRAINT "hourConexion_CHK" CHECK ("hourConexion" >= 0),
    CONSTRAINT "timeWatched_CHK" CHECK ("timeWatched" >= 0),
    PRIMARY KEY ("id","userId")
);
