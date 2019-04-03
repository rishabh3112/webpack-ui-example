import React, { Component} from "react";
import ReactDOM from "react-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Highlight from 'react-highlight';
import "./App.css";
import "highlight.js/styles/an-old-hope.css";
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
        display: "block",
        'margin-left': "auto",
        'margin-right': "0px"
    }
})

class App extends Component{
  constructor(props){
      super(props);
      this.state = {
          webpack: null,
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
        webpack: data.webpack
      });
  }
  componentDidMount() {
      this.sendPostRequest({});
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
                        this.sendPostRequest.bind(null,{})
                    } className={classes.right} variant="contained" color="secondary">Refresh Configuration</Button>
                    <Highlight className='javascript'>
                        {
                            this.state.webpack ? this.state.webpack : "No config found"
                        }
                    </Highlight>
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