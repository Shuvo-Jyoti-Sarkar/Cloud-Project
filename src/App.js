import React, { Component } from 'react';
import './App.css';

class DataFetcher extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      apiData: null,
      loading: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  fetchData = () => {
    const { searchText } = this.state;

    // Make an API request here
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    // const apiEndpoint = `YOUR_API_ENDPOINT?query=${searchText}`;
    const apiEndpoint = `https://jsonplaceholder.typicode.com/users`;

    this.setState({ loading: true });

    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ apiData: data, loading: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { searchText, apiData, loading } = this.state;

    return (
      <div className='App-header'>
        <h1>Best Valued Food</h1>
        <input
          type="text"
          value={searchText}
          placeholder="Enter your food budget"
          onChange={this.handleInputChange}
          className='BudgetInput'
        />
        <button onClick={this.fetchData} disabled={loading} className='Search'>
          Search
        </button>
        {loading && <p>Loading...</p>}
        {apiData && (
          <div>
            <h2>API Data:</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default DataFetcher;
