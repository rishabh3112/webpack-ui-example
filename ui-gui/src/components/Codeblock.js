import React, {Component} from 'react';

// Codemirror imports
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

// Material UI components
import { Typography, Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { relative } from 'path';

class Codeblock extends Component {
    constructor(props){
        super(props)
        this.state = {
            codeOnFile: null,
            currentCode: null,
        }
        this.request = this.request.bind(this);
        this.refresh = this.refresh.bind(this);
        this.save = this.save.bind(this);
    }
    async request(route, req) {
        const data = await fetch(
            `http://localhost:1234${route}`,
            {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json());
        return data;
    }

    async refresh() {
        // Reset contents of the CodeBlock on refresh
        const data = await this.request('/api/init', {});
        this.setState({
            codeOnFile: data.webpack,
            currentCode: data.webpack
        });
    }

    async save() {
        // Save changes to the webpack configuration
        const data = await this.request('/api/save', {
            webpack: this.state.currentCode
        });
        this.setState({
            currentCode: data.webpack,
            codeOnFile: data.webpack
        });
    }

    async componentDidMount() {
        // Find if root already have a configuration file, if so, update codeblock content
        const data = await this.request('/api/init', {});
        this.setState({
            currentCode: data.webpack,
            codeOnFile: data.webpack
        });
    }

    render(){
        // Render the Component
        const { classes } = this.props;
        const css = classes;

        if (this.state.codeOnFile === null) {
            return (
                <Typography className='no-conf' variant='title'>
                    No webpack Configuration found!
                    <Typography variant='subtitle1'>
                        Get Started by scaffolding you project!
                    </Typography>
                </Typography>
            )
        }
        return (
            <Paper className={ css.codeblock }>
                <Typography className={css.filename} variant='subheading'>
                    <b>webpack.config.js</b>
                </Typography>
                <Button
                    onClick = {this.save.bind(null)}
                    className = {css.save}
                    variant = 'text'
                > Save Changes </Button>
                <Button
                    onClick = {this.refresh.bind(null)}
                    className = {css.refresh}
                    variant = 'extendedFab'
                    color = 'primary'
                > Refresh </Button>
                <CodeMirror
                        value = {this.state.currentCode}
                        onBeforeChange = {
                            (editor, data, value) => {
                                this.setState({
                                    currentCode: value
                                });
                            }
                        }
                        options = {
                            {
                                lineNumbers: true,
                                theme: 'dracula'
                            }
                        }
                ></CodeMirror>
            </Paper>
        )
    }
}

const css = (theme) => ({
    refresh: {
        display: 'block',
        position: 'absolute',
        bottom: '-20px',
        right: '10px',
        'z-index': '1'
    },
    save: {
        display: 'block',
        'margin-left': 'auto',
        'margin-right': '10px',
        color: '#22ee22'
    },
    codeblock: {
        position: 'relative',
        background: '#224488',
        height: "80%",
        'margin': '20px',
        'margin-top': "calc( 5% - 20px )",
        color: "#fff",
        padding: '0px',
    },
    filename: {
        position: 'absolute',
        top: '7px',
        left: '20px',
        color: '#fff'
    }
})

export default withStyles(css)(Codeblock);