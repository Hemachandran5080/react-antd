import React, { useState, useEffect } from 'react'
import "antd/dist/antd.css";
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import { Modal, Row, Col } from 'antd';
import { Card } from 'antd';
import barchart from "../images/barChart.png";
import linechart from "../images/line-graph.png"
import doughnutchart from "../images/doughnutchart.png";
// import { BASE_API_URL } from "../utils/constants.js";
import axios from "axios";
import "./Body.css"
import Header from "./Header";


const { Meta } = Card;

function Body() {

  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const [datas, setData] = useState([]);
  var ageArray = [];
  var countryArray = [];
  var uniqueCountries = [];
  var countOfCountries = [];
  var count_China = 0;
  var count_Brazil = 0;
  var count_Japan = 0;
  var count_Columbia = 0;
  var count_Argentina = 0;

  useEffect(() => {
    axios.get("/api/get")
    .then((res) => {
        setData(res.data.recordset);
    })
    .catch((err) => console.log(err))
  }, []);


  datas.forEach(function(data) {
    ageArray.push(data.age);
    countryArray.push(data.country)
});

uniqueCountries = [...new Set(countryArray)]

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

count_China = countOccurrences(countryArray, "China")
count_Brazil = countOccurrences(countryArray, "Brazil")
count_Japan = countOccurrences(countryArray, "Japan")
count_Columbia = countOccurrences(countryArray, "Columbia")
count_Argentina = countOccurrences(countryArray, "Argentina")

countOfCountries.push(count_China)
countOfCountries.push(count_Brazil)
countOfCountries.push(count_Japan)
countOfCountries.push(count_Columbia)
countOfCountries.push(count_Argentina)

const state = {
    labels: uniqueCountries,
    datasets: [
        {
            label: 'Average Age',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: ageArray
        }
    ]
}

const statePie = {
    labels: ["China", "Brazil", "Japan", "Columbia", "Argentina"],
    datasets: [
      {
        label: 'Age',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: countOfCountries
      }
    ]
  }
  
  const showModal = () => {
    setVisible1(true);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible1(false);
  };

  const showModal2 = () => {
    setVisible2(true);
  };


  const handleCancel2 = () => {
    console.log('Clicked cancel button');
    setVisible2(false);
  };

  const showModal3 = () => {
    setVisible3(true);
  };


  const handleCancel3 = () => {
    console.log('Clicked cancel button');
    setVisible3(false);
  };

  
  
  return (
        <>
        <Header />
        <div>
          <>
          <Row type="flex">
            <div className="card-1" onClick={showModal}>
            <Col span={6} order={7}>
            <Card
            hoverable
            style={{ width: 280, height: 330, backgroundColor: "#2B2B2B"}}
            cover={<img style={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 2}} alt="Bar Chart" src={barchart} />}
            >
            {/* <Tag style={{backgroundColor: "#2B2B2B" }} color="geekblue"><span style={{fontSize: 20}}><strong>Full Time</strong></span></Tag> */}
            <Meta title={<span style={{color: "whitesmoke", fontSize: 20 }}><strong>Bar Chart</strong></span>} />
            </Card>
            </Col>
            </div>
            <Modal
        title="Bar Chart"
        visible={visible1}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer = {null}
      >
        <Bar
            data={state}
            options={{
                title:{
                display:true,
                text:'Average age',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            } 
        }}
        />
      </Modal>

            
            <div className="card-2">
            <Col span={6} order={6} onClick={showModal2}>
            <Card
            hoverable
            style={{ width: 280, height: 330, backgroundColor: "#2B2B2B" }}
            cover={<img style={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 2}} alt="Line Chart" src={linechart} />}
            >
            {/* <Tag style={{backgroundColor: "#2B2B2B" }} color="geekblue"><span style={{fontSize: 20}}><strong>Full Time</strong></span></Tag> */}
            <Meta title={<span style={{color: "whitesmoke", fontSize: 20 }}><strong>Line Chart</strong></span>} />
            </Card>
            </Col>
            </div>

            <Modal
        title="Line Chart"
        visible={visible2}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel2}
        footer = {null}
      >
        <Line
            data={state}
            options={{
                title:{
                display:true,
                text:'Average age',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            } 
        }}
        />
      </Modal>
            

            <div className="card-3">
            <Col span={6} order={5} onClick={showModal3}>
            <Card
            hoverable
            style={{ width: 280, height: 330, backgroundColor: "#2B2B2B" }}
            cover={<img style={{paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 2}} alt="Doughnut Chart" src={doughnutchart} />}
            >
            {/* <Tag style={{backgroundColor: "#2B2B2B" }} color="geekblue"><span style={{fontSize: 20}}><strong>Full Time</strong></span></Tag> */}
            <Meta title={<span style={{color: "whitesmoke", fontSize: 20 }}><strong>Doughnut Chart</strong></span>} />
            </Card>
            </Col>
            </div>

            <Modal
        title="Doughnut Chart"
        visible={visible3}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel3}
        footer = {null}
      >
        <Doughnut
            data={statePie}
            options={{
                title:{
                display:true,
                text:'Age',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            } 
        }}
        />
      </Modal>
            </Row>
          </>   
        </div>
        </>
    )
}

export default Body