CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  name varchar
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name varchar,
  board_id int
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name varchar,
  description varchar,
  list_id int
);

ALTER TABLE lists ADD FOREIGN KEY (board_id) REFERENCES boards (id);

ALTER TABLE cards ADD FOREIGN KEY (list_id) REFERENCES lists (id);
