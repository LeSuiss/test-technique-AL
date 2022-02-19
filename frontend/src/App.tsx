import React, { useEffect, useState } from 'react'
import { Autocomplete, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import axios from 'axios';
import './App.css'

import MovieTechnicalSheet from './MovieTechnicalSheet';
import { useDebounce } from 'use-debounce';



export interface movie{ 
    "Title"?:string,
    "Year"?: string,
    "imdbID"?:string,
    "Type"?: string,
    "Poster"?:string}

type movieList = movie[]


export interface movieDescription extends movie{
"Rated":string,
"Released":string,
"Runtime":string,
"Genre":string,
"Director":string,
"Writer":string,
"Actors":string,
"Plot":string,
"Language":string,
"Country":string,
"Awards":string,
"Poster":string,
"Ratings":string,
"Value":string,
"Metascore":string,
"imdbRating":string,
"imdbVotes":string,
"DVD":string,
"BoxOffice":string,
"Production":string,
"Website":string,
"Response":string
}


const App=()=>{
const [API, setAPI] = useState<movieList| []>([])
const [search,setSearch]= useState<string| undefined>('')
const [debouncedSearch]=useDebounce(search, 1000)
const [selectedMovie, setSelectedMovie]=useState<movieDescription>()

useEffect(() => {
  !!debouncedSearch && debouncedSearch?.length>3 && 
  axios.get('http://localhost:3002',{params:  {s: debouncedSearch}} )
  .then(res=>{
    console.log('setting',)
  if(res.data.Response === "False" ) return
  setAPI(res.data?.Search)
  })

}, [debouncedSearch])

const fetchSpecifics=(id:string|undefined)=>{

  axios.get('http://localhost:3002/',{params:  {i: id}} )
  .then(res=>{
  if(res.data.Response === "False" ) return
  console.log(res.data.Search)
  setSelectedMovie(res.data)
  })

}
useEffect(() => {
  API?.length===1 && fetchSpecifics(API[0]?.imdbID)  
}, [debouncedSearch])

  return (
    <div>
    <Autocomplete
      disablePortal
      inputValue={search}
      onInputChange={(event, newInputValue) => {
        setSearch(newInputValue);
      }}
      onChange={(event: any, newValue: any) => fetchSpecifics(newValue.imdbID)}
      options={API?.map(movie=>({label:movie?.Title+'__'+movie?.Year, imdbID:movie?.imdbID}))??[]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />


{selectedMovie &&
<MovieTechnicalSheet {...selectedMovie}/>
}
    </div>
  )
}


export default App
