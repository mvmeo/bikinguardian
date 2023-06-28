CREATE TABLE "usuarios" (
  "id" serial PRIMARY KEY,
  "nombre" varchar,
  "apellido" varchar,
  "correo" varchar,
  "passwordHash" varchar,
  "rut" varchar,
  "telefono" varchar,
  "grupo_sanguineo" varchar,
  "fecha_nacimiento" date
);

CREATE TABLE "notificaciones" (
  "id" serial PRIMARY KEY,
  "usuario_id" integer,
  "descripcion" varchar,
  "fecha_creacion" timestamp DEFAULT (now())
);

CREATE TABLE "eventos" (
  "id" serial PRIMARY KEY,
  "usuario_id" integer,
  "titulo" varchar,
  "descripcion" text,
  "estado" boolean DEFAULT false,
  "fecha_creacion" timestamp DEFAULT (now())
);

CREATE TABLE "contactos" (
  "id" serial PRIMARY KEY,
  "usuario_id" integer,
  "nombre" varchar,
  "apellido" varchar,
  "numero_telefono" varchar
);

ALTER TABLE "notificaciones" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id");

ALTER TABLE "eventos" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id");

ALTER TABLE "contactos" ADD FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id");
