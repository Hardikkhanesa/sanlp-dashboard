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
import AddResult from './AddResult';

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


function AddHashtag() {

  // let [searchResultFound, setSearchResultFound] = useState(false);
  // let [searchComplete, setSearchComplete] = useState(false);
  // let [searchResult, setSearchResult] = useState({});
  // let [searchedHashtag, setSearchedHashtag] = useState('');
  // let [ hashtagEntered, setHashtagEntered ] = useState('');
  // let [ aspectsEntered, setAspectsEntered ] = useState('');
  let [ result, setResult ] = useState({});

  const HashtagCard = () => {

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = async (values) => {
        console.log(values);
        // setHashtagEntered(values.hashtag);
        // setAspectsEntered(values.aspects);
        // console.log(hashtagEntered);
        // console.log(aspectsEntered);
        if(values.hashtag[0] === '#')
          values.hashtag = values.hashtag.substring(1)
        
        await axios.post('add_hashtag/', values).then((response) => {
          // setSearchComplete(true);
          // setSearchResultFound(true);
          // setSearchResult(response.data);
          console.log(response);
          setResult(response);
        }).catch((err) => {
          // setSearchComplete(true);
          // setSearchResultFound(false);
          alert("Hashtag-Aspect exists already");
          console.log(err);
          //console.log(searchResult);
        })
    };

    return (
      <div className="ContactData">
        <h4>Enter Hashtag or Aspects that you want to add</h4>
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
            placeholder="Aspects separated by comma"
            name="aspects"
            ref={register({
              required:true
            })}
          />
          {errors.aspects && errors.aspects.message}
    
          <Button color="primary" style={{margin:"auto"}} type="submit">Add</Button>
        </form>
      </div>
      
    );
  }

  return (
    <Aux>
      <HashtagCard />
      <AddResult 
        result={result}
      />
    </Aux>
  )
}

export default AddHashtag;
