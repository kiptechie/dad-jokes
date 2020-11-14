import axios from 'axios';

//const url = "https://icanhazdadjoke.com/";
const url = "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/";

function loadJokes(endpoint) {
   return new Promise((resolve) => {
    axios.get(url + endpoint).then(((data) => {
        resolve({success: true, response: data});
    }, (error) => {
        resolve({success: false, response: error})
    }));
   });
}

export {loadJokes};