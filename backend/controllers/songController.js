const db = require('../db');

exports.getAllSongs = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.getSongById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM songs WHERE id = ?", [id], (err, row) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if(!row) 
        {
            return res.status(404).json({ message: "Song not found" });
        }
        res.json(row);
    });
};

exports.createSong = (req, res) => {
    const { name, release_year, album_id } = req.body;

    const sql = `
        INSERT INTO songs (name, release_year, album_id)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, release_year, album_id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Song created",
            id: this.lastID
        });
    });
};

exports.updateSong = (req, res) => {
    const id = req.params.id;
    let { name, release_year, album_id } = req.body;

    //issue with partial updates
    //new fields left blank are blank in db 
    name = name === "" ? null : name;
    release_year = release_year === "" ? null : release_year;
    album_id = album_id === "" ? null : album_id;

    const sql = `
        UPDATE songs
        SET name = COALESCE(?, name),
            release_year = COALESCE(?, release_year),
            album_id = COALESCE(?, album_id)
        WHERE id = ?
    `;

    db.run(sql, [ name, release_year, album_id, id ], function (err) {
        console.log("ID RECEIVED:", req.params.id);
        console.log("CHANGES AFFECTED:", this.changes);
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song updated" });
    });
};

exports.deleteSong = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM songs WHERE id = ?", [id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Song not found" });
        }

        res.json({ message: "Song deleted" });
    });
};