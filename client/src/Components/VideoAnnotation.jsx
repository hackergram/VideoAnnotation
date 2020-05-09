import React, { Component } from "react";
import video from "./video.mp4";
import { TwoDimensionalVideo } from "react-annotation-tool";

let xd;

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
  
  defaultAnn = [
    {
      color: "rgba(0,255,81,1)",
      incidents: [
        {
          x: 108.25,
          y: 48,
          width: 161,
          height: 111,
          time: 0,
          status: "Show",
          id: "k9ziei8r",
          name: "k9ziei8r",
          label: "",
        },
      ],
      childrenNames: [],
      parentName: "",
      id: "k9ziei8r",
      name: "k9ziei8r",
      label: "1",
    },
  ];
  
  render() {
    xd = this.state.data;
    
    console.log(this.state.data);
    return (
      <div>
        <Home />
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

const Home = () => (
  <div>
    {JSON.stringify(xd[0])}
  </div>
);