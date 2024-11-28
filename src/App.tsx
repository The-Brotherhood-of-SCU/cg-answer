import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import { Card } from 'antd';
import { Button, Modal } from 'antd';
import { Spin } from "antd";
import Link from 'antd/es/typography/Link';
import Banner from './Banner';
import { Input } from "antd";
import Finder from './Finder';
import AnswerFinder from './AnswerFinder';

const pako = require('pako');
var text = "";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [getError, setError] = useState("");
  const [loadingRate,setLoadingRate]=useState(0);
  useEffect(() => {
    try {
      loadAnswer(isLoaded, setIsLoaded).catch(err=>{setError(`An error occurred! ${err}`)})
    } catch (err) {
      
    }
  })
  return (
    <div className="App">
      {Banner("创高体育理论查询")}
      {ErrorModal(getError, setError,)}
      {isLoaded ? <AnswerFinder text={text} /> : <Loading />}
    </div>
  );
}
function Loading() {
  return (<div className='center-flex' style={{ padding: "2rem" }}>
    <Card title="正在加载题库" bordered={true} style={{ width: 300 }}>
      <Spin className='center-block' style={{ width: "100%" }} size="large" />
    </Card>
  </div>)
}


async function loadAnswer(isLoaded: boolean, setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>) {
  if (isLoaded&& text!="") {
    return;
  }
  const response = await fetch('/cg-answer/data-extract.gz');
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  const data = await response.arrayBuffer();
  const decompressed = pako.inflate(data, { to: 'string' });
  text = decompressed;
  console.log(`data length ${text.length}`)
  setIsLoaded(true);
}
function ErrorModal(message: string, setError: React.Dispatch<React.SetStateAction<string>>) {
  const handleOk = () => {
    setError("");
  };

  return (
    <>
      <Modal title="Error" open={message != ""} onOk={handleOk} >
        <p>{message}</p>
      </Modal>
    </>
  );
}


export default App;
