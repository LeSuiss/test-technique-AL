import React, { useEffect, useState } from 'react'
import { Autocomplete, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import { movieDescription } from './App';



const MovieTechnicalSheet=(props:movieDescription|undefined)=>
    <Card sx={{ maxWidth: 345 }} className="MovieCard">
      <CardMedia
        className="containedImage"
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
  

export default MovieTechnicalSheet