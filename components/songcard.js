import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import LikeButton from './likebutton';


export default function SongCard({song}) {
  return (
    <Card sx={{ display: 'flex' }} variant="paper">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link href={`/album/${song.collectionId}`} passHref>
          <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {song.trackName}
              </Typography>
              <Link href={`/artist/${song.artistId}`} passHref> 
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {song.artistName}
                </Typography>
              </Link>
            </CardContent>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <LikeButton song={song}/>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 110, height: 110, alignSelf: 'center' }}
        image={song.artworkUrl100}
        alt={song.trackName}
      />
    </Card>
  );
}
