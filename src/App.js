import React, { useState } from "react";
import { useEffect,} from "react";
import './App.css';
import SearchIcon from './Search.svg'
import MovieCard from "./MovieCard";

//api connection with api key.
const API_URL = 'https://www.omdbapi.com?apikey=33d89c17';

//main functional component.
const App=()=>{

  //variable for api calling and fetching
  const searchMovies = async (title)=>{
    //this code calls the api
    const response = await fetch(`${API_URL}&s=${title}`);
    // this code gets the data in json format
    const data = await response.json();
    //.Search is used to get data in array form in search option seen in console
    //console.log(data.Search);
    setMovies(data.Search);
  }

  //petty data just to know what jsx we coding
  const movie1 ={
      "Title": "Amazing Spiderman Syndrome",
      "Year": "2012",
      "imdbID": "tt2586634",
      "Type": "movie",
      "Poster": "N/A"
  }

  //we use these hook to call api as soon as app loads.
  useEffect(()=>{

    //inside the ('') we put title of favourite movie
    searchMovies('Spiderman');

  }, []);

  // to get movies from the console log we must use the state hook, instead of using console.log(data.Search) we apply Setter 
  const [movies, setMovies] = useState([]);
  // state for search functionality with empty string because our search will be empty at start
  const [searchTerm, setSearchTerm]= useState('');







  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for Movies"
          //inputs in react need to have a value
          //value="Superman"
          value = {searchTerm}
          //that string is a static string value and cant be changed to change it we use onChange function.
          // after we impliment state we will code it.
          onChange={(e)=> setSearchTerm(e.target.value)}
        />

        <img 
          src={SearchIcon} 
          alt="Search"
          // the icon will server as a button, to call our api straight from it.
          onClick={()=>
            // everytime we click that svg, state will call the function searchMovies(awaiting title)
            searchMovies(searchTerm)
          }
        
        />
      </div>
      
      {
        //dymanic rending of movies
        movies.length > 0 
        ?(
          <div className="container">
            {/*<MovieCard movie1={movies[9]}/> that code only renders 1 movie, so we apply map() to iterate*/}
            {movies.map((movie) => (
              <MovieCard movie = {movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found!</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
 