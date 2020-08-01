import React, { Component } from 'react';
import setTitle from './components/SetTitle';
import WorldMap from './components/Map';
import { OPTIONS } from './data/dateOptions';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }
    async componentDidMount() {
        //set title of html
        setTitle("Covid-19 Dashboard");
        //api fetch and set state
        try {
            const url = `https://api.covid19api.com/summary`;
            const response = await fetch(url);
            const json = await response.json();
            this.setState({ data: json, loaded: true });
            console.log(this.state.data);//all Obj.

        } catch (error) {
            console.log(error);
        }

    };
    
    render() {

        this.state.loaded ?
            console.log(`loaded: ${this.state.loaded}`) :
            console.log('data not yet loaded');

        //last updated
        const lastDate = new Date(this.state.data.Date);
        //date formatting from data/dateOptions
        const options = OPTIONS;
        console.log(lastDate);
        return (
            <div >
                <header>
                    <h1>Covid-19 dashboard</h1>
                </header>
                <div className="container">
                    <div>
                        <h3>last updated: {lastDate.toLocaleDateString("en-US", options)} </h3>
                    </div>
                    <WorldMap storage ={this.state.data} />
                </div>
            </div>

        )
    }
}
export default App;
