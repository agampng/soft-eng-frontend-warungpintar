import React from "react";

import propTypes from "prop-types";

export default function CompareCard(props) {
  const {
    name,
    id,
    height,
    weight,
    base_experience,
    abilities,
    types,
    stats,
  } = props;

  return (
    <>
      <div className="col-md-6 p-4">
        <div className="row d-flex d-flex justify-content-center">
          <div className="col">
            <h1 className="my-4">
              {name}
              <span className="ml-4">#</span>
              {id}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <img
              className="img"
              src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
              alt=""
              height={400}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <h3 className="my-3">Height</h3>
                <p>{height}</p>
              </div>
              <div className="col">
                <h3 className="my-3">Weight</h3>
                <p>{weight}</p>
              </div>
              <div className="col">
                <h3 className="my-3">Base Exp.</h3>
                <p>{base_experience}</p>
              </div>
            </div>
            <h3 className="my-3">Ability</h3>
            <ul>
              {abilities.map((item, index) => (
                <li key={index}>{item.ability.name}</li>
              ))}
            </ul>
            <h3 className="my-3">Type</h3>
            <ul>
              {types.map((item, index) => (
                <li key={index}>{item.type.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="my-4">Statistics</h3>

        <div className="row">
          {stats.map((item, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">
              <h5 className="text-uppercase">{item.stat.name}</h5>
              <p>{item.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

CompareCard.propTypes = {
  name: propTypes.string,
  id: propTypes.number,
  height: propTypes.number,
  weight: propTypes.number,
  base_experience: propTypes.number,
  abilities: propTypes.array,
  types: propTypes.array,
  stats: propTypes.array,
};
