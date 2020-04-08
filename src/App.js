import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './Components/Login';
import Browse from './Components/Browse';
import Img from './school.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerVisibility: false,
      userName: null
    }
    this.backtoLoginClickHandler = this.backtoLoginClickHandler.bind(this);
  }
  backtoLoginClickHandler = () => {
    this.setState({ headerVisibility: false })
    this.props.history.push('/Login');
  }
  makeheaderVisibility = () => {
    this.setState({ headerVisibility: true })
  }

  captureUserName = (name) => {
    this.setState({
      userName: name
    })
  }

  render() {

    let header = null;
    header = this.state.headerVisibility ?
      <div className="header-main">
        <img id="logoImg" src={Img} alt="pic" height="50px" width="50px" />
        <strong id="appTitle">Auto Import</strong>
        <div className="logoutDiv">
          <label className="userNameTxt">Welcome {this.state.userName}</label>
          <button className="btn btn-danger" onClick={this.backtoLoginClickHandler}>Logout</button>
        </div>
      </div> : null;


    return (
      <div className="App">
        {header}
        <Switch>
          <Route path="/Browse" render={() => <Browse showHeader={this.makeheaderVisibility} />} />
          <Route path="/" render={() => <Login userNameChanged={this.captureUserName} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);