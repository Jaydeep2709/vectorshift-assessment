import React from "react";
import "./NodePanel.css";

const NODE_TYPES = [
  {
    type: "info",
    label: "Info",
    icon: "ℹ️",
    description: "Display information",
  },
  {
    type: "llm",
    label: "LLM",
    icon: "🤖",
    description: "AI processing node",
  },
  {
    type: "output",
    label: "Output",
    icon: "📤",
    description: "Display result",
  },
];

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel" sx={{ m: 2 }}>
      <div className="node-panel-header">Nodes</div>

      <div className="node-panel-list">
        {NODE_TYPES.map((node) => (
          <div
            key={node.type}
            className="node-panel-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <div className="node-icon">{node.icon}</div>

            <div className="node-content">
              <div className="node-label">{node.label}</div>
              <div className="node-description">
                {node.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePanel;
