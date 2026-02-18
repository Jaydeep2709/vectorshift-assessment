import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import LanguageIcon from "@mui/icons-material/Language";

import BaseNode from "./BaseNode";

export default function InfoNode({ data, selected }) {

  const [url, setUrl] = useState(data.url || "");

  useEffect(() => {
    data.url = url;
  }, [url]);

  return (

    <BaseNode
      title="Info"
      icon={<LanguageIcon fontSize="small" />}
      color="#ed6c02"
      selected={selected}
    >

      <TextField
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        multiline
        rows={2}
        size="small"
      />

    </BaseNode>

  );

}
