// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   Controls,
//   Background,
//   addEdge,
//   useNodesState,
//   useEdgesState
// } from "reactflow";

// import "reactflow/dist/style.css";

// import Sidebar from "./layout/Sidebar";
// import TopBar from "./layout/TopBar";
// import InputNode from "../nodes/InputNode";
// import LLMNode from "../nodes/LLMNode";
// import OutputNode from "../nodes/OutputNode";
// import PreviewPanel from "./PreviewPanel";
// import { executePipeline } from "../engine/pipelineExecutor";

// const nodeTypes = {
//   inputNode: InputNode,
//   llmNode: LLMNode,
//   outputNode: OutputNode
// };

// let id = 1;
// const getId = () => `${id++}`;

// export default function Whiteboard() {

//   const [nodes, setNodes, onNodesChange] = useNodesState([]);

//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   const [previewHtml, setPreviewHtml] = useState("");

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   // Add nodes
//   const addNode = (type) => {

//     const newNode = {
//       id: getId(),
//       type,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: { label: type }
//     };

//     setNodes((nds) => [...nds, newNode]);
//   };
// const runPipeline = async () => {

//     const result = await executePipeline(nodes, edges);

//     if (result.success) {

//         setPreviewHtml(result.output);

//     } else {

//         alert(result.error);

//     }

// };
//  const clearPipeline = () => {

//         setNodes([]);

//         setEdges([]);

//         setPreviewHtml("");

//     };
//   return (
//         <div>

//             <TopBar
//                 onExecute={runPipeline}
//                 onClear={clearPipeline}
//             />
//     <div style={{ display: "flex" }}>
//      <Sidebar addNode={addNode} />

//                 <div style={{
//                     width: "50%",
//                     height: "100vh"
//                 }}>
//         <div style={{ width: "50%", height: "100vh" }}>
//       {/* Toolbar */}
//       <div style={{ padding: 10 }}>

//         <button onClick={() => addNode("inputNode")}>
//           Add Input
//         </button>

//         <button onClick={() => addNode("llmNode")}>
//           Add LLM
//         </button>

//         <button onClick={() => addNode("outputNode")}>
//           Add Output
//         </button>

//         <button onClick={runPipeline}>
//             Execute
//         </button>

//       </div>

//       {/* Canvas */}
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >

//         <Controls />
//         <Background />

//       </ReactFlow>

//     </div>


// <PreviewPanel html={previewHtml} />
//     </div>
//     </div>
//     </div>
//   );
// }
import React, { useCallback, useState } from "react";

import ReactFlow, {
    Controls,
    Background,
    addEdge,
    useNodesState,
    useEdgesState
} from "reactflow";

import "reactflow/dist/style.css";

import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";
import PreviewPanel from "./PreviewPanel";

import InputNode from "../nodes/InputNode";
import LLMNode from "../nodes/LLMNode";
import OutputNode from "../nodes/OutputNode";

import { executePipeline } from "../engine/pipelineExecutor";


const nodeTypes = {

    inputNode: InputNode,
    llmNode: LLMNode,
    outputNode: OutputNode

};


let id = 1;

const getId = () => `${id++}`;


export default function Whiteboard() {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [previewHtml, setPreviewHtml] = useState("");


    const onConnect = useCallback(

        (params) => setEdges((eds) => addEdge(params, eds)),

        []

    );


    const addNode = (type) => {

        const newNode = {

            id: getId(),

            type,

            position: {

                x: 250 + Math.random() * 200,

                y: 100 + Math.random() * 200

            },

            data: {}

        };

        setNodes((nds) => [...nds, newNode]);

    };


    const runPipeline = async () => {

        const result = await executePipeline(nodes, edges);

        if (result.success)
            setPreviewHtml(result.output);
        else
            alert(result.error);

    };


    const clearPipeline = () => {

        setNodes([]);

        setEdges([]);

        setPreviewHtml("");

    };


    return (

        <div>

            <TopBar
                onExecute={runPipeline}
                onClear={clearPipeline}
            />

            <div style={{ display: "flex" }}>

                <Sidebar addNode={addNode} />

                <div style={{
                    width: "50%",
                    height: "100vh"
                }}>

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                    >

                        <Controls />

                        <Background />

                    </ReactFlow>

                </div>

                <PreviewPanel html={previewHtml} />

            </div>

        </div>

    );

}
