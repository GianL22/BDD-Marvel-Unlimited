-- *SE CREA LA BASE DE DATOS
CREATE DATABASE "MarvelUnlimited";
------------------------------------------------
-- *Funcion que permite generar UUID (ID Unicos)
------------------------------------------------
CREATE FUNCTION uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$;

------------------------------------------------
-- *PRIMER NIVEL DE TABLAS (Los que no tienen FK)
------------------------------------------------

-- *Tabla de Poderes
CREATE TABLE IF NOT EXISTS "Power" (
    "name" varchar(64) NOT NULL PRIMARY KEY,
    "description" varchar(256) NOT NULL
);

-- *Tabla de Tipos de Objetos
CREATE TABLE IF NOT EXISTS "ObjectType" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de Actores
CREATE TABLE IF NOT EXISTS "Actor" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL
);

-- *Tabla de Directores
CREATE TABLE IF NOT EXISTS "Director" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL
);

-- *Tabla de Creadores
CREATE TABLE IF NOT EXISTS "Creator" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL,
    "lastName" varchar(64) NOT NULL
);

-- *Tabla de Colores
CREATE TABLE IF NOT EXISTS "Color" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de tipo de Edificaciones
CREATE TABLE IF NOT EXISTS "EdificationType" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de Lugares
CREATE TABLE IF NOT EXISTS "Place" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL
);

-- *Tabla de Cargo
CREATE TABLE IF NOT EXISTS "Cargo" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de Tipo de AudioVisual
CREATE TABLE IF NOT EXISTS "AudiovisualType" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de Compañia
CREATE TABLE IF NOT EXISTS "Company" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "description" varchar(64) NOT NULL
);

-- *Tabla de País
CREATE TABLE IF NOT EXISTS "Country" (
    "name" varchar(64) NOT NULL PRIMARY KEY
);

-- *Tabla de nacionalidad
CREATE TABLE IF NOT EXISTS "Nacionality" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL
);

-- *Tabla de Ocupación
CREATE TABLE IF NOT EXISTS "Ocupation" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL
);

-- *Tabla de Plataformas
CREATE TABLE IF NOT EXISTS "Platform" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar(64) NOT NULL
);

-- *Tabla de Tarjeta de Credito
CREATE TABLE IF NOT EXISTS "CreditCards" (
    "cardNumber" varchar(16) NOT NULL,
    "ownerName" varchar(64) NOT NULL,
    "ownerLastName" varchar(64) NOT NULL,
    "expiration" varchar(5) NOT NULL,
    "cvv" int4 NOT NULL,
    CONSTRAINT "expiration_CHK" CHECK ("expiration" ~ '^(0[1-9]|1[0-2])/([0-9]{2})$'),
    PRIMARY KEY ("cardNumber")
);

-- *Tabla de Membresia
CREATE TABLE IF NOT EXISTS "Memberships" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "price" float8 NOT NULL,
    "type" varchar(64) NOT NULL UNIQUE,
    "description" varchar(512) NOT NULL,
    CONSTRAINT "type_CHK" CHECK (type IN ('Gold', 'Premium', 'VIP')),
    PRIMARY KEY ("id")
);

