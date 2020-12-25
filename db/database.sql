DROP DATABASE IF EXISTS blissful;
CREATE DATABASE blissful;

-- DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(30) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "password" VARCHAR NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "User" (first_name, last_name, email, password) 
VALUES (
  'Jaak', 
  'Kivinukk', 
  'jaak.kivinukk@gmail.com', 
  '$2a$10$.9yLBZQBIOYfhLjb4bAgg.YqA4HH10Z3Y6aCTHOs2zLYCcXfvbw9a'
);

CREATE TABLE "BodyTreatment" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(200) NOT NULL,
  "image_link" VARCHAR DEFAULT NULL,
  "short_description" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Studio" (
  "id" SERIAL PRIMARY KEY,
  "city" VARCHAR(200),
  "address" VARCHAR(400),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Studio.BodyTreatment" (
  "id" SERIAL PRIMARY KEY,
  "studio_id" INT,
  "body_treatment_id" INT,
  "duration" INT(5),
  "price" VARCHAR(20),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_studio 
    FOREIGN KEY(studio_id) 
      REFERENCES "Studio"(id) 
      ON DELETE CASCADE,
  CONSTRAINT fk_body_treatment 
    FOREIGN KEY(body_treatment_id) 
      REFERENCES "BodyTreatment"(id) 
      ON DELETE CASCADE
);

CREATE TABLE "Booking" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "studio_body_treatment_id" INT NOT NULL,
  "date" VARCHAR(10) NOT NULL,
  "start_time" VARCHAR(10) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
