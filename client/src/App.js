import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

import Header from "./components/Header";
import LightBulb from "./components/LightBulb";
import Mode from "./components/Mode";
import SensorStatus from "./components/SensorStatus";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 0,
      isOn: 0,
      infrared: 0,
      light: 0,
      isAutoInfraredSensor: true,
      isAutoIntensitySensor: true,

      // socket.io
      endpoint: "https://pure-fortress-43600.herokuapp.com"
    };
  }

  componentDidMount() {
    this.response();
    axios
      .get("https://pure-fortress-43600.herokuapp.com/api/sensor")
      .then(res => {
        this.setState({
          isOn: res.isOn,
          infrared: res.infrared,
          light: res.light
        });
      });
  }

  response = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("new-state", stateNew => {
      const { mode } = this.state;
      if (mode === 0)
        this.setState({
          isOn: stateNew.isOn,
          infrared: stateNew.infrared,
          light: stateNew.light
        });
      else
        this.setState({
          infrared: stateNew.infrared,
          light: stateNew.light
        });
    });
  };

  setMode = newMode => {
    const temp = newMode === 0 ? true : false;
    this.setState({
      mode: newMode,
      isAutoInfraredSensor: temp,
      isAutoIntensitySensor: temp
    });
    axios.post("https://pure-fortress-43600.herokuapp.com/api/sensor/mode", {
      mode: newMode
    });
  };

  setOn = newOn => {
    const { infrared, light } = this.state;
    this.setState({ isOn: newOn });
    axios.post("https://pure-fortress-43600.herokuapp.com/api/sensor", {
      isOn: newOn,
      infrared,
      light
    });
  };

  render() {
    const { mode, isOn, infrared, light } = this.state;

    return (
      <div className="container">
        <Header />
        <div className="row mt-5">
          <div className="col-sm-4 text-center">
            <SensorStatus infrared={infrared} light={light} />
          </div>
          <div className="col-sm-8">
            <LightBulb mode={mode} isOn={isOn} setOn={this.setOn} />
            <Mode mode={mode} setMode={this.setMode} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
