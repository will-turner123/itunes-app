import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getArtistData } from '../utils/getdata';
import { Card, CardMedia, CardContent, Typography, Skeleton } from '@mui/material';
import Link from 'next/link';
import LikeButton from './likebutton';


export default function Album({albumId}){
    const [artist, setArtist] = useState();
    const [album, setAlbum] = useState();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([])


    const columns = [
        { field: 'id', headerName: '#', minWidth: 70, sortable: true},
        { field: 'title', headerName: 'Title', minWidth: 130, sortable: true, flex: 1},
        { field: 'like', headerName: '', sortable: true, renderCell: (cellValues) => {
            const rowSong = album.songs[cellValues.id-1]
            return (
                <LikeButton song={rowSong}/>
            )
        }}
    ]

    useEffect(() => {
        function createRows(album){
            const r = []
            album.songs.forEach((song) => {
                r.push({id: song.trackNumber, title: song.trackName})
            })
            setRows(r)
        }

        function addSongs(artist, album){
            return new Promise((fulfill) => {
                // is there no reason i can't name a album and make it like 10x more readable?
                const albums = artist.albums;
                albums.forEach((a, index) => {
                    if(String(a.collectionId) === albumId){
                        artist.albums[index] = album;
                        localStorage.setItem(artist.artistId, JSON.stringify(artist));
                        cachedAlbums[albumId] = artist.artistId;
                        localStorage.setItem("cachedAlbums", JSON.stringify(cachedAlbums));                        
                        setArtist(artist)
                        fulfill(album);
                    }
                })
            })
        }
        
        function getAlbumData(){
            return new Promise((fulfill) => {
                const url = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    data = data.results;
                    // TODO: add in handling for album not found
                    const album = data[0];
                    album.songs = []
                    album.releaseYear = album.releaseDate.split('-')[0]
                    const artistId = album.artistId;

                    let userLikes = {}
                    if("userLikes" in localStorage){
                        userLikes = JSON.parse(localStorage.getItem("userLikes"))
                    }

                    for(let i=1;i < data.length-1;i++){
                        // todo make this a variable we repeat it a ton
                        data[i].liked = false;
                        if(data[i].trackId in userLikes){
                            data[i].liked = true;
                        }
                        album.songs.push(data[i]);
                    }
                    
                    if(artistId in localStorage){
                        const a = JSON.parse(localStorage.getItem(artistId))
                        addSongs(a, album)
                        .then((album => {
                            fulfill(album);
                        }))
                    }
                    else{
                        getArtistData(artistId)
                        .then(artist => {
                            setArtist(artist);
                            fulfill(addSongs(artist, album));
                        })
                    }

                })
            })

        }


        let cachedAlbums = {}
        let isCached = false;
        // we store cachedAlbums with albumId: artistId for easy reference
        if("cachedAlbums" in localStorage){
            cachedAlbums = JSON.parse(localStorage.getItem("cachedAlbums"));
            if(String(albumId) in cachedAlbums){
                // TODO: artist state name shouldn't conflict names... if it doesnt rename a to artist 
                const a = JSON.parse(localStorage.getItem(cachedAlbums[albumId]))
                a.albums.every((album) => {
                    if(String(album.collectionId) === String(albumId)){
                        setArtist(a);
                        setAlbum(album);
                        createRows(album)
                        setLoading(false);
                        isCached = true;
                        return false;
                    }
                })
            }
        }
        if(!isCached){
            getAlbumData()
            .then((album) => {
                setAlbum(album)
                createRows(album)
                setLoading(false);
            })
        }
    }, [albumId])


    return (
        <>
            <Card variant="outlined">
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    {loading ? <Skeleton variant="circular" height={100} width={100} sx={{ marginRight: 3 }}/> : (
                        <CardMedia component="img" image={album.artworkUrl100} alt={album.collectionName} sx={{width: 100}}/>
                    )}
                    <Box sx={{ display: 'flex'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                        <>
                            {loading ? <Skeleton variant="text"/> : (
                                <>
                                <Typography component="div" variant="h4" gutterbottom sx={{ textOverflow: 'ellipsis ellipsis'}}>
                                    {album.collectionName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                <Typography display={'inline'} color="text.primary" sx={{paddingRight: 1}}>
                                    <Link href={`/artist/${artist.artistId}`}>{artist.artistName}</Link>
                                </Typography>
                                - {album.releaseYear}
                                </Typography>
                                </>
                                )
                                }
                            </>
                        </CardContent>
                    </Box>
                </Box>
            {loading && (<Skeleton variant="rectangular" height={"100%"} width={"100%"}/>)}
            {!loading && (
                <div>
                    <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        pageSize={100}                        
                    />
                    </div>
                </div>
            )}
            </Card>
        </>
    )
}