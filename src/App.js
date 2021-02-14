import React, { useState, useRef, useEffect } from 'react';
import fetchService from './fetchService';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

let entity1, entity2;
const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    // using mockup Data
   fetchService.getAllData().then(
    Axios.spread((data1, data2) => {
      entity1 = data1.data;
      entity2 = data2.data;
    })
   )
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);
  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option.title || option.name;
              }}
              className="list-group-item list-group-item-action"
            >
              <div className="row">
                <div className="col-1">
                  {option.id}
                </div>
                <div className="col-9">
                  {option.name || option.title}
                </div>
                <div className="col-2">
                  {option.name && <span className="green"><b>User</b></span>}
                  {option.title && <span className="blue"><b>Product</b></span>}
                </div>
              </div>
            </button>
          );
        })}
      </ul>
    </div>
  );
};

function App() {
  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    let len = event.target.value.length;
    setTimeout(() => {
      if(len === event.target.value.length) {
      let totalList = [ ...entity1, ...entity2]
      let filtered = totalList.filter(row => {
         let columns = Object.keys(row);
         return (
           columns
             .map(column => row[column])
             .toString()
             .toLowerCase()
             .indexOf(event.target.value.toLowerCase()) > -1
         );
       });
       setOptions(filtered);
      } else {
      }
    }, 1000, len)
  };

  return (
    <div className="App container mt-2 mb-3">
      <h1>Search Bar Dropdown</h1>
      <SearchbarDropdown options={options} onInputChange={onInputChange} />
      <br />
    </div>
  );
}

export default App;
