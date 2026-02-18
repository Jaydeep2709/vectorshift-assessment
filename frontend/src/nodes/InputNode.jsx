import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";

import BaseNode from "./BaseNode";

export default function InputNode({ data, selected }) {

  const [role, setRole] = useState(data.role || "");

  useEffect(() => {
    data.role = role;
  }, [role]);

  return (

    <BaseNode
      title="Input"
      icon={<PersonIcon fontSize="small" />}
      color="#1976d2"
      selected={selected}
      hasInput={false}
      hasOutput={true}
    >

      <TextField
        placeholder="You are a React developer..."
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        multiline
        rows={3}
        size="small"
      />

    </BaseNode>

  );

}
