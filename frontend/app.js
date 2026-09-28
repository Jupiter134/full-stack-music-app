const BASE_URL = "http://localhost:5000";

/*ARTISTS*/

//GET ALL ARTISTS
async function loadArtists() 
{
    const res = await fetch(`${BASE_URL}/artists`);
    const data = await res.json();

    const table = document.getElementById("artistsTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.genre}</td>
                <td>${a.monthly_listeners}</td>
            </tr>
        `;
    });
}

//CREATE ARTIST
async function createArtist() 
{
    await fetch(`${BASE_URL}/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("createName").value,
            genre: document.getElementById("createGenre").value,
            monthly_listeners: document.getElementById("createListeners").value
        })
    });

    loadArtists();
}

//UPDATE ARTIST
async function updateArtist() 
{
    const id = document.getElementById("updateId").value;

    await fetch(`${BASE_URL}/artists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("updateName").value,
            genre: document.getElementById("updateGenre").value,
            monthly_listeners: document.getElementById("updateListeners").value
        })
    });

    loadArtists();
}

//DELETE ARTIST
async function deleteArtist() 
{
    const id = document.getElementById("deleteId").value;

    await fetch(`${BASE_URL}/artists/${id}`, {
        method: "DELETE"
    });

    loadArtists();
}

//GET ARTIST BY ID
async function getArtistById() 
{
    const id = document.getElementById("searchId").value;

    const res = await fetch(`${BASE_URL}/artists/${id}`);
    const data = await res.json();

    const output = document.getElementById("singleArtistResult");

    if (!res.ok) 
    {
        output.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    output.innerHTML = `
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Genre: ${data.genre}</p>
        <p>Listeners: ${data.monthly_listeners}</p>
    `;
}


/*ALBUMS*/

//GET ALL ALBUMS
async function loadAlbums() 
{
    const res = await fetch(`${BASE_URL}/albums`);
    const data = await res.json();

    const table = document.getElementById("albumsTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.release_year}</td>
                <td>${a.listens}</td>
                <td>${a.artist_id}</td>
            </tr>
        `;
    });
}

//CREATE ALBUM
async function createAlbum() 
{
    await fetch(`${BASE_URL}/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("createName").value,
            release_year: document.getElementById("createYear").value,
            listens: document.getElementById("createListens").value,
            artist_id: document.getElementById("createArtistId").value
        })
    });

    loadAlbums();
}

//UPDATE ALBUM
async function updateAlbum() 
{
    const id = document.getElementById("updateId").value;

    if(!id)
    {
        alert("Enter an Album ID");
        return;
    }

    await fetch(`${BASE_URL}/albums/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("updateName").value,
            release_year: document.getElementById("updateYear").value,
            listens: document.getElementById("updateListens").value,
            artist_id: document.getElementById("updateArtistId").value
        })
    });

    loadAlbums();
}

//DELETE ALBUM
async function deleteAlbum() 
{
    const id = document.getElementById("deleteId").value;

    await fetch(`${BASE_URL}/albums/${id}`, {
        method: "DELETE"
    });

    loadAlbums();
}

//GET ALBUM BY ID
async function getAlbumById() 
{
    const id = document.getElementById("searchAlbumId").value;

    const res = await fetch(`${BASE_URL}/albums/${id}`);
    const data = await res.json();

    const output = document.getElementById("singleAlbumResult");

    if (!res.ok) 
    {
        output.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    output.innerHTML = `
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Year: ${data.release_year}</p>
        <p>Listens: ${data.listens}</p>
        <p>Artist ID: ${data.artist_id}</p>
    `;
}


/*SONGS*/

//GET ALL SONGS
async function loadSongs() 
{
    const res = await fetch(`${BASE_URL}/songs`);
    const data = await res.json();

    const table = document.getElementById("songsTable");
    table.innerHTML = "";

    data.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.release_year}</td>
                <td>${s.album_id}</td>
            </tr>
        `;
    });
}

//CREATE SONG
async function createSong() 
{
    await fetch(`${BASE_URL}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("createName").value,
            release_year: document.getElementById("createYear").value,
            album_id: document.getElementById("createAlbumId").value
        })
    });

    loadSongs();
}

//UPDATE SONG
async function updateSong() 
{
    const id = document.getElementById("updateId").value;

    await fetch(`${BASE_URL}/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("updateName").value,
            release_year: document.getElementById("updateYear").value,
            album_id: document.getElementById("updateAlbumId").value
        })
    });

    loadSongs();
}

//DELETE SONG
async function deleteSong() 
{
    const id = document.getElementById("deleteId").value;

    await fetch(`${BASE_URL}/songs/${id}`, {
        method: "DELETE"
    });

    loadSongs();
}

//GET SONG BY ID
async function getSongById() 
{
    const id = document.getElementById("searchSongId").value;

    const res = await fetch(`${BASE_URL}/songs/${id}`);
    const data = await res.json();

    const output = document.getElementById("singleSongResult");

    if (!res.ok) 
    {
        output.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    output.innerHTML = `
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Year: ${data.release_year}</p>
        <p>Album ID: ${data.album_id}</p>
    `;
}