
export function loadMyMovieList(){
  return function (dispatch) {
    dispatch({
      type: "LOAD_MY_MOVIE_LIST"
    });
    fetch("/movies")
    .then( (response) => {
       return response.json();
        }).then((movies) => {
      dispatch(myMovieListLoaded(movies));
    });
  };
}



export function myMovieListLoaded(movies){
  return{
    type: "MY_MOVIE_LIST_LOADED",
    value: movies
  };
}

export function loadPopularMovies(){
  return function (dispatch) {
    dispatch({
      type: "LOAD_POPULAR_MOVIES"
    });
    fetch("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=695c9f4e37dddc0d2454972d0fa279a9")
    .then( (response) => {
       return response.json();
        }).then((movies) => {
          let top11 = {results: []};
          for(let i = 0; i < 11; i++){
            movies.results[i].media_type = "movie";
            top11.results.push(movies.results[i])
          }
          trailerCheck(top11).then(top11Trailers => {
            dispatch(popularMoviesLoaded(top11Trailers));
          });

    });
  };
}

export function popularMoviesLoaded(movies) {
  return{
    type: "POPULAR_MOVIES_LOADED",
    value: movies
  };
}

export function loadSearch(searchTerm){
  return function (dispatch) {
    dispatch({
      type: "LOAD_SEARCH"
    });
    fetch("https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=" + searchTerm + "&language=en-US&api_key=695c9f4e37dddc0d2454972d0fa279a9")
    .then( (response) => {
       return response.json();
     }).then((movies) => {
       trailerCheck(movies).then(filteredMovies => {
         dispatch(searchLoaded(filteredMovies));
       })

    });
  };
}

async function trailerCheck(movies){
  let newMovies = movies.results.map( (m) => {
      let tempMovie = m;
    if (m.media_type == "movie") {
      fetch("https://api.themoviedb.org/3/movie/" + m.id +"/videos?language=en-US&api_key=695c9f4e37dddc0d2454972d0fa279a9")
      .then( (response) => {
        return response.json();
      }).then((key) => {
        tempMovie.trailer = key.results[0].key;
      });
    } else {
      tempMovie.trailer = "no-trailer";
    }
    return tempMovie;
  });

  return newMovies
}




export function searchLoaded(movies){
  return{
    type: "SEARCH_RESULTS_LOADED",
    value: movies
  };
}

export function saveMyMovie(movie) {
 return function (dispatch) {
   fetch("/movies", {
     method: "POST",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify(movie)
   }).then(() => dispatch(loadMyMovieList()));
 };
}

export function removeMyMovie(id) {
 return function (dispatch) {
   fetch("/movies/" + id, {
     method: "DELETE",
   }).then(() => dispatch(loadMyMovieList()));
 };
}
