import React, { useEffect, useState } from 'react'
import { Autocomplete, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import MovieTechnicalSheet from './MovieTechnicalSheet';


export interface movie{ 
    "Title"?:string,
    "Year"?: string,
    "imdbID"?:string,
    "Type"?: string,
    "Poster"?:string}

type movieList = movie[]


export interface movieDescription extends movie{
"Rated"?:string,
"Released"?:string,
"Runtime"?:string,
"Genre"?:string,
"Director"?:string,
"Writer"?:string,
"Actors"?:string,
"Plot"?:string,
"Language"?:string,
"Country"?:string,
"Awards"?:string,
"Poster"?:string,
"Ratings"?:string,
"Value"?:string,
"Metascore"?:string,
"imdbRating"?:string,
"imdbVotes"?:string,
"DVD"?:string,
"BoxOffice"?:string,
"Production"?:string,
"Website"?:string,
"Response"?:string
}


const App=()=>{
const [API, setAPI] = useState<movieList| []>([])
const [search,setSearch]= useState<string| undefined>('')
const [debouncedSearch]=useDebounce(search, 1000)
const [selectedMovie, setSelectedMovie]=useState<movieDescription>()

useEffect(() => {
  !!debouncedSearch && debouncedSearch?.length>3 && 
  axios.get('http://localhost:3002/getMovieList',{params:  {s: debouncedSearch}} )
  .then(res=>{

    console.log('setting',)
  if(res.data.Response === false ) return
  setAPI(res.data?.Search)
  
  })

}, [debouncedSearch])


  return (
    <div>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
       inputValue={search}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        //  value={search}
        // onChange={(event: any, newValue: string | null) => {
        //   setSearch(newValue);
        // }}
      options={API.map(movie=>movie?.Title)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />

{API.length===1 &&
<MovieTechnicalSheet {...selectedMovie}/>
}
    </div>
  )
}


export default App
