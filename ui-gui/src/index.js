import React, { Component} from "react";
import ReactDOM from "react-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import "./App.css";
import 'babel-polyfill';
import Codeblock from "./components/Codeblock";

const styles = (theme) => ({
    appsection: {
        'margin-bottom': "-20px",
        backgroundColor: "#ffffff",
    },
    maingrid: {
        height: "100%"
    }
})

class App extends Component{
  constructor(props){
      super(props);
      this.sendPostRequest = this.sendPostRequest.bind(this);
  }

  async sendPostRequest(req){
      await fetch("http://localhost:1234/api/init",{
          method: 'POST',
          body: JSON.stringify(req),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => res.json());
  }

  render(){
    const { classes } = this.props;
    return(
      <div className="App">
       <Grid className={classes.maingrid} container spacing={0}>
            <Grid item xs={4} className={classes.appsection}>

                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            webpack UI
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className="pad-section">

                    <Typography variant="subtitle1" color="inherit">
                        Scaffold new project by one click!!
                    </Typography>

                    <Button onClick={
                        this.sendPostRequest.bind(null,{
                            type: "defaults"
                        })
                    } variant="contained" color="primary">Scaffold Defaults</Button>

                </div>
            </Grid>
            <Grid item xs={8}>
                <Codeblock/>
            </Grid>
        </Grid>
      </div>
    );
  }
}
const StyledApp = withStyles(styles)(App);
ReactDOM.render(
   <StyledApp/>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}