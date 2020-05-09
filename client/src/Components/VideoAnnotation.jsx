import React, { Component } from "react";
import video from "./video.mp4";
import { TwoDimensionalVideo } from "react-annotation-tool";

export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      toBeInserted: [],
    };
  }

  options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  
  componentDidMount() {
    this.getVideoData()
    .then((res) => this.setState({ data: [res.data[0].incidentData] }))
    .catch((err) => console.error(err));
  }
  
  getVideoData = async () => {
    const response = await fetch("/getData");
    if (response.status !== 200) {
      throw Error(await response.json().message);
    }
    
    return await response.json();
  };
  
  updateVideoData = async (toBe) => {
    this.options.body = JSON.stringify(toBe[0]);
    console.log(this.options);
    const response = await fetch("/insertData", this.options);
    const res = await response.json();
    
    if (res.message === "Not Inserted") {
      alert("Something went wrong");
      console.log(res);
      return;
    } else {
      alert("inserted video data");
    }
    
    this.options.body = undefined;
  };
  
  _onSubmit(e) {
    // this.setState({ toBeInserted: e.annotations });
    this.updateVideoData(e.annotations);
  }
  
  render() {
    console.log(this.state.data);
    return (
      <div>
        <TwoDimensionalVideo
          url={video}
          controls
          defaultAnnotations={this.state.data[0]}
          onSubmit={(e) => this._onSubmit(e)}
        ></TwoDimensionalVideo>
      </div>
    );
  }
}