import React from "react";
import { Handle } from "reactflow";

export default function OutputNode() {

  return (
    <div style={{ padding: 10, border: "1px solid green", background: "white" }}>

      <div>Output Node</div>

      <Handle type="target" position="left" />

    </div>
  );
}
