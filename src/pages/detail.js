import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "utils/configs/axios";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);

    this.state = {
      items: {},
      isLoaded: false,
      compareName: "",
    };
  }

  goBack() {
    this.props.history.goBack();
  }
  getPokeData() {
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

  onChange = (e) => {
    this.setState({ compareName: e.target.value });
  };

  componentDidMount() {
    this.getPokeData();
  }

  render() {
    const { isLoaded, items, next, prev } = this.state;
    if (!isLoaded) {
      return <div className="row">Loading..</div>;
    } else {
      return (
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col">
              <h1 className="my-4">
                {items.name}
                <span className="ml-4">#</span>
                {items.id}
              </h1>
            </div>
            <div className="col">
              <button className="float-right" onClick={this.goBack}>
                &lt; Go Back
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <img
                className="img-fluid"
                src={`https://pokeres.bastionbot.org/images/pokemon/${items.id}.png`}
                alt=""
              />
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col">
                  <h3 className="my-3">Height</h3>
                  <p>{items.height}</p>
                </div>
                <div className="col">
                  <h3 className="my-3">Weight</h3>
                  <p>{items.weight}</p>
                </div>
                <div className="col">
                  <h3 className="my-3">Base Exp.</h3>
                  <p>{items.base_experience}</p>
                </div>
              </div>
              <h3 className="my-3">Ability</h3>
              <ul>
                {items.abilities.map((item) => (
                  <li>{item.ability.name}</li>
                ))}
              </ul>
              <h3 className="my-3">Type</h3>
              <ul>
                {items.types.map((item) => (
                  <li>{item.type.name}</li>
                ))}
              </ul>
              <h3 className="my-3">Compare Pokemon</h3>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.compareName}
                  name="compareName"
                  id="compareName"
                  type="text"
                  className="form-control"
                  placeholder="Enter the comparison item. e.g.: rattata"
                />
                <Link
                  className="disabled-link"
                  to={{
                    pathname: `${items.name}/${this.state.compareName}`,
                    state: { name1: items.name, name2: this.state.compareName },
                  }}
                >
                  <button
                    type="button"
                    className="mt-4 btn btn-primary"
                    disabled={!this.state.compareName}
                  >
                    Compare
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <h3 className="my-4">Statistics</h3>

          <div className="row">
            {items.stats.map((item) => (
              <div className="col-md-3 col-sm-6 mb-4">
                <h5 className="text-uppercase">{item.stat.name}</h5>
                <p>{item.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Detail);
