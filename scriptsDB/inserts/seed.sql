INSERT INTO "public"."Power" ("id", "name", "description") VALUES
('0ffd1562-4168-4a7e-bad4-dceb61633ba8', 'Super Fuerza', 'Es la habilidad de ser mas fuerte que los demas.'),
('3699ebc2-870b-44ca-8d2e-11ab94214402', 'Factor Curativo', 'Es la capacidad de recuperarse de lesiones corporales o enfermedades a una velocidad sobrehumana.'),
('5ff83c8d-3d4c-4af7-a566-2a62a1c05acd', 'Super Velocidad', 'Es la capacidad de moverse mucho mas rapido, algunos cerca de la velocidad del sonido, o incluso mas veloz.'),
('691d41f2-1d0d-4418-9c07-d12e07991827', 'Telepatía', 'Es la capacidad de leer y controlar las mentes y los pensamientos de humanos, animales y otros seres sensibles'),
('82c553b8-da27-41b1-88a5-0e60d621a146', 'Telekinesis', 'Es el poder de manipular objetos con la mente'),
('9236fb80-fd5b-431f-9ac2-39a3d6195647', 'Invisibilidad', 'Es el estado de un objeto que no se puede ver.'),
('ab2c0df7-4340-4f00-82cf-97ece6fd3c28', 'Durabilidad SuperHumana', 'El cuerpo de un personaje es más resistente a las lesiones físicas, en grados variables, que el de un humano común.'),
('b08074e3-42cd-4b5a-835c-493d842a95c6', 'Magia', 'Es la práctica de utilizar ciertas energías universales y fuerzas extradimensionales');

INSERT INTO "public"."ObjectType" ("id", "description") VALUES
('18ff0a77-96d8-486b-9f60-d7aa8dbd7ad9', 'Martillo'),
('3b9b6749-d7ba-4075-aad0-7b85841c7a46', 'Cetro'),
('5b95b644-b06e-4b47-9a3f-599fc11a9b40', 'Espada'),
('5fffbbb1-607e-41a7-adeb-f3c6338dc68d', 'Gema'),
('88c65d9f-81ec-4bfa-96a3-aab04f48f379', 'Armadura'),
('a1e17cd1-9472-4014-be4d-501c29455618', 'Casco'),
('b2289e0e-6263-4033-8325-910fc88d2c27', 'Arco'),
('e444eae8-2d93-48f6-b37a-59ac617cfe20', 'Lanza'),
('f0b937c5-030f-4a60-9235-0ce8dff9f429', 'Daga'),
('fe53f91b-239f-4ca0-bd23-32e4248c7177', 'Escudo');

INSERT INTO "public"."Actor" ("id", "name", "lastName") VALUES
('2e2add10-ae8f-4603-9fe1-73eadb999976', 'Samuel', 'L Jackson'),
('2e73d36e-d438-4d5a-a322-4645049d1a10', 'Scarlett', 'Johansson'),
('d0d44dbc-b4b3-494d-9725-a597e85b884e', 'Chris', 'Evans'),
('d43662d9-9c78-4700-85b6-f1205eb97e96', 'Robert', 'Downey Jr');

INSERT INTO "public"."Director" ("id", "name", "lastName") VALUES
('13389869-b9fa-4d89-a330-54e96c40df4e', 'James', 'Gunn'),
('24ae5bda-46d4-49ed-bb5d-f1873c35e6b8', 'Joss', 'Whedon'),
('8a521817-5b47-4c33-90eb-bceebc6d77d8', 'Joe', 'Russo'),
('bb60e3f1-4fbd-4ba9-827d-9f472d62290a', 'Kevin', 'Feige'),
('e34969e9-b062-47b0-bbe7-69fdd8ad88c6', 'Taika', 'Waititi');

INSERT INTO "public"."Creator" ("id", "name", "lastName") VALUES
('0a49a547-fec3-4d75-91fe-a6b1aa65ff87', 'Stan', 'Lee'),
('13e02c10-efd3-44ed-94ea-07e181d975b9', 'John', 'Buscema'),
('21530651-13d2-417f-baaf-a2eba3c5f412', 'Steve', 'Ditko'),
('2760a398-4ab7-4425-85e4-b950dcc1fa42', 'Jeremy', 'Slater'),
('4097174c-e470-4757-99f2-0657a52f2b30', 'John', 'Romita Sr.'),
('43cc5188-14a0-43e8-aa93-e116c95bcb73', 'Larry', 'Lieber'),
('4ad3f1f0-37df-41e9-b73d-2bf5e6abfc14', 'Jerry', 'Robinson'),
('7913aaca-4a54-4d21-889c-d000edd0a2f4', 'Hy', 'Rosen'),
('81c4fbd8-36df-48cf-ac78-da3e92de0df2', 'Don', 'Rico'),
('a58916b6-cbe8-46c4-9419-65407884f575', 'Scott', 'Buck'),
('b763ffc3-c0ad-4981-9f48-6d815dee6e3f', 'Jack', 'Kirby'),
('ba6faf79-8256-4b3a-aa86-9c8c3441c71e', 'Drew', 'Goddard');

INSERT INTO "public"."Color" ("id", "description") VALUES
('02ad3ea5-bdcb-40c6-86ae-11e3939b568e', 'Rosa'),
('0fb8797a-dba3-480c-97d6-8daf0cc627c4', 'Amarillo'),
('1b707eb6-7f38-45d0-9ad3-44b3efecfc99', 'Negro'),
('2ac9e980-0349-46c4-8c67-6bdbdd78d3e4', 'Rubio'),
('2fc5d66a-7a67-4772-ac16-8322326e265c', 'Purpura'),
('32fcc765-e154-498c-8273-3f930de03ba8', 'Verde'),
('460c5f83-40ed-4541-8c2a-7f081c22f418', 'Gris'),
('5fc9b19b-f5c8-4e4d-a3d9-6049f95af5aa', 'Naranja'),
('624cbdf1-d5ae-4677-85a4-80bc1670ea48', 'Rojo'),
('6b97a144-9e42-4be6-a0bb-547a4fdfd911', 'Azul'),
('a21aa3f2-ad53-441e-a0ca-e90aa46735dc', 'Blanco'),
('cf56c1fe-ae6c-420f-95ce-84f9ebe29efb', 'Violeta'),
('fe839da0-1dad-4e13-b040-51137c22ae42', 'Marron'),
('ff3e776d-126d-4212-a4e8-41a22c114a83', 'Morado');

INSERT INTO "public"."BuildingType" ("id", "description") VALUES
('017a0afc-0ce4-49a0-99de-086d5cad8ef2', 'Edificio'),
('5baeb784-5aed-4507-8f74-822d92787392', 'Mando Móvil'),
('5d9f7992-98d9-4fbb-9f69-140a32d93930', 'Vehículo Aéreo'),
('9a821792-6739-426b-a4fc-b30bf08271d4', 'Mansión');

INSERT INTO "public"."Place" ("id", "name") VALUES
('3ddc9440-a44c-4aeb-a280-23041b9b5de2', 'Latveria'),
('707c6c63-813e-403f-aee2-5f5116090def', 'Los Angeles'),
('7c8b24c3-beb6-487e-a987-3e2e8c3d1878', 'Wakanda'),
('9eaa5585-d991-4e86-84cf-7949ccedc4c1', 'California'),
('a6cfe83a-4576-4e4e-84a0-677f0ea0384a', 'Asgard'),
('b4af31b0-4945-4983-bbf6-80f1242b2e60', 'Sokovia'),
('e04a5369-30be-4eef-8349-3aa0f00da017', 'New York');

INSERT INTO "public"."JobPosition" ("id", "name") VALUES
('8f18a284-bb79-4fde-9f72-e3fc7f94f572', 'Lider Estratégico'),
('a397af19-cca1-48d4-96a2-5c00c1f43abb', 'General de Operaciones'),
('d0adebaf-00bf-47d2-9e7a-58d28e06c1fb', 'Jefe de Batallón');

INSERT INTO "public"."AudiovisualType" ("id", "description") VALUES
('7222e946-4114-4da8-8818-44630ea838d9', 'Live Action'),
('ad9ec0a8-452f-4481-9c48-ddfced225985', 'Animada'),
('eb5d25f0-21e8-4e1f-8099-b4459d4f6ded', 'Stop Motion');

INSERT INTO "public"."Company" ("id", "description") VALUES
('5e31c409-e77f-47f4-b3f1-315dc4799e01', 'Insomniac Games'),
('7fff27f6-3bb6-4a04-8dd4-4778b7c02187', 'Marvel Studios'),
('8ca65e8b-f8a4-4c50-9abf-2d82ca083b00', 'ABC Studios'),
('bcf99b65-87f1-4e51-9eb9-a24553ac4d83', '2K'),
('c5a79be4-3a04-48f3-9c59-6956cb048257', 'Firaxis Games'),
('d18cad38-e449-4633-9a44-397d2fe284c4', 'Capcom'),
('dc485591-c561-4557-8ca4-5c69fee7bf6c', 'Walt Disney Studios'),
('f2ca110c-c079-4560-bf0c-9ecf7f160020', 'Sony Entertainment');

INSERT INTO "public"."Country" ("description") VALUES
('Alemania'),
('Estados Unidos'),
('Italia'),
('Venezuela');

INSERT INTO "public"."City" ("id", "description", "countryDescription") VALUES
('277f4c9b-6aa3-45bc-a6b3-a32cfc355cb1', 'Chicago', 'Estados Unidos'),
('4b5bcf7b-c271-4347-bc20-a3341e32a786', 'Carupano', 'Venezuela'),
('4cb23c4f-5969-4dac-a787-2a7f81f7ce89', 'Washington D. C.', 'Estados Unidos'),
('4d640e98-dee5-4769-b971-37da6b14a790', 'Maracaibo', 'Venezuela'),
('57dd3b2e-7901-49c6-b7bc-bf5e9ce78b9d', 'Los Ángeles', 'Estados Unidos'),
('6b89c84e-8830-4bf5-a077-750137f4f397', 'Colonia', 'Alemania'),
('6f96432a-a057-4fb7-9917-12319847609c', 'Florencia', 'Italia'),
('7ab997fe-b2bb-4d01-9820-7c2c72737ca5', 'Milán', 'Italia'),
('7f28b33e-87ac-4466-a06c-66a5ee62d2e5', 'Roma', 'Italia'),
('86a3fab4-78d9-4771-bd51-e2bf816da584', 'Dresde', 'Alemania'),
('94d0052b-f831-4b6f-b6e9-c650a760ad1e', 'Berlín', 'Alemania'),
('9dd7c2a6-c4dc-47c0-bfe9-95d086a72d70', 'Hamburgo', 'Alemania'),
('9e17d09b-96c9-4367-8512-e4f8deb591b7', 'Venecia', 'Italia'),
('aab61eff-b863-482f-a3ff-77d644d4f881', 'Phoenix', 'Estados Unidos'),
('c05dffae-e095-4e59-ad98-6c9de53d2923', 'Valencia', 'Venezuela'),
('c1638076-84dd-4e75-84fa-9aad9431cef3', 'Nueva York', 'Estados Unidos'),
('c45739e7-49b8-4f35-abb6-6ef6dfa8b1b3', 'Múnich', 'Alemania'),
('c4de0560-10b8-4ace-a333-79015fa0fac9', 'Génova', 'Italia'),
('d05f7a13-b3f5-4d8c-ae35-237f3698f791', 'Cumana', 'Venezuela'),
('f723fd06-038b-4a24-8baa-d314516d3765', 'Caracas', 'Venezuela');

INSERT INTO "public"."Nacionality" ("id", "name") VALUES
('0c41725f-eba2-425c-a6a3-62dec1367f7d', 'Americano'),
('23e5c006-79ce-4338-ab60-96e057b9fd21', 'Frances'),
('23f005b7-3f61-45a7-92cd-bafba525969c', 'Asgardiano'),
('38f59984-4afe-4c2e-8c55-b9d46b42bf74', 'Aleman'),
('57e727f0-e8e3-4055-9aec-6caa8497df13', 'Wakandiano'),
('5fe51789-ae06-4119-8540-59723b0d34a0', 'Venezolano'),
('7397d5c2-1cd2-41e3-a5da-13f1424c9847', 'Dynamo City'),
('89e8612a-f33b-4699-b448-d0d0b49b3b09', 'Italiano'),
('ad47d31e-da02-4d2d-a71d-81d2e6466d5e', 'Jotun'),
('b50706b5-c94a-44ec-becc-d7e258c91a11', 'Titan'),
('cddb892a-93a5-4bec-b6bd-0cad1b94419b', 'Hell'),
('f19d92cc-dc8b-4a9f-9dac-ff18ac60da3c', 'Arabe');

INSERT INTO "public"."Occupation" ("id", "name") VALUES
('1bf49e02-9fd5-4c37-89e2-51de2a090946', 'Taxista'),
('5efa5ce7-4ca0-4696-935e-05232ad56d67', 'Conquistador'),
('5f0653a6-4d00-4af5-9105-bbc65d237f24', 'Rey'),
('6b235ccd-b24c-4818-a3bb-b4f7a23a6b5f', 'Trabajador Social'),
('6d27cded-eca9-4e45-a481-638b22bf0889', 'Contador'),
('82cff841-e9f7-4eb4-96f1-5af5deb74aba', 'Piloto de acrobacias'),
('9abaaf4c-42c4-4646-a5eb-35189b401960', 'Investigador Privado'),
('a1e8f1f3-e52f-4308-985e-6bea313f83c3', 'Abogado'),
('c1c18b99-819f-4fad-a00b-914b8bed29f1', 'Cientifico'),
('ecca16b9-a4eb-444e-baa3-0502f3614f5c', 'Empresario'),
('f65b7c5d-86cb-4f6b-8f62-d983e5ab84ae', 'Fotógrafo'),
('fe94439c-3898-4da0-a659-afd40bbb12e9', 'Ilustrador');

INSERT INTO "public"."Platform" ("id", "name") VALUES
('3081fc03-3e0c-408b-89f1-a361b9a3587e', 'Xbox One'),
('5076fb31-d7ac-413a-9647-9843f1538cd9', 'PlayStation 4'),
('7cc75a65-dd3b-4f5a-bc5d-3014539443ea', 'PlayStation 2'),
('814abdfb-5d30-4cd1-9e8a-6c18a70c2311', 'PlayStation 1'),
('8709aa04-ec9d-4762-90e7-42a193abc450', 'Nintendo Switch'),
('b53596c2-14e8-4385-aa1c-40ba7a9de3b6', 'PlayStation 5'),
('cf6b56e9-3afc-469a-9c77-30101ecb9efa', 'PlayStation 3'),
('ea75585f-34a1-46ea-a69e-b3b44e840be7', 'Xbox 360'),
('ead06ed7-190c-40b7-baed-91b779c7107a', 'Wii');

INSERT INTO "public"."CreditCards" ("cardNumber", "ownerName", "ownerLastName", "expiration", "cvv") VALUES
('1234543454345671', 'Alejadro', 'Molina', '12/24', 123),
('1234567654345654', 'Gian', 'Lancita', '12/25', 123),
('5018782000890122', 'Alejandro', 'Molina', '12/26', 123);

INSERT INTO "public"."Memberships" ("id", "price", "type", "description") VALUES
('03d122b0-a08d-4d3d-96d8-5563c04c2d73', 9.99, 'Gold', 'Acceso iimitado a las últimas películas y series de Marvel. / Información detallada de los personajes de Marvel. / Solo un perfil de usuario.'),
('2d4d3fe7-fa99-4123-b3b1-7106a43c9280', 15.99, 'Premium', 'Acceso ilimitado y exclusivo a películas, series, videojuegos y cómics de Marvel. / Información detallada y actualizada constantemente sobre los personajes de Marvel y su relación con los cómics. / Hasta 5 perfiles de usuario para compartir la suscripción con familiares o amigos.'),
('d3bda017-b742-4dde-956e-00f8eeec700d', 79.99, 'VIP', 'Acceso ilimitado y exclusivo a películas, series, videojuegos y cómics de Marvel. / Información detallada y actualizada constantemente sobre los personajes de Marvel y su relación con los cómics. / Hasta 5 perfiles de usuario para compartir la suscripción con familiares o amigos.');

INSERT INTO "public"."Object" ("id", "name", "description", "material", "objectTypeId") VALUES
('02e8f604-20ca-4e44-b5f4-0741bccd2a76', 'Cetro', 'Era un cetro que sirvió como un dispositivo de contención para la Gema de la Mente', 'Metal', '3b9b6749-d7ba-4075-aad0-7b85841c7a46'),
('44133556-e268-4bd1-97ce-c6baa917613a', 'Lanza de Vibranio', 'Es el arma wakandiana tradicional de las Dora Milaje.', 'Vibranio', 'e444eae8-2d93-48f6-b37a-59ac617cfe20'),
('5738dba1-1c3a-4029-8731-46ec0d4ae1d6', 'Mjolnir', 'Es el martillo de guerra encantado de Thor. Fue forjada con Uru en el corazón de una estrella moribunda en Nidavellir', 'Metal Uru', '18ff0a77-96d8-486b-9f60-d7aa8dbd7ad9'),
('78258d52-b373-4f06-b47d-e4ffda787413', 'Iron Spider', 'Fabricado con nano-tecnología avanzada a escala de proteínas y manejo de materiales exóticos, pantalla de piel LEP, armadura de detección de impactos.', 'Nanotecnología', '88c65d9f-81ec-4bfa-96a3-aab04f48f379'),
('a5098c2a-eeba-4235-832d-7b67f40d6dfb', 'Escudo Del Capitán América', 'Fue la principal arma defensiva y ofensiva de Steven Rogers. El escudo original que llevó Rogers en la Segunda.', 'Vibranio', 'fe53f91b-239f-4ca0-bd23-32e4248c7177'),
('ea27c2a6-4717-49d7-966e-51d92e448369', 'Excálibur', 'Es una legendaria espada larga recta de doble filo con una empuñadura cruciforme y una empuñadura segmentada para usar con dos manos', 'Metal', '5b95b644-b06e-4b47-9a3f-599fc11a9b40');

INSERT INTO "public"."Character" ("id", "eyeColor", "hairColor") VALUES
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', '6b97a144-9e42-4be6-a0bb-547a4fdfd911', 'fe839da0-1dad-4e13-b040-51137c22ae42'),
('14ebfa71-b8bb-43dd-8d4f-7164f66baac5', '6b97a144-9e42-4be6-a0bb-547a4fdfd911', '1b707eb6-7f38-45d0-9ad3-44b3efecfc99'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '0fb8797a-dba3-480c-97d6-8daf0cc627c4', '6b97a144-9e42-4be6-a0bb-547a4fdfd911'),
('493a57c5-77b6-4d10-af42-0773fc9d444a', '32fcc765-e154-498c-8273-3f930de03ba8', '0fb8797a-dba3-480c-97d6-8daf0cc627c4'),
('69d310d1-e3f5-4233-a915-dbfd711e98df', '6b97a144-9e42-4be6-a0bb-547a4fdfd911', '2ac9e980-0349-46c4-8c67-6bdbdd78d3e4'),
('7ce3877c-9854-40f1-bb2b-9174ec1bf92b', 'fe839da0-1dad-4e13-b040-51137c22ae42', 'fe839da0-1dad-4e13-b040-51137c22ae42'),
('82e13d83-214f-453d-8f65-23167d720a55', '6b97a144-9e42-4be6-a0bb-547a4fdfd911', '2ac9e980-0349-46c4-8c67-6bdbdd78d3e4'),
('92dbbda4-e32a-4abd-8004-59f4c647ed7b', 'fe839da0-1dad-4e13-b040-51137c22ae42', 'a21aa3f2-ad53-441e-a0ca-e90aa46735dc'),
('95cb1578-eea8-4e5b-a6d7-8989c307ad4a', 'fe839da0-1dad-4e13-b040-51137c22ae42', '1b707eb6-7f38-45d0-9ad3-44b3efecfc99'),
('b2b91971-545e-4407-9ebe-ff8170a586ae', '1b707eb6-7f38-45d0-9ad3-44b3efecfc99', '624cbdf1-d5ae-4677-85a4-80bc1670ea48'),
('ba9812db-f7e9-4ce7-a41d-79b5756db8cf', 'fe839da0-1dad-4e13-b040-51137c22ae42', 'fe839da0-1dad-4e13-b040-51137c22ae42'),
('c68106dd-1870-46d1-8c90-4e376699602f', 'fe839da0-1dad-4e13-b040-51137c22ae42', '624cbdf1-d5ae-4677-85a4-80bc1670ea48'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '624cbdf1-d5ae-4677-85a4-80bc1670ea48', '2fc5d66a-7a67-4772-ac16-8322326e265c');

INSERT INTO "public"."Villain" ("characterId", "name", "lastName", "gender", "phrase", "maritialStatus", "firstApparition", "nameVillain", "objective") VALUES
('14ebfa71-b8bb-43dd-8d4f-7164f66baac5', 'Loki', 'Laufeyson', 'M', 'Soy Loki, de Asgard, y en mi descansa un glorioso propósito.', 'Soltero', 'Venus #6', 'Loki', 'Tomar el Reino de Asgard'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', 'Carlos', 'Fornari', 'Desc', 'Sentido comun', 'Casado', 'Nose', 'Buitre', 'Conquistar la vida'),
('493a57c5-77b6-4d10-af42-0773fc9d444a', 'Johann', 'Shmidt', 'M', 'Guío a otros a un tesoro que no puedo poseer.', 'Soltero', 'Captain America Comics #7', 'Red Skull', 'Gobernar el mundo'),
('7ce3877c-9854-40f1-bb2b-9174ec1bf92b', 'Nathaniel', 'Richards', 'M', 'Cuando ves el tiempo como lo hago yo, lo sabes todo. Todo a lo que te aferras... Todo a lo que llamas vida... Yo sé cómo termina', 'Soltero', 'Avengers #8', 'Kang el Conquistador', 'Deseaba dominar la Tierra, pero no la Tierradevastada del siglo XL sino una Tierra aún joven y vital.'),
('95cb1578-eea8-4e5b-a6d7-8989c307ad4a', 'Erik', 'Killmonger', 'M', 'La gente muere todos los días. Eso es sólo parte de la vida aquí.', 'Soltero', 'Jungle Action (Vol. 2) #6', 'Killmonger', 'Acabar con T''Challa y conquistar Wakanda y el mundo entero con vibranium'),
('b2b91971-545e-4407-9ebe-ff8170a586ae', 'Mephisto', 'Satan', 'M', '¿Habéis preparado vuestras almas para el caos que se avecina?', 'Soltero', 'Bible Tales for Young Folk #1', 'Mephisto', 'Dejar a los héroes fuera del tablero y distraídos para llevar a cabo su verdadero plan.'),
('ece18927-4c46-4955-979c-4bb560a0a20f', 'Thanos', 'Jhonson', 'M', 'Podría chasquear mis dedos y todos vosotros dejaríais de existir', 'Viudo', 'Iron Man #55', 'Thanos', 'Salvar a un universo que estaba destinado a extinguirse derivado de la sobrepoblación.');

INSERT INTO "public"."Hero" ("characterId", "name", "lastName", "gender", "phrase", "maritialStatus", "firstApparition", "nameHero", "logo", "archEnemy") VALUES
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', 'Peter', 'Parker', 'M', 'Un gran poder conlleva una gran responsabilidad', 'Casado', 'Amazing Fantasy #15', 'Spider-Man', '/logos/spider-man', 'b2b91971-545e-4407-9ebe-ff8170a586ae'),
('69d310d1-e3f5-4233-a915-dbfd711e98df', 'Thor', 'Odinson', 'M', 'La vida se trata de crecimiento y cambio. Pero tú, querido hermano travieso, solo quieres seguir igual', 'Soltero', 'Venus #11', 'Thor', '/logos/thor', '14ebfa71-b8bb-43dd-8d4f-7164f66baac5'),
('82e13d83-214f-453d-8f65-23167d720a55', 'Steven', 'Rogers', 'M', 'El precio de la libertad es alto y es un precio que estoy dispuesto a pagar', 'Soltero', 'Captain America Comics #1', 'Capitán América', '/logos/capitán-américa', '493a57c5-77b6-4d10-af42-0773fc9d444a');

INSERT INTO "public"."Civil" ("characterId", "name", "lastName", "phrase", "firstApparition", "heroId", "villainId", "gender", "maritialStatus") VALUES
('92dbbda4-e32a-4abd-8004-59f4c647ed7b', 'Maybelle', 'Parker ', 'Algunas personas por naturaleza son amables y caritativas.', 'Amazing Fantasy #15', '03ca5338-b0c0-4e6c-809c-c14913d93aa0', NULL, 'F', 'Viudo'),
('ba9812db-f7e9-4ce7-a41d-79b5756db8cf', 'Nicholas', 'Fury', 'La última vez que confié en alguien, perdí un ojo', 'Sgt. Fury #1', NULL, NULL, 'M', 'Soltero'),
('c68106dd-1870-46d1-8c90-4e376699602f', 'Mary', 'Jane', 'Esperar una decepción hará que no te decepciones', 'Amazing Spider-Man #25', '03ca5338-b0c0-4e6c-809c-c14913d93aa0', NULL, 'F', 'Casado');

INSERT INTO "public"."Organization" ("id", "name", "slogan", "objetive", "firstApparition", "placeCreation", "founder", "leader") VALUES
('050295b2-ecd5-487c-b678-178edcbe8267', 'S.H.I.E.L.D.', 'Protección. Una palabra. A veces, para proteger a un hombre de él mismo', 'Mantener la seguridad mundial. Fundada como consecuencia de la victoria de los Aliados sobre las Potencias del Eje y HYDRA en la Segunda Guerra Mundial, S.H.I.E.L.D. ', 'Strange Tales #135', 'e04a5369-30be-4eef-8349-3aa0f00da017', 'ba9812db-f7e9-4ce7-a41d-79b5756db8cf', 'ba9812db-f7e9-4ce7-a41d-79b5756db8cf'),
('0eb22e24-28d6-4744-8db8-75f2b6078baa', 'Consejo de Kangs', '¿Dime a cuántos convocaste? A todos nosotros.', 'Eliminar a todas las variantes divergentes de Kang dentro del multiverso.', 'The Avengers #8', 'e04a5369-30be-4eef-8349-3aa0f00da017', '7ce3877c-9854-40f1-bb2b-9174ec1bf92b', '7ce3877c-9854-40f1-bb2b-9174ec1bf92b'),
('b3451245-37fa-4194-a193-c3a9cee4f2ae', 'Avengers', 'Er pepe', 'asassasaass', 'Hola como estas mi pana te quiero <3', '707c6c63-813e-403f-aee2-5f5116090def', 'b2b91971-545e-4407-9ebe-ff8170a586ae', 'c68106dd-1870-46d1-8c90-4e376699602f'),
('f0ee41f8-3d42-4e78-a8fa-c2bc57465c18', 'HYDRA', 'Se fundó bajo la creencia de que a la humanidad no se le podía confiar su propia libertad.', 'La dominación del mundo.', 'Captain America: First Vengeance', 'e04a5369-30be-4eef-8349-3aa0f00da017', '493a57c5-77b6-4d10-af42-0773fc9d444a', '493a57c5-77b6-4d10-af42-0773fc9d444a');

INSERT INTO "public"."Headquarter" ("organizationId", "id", "name", "ubication", "buildingType") VALUES
('050295b2-ecd5-487c-b678-178edcbe8267', '208a017d-37a4-4530-a236-8f6379e42212', 'Zephyr One', '7c8b24c3-beb6-487e-a987-3e2e8c3d1878', '5baeb784-5aed-4507-8f74-822d92787392'),
('050295b2-ecd5-487c-b678-178edcbe8267', '7e8add4f-f8da-4060-88c0-92dc0cf2b89b', 'Helicarrier', 'e04a5369-30be-4eef-8349-3aa0f00da017', '5d9f7992-98d9-4fbb-9f69-140a32d93930');

INSERT INTO "public"."Medio" ("id", "companyProduction") VALUES
('0138075b-da41-412a-987d-238cc2ceb3ef', 'dc485591-c561-4557-8ca4-5c69fee7bf6c'),
('0f06abb4-4a74-4e1d-86a7-f0788b7c594f', 'dc485591-c561-4557-8ca4-5c69fee7bf6c'),
('145e78bf-a5c9-41e2-b369-a6462146f479', 'dc485591-c561-4557-8ca4-5c69fee7bf6c'),
('58aac684-aca0-47d7-9ee0-e73603dfb0c0', 'dc485591-c561-4557-8ca4-5c69fee7bf6c'),
('5bcf9f5c-b3d2-49dd-8d38-eb3440500581', '8ca65e8b-f8a4-4c50-9abf-2d82ca083b00'),
('5f391a0f-c8b3-4c64-9d42-c657c4e81119', '5e31c409-e77f-47f4-b3f1-315dc4799e01'),
('698770c7-ec85-4425-ad09-9ed967163111', 'c5a79be4-3a04-48f3-9c59-6956cb048257'),
('917a7d6b-e689-400f-8861-f65f5061ca2f', 'dc485591-c561-4557-8ca4-5c69fee7bf6c'),
('9aa352be-8812-4d36-90b9-d3525ee32cf3', 'd18cad38-e449-4633-9a44-397d2fe284c4'),
('bff4601a-d642-48fc-a198-f13d423e8198', '5e31c409-e77f-47f4-b3f1-315dc4799e01'),
('d6db5921-7d0e-4a3d-a868-63dc3ff33a67', '7fff27f6-3bb6-4a04-8dd4-4778b7c02187'),
('e6dd85e9-82df-4ec0-beaa-9e18e901f6cc', '8ca65e8b-f8a4-4c50-9abf-2d82ca083b00'),
('f0abff7f-26e7-468b-ad68-b406091d5fe3', '8ca65e8b-f8a4-4c50-9abf-2d82ca083b00'),
('f28b666e-a5ac-4919-bc35-f106200d891f', '7fff27f6-3bb6-4a04-8dd4-4778b7c02187'),
('fe4323cf-db41-40f0-9e88-b6400dc67c99', '8ca65e8b-f8a4-4c50-9abf-2d82ca083b00');

INSERT INTO "public"."Movie" ("medioId", "title", "releaseDate", "synopsis", "duration", "based", "cost", "revenue", "director", "companyDist", "audioVisualType", "poster") VALUES
('0138075b-da41-412a-987d-238cc2ceb3ef', 'Avengers: Infinity War', '2018-04-27', 'Los superhéroes se alían para vencer al poderoso Thanos, el peor enemigo al que se han enfrentado. Si Thanos logra reunir las seis gemas del infinito: poder, tiempo, alma, realidad, mente y espacio, nadie podrá detenerlo.', 149, 'The Avengers #1', 600000, 500000, 'e34969e9-b062-47b0-bbe7-69fdd8ad88c6', 'dc485591-c561-4557-8ca4-5c69fee7bf6c', '7222e946-4114-4da8-8818-44630ea838d9', '9bcc9339-0852-4b3d-8691-86d068a47690.jpeg'),
('0f06abb4-4a74-4e1d-86a7-f0788b7c594f', 'Capitana Marvel', '2019-03-06', 'La guerrera Vers no recuerda su pasado, el cual vuelve a ella en sueños. A pesar de sus problemas para controlar sus emociones y, con ellas, sus poderes, la Inteligencia Suprema le permite participar en una misión. Con la ayuda de Nick Fury tratará de descubrir los secretos de su pasado mientras aprovecha sus poderes para acabar con la guerra.', 124, 'Marvel Super-Heroes #12', 1e+06, 450000, 'e34969e9-b062-47b0-bbe7-69fdd8ad88c6', 'dc485591-c561-4557-8ca4-5c69fee7bf6c', '7222e946-4114-4da8-8818-44630ea838d9', '18593d7b-8f7f-439d-ba54-96bf09f2e92b.png'),
('145e78bf-a5c9-41e2-b369-a6462146f479', 'Spider-Man: a través del Spider-Verso', '2023-06-01', 'Después de reunirse con Gwen Stacy, el amigable vecino de tiempo completo de Brooklyn Spiderman, es lanzado a través del multiverso, donde se encuentra a un equipo de gente araña encomendada con proteger su mera existencia.', 151, 'Miles Morales', 1e+08, 550000, 'e34969e9-b062-47b0-bbe7-69fdd8ad88c6', 'dc485591-c561-4557-8ca4-5c69fee7bf6c', 'ad9ec0a8-452f-4481-9c48-ddfced225985', '4ce9e747-cb09-4258-8652-9189151be626.jpeg'),
('f28b666e-a5ac-4919-bc35-f106200d891f', 'Avengers: Endgame', '2019-04-25', 'Después de los eventos devastadores de "Avengers: Infinity War", el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deberán reunirse una vez más para intentar detenerlo y restaurar el orden en el universo de una vez por todas.', 181, 'Los Vengadores', 3.65e+08, 400000, '8a521817-5b47-4c33-90eb-bceebc6d77d8', 'dc485591-c561-4557-8ca4-5c69fee7bf6c', '7222e946-4114-4da8-8818-44630ea838d9', 'bd45152a-b240-4820-9af5-601d6d93965f.jpeg');

INSERT INTO "public"."Serie" ("medioId", "title", "releaseDate", "synopsis", "based", "channel", "episodes", "creator", "audioVisualType", "poster") VALUES
('58aac684-aca0-47d7-9ee0-e73603dfb0c0', 'Loki', '2021-06-08', 'Después de robar el Teseracto durante los eventos de Avengers: Endgame (2019), una versión alternativa de Loki es llevada ante la misteriosa organización llamada Autoridad de Variación Temporal, una organización burocrática que existe fuera del tiempo y el espacio, y monitorea la línea de tiempo. Le dan a Loki una opción: enfrentarse a ser borrado de la existencia debido a que es una «variante de tiempo» o ayudar a arreglar la línea de tiempo y detener una amenaza mayor. Loki termina atrapado en su propio thriller criminal, viajando en el tiempo.', 'Venus #6', 'Disney+', 6, 'a58916b6-cbe8-46c4-9419-65407884f575', '7222e946-4114-4da8-8818-44630ea838d9', 'cca37442-abed-4507-bacf-b27b6d508fee.jpeg'),
('5bcf9f5c-b3d2-49dd-8d38-eb3440500581', 'Marvel - Daredevil', '2015-04-09', 'Protagonizada por Charlie Cox como Matt Murdock, un abogado del barrio neoyorquino de Hell''s Kitchen, que quedó ciego en un accidente que incrementó sus cuatro sentidos restantes y que lucha como un justiciero todas las noches contra el crimen bajo el sobrenombre de Daredevil, mientras lucha con el descubrimiento de una conspiración del mundo criminal, que está siendo dirigido en las sombras por Wilson Fisk.', 'Daredevil', 'Disney+', 39, 'ba6faf79-8256-4b3a-aa86-9c8c3441c71e', '7222e946-4114-4da8-8818-44630ea838d9', 'b0ae557e-c473-4ca8-a92e-6b9a8c91bd91.jpeg'),
('d6db5921-7d0e-4a3d-a868-63dc3ff33a67', 'Moon Knight', '2022-03-29', 'La trama presenta a Steven Grant, un hombre amable y amistoso que trabaja en una tienda de regalos. Una persona que lleva una vida normal, pero es sorprendida por constantes "apagones" y recuerdos que parecen ser de otra persona.', 'Werewolf by Night #32', 'Disney+', 6, '2760a398-4ab7-4425-85e4-b950dcc1fa42', '7222e946-4114-4da8-8818-44630ea838d9', 'a35c18f6-1438-4fc8-ba61-505cdfe3c80c.jpeg'),
('e6dd85e9-82df-4ec0-beaa-9e18e901f6cc', 'The Punisher', '2017-11-16', 'En la primera temporada, Frank Castle, conocido en toda la ciudad de Nueva York como «el Castigador», luego de vengarse de los responsables de la muerte de su familia, descubre una gran conspiración más allá de lo que le hicieron a él y su familia.', 'Punisher', 'Netflix', 26, 'ba6faf79-8256-4b3a-aa86-9c8c3441c71e', '7222e946-4114-4da8-8818-44630ea838d9', '72db31af-c927-436d-a3c5-b3b003493c68.png'),
('f0abff7f-26e7-468b-ad68-b406091d5fe3', 'Marvel''s Inhumans', '2017-09-28', 'Los Inhumanos son una nueva especie que ha sido creada artificialmente por una raza alienígena. En un ritual que realizan cuando los inhumanos pasan de ser niños a adultos, utilizan las llamadas "Nieblas Terrigenas" para mutar a cada uno de ellos de manera diferente y otorgarles poderes sobrehumanos.', 'All-New Inhumans Vol. 1', 'Sony', 8, 'a58916b6-cbe8-46c4-9419-65407884f575', '7222e946-4114-4da8-8818-44630ea838d9', '34756b42-a675-41b4-bd21-ff73ff954772.jpeg'),
('fe4323cf-db41-40f0-9e88-b6400dc67c99', 'Jessica Jones', '2015-11-20', 'Jessica Jones es una mujer con superpoderes sin volar por los aires que tuvo una breve carrera como superheroína hasta un incidente en la que Kilgrave hizo que matara a alguien. Después de ese incidente, se convirtió en una investigadora privada. Cuando Kilgrave reaparece, Jessica debe alzarse para detenerlo.', 'Alias # 1', 'Netflix', 39, '0a49a547-fec3-4d75-91fe-a6b1aa65ff87', '7222e946-4114-4da8-8818-44630ea838d9', 'ff54ca4d-c6cf-401c-8e2f-f65a04055484.jpeg');

INSERT INTO "public"."VideoGame" ("medioId", "title", "releaseDate", "synopsis", "based", "type", "companyPublisher", "poster") VALUES
('5f391a0f-c8b3-4c64-9d42-c657c4e81119', 'Spider-Man: Miles Morales', '2020-11-11', 'La narración continúa desde Marvel''s Spider-Man y su contenido descargable The City That Never Sleeps ("La Ciudad Que Nunca Duerme"), durante el cual Miles Morales es mordido por una araña genéticamente mejorada y obtiene poderes similares a los de Peter Parker. Un año después del primer juego y su DLC, Miles se ha integrado completamente en el traje negro y rojo como un experimentado Spider-Man mientras defiende a Nueva York de una guerra de pandillas entre una corporación energética y un ejército criminal de alta tecnología.', 'Spider-Man: Miles Morales Vol. 1', 'Acción', 'f2ca110c-c079-4560-bf0c-9ecf7f160020', 'e1d7640d-4789-4af7-a257-42ac9d9af6b0.jpeg'),
('698770c7-ec85-4425-ad09-9ed967163111', 'Marvel''s Midnight Suns', '2022-12-01', 'Marvel''s Midnight Suns es un nuevo RPG táctico ambientado en el lado más oscuro del Universo Marvel. Forma un equipo con los Midnight Suns y vive entre ellos mientras luchas contra las fuerzas demoníacas del inframundo para evitar que Lilith, la Madre de los Demonios, resucite a su maestro Chthon.', 'Midnight Suns (2022) #1', 'Juego de rol táctico', 'bcf99b65-87f1-4e51-9eb9-a24553ac4d83', '04c71485-287d-4a29-8934-dccab0bb9451.jpeg'),
('917a7d6b-e689-400f-8861-f65f5061ca2f', 'X-Men Origins: Wolverine', '2023-07-10', 'La historia es una combinación de la historia de fondo de Wolverine explorada en la película y una trama original creada por Raven Software, que fue influenciada por los acontecimientos importantes en la serie de historietas de X-Men.', 'Wolverine: Origin', 'Acción', 'dc485591-c561-4557-8ca4-5c69fee7bf6c', '599e9261-e529-4cb2-8e0d-2e3bb9f049fb.jpeg'),
('9aa352be-8812-4d36-90b9-d3525ee32cf3', 'Marvel vs. Capcom: Infinite', '2017-09-20', 'Consiste en una secuencia de combates con diferentes héroes, con el objetivo de recuperar las gemas.', 'Infinity War Aftermath', 'Juegos de lucha', 'd18cad38-e449-4633-9a44-397d2fe284c4', '5d50a544-a043-4c4b-8d30-e579f036f77b.png'),
('bff4601a-d642-48fc-a198-f13d423e8198', 'Marvel''s Spider-Man', '2018-09-06', 'Peter Parker es un chico de 23 años, becario en un laboratorio Whilst y próximo a graduarse de la universidad. Peter ha sido el Hombre Araña por ocho años y se ha desempeñado como el protector de la Ciudad de Nueva York. En sus comienzos como héroe, Peter logró derrotar a un jefe mafioso llamado Wilson Fisk (alias Kingpin), pero una nueva pandilla conocida como los "Inner Demons" emergió apoderándose de los antiguos territorios de Fisk.', 'Amazing Fantasy nº15', 'Acción', 'f2ca110c-c079-4560-bf0c-9ecf7f160020', 'edd92129-3a0d-433a-87a4-8d18b6a9c4aa.jpeg');

INSERT INTO "public"."Users" ("id", "username", "name", "lastName", "email", "password", "birthdate", "isActive", "creditCardCardNumber", "cityId") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'alejoguevarafm', 'Alejandro A.', 'Molina', 'alejoguevarafm@gmail.com', '$2b$10$GOvu72QZsBy1.r0FaicpPemeNrMDaadLyoNVhO/zASRzJJRArgHDi', '2001-04-27', 't', '5018782000890122', 'f723fd06-038b-4a24-8baa-d314516d3765');

INSERT INTO "public"."Profiles" ("id", "userId", "nickname", "language", "hourConexion", "device", "timeWatched", "emailProfile", "avatar", "isActive") VALUES
('b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'a8af67e2-1914-4e32-8488-a95b331da7c8', 'Sandro S.', 'Español', 0, 'Laptop', 0, 'san@gmail.com', '/profiles/5.png', 't'),
('b571b58d-f43f-4911-b131-bfb6e1abd174', 'a8af67e2-1914-4e32-8488-a95b331da7c8', 'Bruno D.', 'Inglés', 0, 'Laptop', 0, 'reactsito@gmail.cm', '/profiles/4.png', 't'),
('ebe93b2b-0bf6-4d34-af20-c47ea67ee4b1', 'a8af67e2-1914-4e32-8488-a95b331da7c8', 'Gianfranco', 'Inglés', 0, 'Tablet', 0, 'gianlanza@gmail.com', '/profiles/3.png', 't');

INSERT INTO "public"."FightWith" ("villainId", "heroId") VALUES
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '03ca5338-b0c0-4e6c-809c-c14913d93aa0'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '82e13d83-214f-453d-8f65-23167d720a55'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '03ca5338-b0c0-4e6c-809c-c14913d93aa0'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '69d310d1-e3f5-4233-a915-dbfd711e98df'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '82e13d83-214f-453d-8f65-23167d720a55');

INSERT INTO "public"."MovieProgress" ("userId", "profileId", "movieId", "timeWatched") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '145e78bf-a5c9-41e2-b369-a6462146f479', 50);

INSERT INTO "public"."MyList" ("userId", "profileId", "medioId") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '145e78bf-a5c9-41e2-b369-a6462146f479'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '5f391a0f-c8b3-4c64-9d42-c657c4e81119'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'd6db5921-7d0e-4a3d-a868-63dc3ff33a67'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'e6dd85e9-82df-4ec0-beaa-9e18e901f6cc'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'fe4323cf-db41-40f0-9e88-b6400dc67c99');


INSERT INTO "public"."PreferenceList" ("userId", "profileId", "medioId") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '0138075b-da41-412a-987d-238cc2ceb3ef'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '145e78bf-a5c9-41e2-b369-a6462146f479'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '5f391a0f-c8b3-4c64-9d42-c657c4e81119'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '9aa352be-8812-4d36-90b9-d3525ee32cf3'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'e6dd85e9-82df-4ec0-beaa-9e18e901f6cc');

INSERT INTO "public"."Rating" ("userId", "profileId", "medioId", "rating") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '0138075b-da41-412a-987d-238cc2ceb3ef', 4.5),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '145e78bf-a5c9-41e2-b369-a6462146f479', 4),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '5f391a0f-c8b3-4c64-9d42-c657c4e81119', 5),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '9aa352be-8812-4d36-90b9-d3525ee32cf3', 2.5),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'e6dd85e9-82df-4ec0-beaa-9e18e901f6cc', 4.5),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'f0abff7f-26e7-468b-ad68-b406091d5fe3', 2.5),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b571b58d-f43f-4911-b131-bfb6e1abd174', '145e78bf-a5c9-41e2-b369-a6462146f479', 3.2),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b571b58d-f43f-4911-b131-bfb6e1abd174', 'bff4601a-d642-48fc-a198-f13d423e8198', 4.5);


INSERT INTO "public"."SeriesProgress" ("userId", "profileId", "serieId", "viewedEpisodes") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', 'f0abff7f-26e7-468b-ad68-b406091d5fe3', 5);

INSERT INTO "public"."SuitColors" ("heroId", "colorId") VALUES
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', '624cbdf1-d5ae-4677-85a4-80bc1670ea48'),
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', '6b97a144-9e42-4be6-a0bb-547a4fdfd911'),
('69d310d1-e3f5-4233-a915-dbfd711e98df', '1b707eb6-7f38-45d0-9ad3-44b3efecfc99'),
('69d310d1-e3f5-4233-a915-dbfd711e98df', '6b97a144-9e42-4be6-a0bb-547a4fdfd911'),
('82e13d83-214f-453d-8f65-23167d720a55', '624cbdf1-d5ae-4677-85a4-80bc1670ea48'),
('82e13d83-214f-453d-8f65-23167d720a55', '6b97a144-9e42-4be6-a0bb-547a4fdfd911'),
('82e13d83-214f-453d-8f65-23167d720a55', 'a21aa3f2-ad53-441e-a0ca-e90aa46735dc');

INSERT INTO "public"."Suscription" ("userId", "membershipId", "dateSuscription", "dateEnd", "isActive") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', '03d122b0-a08d-4d3d-96d8-5563c04c2d73', '2023-06-26', '2023-06-27', 'f'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', '2d4d3fe7-fa99-4123-b3b1-7106a43c9280', '2023-06-26', '2023-07-26', 't');

INSERT INTO "public"."UseObject" ("characterId", "objectId") VALUES
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '02e8f604-20ca-4e44-b5f4-0741bccd2a76'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', 'a5098c2a-eeba-4235-832d-7b67f40d6dfb'),
('95cb1578-eea8-4e5b-a6d7-8989c307ad4a', '44133556-e268-4bd1-97ce-c6baa917613a'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '02e8f604-20ca-4e44-b5f4-0741bccd2a76');

INSERT INTO "public"."UsePower" ("characterId", "powerId", "type", "inherited") VALUES
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '0ffd1562-4168-4a7e-bad4-dceb61633ba8', 'Natural', 't'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '5ff83c8d-3d4c-4af7-a566-2a62a1c05acd', 'Artificial', 't'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '691d41f2-1d0d-4418-9c07-d12e07991827', 'Artificial', 'f'),
('7ce3877c-9854-40f1-bb2b-9174ec1bf92b', '0ffd1562-4168-4a7e-bad4-dceb61633ba8', 'Artificial', 't'),
('7ce3877c-9854-40f1-bb2b-9174ec1bf92b', '82c553b8-da27-41b1-88a5-0e60d621a146', 'Artificial', 't'),
('b2b91971-545e-4407-9ebe-ff8170a586ae', 'b08074e3-42cd-4b5a-835c-493d842a95c6', 'Natural', 'f'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '0ffd1562-4168-4a7e-bad4-dceb61633ba8', 'Natural', 't'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '5ff83c8d-3d4c-4af7-a566-2a62a1c05acd', 'Natural', 't'),
('ece18927-4c46-4955-979c-4bb560a0a20f', 'ab2c0df7-4340-4f00-82cf-97ece6fd3c28', 'Natural', 't');


INSERT INTO "public"."VideoGamePlatform" ("videoGameId", "platformId") VALUES
('5f391a0f-c8b3-4c64-9d42-c657c4e81119', '5076fb31-d7ac-413a-9647-9843f1538cd9'),
('5f391a0f-c8b3-4c64-9d42-c657c4e81119', 'b53596c2-14e8-4385-aa1c-40ba7a9de3b6'),
('698770c7-ec85-4425-ad09-9ed967163111', '5076fb31-d7ac-413a-9647-9843f1538cd9'),
('698770c7-ec85-4425-ad09-9ed967163111', 'b53596c2-14e8-4385-aa1c-40ba7a9de3b6'),
('9aa352be-8812-4d36-90b9-d3525ee32cf3', '5076fb31-d7ac-413a-9647-9843f1538cd9'),
('9aa352be-8812-4d36-90b9-d3525ee32cf3', 'ea75585f-34a1-46ea-a69e-b3b44e840be7'),
('bff4601a-d642-48fc-a198-f13d423e8198', '5076fb31-d7ac-413a-9647-9843f1538cd9'),
('bff4601a-d642-48fc-a198-f13d423e8198', 'b53596c2-14e8-4385-aa1c-40ba7a9de3b6');

INSERT INTO "public"."VideoGameProgress" ("userId", "profileId", "videoGameId", "played") VALUES
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '5f391a0f-c8b3-4c64-9d42-c657c4e81119', 't'),
('a8af67e2-1914-4e32-8488-a95b331da7c8', 'b2f3fa03-e63d-46a2-a7b3-3d18406d80b0', '9aa352be-8812-4d36-90b9-d3525ee32cf3', 't');

INSERT INTO "public"."Appears" ("characterId", "medioId", "actorId", "rolCharacter", "rolActor") VALUES
('82e13d83-214f-453d-8f65-23167d720a55', '145e78bf-a5c9-41e2-b369-a6462146f479', 'd0d44dbc-b4b3-494d-9725-a597e85b884e', 'Secundario', 'Interpretado'),
('ba9812db-f7e9-4ce7-a41d-79b5756db8cf', '145e78bf-a5c9-41e2-b369-a6462146f479', '2e2add10-ae8f-4603-9fe1-73eadb999976', 'Antagonista', 'Voz'),
('c68106dd-1870-46d1-8c90-4e376699602f', 'f28b666e-a5ac-4919-bc35-f106200d891f', 'd0d44dbc-b4b3-494d-9725-a597e85b884e', 'Antagonista', 'Voz');

INSERT INTO "public"."CharacterCreator" ("characterId", "creatorId") VALUES
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '0a49a547-fec3-4d75-91fe-a6b1aa65ff87'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '4097174c-e470-4757-99f2-0657a52f2b30'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', 'b763ffc3-c0ad-4981-9f48-6d815dee6e3f'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '0a49a547-fec3-4d75-91fe-a6b1aa65ff87');

INSERT INTO "public"."CharacterNacionality" ("nacionalityId", "characterId") VALUES
('0c41725f-eba2-425c-a6a3-62dec1367f7d', '03ca5338-b0c0-4e6c-809c-c14913d93aa0'),
('0c41725f-eba2-425c-a6a3-62dec1367f7d', '370bfdcb-ac8f-4109-9c9f-91909a5b2a88'),
('0c41725f-eba2-425c-a6a3-62dec1367f7d', '7ce3877c-9854-40f1-bb2b-9174ec1bf92b'),
('0c41725f-eba2-425c-a6a3-62dec1367f7d', '82e13d83-214f-453d-8f65-23167d720a55'),
('0c41725f-eba2-425c-a6a3-62dec1367f7d', '92dbbda4-e32a-4abd-8004-59f4c647ed7b'),
('0c41725f-eba2-425c-a6a3-62dec1367f7d', 'b2b91971-545e-4407-9ebe-ff8170a586ae'),
('23f005b7-3f61-45a7-92cd-bafba525969c', '69d310d1-e3f5-4233-a915-dbfd711e98df'),
('38f59984-4afe-4c2e-8c55-b9d46b42bf74', '370bfdcb-ac8f-4109-9c9f-91909a5b2a88'),
('38f59984-4afe-4c2e-8c55-b9d46b42bf74', 'ba9812db-f7e9-4ce7-a41d-79b5756db8cf'),
('7397d5c2-1cd2-41e3-a5da-13f1424c9847', 'ece18927-4c46-4955-979c-4bb560a0a20f'),
('b50706b5-c94a-44ec-becc-d7e258c91a11', 'ece18927-4c46-4955-979c-4bb560a0a20f'),
('f19d92cc-dc8b-4a9f-9dac-ff18ac60da3c', '370bfdcb-ac8f-4109-9c9f-91909a5b2a88');

INSERT INTO "public"."CharacterOcupation" ("characterId", "occupationId") VALUES
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('14ebfa71-b8bb-43dd-8d4f-7164f66baac5', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '1bf49e02-9fd5-4c37-89e2-51de2a090946'),
('370bfdcb-ac8f-4109-9c9f-91909a5b2a88', '5f0653a6-4d00-4af5-9105-bbc65d237f24'),
('493a57c5-77b6-4d10-af42-0773fc9d444a', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('69d310d1-e3f5-4233-a915-dbfd711e98df', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('7ce3877c-9854-40f1-bb2b-9174ec1bf92b', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('82e13d83-214f-453d-8f65-23167d720a55', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('92dbbda4-e32a-4abd-8004-59f4c647ed7b', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('95cb1578-eea8-4e5b-a6d7-8989c307ad4a', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('b2b91971-545e-4407-9ebe-ff8170a586ae', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('ba9812db-f7e9-4ce7-a41d-79b5756db8cf', 'c1c18b99-819f-4fad-a00b-914b8bed29f1'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '5efa5ce7-4ca0-4696-935e-05232ad56d67'),
('ece18927-4c46-4955-979c-4bb560a0a20f', '5f0653a6-4d00-4af5-9105-bbc65d237f24');

INSERT INTO "public"."FormPart" ("characterId", "organizationId", "jobPositionId") VALUES
('03ca5338-b0c0-4e6c-809c-c14913d93aa0', 'b3451245-37fa-4194-a193-c3a9cee4f2ae', '8f18a284-bb79-4fde-9f72-e3fc7f94f572');