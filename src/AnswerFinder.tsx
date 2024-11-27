import React from "react";
import Finder from "./Finder";
import { Input } from "antd";

interface AnswerFinderState {
    answer: string; // 确保这里定义了 answer 属性
  }
  interface AnswerFinderProps {
    text:string// 定义组件的属性类型
  }
  class AnswerFinder extends React.Component<AnswerFinderProps, AnswerFinderState>{
    finder:Finder;
    constructor(props:AnswerFinderProps) {
      super(props);
      this.state={
        answer:""
      }
      this.finder=new Finder(props.text);
    }
    search(pattern: string){
      this.setState({answer:this.finder.find(pattern)});
    }
    render(): React.ReactNode {
      return (
        <div className='center-block' style={{ width: "100%" }}>
          <div style={{ padding: "1rem" }}>
            <Input
              className='full-width'
              size='large'
              addonBefore="在此搜索"
              placeholder="input search text"
              onChange={(event) => { this.search(event.target.value) }}
              allowClear
            />
            <textarea style={{ width: "100%", margin: "1rem 0",fontSize:18,color:"white"}} className='mo-textarea' readOnly={true} value={this.state.answer}>
              
            </textarea>
          </div>
        </div>
    
      )
    }
  }

  export default AnswerFinder;