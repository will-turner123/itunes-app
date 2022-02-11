import { Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Loader from './loader';
import { stringToColor } from '../utils/avatars';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenreChart({genres}){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const labels = Object.keys(genres);
        const values = Object.values(genres);
        const backgroundColors = labels.map((label) => stringToColor(label));
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Your Top Genres",
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                }
            ]
        }
        setData(data);
        setLoading(false);
    }, [genres])


    return (
            <Card>
                <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                        Your Top Genres
                    </Typography>
                    {loading && (<Loader/>)}
                    {!loading && (
                        <Pie data={data}/>
                    )}
                </CardContent>
            </Card>
    )}

