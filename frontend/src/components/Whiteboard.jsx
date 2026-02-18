import React, { useCallback, useState } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState
} from "reactflow";

import "reactflow/dist/style.css";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Divider,
  CircularProgress
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import { v4 as uuid } from "uuid";


import { compilePipeline } from "../services/pipelineService";
import InputNode from "../nodes/InputNode";
import TextNode from "../nodes/TextNode";
import InfoNode from "../nodes/InfoNode";
import LLMNode from "../nodes/LLMNode";
import OutputNode from "../nodes/OutputNode";


// Register node types

const nodeTypes = {

  input: InputNode,
  text: TextNode,
  info: InfoNode,
  llm: LLMNode,
  output: OutputNode

};


export default function Whiteboard({ setOutput, setPipelineId }) {


  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("Idle");

// const [pipelineId, setPipelineId] = useState(null);
  // Connect nodes

  const onConnect = useCallback(

    (params) =>

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: uuid(),
            animated: true,
            style: { strokeWidth: 2 }
          },
          eds
        )
      ),

    []

  );


  // Delete nodes

  const onNodesDelete = useCallback(

    (deleted) => {

      setNodes((nds) =>
        nds.filter(
          (node) => !deleted.some((d) => d.id === node.id)
        )
      );

    },

    []

  );


  // Delete edges

  const onEdgesDelete = useCallback(

    (deleted) => {

      setEdges((eds) =>
        eds.filter(
          (edge) => !deleted.some((d) => d.id === edge.id)
        )
      );

    },

    []

  );


  // Create node

  const createNode = (type) => {

    const newNode = {

      id: uuid(),

      type,

      position: {

        x: 250 + Math.random() * 200,

        y: 100 + Math.random() * 200

      },

      data: {}

    };

    setNodes((nds) => [...nds, newNode]);

  };
const updateNodeData = (nodeId, newData) => {

  setNodes((nodes) =>
    nodes.map((node) => {

      if (node.id === nodeId) {

        return {
          ...node,
          data: {
            ...node.data,
            ...newData,
            updateNodeData: (data) =>
              updateNodeData(nodeId, data)
          }
        };

      }

      return node;

    })
  );

};

  // Clear board

  const clearBoard = () => {

    setNodes([]);

    setEdges([]);

    setOutput("");

    setStatus("Board cleared");

  };


  // Run pipeline

//   const executePipeline = async () => {

//     if (nodes.length === 0) {

//       alert("Add nodes first");

//       return;

//     }

//     try {

//       setLoading(true);

//       setStatus("Executing pipeline...");

//       const result = await runPipeline(nodes, edges);

//       if (result.success) {

//         setOutput(result.output);

//         setStatus("Execution successful");

//       } else {

//         setStatus("Pipeline invalid (not DAG)");

//       }

//     }
//     catch (err) {

//       console.error(err);

//       setStatus("Execution failed");

//     }
//     finally {

//       setLoading(false);

//     }

//   };

// const executePipeline = async (userMessage) => {

//   // clone nodes
//   const updatedNodes = nodes.map(node => {

//     if (node.type === "text") {
//       return {
//         ...node,
//         data: {
//           ...node.data,
//           content: userMessage
//         }
//       };
//     }

//     return node;
//   });

//   const result = await runPipeline(updatedNodes, edges);

//   return result.output;
// };

const handleRun = async () => {

  if (nodes.length === 0) {

    alert("Add nodes first");
    return;

  }

  try {

    setLoading(true);

    setStatus("Compiling pipeline...");

    const result = await compilePipeline(nodes, edges);

    if (result.success) {

      setPipelineId(result.pipeline_id);

      setStatus("Pipeline compiled successfully");

      console.log("Pipeline ID:", result.pipeline_id);

    }
    else {

      setStatus("Invalid pipeline");

      alert("Pipeline is not valid DAG");

    }

  }
  catch (err) {

    console.error(err);

    setStatus("Compile failed");

  }
  finally {

    setLoading(false);

  }

};


  return (

    <Box flex={1} display="flex" flexDirection="column">


      {/* Top Toolbar */}

      <Paper

        elevation={3}

        sx={{

          padding: 1,

          borderRadius: 0

        }}

      >

        <Stack

          direction="row"

          spacing={1}

          alignItems="center"

          justifyContent="space-between"

        >


          {/* Node buttons */}

          <Stack direction="row" spacing={1}>

            <Button
              variant="contained"
              onClick={() => createNode("input")}
            >
              Input
            </Button>

            <Button
              variant="contained"
              onClick={() => createNode("text")}
            >
              Text
            </Button>

            <Button
              variant="contained"
              onClick={() => createNode("info")}
            >
              Info
            </Button>

            <Button
              variant="contained"
              onClick={() => createNode("llm")}
              color="secondary"
            >
              LLM
            </Button>

            <Button
              variant="contained"
              onClick={() => createNode("output")}
              color="info"
            >
              Output
            </Button>

          </Stack>


          {/* Execution buttons */}

          <Stack direction="row" spacing={1} alignItems="center">

            <Button

              variant="outlined"

              color="error"

              startIcon={<ClearAllIcon />}

              onClick={clearBoard}

            >

              Clear

            </Button>


            <Button

              variant="contained"

              color="success"

              startIcon={

                loading
                  ? <CircularProgress size={16} />
                  : <PlayArrowIcon />
              }

              onClick={handleRun}

              disabled={loading}

            >

              Run

            </Button>


            <Typography variant="body2">

              Status: {status}

            </Typography>


          </Stack>

        </Stack>

      </Paper>


      <Divider />


      {/* Whiteboard */}

      <Box flex={1}>

        <ReactFlow

          nodes={nodes}

          edges={edges}

          onNodesChange={onNodesChange}

          onEdgesChange={onEdgesChange}

          onNodesDelete={onNodesDelete}

          onEdgesDelete={onEdgesDelete}

          onConnect={onConnect}

          nodeTypes={nodeTypes}

          fitView

        >

          <MiniMap />

          <Controls />

          <Background gap={20} />

        </ReactFlow>

      </Box>

    </Box>

  );

}
