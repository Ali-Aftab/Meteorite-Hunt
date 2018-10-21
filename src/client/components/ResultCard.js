import React from "react";

export default function ResultCard(props) {
  return (
    <div className="card">
      <div className="card-left">
        <span className="field-left">METEORITE NAME:</span>
        <br />
        <span className="field-name">{props.name}</span>
      </div>
      <div className="card-right">
        <span className="field-right">MASS:</span> {props.mass} grams
        <br />
        <span className="field-right">DISTANCE: </span>
        {props.distance.toFixed(2)} miles <br />
        <a
          className="google-maps"
          href={`http://www.google.com/maps/place/${props.latitude},${
            props.longitude
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Location
        </a>
      </div>
      <div className="clear" />
    </div>
  );
}
