
const clientId = "fe5eb71ec7394121948558839264f5e8";
const clientSecret = "f85908cb9cc34b6cb2a7fa2ab1dee415";
const redirectUri = "http://127.0.0.1:5500/spotify/index.html"
async function getToken() {
    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
            },
            body: "grant_type=client_credentials",
        });
        const data = await result.json();
        return data.access_token;
    } catch (error) {
        console.log(error);
    }
}
async function authorization(){
    try{
        const result = await fetch(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`,{method:"GET"})
        let data = await result.json();
        console.log(data);

    }catch(err){
        console.log(err)
    }
}
async function getPlayList() {
    try {
        token = await getToken()
        const result = await fetch(
            `https://api.spotify.com/v1/users/spotify/playlists/2k4ZCcr63xfaksR0YdyfVu`,
            {
                method: "GET",
                "Content-Type": "application/json",
                headers: { Authorization: "Bearer " + token },
            }
        );
        const data = await result.json();
        //console.log(data)
        displayPlayLists(data.tracks.items);
        //console.log(data)
    } catch (error) {
        console.log(error);
    }
}
function displayPlayLists(data) {
    let playlist = document.getElementById("playlist")
    console.log(data)

    data.forEach((element, index) => {
        console.log(index, element)
        let image = element.track.album.images.length > 0 ? element.track.album.images[0].url : ''

        playlist.innerHTML += `<div class="col mb-4"><div class="card h-70">
        <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title">${element.track.name}</h4>
        <span class="card-text small">${element.track.album.artists[0].name}</span>
        <audio controls><source src="${element.track.preview_url}"></audio>
      </div>
    </div></div>`;
    });
}

async function followPlayList() {
    try {
        
        //await authorization();
        const token = await getToken();
        const result = await fetch(
            `https://api.spotify.com/v1/playlists/2k4ZCcr63xfaksR0YdyfVu/followers`,
            
            {
                method: "PUT",
                headers: { Authorization: "Bearer " + token },
                "Content-Type": "application/json",
                body: JSON.stringify({"public": false})

            }
        );
        
        const data = await result.json();
        console.log(data)

    }
    catch (err) {
        console.log(err);
    }
}
