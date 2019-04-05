import React, { Component} from "react";
import ReactDOM from "react-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import "./App.css";
import 'babel-polyfill';

const styles = (theme) => ({
    codeblock: {
        backgroundColor: "#773344",
        height: "80%",
        'margin': '20px',
        'margin-top': "calc( 5% - 20px )",
        color: "#fff",
        padding: '0px',
    },
    appsection: {
        'margin-bottom': "-20px",
        backgroundColor: "#ffffff",
    },
    maingrid: {
        height: "100%"
    },
    right: {
        display: "inline-block",
        position: "absolute",
        right: "20px"

    },
    left: {
        display: "inline-block"
    }
})

class App extends Component{
  constructor(props){
      super(props);
      this.state = {
          webpack: null,
          code: "No config found",
      };
      this.sendPostRequest = this.sendPostRequest.bind(this);
  }

  async sendPostRequest(req){
      const data = await fetch("http://localhost:1234/api/init",{
          method: 'POST',
          body: JSON.stringify(req),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => res.json());
      this.setState({
        webpack: data.webpack,
        code: data.webpack
      });
  }
  async saveChanges() {
      const request = {
        webpack: this.state.code
    }
      const data = await fetch("http://localhost:1234/api/save", {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(res => res.json());
        this.setState({
            webpack: data.webpack,
            code: data.webpack
        })
  }
  async componentDidMount() {
      await this.sendPostRequest({});
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
                <Paper className={classes.codeblock}>
                    <Button onClick={
                        () => {this.saveChanges()}
                    } className={classes.left} variant="contained" color="primary">Save Changes</Button>
                    <Button onClick={
                        this.sendPostRequest.bind(null,{})
                    } className={classes.right} variant="contained" color="secondary">Refresh Configuration</Button>
                    <CodeMirror
                        value = {
                            this.state.code
                        }
                        onBeforeChange = {
                            (editor,data,changedCode) => {
                                this.setState({
                                    code: changedCode
                                })
                            }
                        }
                        options = {{
                            lineNumbers: true,
                            theme: 'dracula'
                        }}
                        ></CodeMirror>
                </Paper>
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