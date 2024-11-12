import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState(null);
  const [result, setResult] = useState([]);
  const [details, setDetails] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    request.then(response => {
      setCountries(response.data.map(country => country.name.common));
    });
  },[])

  useEffect(() => {
    if (country) {
      const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`);
      request.then(response => setDetails(response.data));
    }
  },[country])

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    if (countries) {
      const output = countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase()));
      setResult(output);
      if (output.length === 1) {
        setCountry(output[0]);
      } else {
        setCountry(null);
      }
    }
  }

  const renderResult = () => {
    if (result.length > 10) {
      return <div><p>Too many matches, specify another filter</p></div>
    } else if (result.length <= 10 && result.length > 1) {
      return (
        result.map((item, index) => (
          <div key={index}>
            <p>{item} <button onClick={()=>setCountry(item)}>show</button></p>
          </div>
        ))
      )
    }
  }

  return (
    <div>
      <div>Find countries <input type='text' value={inputValue} onChange={handleSearch}/></div>
      {renderResult()}
      {country && details?
        <div>
          <h1>{details.name.common}</h1>
          <p>Capital: {details.capital[0]}</p>
          <p>Area: {details.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.entries(details.languages).map(([key, value], index) => (
              <li key={index}>
                {value}
              </li>
            ))}
          </ul>
          <img src={details.flags.png} alt={details.flags.alt} />
        </div>
        :
        <></>
      }
    </div>
  )
}

export default App
