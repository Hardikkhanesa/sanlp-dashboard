// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
// import Page from 'components/Page';
// import ProductMedia from 'components/ProductMedia';
// import SupportTicket from 'components/SupportTicket';
// import UserProgressTable from 'components/UserProgressTable';
// import { IconWidget, NumberWidget } from 'components/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
// import {
//   avatarsData,
//   chartjs,
//   productsData,
//   supportTicketsData,
//   todosData,
//   userProgressTableData,
// } from 'demos/dashboardPage';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Aux from '../components/Auxiliary';
import axios from '../components/axios-form';
import SearchRangeResult from './SearchRangeResult';
// import axios from '../components/axios-form';
// import SearchResult from './searchResult';
import './Dashboard.css';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   MdBubbleChart,
//   MdInsertChart,
//   MdPersonPin,
//   MdPieChart,
//   MdRateReview,
//   MdShare,
//   MdShowChart,
//   MdThumbUp,
// } from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
import {
  Button,
  // Input
  // Badge,
  // Card,
  // CardBody,
  // CardDeck,
  // CardGroup,
  // CardHeader,
  // CardTitle,
  // Col,
  // ListGroup,
  // ListGroupItem,
  // Row,
} from 'reactstrap';
// import { getColor } from 'utils/colors';

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );


function SearchRange() {

  let [searchResultFound, setSearchResultFound] = useState(false);
  let [searchComplete, setSearchComplete] = useState(false);
  let [searchResult, setSearchResult] = useState({});
  let [searchedHashtag, setSearchedHashtag] = useState('');

  const SearchHashtag = () => {

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = async (values) => {
        console.log(values);
        setSearchedHashtag(values.hashtag);
        if(values.hashtag[0] === '#')
          values.hashtag = values.hashtag.substring(1)
        
        await axios.get(`get-range-sentiment/?hashtag=${values.hashtag}&start=${values.start}&end=${values.end}`).then((response) => {
          setSearchComplete(true);
          setSearchResultFound(true);
          setSearchResult(response.data);
          console.log(response);
        }).catch((err) => {
          setSearchComplete(true);
          setSearchResultFound(false);
          alert("Error occured!");
          console.log(err);
          console.log(searchResult);
        })
    };

    return (
      <div className="ContactData">
        <h4>Enter Hashtag with the date range</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Input"
            placeholder="#HashTag"
            name="hashtag"
            ref={register({
              required:true
            })}
          />
          {errors.hashtag && errors.hashtag.message}
          <input 
            className="Input"
            type="datetime"
            name="start"
            placeholder="start-date in YYYY-MM-DD"
            ref={register({
              required:true,
              pattern: {
                value: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i,
                message: "Enter in YYYY-MM-DD"
              }
            })}
          />
          {errors.start && errors.start.message}
          <input 
            className="Input"
            type="datetime"
            name="end"
            placeholder="end-date in YYYY-MM-DD"
            ref={register({
              required:true,
              pattern: {
                value: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i,
                message: "Enter in YYYY-MM-DD"
              }
            })}
          />
          {errors.end && errors.end.message}
    
          <Button color="primary" style={{margin:"auto"}} type="submit">Search</Button>
        </form>
      </div>
      
    );
  }

  return (
    <Aux>
      <SearchHashtag />
      <SearchRangeResult 
        result={searchResult}
        resultFound={searchResultFound}
        hashtag={searchedHashtag}
        searchComplete={searchComplete}
      />
    </Aux>
  )
}

export default SearchRange;
