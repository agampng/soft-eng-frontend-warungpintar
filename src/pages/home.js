import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "utils/configs/axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      prev: null,
      next: "pokemon",
      isLoaded: false,
      itemTypes: [],
      type: null,
    };
  }
  getAllPoke(next) {
    axios
      .get(next)
      .then((res) => {
        this.setState({
          items: res.data.results,
          next: res.data.next,
          prev: res.data.previous,
          isLoaded: true,
        });
      })
      .catch();
  }

  getTypes() {
    axios
      .get("type")
      .then((res) => {
        console.log(res.data);
        this.setState({
          itemTypes: res.data.results,
        });
      })
      .catch();
  }

  getPokeByTypes(type) {
    axios
      .get(`type/${type}`)
      .then(async (res) => {
        let typeItem = [];
        await res.data.pokemon.map((item) => {
          typeItem.push(item.pokemon);
        });
        this.setState({
          items: typeItem,
          next: null,
          prev: null,
          isLoaded: true,
        });
      })
      .catch();
  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ type: e.target.value, isLoaded: false }, () => {
      if (e.target.value !== "all") this.getPokeByTypes(this.state.type);
      else this.getAllPoke("pokemon");
    });
  };

  changePage(url) {
    this.getAllPoke(url.substring(26));
  }

  componentDidMount() {
    this.getAllPoke(this.state.next);
    this.getTypes();
  }

  render() {
    const { isLoaded, items, next, prev } = this.state;
    if (!isLoaded) {
      return (
        <div className="container">
          <div className="row">Loading..</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className={"row mt-4"}>
            <h2>Filter</h2>
            <div className="col-md-3 col-sm-12">
              <select
                className="form-control"
                disabled={this.state.isLoad}
                onChange={this.onChange}
                name="filter"
                value={this.state.type}
              >
                <option key={"load-role"} value="all">
                  All Types
                </option>
                {this.state.itemTypes.map((item) => (
                  <option
                    name="types"
                    onChange={this.onChange}
                    value={item.name}
                    key={item.name}
                  >
                    {item.name}
                  </option>
                ))}
                );
              </select>
            </div>
          </div>
          <div className="row m-4">
            {items.map((item) => (
              <div key={item.name} className="col-md-4 text-center my-4">
                <Link
                  to={{
                    pathname: `detail/${item.name}`,
                    state: { name: item.name },
                  }}
                >
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://pokeres.bastionbot.org/images/pokemon/${
                        item.url.substring(34, item.url.length - 1) ?? ""
                      }.png`}
                      alt="pokemon image"
                    />
                    <div className="card-body">
                      <p className="card-text font-weight-bold text-uppercase">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="row text-center mb-4">
            <div className="col">
              {prev ? (
                <button
                  type="button"
                  onClick={() => this.changePage(prev)}
                  className="btn color-primary btn-sm mr-4"
                >
                  Previous
                </button>
              ) : (
                ""
              )}
              {next ? (
                <button
                  type="button"
                  onClick={() => this.changePage(next)}
                  className="btn btn-primary mr-1"
                >
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
