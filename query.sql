-- Active: 1693398029625@@localhost@5432@db_mamarecipe

CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  level INT,
  image TEXT NULL
);

CREATE TABLE recipes (
  recipes_id SERIAL PRIMARY KEY,
  food_name VARCHAR(255) NOT NULL,
  image TEXT,
  ingredients TEXT NOT NULL,
  video_title VARCHAR(255),
  video TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE my_recipes (
  recipes_id SERIAL PRIMARY KEY,
  food_name VARCHAR(255) NOT NULL,
  image TEXT,
  ingredients TEXT NOT NULL,
  video_title VARCHAR(255),
  video TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  users_id INT NOT NULL
);

CREATE TABLE food_recipes (
  recipes_id SERIAL PRIMARY KEY,
  food_name VARCHAR(255) NOT NULL,
  image TEXT,
  ingredients TEXT NOT NULL,
  video_title VARCHAR(255),
  video TEXT NULL,
  food_category VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  users_id INT NOT NULL
);

CREATE TABLE liked_recipes (
    liked_recipes_id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    recipes_id INT NOT NULL
);

CREATE TABLE saved_recipes (
    saved_recipes_id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    recipes_id INT NOT NULL,
)

INSERT INTO users (name, email_address, password, level)
VALUES ('Nama Pengguna', 'email@contoh.com', 'passwordKu', 1);


UPDATE recipes 
SET 
  food_name = 'ayam bakar', 
  ingredients = 'new_ingredients', 
  video_title = 'new_video_title', 
  video = 'new_video_url'
WHERE recipes_id = 4;

