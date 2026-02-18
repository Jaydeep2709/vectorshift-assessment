/*
pipelineService.js

Handles communication with backend pipeline API.

Supports:
- Compile pipeline
- Chat with compiled pipeline
*/

import axios from "axios";


// Backend URL
const API_BASE = "http://localhost:8000";


// Axios instance (cleaner and reusable)
const api = axios.create({

  baseURL: API_BASE,

  headers: {
    "Content-Type": "application/json"
  }

});



/*
====================================
Compile pipeline (RUN button)
====================================
*/

export const compilePipeline = async (nodes, edges) => {

  try {

    const response = await api.post(

      "/pipelines/compile",

      {
        nodes: nodes,
        edges: edges
      }

    );

    return response.data;

  }

  catch (error) {

    console.error("Compile pipeline error:", error);

    if (error.response) {

      return error.response.data;

    }

    return {

      success: false,
      error: "Backend not reachable"

    };

  }

};



/*
====================================
Chat with pipeline (SEND button)
====================================
*/

export const chatWithPipeline = async (pipelineId, message) => {

  try {

    const response = await api.post(

      "/pipelines/chat",

      {
        pipeline_id: pipelineId,
        message: message
      }

    );

    return response.data;

  }

  catch (error) {

    console.error("Chat error:", error);

    if (error.response) {

      return error.response.data;

    }

    return {

      success: false,
      output: "Backend error"

    };

  }

};
