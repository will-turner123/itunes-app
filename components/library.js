import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import LikeButton from './likebutton';
import SongTitle from './songtitle';




export default function Library(){
    const [loading, setLoading] = useState(true);
    const [likedSongs, setLikedSongs] = useState({});
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: '#', maxWidth: 30, sortable: true},
        { field: 'title', headerName: 'Title', sortable: false, flex: 1, minWidth: 180, renderCell: (cellValues) => {
            const index = cellValues.id-1;
            const songId = Object.keys(likedSongs)[index];
            const rowSong = likedSongs[songId];

            return (
                <SongTitle song={rowSong}/>
            )

        }},
        { field: 'album', headerName: 'Album', sortable: true, flex: 1},
        { field: 'like', headerName: '', sortable: false, renderCell: (cellValues) => {
            const index = cellValues.id-1;
            const songId = Object.keys(likedSongs)[index];
            const rowSong = likedSongs[songId];
            return (
                <LikeButton song={rowSong}/>
            )
        }}
    ]

    useEffect(() => {

        function createRows(likedSongs){
            const r = []
            let i = 1;
            for(const song in likedSongs){
                const itSong = likedSongs[song]
                r.push({id: i, title: itSong.trackName, artist: itSong.artistName, album: itSong.collectionName})
                i += 1;
            }
            setRows(r)
        }

        let likes = {}
        if("userLikes" in localStorage){
            likes = JSON.parse(localStorage.getItem("userLikes"));
        }
        
        setLikedSongs(likes);
        createRows(likes);
        setLoading(false);
        


    }, [])


    return (
        <>
            <Typography 
            sx={{ m: 1}}
            variant="h4">
                Your Library
            </Typography>
            {loading && (
                <Skeleton variant="rectangular" height={500} width={"100%"}/>
            )}
            {!loading && (
                <Card variant="paper">
                    <CardContent>
                    <div style={{ height: '100%', width: '100%' }}>
                    {rows.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            pageSize={100}
                            sx={{
                                border: 0
                            }}             
                        />
                    ) : (
                        <Typography variant="h6">You have no liked songs yet</Typography>
                    )}
                    </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}