import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function SongTitle({song}) {
  return (
    <Link href={`/artist/${song.artistId}`} passHref>
    <Box sx={{ display: 'flex' }}>
          <>
          <Avatar
            component="img"
            variant="square"
            sx={{ maxHeight: 60, maxWidth: 60, paddingRight: 1.5 }}
            image={song.artworkUrl100}
            alt={song.trackName}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="subtitle1">
                {song.trackName}
                </Typography>
                <Link href={`/artist/${song.artistId}`} passHref> 
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    {song.artistName}
                </Typography>
                </Link>
            </Box>
        </Box>
          </>
    </Box>
    </Link>
  );
}
