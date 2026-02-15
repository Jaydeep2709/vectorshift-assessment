import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000";


export async function executePipeline(nodes, edges) {

    // Convert ReactFlow nodes → backend nodes
    const formattedNodes = nodes.map(node => ({

        id: node.id,

        type: convertNodeType(node.type),

        data: node.data || {}

    }));


    const formattedEdges = edges.map(edge => ({

        source: edge.source,

        target: edge.target

    }));


    const pipeline = {

        nodes: formattedNodes,

        edges: formattedEdges

    };


    try {

        const response = await axios.post(
            `${BACKEND_URL}/execute`,
            pipeline
        );

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            error: "Execution failed"
        };

    }

}



function convertNodeType(type) {

    if (type === "inputNode") return "input";

    if (type === "llmNode") return "llm";

    if (type === "outputNode") return "output";

    return type;

}
