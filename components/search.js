import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, IconButton, LinearProgress, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Search from '@mui/icons-material/Search';
import SongCard from './songcard';
import ArtistCard from './artistcard';


export default function Searchbar(){
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");
    const [searched, setSearched] = useState(false);


    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const searchValue = query.replace(' ', '+');

        const url = `https://itunes.apple.com/search?term=${searchValue}&media=music`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            setResults(data.results);
            setSearched(true);
        })
    }

    return (
        <>
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <form onSubmit={handleSubmit} style={{width: "100%"}}>
                        <TextField 
                            fullWidth
                            id="search"
                            label="Search songs and artists"
                            value={query}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton><Search/></IconButton></InputAdornment>
                            }}
                        />
                    </form>
                </Box>

            </CardContent>
        </Card>
        {loading && (
            <LinearProgress/>
        )}
        {(results.length === 0 && searched) && <h1>No results found</h1>}
        {(results.length > 0 && searched) && (
            <Grid container rowSpacing={4} columnSpacing={5}>
                <Grid item xs={12}>
                    <h1>Top Result</h1>
                </Grid>
                <Grid item md={12} lg={12}>
                    {results[0].kind === "artist" && <ArtistCard artist={results[0]}/>}
                    {results[0].kind === "song" && <SongCard song={results[0]}/>}
                </Grid>
                {results.map((result, index) => {
                    if(index > 1){
                        return (
                            <Grid item sm={12} md={6} lg={4} key={index}>
                                {result.kind === "song" ? <SongCard song={result} key={result}/> : <ArtistCard artist={result} key={result}/>}
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )}

        </>
    )
}

