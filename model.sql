
--i was having a recurring issue of duplicate entries in the db--
--which was causing other problems--
--initial 2 artists, 5 albums and 10 songs are inserterd in db.js--
--only if artists/albums/songs tables are empty--

-- foreign key constraints --
PRAGMA foreign_keys = ON;


-- artists --
CREATE TABLE IF NOT EXISTS artists 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);

-- albums --
CREATE TABLE IF NOT EXISTS albums 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- songs --
CREATE TABLE IF NOT EXISTS songs 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);
