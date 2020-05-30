import React, { Component } from "react";
import Faq from "react-faq-component";
 
const data = {
    title: "About Us",
    rows: [
        {
            title: "Who are we?",
            content: `We are a group of students from L.D. College of Engineering. This was our final year project. You can found us <a href="https://github.com/avichauhan6832">here</a>, <a href="https://github.com/vddesai1871">here</a>, <a href="https://github.com/Hardikkhanesa">here</a> and <a href="https://github.com/BDChauhan">here</a>. You may contact us from here <a href="https://www.linkedin.com/in/avinash-chauhan/">here</a>.`,
        },
        {
            title: "What was our goal?",
            content:
                "We wanted to do an Aspect Based Sentiment Analysis. Find Aspects of the text - any tweet, review, dialogue, etc, and check sentiment related to those Aspects. We have built a small POC related to our goal, which can be used by others.",
        },
        {
            title: "What is our approach?",
            content: `First, we needed data, Obviously! For training ML model purpose we had research data sets. But for real-time purposes, we need real-time data. That's why we are using scrapping. We are scrapping tweets on a daily basis and cleaning the data and storing it in our NoSQL DB. For sentiment finding, we are using our own trained CNN based model and for Aspect relevance, we are using BERT based our own trained model, and storing day-wise Aspect-Sentiment in our relational DB.`,
        },
        {
            title: "Where can you read more about our work?",
            content: `Oh, Thank you! You can read it from <a href="/">here</a>, <a href="/">here</a> and <a href="/">here</a>.`
        },
    ],
};
 
const styles = {
    bgColor: 'none',
    titleTextColor: "#fc5c7d",
    rowTitleColor: "#6a82fb",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};
 
export default class Aboutus extends Component {
    render() {
        return (
            <div style={{margin:"0 auto", padding:"10px", width:"70%", textAlign:"center"}}>
                <Faq data={data} styles={styles} />
                <h3 style={{color:"#fc5c7d", margin:"20px"}}>Thank You!</h3>
            </div>
        );
    }
}
