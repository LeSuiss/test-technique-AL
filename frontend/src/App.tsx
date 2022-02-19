import React, { useEffect, useState } from 'react'
import { Autocomplete,  TextField} from '@mui/material';
import axios from 'axios';
import './App.css'

import MovieTechnicalSheet from './MovieTechnicalSheet';
import { useDebounce } from 'use-debounce';



export interface movie{ 
    "Title":string,
    "Year": string,
    "imdbID":string,
    "Type": string,
    "Poster":string}

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

const fetchMovieSpecifics=(id:string|undefined)=>{
  axios.get(`${process.env.REACT_APP_BACKEND_URL}`,{params:  {i: id}} )
  .then(res=>{
  if(res.data.Response === "False" ) return
  setSelectedMovie(res.data)
  })

}

//launch search suggestion only if 3characters (or more) + debounce 1s
useEffect(() => {
  !!debouncedSearch && debouncedSearch?.length>2 && 
  axios.get(`${process.env.REACT_APP_BACKEND_URL}`,{params:  {s: debouncedSearch}} )
  .then(res=>{
  if(res.data.Response === "False" ) return
  setAPI(res.data?.Search)
  })
}, [debouncedSearch])


//Auto fetch technicalSheet if Search result in a single result
useEffect(() => {
  API?.length===1 && fetchMovieSpecifics(API[0]?.imdbID)  
}, [API])

  return (
    <>
      <Autocomplete
        disablePortal
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          //change input value only if is no a selection from guess list
          if(! newInputValue.includes('__') ){
            setSearch(newInputValue);
          }
        }}
        onChange={(event: any, newValue: any) => fetchMovieSpecifics(newValue.imdbID)}
        options={API?.map(movie=>({label:movie?.Title+'__'+movie?.Year, imdbID:movie?.imdbID}))??[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      {selectedMovie &&
      <MovieTechnicalSheet {...selectedMovie}/>
      }
    </>
  )
}


export default App
