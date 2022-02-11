// itunes does not give us an artist image url, but it is easily grabbable
// from the itunes artist's page in a meta tag
export function setImageUrl(data, artistId){
    return new Promise((fulfill) => {
        fetch(data.artistLinkUrl)
        .then(data => data.text())
        .then(response => {
            const html = String(response);
            let ogImage = html.match(/<meta property=\"og:image\" content=\"(.*png)\"/)[1];
            
            // desired dimensions
            ogImage = ogImage.replace(/[\d]+x[\d]+/, '200x200');
    
            data.artistImage = ogImage;
            localStorage.setItem(artistId, JSON.stringify(data));
            fulfill(data);
        })
    })
}


export function getArtistData(artistId){
    return new Promise((fulfill) => {
        const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
        fetch(url)
        .then(response => response.json())
        .then(data => {

            if(data.resultCount === 0){
                console.log('TODO: error handling for artist not found here')
            }
            data = data.results;
            const artist = data[0];
            console.log(artist)
            artist.albums = [];
            // TODO: make sure we want to leave this commented - we only wanna consider songs cached if they have
            // songs too 

            // if(!("cachedAlbums" in localStorage)){
            //     const cachedAlbums = [];
            // }
            // else{
            //     const cachedAlbums = JSON.parse(localStorage.getItem("cachedAlbums"));
            // }
            for(let i = 1;i < data.length-1;i++){
                data[i].songs = [];
                let releaseYear = data[i].releaseDate.split('-')[0]
                data[i]['releaseYear'] = releaseYear;
                console.log(data[i]['releaseYear'], releaseYear)
                artist.albums.push(data[i]);
                // cachedAlbums[data.]
                // cachedAlbums.push(data[i].collectionId);
            }

            // localStorage.setItem("cachedAlbums", JSON.stringify(cachedAlbums));
            // localStorage.setItem(artistId, JSON.stringify(artist));
            console.log(artist);
            fulfill(artist);
        })
    })
}