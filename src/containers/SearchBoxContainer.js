import { connect } from "react-redux";
import SearchBox from "../components/SearchBox";
import {loadSearch} from "../actions";

function mapDispatchToProps(dispatch) {
  return {
    loadSearch: function (searchText) {
      dispatch(loadSearch(searchText));
    }
  };
}


export default connect(null,mapDispatchToProps)(SearchBox);
