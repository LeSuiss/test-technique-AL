import React, { useEffect, useState } from 'react'
import { Autocomplete, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import { movieDescription } from './App';



const MovieTechnicalSheet=(props:movieDescription|undefined)=>{

  return (

    <Card sx={{ maxWidth: 345 }}>
      ZZS
      <CardMedia
        component="img"
        height="140"
        image={props?.Poster}
        alt={'poster_'+props?.Title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props?.Plot}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MovieTechnicalSheet