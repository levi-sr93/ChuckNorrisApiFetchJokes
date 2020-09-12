/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Chuck from './assets/Chuck_Norris.jpg';

function App() {
  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query='
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log(result);
    setState({
      ...state,
      joke: result.data.value
    });
  };

  const handleSearchJoke = event => {
    setState({
      ...state,
      searchKeyword: event.target.value
    });
  };

  const handleFetchSearchJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log(result.data.result);

    const randomJokeFromArray = Math.floor(
      Math.random() * result.data.result.length
    );

    setState({
      ...state,
      joke: result.data.result[randomJokeFromArray].value
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris API</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>

        <div className="col-6 seachJokeCol">
          <div className="card">
            <div className="card-header">
              <span>Search for a word</span>
            </div>
            <div className="card-body">
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchJoke}
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleFetchSearchJoke}
              className="btn btn-warning btn-lg"
            >
              Generate Joke
            </button>
          </div>
        </div>
      </div>

      <h2 className="subTitle">I have a Chuck Norris joke for you</h2>
      <h4>{state.joke}</h4>
    </div>
  );
}

export default App;
