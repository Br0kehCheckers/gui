import React from "react";
import { Card as NormalCard } from "./styles";

function Card(props) {
  return props.button === true ? (
    <NormalCard
      onClick={() => props.onClick()}
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
    >
      <div className="title" style={{ color: props.color }}>
        {props.title}
      </div>
      <div className="text" style={{ fontSize: "28px", display: "flex" }}>
        <span style={{ fontSize: "40px" }}>{props.icon}</span>{" "}
        <span style={{ marginLeft: "10px" }}>{props.text}</span>
      </div>
    </NormalCard>
  ) : (
    <NormalCard {...props}>
      <div className="title">{props.title}</div>
      <div className="text">{props.text}</div>
    </NormalCard>
  );
}

export default Card;
