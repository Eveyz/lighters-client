import { connect } from 'react-redux';
import { userFromToken, resetToken, adminInit } from '../actions/users_actions';
import App from '../components/App';

const mapStateToProps = state => {
  // this.props.search
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = localStorage.getItem("jwtToken");
  return {
    loadUserFromToken: () => {
      if(!token || token === "") {//if there is no token, dont bother
        return;
      }
      //fetch user from token (if server deems it’s valid token)
      dispatch(userFromToken(token))
    },
    adminInit: () => {
      if(!token || token === "") {//if there is no token, dont bother
        return;
      }
      dispatch(adminInit(token))
    },
    resetMe: () => { // logout
      dispatch(resetToken());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);