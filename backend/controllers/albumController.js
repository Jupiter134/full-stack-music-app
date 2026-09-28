const db = require('../db');

//GET all albums
exports.getAllAlbums = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

//GET one album by ID
exports.getAlbumById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM albums WHERE id = ?", [id], (err, row) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if(!row) 
        {
            return res.status(404).json({ message: "Album not found" });
        }
        res.json(row);
    });
};

//CREATE album
exports.createAlbum = (req, res) => {
    const { name, release_year, listens, artist_id } = req.body;

    const sql = "INSERT INTO albums (name, release_year, listens, artist_id) VALUES (?, ?, ?, ?)";

    db.run(sql, [name, release_year, listens, artist_id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Album created",
            id: this.lastID
        });
    });
};



//UPDATE album
exports.updateAlbum = (req, res) => {
    const id = req.params.id;
    let { name, release_year, listens, artist_id } = req.body;

    name = name === "" ? null : name;
    release_year = release_year === "" ? null : release_year;
    listens = listens === "" ? null : listens;
    artist_id = artist_id === "" ? null : artist_id;

    const sql = `
        UPDATE albums
        SET name = COALESCE(?, name),
            release_year = COALESCE(?, release_year),
            listens = COALESCE(?, listens),
            artist_id = COALESCE(?, artist_id)
        WHERE id = ?
    `;

    db.run(sql, [ name, release_year, listens, artist_id, id ], function (err) {
        console.log("ID RECEIVED:", req.params.id);
        console.log("CHANGES AFFECTED:", this.changes);

        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album updated" });
    });
};

//DELETE album
exports.deleteAlbum = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM albums WHERE id = ?", [id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json({ message: "Album deleted" });
    });
};