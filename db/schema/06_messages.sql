-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  room_id INTEGER REFERENCES message_room(id) ON DELETE CASCADE
);
