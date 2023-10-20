import React, { useState, useEffect } from 'react';
import '../styles/search.css';
import Filter from '../components/searchpage/filter';
import Resbox from '../components/searchpage/restarauntbox';
import Pagination from '../components/searchpage/pagination';
import queryString from 'query-string';
import parse from 'html-react-parser';
import axios from 'axios';

const Search = (props) => {
  const [render, setRender] = useState(false);
  const [text, setText] = useState("<span id=\"arrow\">&#9662;</span>");
  const [filterData, setFilterData] = useState({
    city_name: "delhi",
    type: undefined,
    cuisine: undefined,
    mincost: undefined,
    maxcost: undefined,
    sort: undefined,
    page: 1,
  });
  const [pagination, setPagination] = useState({
    restarants: [],
    pages: [],
  });
  const [restarants, setRestarants] = useState([]);

  const axiosPagesCall = () => {
    axios({
      method: 'post',
      url: 'http://localhost:6556/restraunt/pages',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(filterData),
    })
      .then((res) => {
        const pagesArray = Array.from({ length: res.data.pages }, (_, i) => i + 1);
        const restarantArray = Array.from({ length: res.data.restaraunts }, (_, i) => i + 1);
        setPagination({ restarants: restarantArray, pages: pagesArray });
        setRestarants({ restarants: restarantArray, pages: pagesArray });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const axiosResultCall = () => {
    axios({
      method: 'post',
      url: 'http://localhost:6556/restraunt/filter',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(filterData),
    })
      .then((res) => {
        setRestarants(res.data.restraunts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    const newFilter = { ...filterData };
    newFilter.type = [values.type];
    newFilter.city_name = values.city;
    setFilterData(newFilter);
    axiosPagesCall();
    axiosResultCall();
  }, [props.location.search]);

  const handleClick = () => {
    setRender(!render);
    setText(render ? "<span id=\"arrow\">&#9652;</span>" : "<span id=\"arrow\">&#9662;</span>");
  };

  const renderFilter = () => {
    const selCity = filterData.city_name;
    return render ? <Filter onFilterDataChange={filterDataChange} onCostChange={costDataChange} onCuisineChange={cuisineDataChange} selectedCity={selCity} /> : null;
  };

  const renderFilterDesk = () => {
    const selCity = filterData.city_name;
    return window.innerWidth > 800 ? <Filter onFilterDataChange={filterDataChange} onCostChange={costDataChange} onCuisineChange={cuisineDataChange} selectedCity={selCity} /> : null;
  };

  const pageChange = (pageno) => {
    const newFilter = { ...filterData };
    newFilter.page = pageno;
    setFilterData(newFilter);
    axiosResultCall();
  };

  const filterDataChange = (key, value) => {
    const newFilter = { ...filterData };
    newFilter[key] = value;
    setFilterData(newFilter);
    axiosResultCall();
    axiosPagesCall();
  };

  const costDataChange = (min, max) => {
    const newFilter = { ...filterData };
    newFilter.mincost = min;
    newFilter.maxcost = max;
    setFilterData(newFilter);
    axiosResultCall();
    axiosPagesCall();
  };

  const cuisineDataChange = (cuis, current) => {
    const newFilter = { ...filterData };
    if (newFilter.cuisine) {
      if (current === 0) {
        newFilter.cuisine.push(cuis);
      } else if (current === 1) {
        newFilter.cuisine = newFilter.cuisine.filter((e) => e !== cuis);
        if (newFilter.cuisine.length === 0) {
          newFilter.cuisine = undefined;
        }
      }
    } else {
      newFilter.cuisine = [cuis];
    }
    setFilterData(newFilter);
    axiosPagesCall();
    axiosResultCall();
  };

  const selectedCity = filterData.city_name;
  const mealType = filterData.type;

  return (
    <div className="searchContainer">
      <div className="title">{mealType + ' places in ' + selectedCity}</div>
      <div className="leftb">
        <div className="filterStateHolder">
          <button id="filterState" onClick={handleClick}>
            Filter/Sort {parse(text)}
          </button>
        </div>
        {renderFilter()}
        {renderFilterDesk()}
      </div>
      <div className="rigthb">
{restarants.length > 0 ? (restarants.map((restarant) => {return <Resbox data={restarant} type={mealType} />;}) ) : (<div className="searchRestarantBox sorry">Sorry, No results found!</div>
        )}
        {pagination.pages.length > 0 ? (
          <Pagination pages={pagination.pages} onChangePage={pageChange} onFilterDataChange={filterDataChange} />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
