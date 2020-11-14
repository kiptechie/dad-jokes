 import Axios from 'axios';
import React, { Component } from 'react';
import { getSavedJokes, saveJokes } from '../../functions/Helpers';
import Joke from '../joke/Joke';
import './JokeList.css'

const URL = "https://icanhazdadjoke.com/";
const HEADERS = {
    Accept: 'application/json'
}; 
 class JokeList extends Component {

    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props);
        this.state = {
            jokes: getSavedJokes() || [],
            loading: true
        }
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke.id));
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        } else {
            this.setState({loading: false});
        }
    }

    async getJokes() {
        try {
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke.id));
        let jokes = [];
        while(jokes.length < this.props.numJokesToGet) {
            let res = await Axios.get(URL, {headers: HEADERS});
            let newJoke = res.data.id;
            //console.log(newJoke);
            if (!this.seenJokes.has(newJoke)) {
                jokes.push({id: res.data.id, joke: res.data, votes: 0});
            } else {
                console.log("FOUND A DUPLICATE!");
                console.log(res.data.joke);
            }
        }
        this.setState(st => ({
            jokes: [...st.jokes, ...jokes],
            loading: false
        }), () => saveJokes(this.state.jokes)
        );
        } catch(e) {
            alert(e);
            this.setState({loading: false});
        }
    }

    handleClick() {
        this.setState({loading: true}, this.getJokes);
    }

    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j => 
                    j.id === id ? {...j, votes: j.votes + delta} : j),
                loading: false
            }),
            () => saveJokes(this.state.jokes)
        )
    }

     render() {
         if (this.state.loading) {
             return <div className="JokeList-spinner">
                 <i className="fas fa-8x fa-cog fa-spin" />
                 <h1 className="JokeList-title">Brewing dad jokes...</h1>
             </div>
         }

         let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

         return (
             <div className="JokeList">
                 <div className="JokeList-sidebar">
                 <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                 <img alt="Laugh Icon" src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                 <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
                 </div>
                 <div className="JokeList-jokes">
                     {jokes.map(j => (
                         <Joke 
                         key={j.joke.id}
                         id={j.joke.id} 
                         votes={j.votes} 
                         text={j.joke} 
                         upVote={this.handleVote}
                         downVote={this.handleVote} />
                     ))}
                 </div>
             </div>
         );
     }
 }
 
 export default JokeList;