import CompareCard from "parts/compareCard";
import React, { Component } from "react";
import axios from "utils/configs/axios";

export default class Compare extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      items: {},
      items2: {},
      isLoaded: false,
      compareName: "",
      errors: null,
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  getPokeData() {
    axios
      .get(`pokemon/${this.props.location.state.name1}`)
      .then((res) => {
        this.setState({
          items: res.data,
          isLoaded: true,
        });
      })
      .catch();
  }
  getPokeData2() {
    axios
      .get(`pokemon/${this.props.location.state.name2}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          items2: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log(`${err} er`);
        this.setState({
          errors: err,
        });
      });
  }

  onChange = (e) => {
    this.setState({ compareName: e.target.value });
  };

  comparePoke(name1, name2) {
    console.log(name1);
    console.log(name2);
    axios
      .get(`pokemon/${this.props.location.state.name}`)
      .then((res) => {
        console.log(res);
        this.setState({
          items: res.data,
          isLoaded: true,
        });
      })
      .catch();
  }

  componentDidMount() {
    this.getPokeData();
    this.getPokeData2();
  }

  render() {
    const { isLoaded, items, items2, errors } = this.state;
    let stats1 = 0;
    let stats2 = 0;
    items.stats?.map((data) => {
      stats1 += data.base_stat;
    });
    items2.stats?.map((data) => {
      stats2 += data.base_stat;
    });
    if (!isLoaded) {
      return <div className="row">Loading..</div>;
    } else {
      if (errors) {
        return (
          <div className="container">
            <h2>404 Pokemon data not found</h2>
            <button onClick={this.goBack}>Go Back</button>
          </div>
        );
      }
      return (
        <div className="container">
          <h1>Compare Pokemon</h1>
          <button className="float-right" onClick={this.goBack}>
            &lt; Go Back
          </button>
          <div className="row ">
            <CompareCard
              abilities={items.abilities}
              base_experience={items.base_experience}
              height={items.height}
              id={items.id}
              name={items.name}
              stats={items.stats}
              types={items.types}
              weight={items.weight}
            />
            <CompareCard
              abilities={items2.abilities ?? []}
              base_experience={items2.base_experience}
              height={items2.height}
              id={items2.id}
              name={items2.name}
              stats={items2.stats ?? []}
              types={items2.types ?? []}
              weight={items2.weight}
            />
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <h2>Win Predict (Based on statistic points)</h2>
            </div>
          </div>
          <div className="row m-4">
            <div className="col d-flex justify-content-center">
              <h1>{Math.round((stats1 / (stats1 + stats2)) * 100)} % </h1>
            </div>
            <div className="col d-flex justify-content-center">
              <h1>{Math.round((stats2 / (stats1 + stats2)) * 100)} % </h1>
            </div>
          </div>
        </div>
      );
    }
  }
}
