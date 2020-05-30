import React from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Line, Bar } from 'react-chartjs-2';
import Aux from '../components/Auxiliary';

import { getColor } from 'utils/colors';

// export const getColor = (availableColor = 'primary') => {
//     if (typeof window === 'undefined') {
//       return null;
//     }
  
//     const color = window
//       .getComputedStyle(document.documentElement)
//       .getPropertyValue(`--${availableColor}`);
  
//     return color;
//   };

let colors = ['primary' , 'secondary', 'blue','indigo','purple','pink','red','orange', 'yellow', 'green', 'teal', 'cyan', 'gray', 'gray-dark']

const genLineData = (data, hashtag) => {
  let days = [];
  let aspects = []
  if(data) {
    Object.keys(data).forEach(item => {
      aspects.push(item);
    })
    if(data[aspects[0]]) {
      Object.keys(data[aspects[0]]).forEach(item => {
        days.push(item);
      })
    }
  }
  days.reverse()
  // console.log(aspects);
  // console.log(days);
  let datasets = [];
  aspects.forEach(item => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    datasets.push({
      label: item,
      backgroundColor: getColor(color),
      borderColor: getColor(color),
      borderWidth: 1,
      data: Object.values(data[item]).reverse(),
      fill: false,
    })
  })
  return {
    labels: days,
    datasets: datasets,
  }
}

const genBarData = (data, hashtag) => {
    //console.log(data);
    let day_wise_sentiment = data['day_wise_sentiment'];
    let days = [];
    let sentiment_for_days = []
    if(day_wise_sentiment) {
      Object.keys(day_wise_sentiment).forEach(item => {
        days.push(item);
        sentiment_for_days.push(day_wise_sentiment[item]);
      });
    }
    days.reverse();
    sentiment_for_days.reverse();
    return {
      labels: days,
      datasets: [
        {
          label: `Day Wise Sentiment for #${hashtag}`,
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: sentiment_for_days,
          ...data
        },
      ],
    };
  };

function SearchResult(props) {
    if(props.result.Message) {
        return (
            <h3>{ props.result.Message }</h3>
        );
    }
    else if(props.resultFound && props.searchComplete) {
        return (
          <Aux>
            <h4>Average Sentiment for past se7en days : { Math.round(props.result.sentiment_average * 10000) / 10000 }</h4>
            <Row>
                <Col xl={6} lg={12} md={12}>
                <Card>
                    <CardHeader>Sentiment For past 7 days</CardHeader>
                    <CardBody>
                    <Bar data={genBarData(props.result, props.hashtag)} />
                    </CardBody>
                </Card>
                </Col>
    
                <Col xl={6} lg={12} md={12}>
                <Card>
                    <CardHeader>Sentiment on Aspects</CardHeader>
                    <CardBody>
                    <Line data={genLineData(props.result.aspect_sentiment)} />
                    </CardBody>
                </Card>
                </Col>
            </Row>
          </Aux>
        )
    }
    else {
        return (
            <div></div>
        );
    }
}

export default SearchResult;