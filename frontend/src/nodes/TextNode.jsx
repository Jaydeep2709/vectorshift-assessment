import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import DescriptionIcon from "@mui/icons-material/Description";

import BaseNode from "./BaseNode";

export default function TextNode({ id, data, selected }) {

  const [content, setContent] = useState(data?.content || "");

  const handleChange = (e) => {

    const value = e.target.value;

    setContent(value);

    // SAFE update
    if (data?.updateNodeData) {

      data.updateNodeData({
        content: value
      });

    }

  };

  return (

    <BaseNode
      title="Text"
      icon={<DescriptionIcon fontSize="small" />}
      color="#2e7d32"
      selected={selected}
    >

      <TextField
        placeholder="Enter instructions for AI..."
        value={content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        size="small"
      />

    </BaseNode>

  );

}
