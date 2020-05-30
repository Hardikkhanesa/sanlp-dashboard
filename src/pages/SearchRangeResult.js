import React from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
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

function SearchRangeResult(props) {
    console.log(props.result)
    if(props.result.Message) {
        return (
            <h3>{ props.result.Message }</h3>
        );
    }
    else if(props.resultFound && props.searchComplete) {
        return (
          <Aux>
            <h4>Average Sentiment for given range : { Math.round(props.result.sentiment_average * 10000) / 10000 }</h4>
            <div>
            <Row>
                <Col xl={6} lg={12} md={12} style={{float:"none", margin:"0 auto"}}>
                <Card>
                    <CardHeader>Sentiment For past given range</CardHeader>
                    <CardBody>
                    <Bar data={genBarData(props.result, props.hashtag)} />
                    </CardBody>
                </Card>
                </Col>
            </Row>
            </div>

          </Aux>
        )
    }
    else {
        return (
            <div></div>
        );
    }
}

export default SearchRangeResult;