import { Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { stringAvatar } from '../utils/avatars';
import { Avatar, List, ListItem, Divider, Skeleton, ListItemAvatar, ListItemText } from '@mui/material';
import Link from 'next/link';


const ArtistAvatar = ({artist, artists}) => {
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(true);
    const artistId = artists[artist][1];

    useEffect(() => {

        if(artistId in localStorage){
            const artistInfo = JSON.parse(localStorage.getItem(artistId));
            if(artistInfo.artistImage){
                setAvatar(artistInfo.artistImage);
            }
        }
        setLoading(false);
    }, [artists, artistId])
 
    return (
        <>
        <Link href={`/artist/${artistId}`} passHref>
            <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    {loading && (
                        <Skeleton variant="circular" width={100} height={100}/>
                    )}
                    {!loading && (
                        <>
                        {!avatar ? (
                            <Avatar {...stringAvatar(artist)}/>
                        ) : (
                            <Avatar src={avatar} alt={artist}/>
                        )}
                        </>
                    )}
                    </ListItemAvatar>
                    <ListItemText primary={artist}/>
            </ListItem>
        </Link>
        <Divider variant="inset" component="li"/>
        </>
    )
}



export default function TopArtists({artists}){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const topArtists = {}
        Object.keys(artists).sort((a, b) => artists[b][0] - artists[a][0]).forEach((key, ind) => {
            if(ind < 5 || (ind < Object.keys(artists).length && ind < 5) ){
                topArtists[key] = artists[key]
            }
        })
        setData(topArtists);
        setLoading(false);
    }, [artists])


    return (
            <Card>
                <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                        Your Top Artists
                    </Typography>
                    {loading && (<Skeleton type="circular"/>)}
                    {!loading && (
                        <List>
                        {Object.keys(data).map((artist, index) => {
                            return ( <ArtistAvatar artist={artist} artists={data} key={index}/>)
                        })}
                        </List>
                    )}
                </CardContent>
            </Card>
    )}

