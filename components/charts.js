import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import GenreChart from './genrechart';
import TopArtists from './topartists';

export default function Charts(){
    const [canChart, setCanChart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState();
    const [artists, setArtists] = useState();
    
    useEffect(() => {
        if("userLikes" in localStorage){
            const likes = JSON.parse(localStorage.getItem("userLikes"));
            const genres = {}
            const artists = {}
            for(const song in likes){
                const artistName = likes[song].artistName;
                const artistId = likes[song].artistId;
                const genre = likes[song].primaryGenreName;
                // first is song count, second is artistId for easy reference when displaying top artists
                if(!(artistName in artists)){
                    artists[artistName] = [1, artistId];
                }
                else{
                    artists[artistName][0] += 1;
                }

                if(!(genre in genres)){
                    genres[genre] = 1;
                }
                else{
                    genres[genre] += 1;
                }
            }
            setGenres(genres);
            setArtists(artists);
            setCanChart(true);
        }
        setLoading(false);
    }, [])

    return (
            <>
            <Grid container rowSpacing={4} columnSpacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h3">Your Taste</Typography>
                    {loading && (<Skeleton variant="rectangular" width={400} height={300}/>)}
                    {!loading && !canChart && (<Typography variant="h6">Not enough data to show your taste :/</Typography>)}
                </Grid>
                {!loading && canChart && (
                <>
                <Grid item xs={12} lg={6}>
                    <GenreChart genres={genres}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TopArtists artists={artists}/>
                </Grid>
                </>
                )}
            </Grid>
            </>
    )}

