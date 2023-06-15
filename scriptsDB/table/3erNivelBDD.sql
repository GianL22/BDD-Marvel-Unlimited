
-- ! Tablas que son relaciones.
--------------------------------------------------------------------------
-- *TERCER NIVEL DE TABLAS (Que tienen FK que dependen de las tablas anteriores)
--------------------------------------------------------------------------

-- *Tabla de relación Tiene_colores_traje
CREATE TABLE IF NOT EXISTS "SuitColors" (
    "colorId" uuid NOT NULL,
    "characterId" int NOT NULL,
    CONSTRAINT "color_FK" FOREIGN KEY ("colorId") REFERENCES "Color"("id"),
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    PRIMARY KEY ("colorId","characterId")
);

-- *Tabla de relación Forma_Parte
CREATE TABLE IF NOT EXISTS "FormPart" (
    "characterId" int NOT NULL,
    "nameOrg" varchar(64) NOT NULL,
    "cargoId" uuid NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "organization_FK" FOREIGN KEY ("nameOrg") REFERENCES "Organization"("name"),
    CONSTRAINT "cargo_FK" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id"),
    PRIMARY KEY ("characterId","nameOrg","cargoId")
);

-- *ENUM de poder
CREATE TYPE PowerType AS ENUM ('Natural', 'Artificial');

-- *Tabla de relación Posee
CREATE TABLE IF NOT EXISTS "PossessesPower" (
    "characterId" int NOT NULL,
    "powerName" varchar(64) NOT NULL,
    "type" PowerType NOT NULL,
    "inherited" boolean NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "power_FK" FOREIGN KEY ("powerName") REFERENCES "Power"("name"),
    PRIMARY KEY ("characterId","powerName")
);

-- *Tabla de relacion Creado_Por
CREATE TABLE IF NOT EXISTS "CreatedBy" (
    "characterId" int NOT NULL,
    "objectName" varchar(64) NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "object_FK" FOREIGN KEY ("objectName") REFERENCES "Object"("name"),
    PRIMARY KEY ("characterId","objectName")
);

-- *Tabla de relacion Combaten 
CREATE TABLE IF NOT EXISTS "Fight" (
    "characterId" int NOT NULL,
    "powerName" varchar NOT NULL,
    "objectName" varchar NOT NULL,
    "placeId" uuid NOT NULL,
    "dateFight" date NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "power_FK" FOREIGN KEY ("powerName") REFERENCES "Power"("name"),
    CONSTRAINT "object_FK" FOREIGN KEY ("objectName") REFERENCES "Object"("name"),
    CONSTRAINT "place_FK" FOREIGN KEY ("placeId") REFERENCES "Place"("id"),
    PRIMARY KEY ("characterId","powerName","objectName","placeId")
);

-- *Tabla de relacion Aparece
CREATE TABLE IF NOT EXISTS "Appears" (
    "characterId" int NOT NULL,
    "medioId" int NOT NULL,
    "actorId" uuid NOT NULL,
    "roleCharacter" varchar NOT NULL,
    "interpretation" varchar NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "actor_FK" FOREIGN KEY ("actorId") REFERENCES "Actor"("id"),
    CONSTRAINT "roleCharacter_CHK" CHECK ("roleCharacter" IN ('Protagonista', 'Antagonista', 'Secundaria')),
    CONSTRAINT "interpretation_CHK" CHECK ("interpretation" IN ('Interpreta', 'Presta su voz')),
    PRIMARY KEY ("characterId","medioId","actorId")
);


-- *Tabla de relacion Participa
CREATE TABLE IF NOT EXISTS "Participate" (
    "medioId" int NOT NULL,
    "nameOrg" varchar(64) NOT NULL,
    "roleOrg" varchar NOT NULL,
    status varchar NOT NULL,
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "organization_FK" FOREIGN KEY ("nameOrg") REFERENCES "Organization"("name"),
    CONSTRAINT "roleOrg_CHK" CHECK ("roleOrg" IN ('Protagonista', 'Enemigas', 'Secundaria')),
    PRIMARY KEY ("medioId","nameOrg")
);

-- *Tabla de relacion Suscripción
CREATE TABLE IF NOT EXISTS "Suscription" (
    "userId" uuid NOT NULL,
    "membershipId" uuid NOT NULL,
    "dateSuscription" date NOT NULL,
    "dateEnd" date NOT NULL,
    "isActive" bool NOT NULL DEFAULT true,
    CONSTRAINT "user_FK" FOREIGN KEY ("userId") REFERENCES "Users"("id"),
    CONSTRAINT "membership_FK" FOREIGN KEY ("membershipId") REFERENCES "Memberships"("id"),
    PRIMARY KEY ("userId","membershipId","dateSuscription")
);

-- *Tabla de relación Progreso_Serie
CREATE TABLE IF NOT EXISTS "SeriesProgress" (
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "serieId" int NOT NULL,
    "viewedepisode" int4 NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "serie_FK" FOREIGN KEY ("serieId") REFERENCES "Serie"("medioId"),
    CONSTRAINT "viewedepisode_CHK" CHECK ("viewedepisode" > 0),
    PRIMARY KEY ("userId","profileId","serieId")
);

-- *Tabla de relación Progreso_Pelicula
CREATE TABLE IF NOT EXISTS "MovieProgress"(
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "movieId" int NOT NULL,
    "timewatched" int4 NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "movie_FK" FOREIGN KEY ("movieId") REFERENCES "Movie"("medioId"),
    CONSTRAINT "timewatched" CHECK ("timewatched" > 0),
    PRIMARY KEY ("userId","profileId","movieId")
);

-- *Tabla de relación Progreso_VideoJuego
CREATE TABLE IF NOT EXISTS "VideoGameProgress" (
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "videoGameId" int NOT NULL,
    "played" boolean NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "videoGame_FK" FOREIGN KEY ("videoGameId") REFERENCES "VideoGame"("medioId"),
    PRIMARY KEY ("userId","profileId","videoGameId")
);

-- *Tabla de relación Mi_lista
CREATE TABLE IF NOT EXISTS "MyList" (
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "medioId" int NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    PRIMARY KEY ("userId","profileId","medioId")
);

-- *Tabla de relacion Lista_Preferencias
CREATE TABLE IF NOT EXISTS "PreferenceList" (
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "medioId" int NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    PRIMARY KEY ("userId","profileId","medioId")
);

-- *Tabla de relacion Califica
CREATE TABLE IF NOT EXISTS "Rating" (
    "userId" uuid NOT NULL,
    "profileId" uuid NOT NULL,
    "medioId" int NOT NULL,
    "rating" float4 NOT NULL,
    CONSTRAINT "profile_FK" FOREIGN KEY ("userId","profileId") REFERENCES "Profiles"("userId","id"),
    CONSTRAINT "medio_FK" FOREIGN KEY ("medioId") REFERENCES "Medio"("id"),
    CONSTRAINT "rating_CHK" CHECK ("rating" >= 1 AND "rating" <= 5),
    PRIMARY KEY ("userId","profileId","medioId")
);

-- *Tabla de relacion Se_enfrenta
CREATE TABLE IF NOT EXISTS "FightWith" (
    "heroId" int NOT NULL,
    "villainId" int NOT NULL,
    CONSTRAINT "hero_FK" FOREIGN KEY ("heroId") REFERENCES "Hero"("characterId"),
    CONSTRAINT "vllain_FK" FOREIGN KEY ("villainId") REFERENCES "Villain"("characterId"),
    PRIMARY KEY ("heroId","villainId")
);

-- *Tabla de relacion Crea
CREATE TABLE IF NOT EXISTS "CreateCharacter" (
    "characterId" int NOT NULL,
    "creatorId" uuid NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "creator_FK" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id"),
    PRIMARY KEY ("characterId","creatorId")
);

-- *Tabla de relacion Usa
CREATE TABLE IF NOT EXISTS "UseObject" (
    "characterId" int NOT NULL,
    "objectName" varchar(64) NOT NULL,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    CONSTRAINT "object_FK" FOREIGN KEY ("objectName") REFERENCES "Object"("name"),
    PRIMARY KEY ("characterId","objectName")
);

-- *Tabla VideoJuegoPLataforma
CREATE TABLE IF NOT EXISTS "VideoGamePlataforms" (
    "plataformId" uuid NOT NULL,
    "videoGameId" int NOT NULL,
    CONSTRAINT "plataform_FK" FOREIGN KEY ("plataformId") REFERENCES "Platform"("id") ,
    CONSTRAINT "videoGame_FK" FOREIGN KEY ("videoGameId") REFERENCES "VideoGame"("medioId"),
    PRIMARY KEY ("plataformId","videoGameId")
);

-- *Tabla PersonajeNacionalidad
CREATE TABLE IF NOT EXISTS "CharacterNacionality" (
    "nacionalityId" uuid NOT NULL,
    "characterId" int NOT NULL,
    CONSTRAINT "nacionality_FK" FOREIGN KEY ("nacionalityId") REFERENCES "Nacionality"("id"),
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id"),
    PRIMARY KEY ("nacionalityId","characterId")
);

-- *Tabla de PersonajeOcupación
CREATE TABLE IF NOT EXISTS "CharacterOcupation" (
    "ocupationId" uuid NOT NULL,
    "characterId" int NOT NULL,
    CONSTRAINT "ocupation_FK" FOREIGN KEY ("ocupationId") REFERENCES "Ocupation"("id") ,
    CONSTRAINT "character_FK" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ,
    PRIMARY KEY ("ocupationId","characterId")
);


