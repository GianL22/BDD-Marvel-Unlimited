----------------------------------------------------
-- * 1) El Rating de un medio debe estar entre 1 y 5
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_media_rating() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."rating" < 1 OR NEW."rating" > 5 THEN
        RAISE EXCEPTION 'El rating de un medio debe estar entre 1 y 5';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER media_rating_trigger
BEFORE INSERT OR UPDATE ON "Rating"
FOR EACH ROW
EXECUTE FUNCTION check_media_rating();

----------------------------------------------------
-- * 2) El género debe ser “M”, “F”, “Desc”, “Otro”
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_gender() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."gender" NOT IN ('M', 'F', 'Desc', 'Otro') THEN
        RAISE EXCEPTION 'El género debe ser "M", "F", "Desc" o "Otro"';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gender_trigger
BEFORE INSERT OR UPDATE ON "Hero"
FOR EACH ROW
EXECUTE FUNCTION check_gender();

CREATE TRIGGER gender_trigger
BEFORE INSERT OR UPDATE ON "Villain"
FOR EACH ROW
EXECUTE FUNCTION check_gender();

CREATE TRIGGER gender_trigger
BEFORE INSERT OR UPDATE ON "Civil"
FOR EACH ROW
EXECUTE FUNCTION check_gender();

----------------------------------------------------
-- * 3) El estado marital debe ser “Soltero”, “Casado”, “Viudo”, “Divorciado”
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_marital_status() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."maritialStatus" NOT IN ('Soltero', 'Casado', 'Viudo', 'Divorciado') THEN
        RAISE EXCEPTION 'El estado marital debe ser "Soltero", "Casado", "Viudo" o "Divorciado"';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER marital_status_trigger
BEFORE INSERT OR UPDATE ON "Hero"
FOR EACH ROW
EXECUTE FUNCTION check_marital_status();

CREATE TRIGGER marital_status_trigger
BEFORE INSERT OR UPDATE ON "Villain"
FOR EACH ROW
EXECUTE FUNCTION check_marital_status();

CREATE TRIGGER marital_status_trigger
BEFORE INSERT OR UPDATE ON "Civil"
FOR EACH ROW
EXECUTE FUNCTION check_marital_status();

----------------------------------------------------
-- * 4) Los tipos de personajes deben ser protagonistas, antagonistas o secundarios
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_character_type() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."roleCharacter" NOT IN ('Protagonista', 'Antagonista', 'Secundario') THEN
        RAISE EXCEPTION 'Los tipos de personajes deben ser "Protagonista", "Antagonista" o "Secundario"';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER character_type_trigger
BEFORE INSERT OR UPDATE ON "Appears"
FOR EACH ROW
EXECUTE FUNCTION check_character_type();

----------------------------------------------------
-- * 5) Los tipos de actor son “Interpreta”, “presta su voz”
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_actor_type() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."interpretation" NOT IN ('Interpreta', 'Presta su voz') THEN
        RAISE EXCEPTION 'Los tipos de actor deben ser "Interpreta" o "Presta su voz"';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actor_type_trigger
BEFORE INSERT OR UPDATE ON "Appears"
FOR EACH ROW
EXECUTE FUNCTION check_actor_type();

----------------------------------------------------
-- * 6) Los cargos no pueden ser nulos  
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_cargo() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."cargoId" IS NULL THEN
        RAISE EXCEPTION 'El cargo no puede ser nulo';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cargo_trigger
BEFORE INSERT OR UPDATE ON "FormPart"
FOR EACH ROW
EXECUTE FUNCTION check_cargo();

-----------------------------------------------------------------------------
-- * 7) El sistema debe garantizar que cada héroe tiene un solo archienemigo
-----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION check_archenemy() RETURNS TRIGGER AS $$
DECLARE
    archenemy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO archenemy_count FROM "Hero" WHERE "archEnemy" = NEW."archEnemy";

    IF archenemy_count > 0 THEN
        RAISE EXCEPTION 'Cada héroe solo puede tener un archienemigo';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER archenemy_trigger
BEFORE INSERT OR UPDATE ON "Hero"
FOR EACH ROW
EXECUTE FUNCTION check_archenemy();

----------------------------------------------------
-- * 8) Si las pérdidas son mayores que las ganancias dar un mensaje 
----------------------------------------------------
CREATE OR REPLACE FUNCTION check_financials() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."cost" > NEW."revenue" THEN
        RAISE NOTICE 'El costo del medio es mayor a las ganancias por ende hubieron perdidas';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER financials_trigger
BEFORE INSERT OR UPDATE ON "Movie"
FOR EACH ROW
EXECUTE FUNCTION check_financials();

----------------------------------------------------
-- * 9) No está permitido tener más de un usuario con el mismo nombre de usuario 
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_unique_username() RETURNS TRIGGER AS $$
DECLARE
    username_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO username_count FROM "Users" WHERE "username" = NEW."username";

    IF username_count > 0 THEN
        RAISE EXCEPTION 'El nombre de usuario ya se encuentra reservado intente con otro';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER unique_username_trigger
BEFORE INSERT OR UPDATE ON "Users"
FOR EACH ROW
EXECUTE FUNCTION check_unique_username();

----------------------------------------------------
-- * 10) Existen 3 tipos de suscripciones, “Gold”, “Premium” y “VIP” y su tarifa varía siendo 
-- *     el plan “VIP” el más costoso. 
----------------------------------------------------

CREATE OR REPLACE FUNCTION check_memberships_type() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."type" NOT IN ('Gold', 'Premium', 'VIP') THEN
        RAISE EXCEPTION 'Los tipos de suscripciones válidos son "Gold", "Premium" y "VIP"';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscription_type_trigger
BEFORE INSERT OR UPDATE ON "Memberships"
FOR EACH ROW
EXECUTE FUNCTION check_memberships_type();