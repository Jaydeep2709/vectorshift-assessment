import React from "react";
import { Handle } from "reactflow";

export default function LLMNode() {

  return (
    <div style={{ padding: 10, border: "1px solid blue", background: "white" }}>

      <div>LLM Node</div>

      <Handle type="target" position="left" />
      <Handle type="source" position="right" />

    </div>
  );
}
