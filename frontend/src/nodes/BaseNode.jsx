import React from "react";
import { Handle, Position } from "reactflow";
import { Paper, Box, Typography } from "@mui/material";

export default function BaseNode({
  title,
  icon,
  color,
  children,
  selected,
  hasInput = true,
  hasOutput = true
}) {

  return (

    <Paper
      elevation={selected ? 8 : 3}
      sx={{
        minWidth: 240,
        borderRadius: 2,
        overflow: "hidden",
        border: selected
          ? `2px solid ${color}`
          : "1px solid #ddd",
        transition: "all 0.2s ease"
      }}
    >

      {/* Header */}

      <Box
        sx={{
          background: color,
          color: "white",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >

        {icon}

        <Typography
          variant="subtitle2"
          fontWeight="bold"
        >
          {title}
        </Typography>

      </Box>


      {/* Content */}

      <Box padding={1} bgcolor="white">

        {children}

      </Box>


      {/* Input Handle */}

      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: 10,
            height: 10,
            background: color
          }}
        />
      )}


      {/* Output Handle */}

      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: 10,
            height: 10,
            background: color
          }}
        />
      )}

    </Paper>

  );

}
