import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';


export default function AlbumCard({album}) {
    const releaseYear = album.releaseDate.split('-')[0]
  return (
    <Link href={`/album/${album.collectionId}`} passHref>
      <Card variant="paper">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
          }}>
          <CardContent sx={{ flex: '1 0 auto', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={album.artworkUrl100}
              alt={album.collectionCensoredName}
              />
            <Typography component="div" variant="h5">
              {album.collectionCensoredName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {releaseYear}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
