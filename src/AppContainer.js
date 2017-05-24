import { connect } from "react-redux";
import App from "./App";
import {loadMyMovieList, loadPopularMovies} from "./actions";

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
    myMovieList: state.myMovieList,
    popularMovies: state.popularMovies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMyMovieList: function () {
      dispatch(loadMyMovieList());
    },
    loadPopularMovies: function(){
      dispatch(loadPopularMovies());
    }
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
