import React from "react";

const SuburbDetail = ({ suburb, onClick }) => {
  return (
    <div className="suburb-container">
      <h1>{suburb.name}</h1>
      <h3>Mean: {suburb.avg.toFixed(2)}</h3>
      <h3>Sum: {suburb.sum.toFixed(2)}</h3>
      <h3>Count: {suburb.count}</h3>
      <h3>Min Value: {suburb.min.toFixed(2)}</h3>
      <h3>Max Value: {suburb.max.toFixed(2)}</h3>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default SuburbDetail;
