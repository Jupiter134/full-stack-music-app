const db = require('../db');

//GET all artists
exports.getAllArtists = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

//GET one artist by ID
exports.getArtistById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM artists WHERE id = ?", [id], (err, row) => {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if(!row) 
        {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.json(row);
    });
};

//CREATE artist
exports.createArtist = (req, res) => {
    const { name, genre, monthly_listeners } = req.body;

    const sql = "INSERT INTO artists (name, genre, monthly_listeners) VALUES (?, ?, ?)";

    db.run(sql, [name, genre, monthly_listeners], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Artist created",
            id: this.lastID
        });
    });
};

//UPDATE artist
exports.updateArtist = (req, res) => {
    const id = req.params.id;
    let { name, genre, monthly_listeners } = req.body;

    //console.log("REQ BODY: ", req.body);

    //fix partial updates/blank in db
    name = name === "" ? null : name;
    genre = genre === "" ? null : genre;
    monthly_listeners = monthly_listeners === "" ? null : monthly_listeners;

    const sql = `
        UPDATE artists
        SET name = COALESCE(?, name),
            genre = COALESCE(?, genre),
            monthly_listeners = COALESCE(?, monthly_listeners)
        WHERE id = ?
    `;

    db.run(sql, [name, genre, monthly_listeners, id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json({ message: "Artist updated" });
    });
};

//DELETE artist
exports.deleteArtist = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM artists WHERE id = ?", [id], function (err) {
        if(err) 
        {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) 
        {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json({ message: "Artist deleted" });
    });
};