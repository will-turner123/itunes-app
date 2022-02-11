import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';


export default function ArtistCard({artist}) {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link href={`/artist/${artist.artistId}`} passHref>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                {artist.artistName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {artist.primaryGenreName}
                </Typography>
            </CardContent>
        </Link>
      </Box>
    </Card>
  );
}
