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
import SearchResult from './searchResult';
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
  Card,
  CardBody,
  // CardDeck,
  // CardGroup,,
  // CardText,
  // CardHeader,
  CardTitle,
  Col,
  // ListGroup,
  // ListGroupItem,
  Row,
} from 'reactstrap';
// import { getColor } from 'utils/colors';

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );


function DashboardPage() {

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
        
        await axios.get(`get-sentiment/?hashtag=${values.hashtag}`).then((response) => {
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
        <h4>Enter Hashtag that you want to search.</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Input"
            placeholder="#HashTag"
            name="hashtag"
            ref={register({
              required:true
            })}
          />
          {errors.username && errors.username.message}
    
          <Button color="primary" style={{margin:"auto"}} type="submit">Search</Button>
        </form>
      </div>
      
    );
  }

  return (
    <Aux>
      <h3>Welcome to Aspect Based Sentiment Analysis</h3>
      <SearchHashtag />
      <h3>Try following</h3>
      <Row>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #covidus
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #namastetrump
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #mondaymotivaton
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #workoutfromhome
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #tensorflowjs
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={6} xs={12} className="mb-3">
            <Card inverse color="primary">
              <CardBody>
                <CardTitle>
                  #chinaliedpeopledied
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
      </Row>
      <SearchResult 
        result={searchResult}
        resultFound={searchResultFound}
        hashtag={searchedHashtag}
        searchComplete={searchComplete}
      />
    </Aux>
  )
}

export default DashboardPage;
