import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "utils/configs/axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      prev: null,
      next: "pokemon",
      isLoaded: false,
    };
  }
  getAllPoke(next) {
    axios
      .get(next)
      .then((res) => {
        console.log(
          res.data.results[0].url.substring(
            res.data.results[0].url.length - 2,
            res.data.results[0].url.length - 1
          )
        );
        this.setState({
          items: res.data.results,
          next: res.data.next,
          prev: res.data.previous,
          isLoaded: true,
        });
      })
      .catch();
  }

  changePage(url) {
    this.getAllPoke(url.substring(26));
  }

  componentDidMount() {
    this.getAllPoke(this.state.next);
  }

  render() {
    const { isLoaded, items, next, prev } = this.state;
    if (!isLoaded) {
      return <div className="row">Loading..</div>;
    } else {
      return (
        <div className="container">
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
                      src={`https://pokeres.bastionbot.org/images/pokemon/${item.url.substring(
                        34,
                        item.url.length - 1
                      )}.png`}
                      alt="Card image cap"
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
              <button
                type="button"
                onClick={() => this.changePage(next)}
                className="btn color-primary btn-sm mr-1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);
