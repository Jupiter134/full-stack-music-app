const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

//path to database file
const dbPath = path.join(__dirname, 'data', 'app.db');

//connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) 
    {
        console.error("Database connection error:", err.message);
    }
    else 
    {
        console.log("Connected to SQLite database");
    }
});

//run model.sql to create tables and seed data
const sqlFile = path.join(__dirname, 'model.sql');

fs.readFile(sqlFile, 'utf8', (err, data) => {
    if (err) 
    {
        console.error("Error reading model.sql:", err.message);
    }
    else 
    {
        db.exec(data, (err) => {
            if (err) 
            {
                console.error("Error executing model.sql:", err.message);
            } 
            else 
            {
                console.log("Database initialized from model.sql");
                seedDatabase();
            }
        });
    }
});

//db was creating dupllicates every time i reran the server 
//seed once if db is empty instead
function seedDatabase()
{
    db.get("SELECT COUNT(*) AS count FROM artists", [], (err, row) => {
        if(row.count === 0)
        {
            db.run(`
                INSERT INTO artists (name, genre, monthly_listeners) VALUES
                ('David Bowie', 'Classic Rock', 20200000),
                ('Tears For Fears', 'Indie', 23200000);
            `);
        }
    });

    db.get("SELECT COUNT(*) AS count FROM albums", [], (err, row) => {
        if(row.count === 0)
        {
            db.run(`
                INSERT INTO albums (name, release_year, listens, artist_id) VALUES
                ('Songs From The Big Chair', 1985, 35000000, 2),
                ('The Tipping Point', 2022, 10900000, 2),
                ('Hunky Dory', 1971, 867000000, 1),
                ('Scary Monsters', 1979, 199500000, 1),
                ('The Rise And Fall Of Ziggy Stardust and The Spiders From Mars', 1972, 13000000, 1);
            `);
        }
    });

    db.get("SELECT COUNT(*) AS count FROM songs", [], (err, row) => {
        if(row.count === 0)
        {
            db.run(`
                INSERT INTO songs (name, release_year, album_id) VALUES
                ('No Small Thing', 2022, 2),
                ('Break The Man', 2022, 2),
                ('Shout', 1985, 1),
                ('Everybody Wants To Rule The World', 1985, 1),
                ('Moonage Daydream', 1972, 5),
                ('Lady Stardust', 1972, 5),
                ('Changes', 1971, 3),
                ('Life On Mars?', 1971, 3),
                ('Ashes To Ashes', 1979, 4),
                ('Fashion', 1979, 4);
            `);
        }
    });    
}

module.exports = db;