import React, { Component } from 'react';
import { getColor, getEmoji } from '../../functions/Helpers';
import './Joke.css'

class Joke extends Component {

    constructor(props) {
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
    }

    handleUpVote() {
        this.props.upVote(this.props.id, 1);
    }

    handleDownVote() {
        this.props.downVote(this.props.id, -1)
    }

    render() {
        return (
            <div className='Joke'>
            <div className='Joke-buttons'>
              <i className='fas fa-arrow-up' onClick={this.handleUpVote} />
              <span className='Joke-votes' style={{ borderColor: getColor(this.props.votes) }}>
                {this.props.votes}
              </span>
              <i className='fas fa-arrow-down' onClick={this.handleDownVote} />
            </div>
            <div className='Joke-text'>{this.props.text.joke}</div>
            <div className='Joke-smiley'>
              <i className={getEmoji(this.props.votes)} />
            </div>
          </div>
        );
    }
}

export default Joke;