import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import AlbumCard from './albumcard';
import {useRouter} from 'next/router';
import { Grid } from '@mui/material';
import {getArtistData, setImageUrl } from '../utils/getdata';
import { stringAvatar } from '../utils/avatars';




export default function Artist(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [artistInfo, setArtistInfo] = useState(null);
    const [update, setUpdate] = useState(false);
    const artistId = router.query.artistId;
    useEffect(() => {
        if(!(artistId in localStorage)){
            getArtistData(artistId)
            .then(artist => {
                setArtistInfo(artist);
                setLoading(false);
                setImageUrl(artist, artistId)
                .then(data => {
                    setArtistInfo(data);
                    setUpdate(!update);
                });
            })
        }
        // for now, we'd be loading forever if the artistId is undefined (most likely due to page refresh). would be best to redirect
        // to an artist not found page or display that. could reuse in case of other artist not found errors
        else if(artistId !== undefined){ 
            const data = JSON.parse(localStorage.getItem(artistId));
            if(!("artistImage" in data)){
                setImageUrl(data, artistId)
                .then(data => {
                    setArtistInfo(data);
                    setUpdate(!update);
                    setLoading(false);
                })
            }
            else{
                setArtistInfo(data);
                setLoading(false);
            }
        }

    }, [update, router, artistId]);
    return(
        <>
            <Card>
                <CardContent>
                    {loading && (
                        <>
                            <Skeleton variant="circular" width={100} height={100}/>
                            <Skeleton variant="text"/>
                            <Skeleton variant="text"/>
                        </>
                    )}
                    {!loading && (
                        <>
                        {artistInfo.artistImage ? (
                            <Avatar alt={artistInfo.artistName} src={artistInfo.artistImage} sx={{ width: 100, height: 100 }}/>
                        ) : (
                            <Avatar {...stringAvatar(artistInfo.artistName)} sx={{ width: 100, height: 100 }}/>
                        )}
                        <Typography gutterBottom={true} variant="h4">
                            {artistInfo.artistName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {artistInfo.primaryGenreName}
                        </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
            <h1>Discography</h1>
            <Grid container rowSpacing={4} columnSpacing={5}>
                {loading ? (<Skeleton variant="rectangular" width={300} height={200}/>) : 
                (
                <>
                {artistInfo.albums.map((album) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={album.collectionId}>
                            <AlbumCard album={album}/>
                        </Grid>
                    )
                })
                }
                </>
                )
                }
            </Grid>
        </>
    )
}