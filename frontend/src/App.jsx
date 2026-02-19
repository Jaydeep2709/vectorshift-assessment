import { Box } from "@mui/material";
import Whiteboard from "./components/Whiteboard";
import NodePanel from "./components/NodePanel";
import OutputPanel from "./components/OutputPanel";
import { useState } from "react";

function App() {

  const [output, setOutput] = useState("");
const [pipelineId, setPipelineId] = useState(null);
  return (
    <Box display="flex" width="Auto" height="100vh">

      {/* <NodePanel /> */}

      <Whiteboard setOutput={setOutput}
       setPipelineId={setPipelineId} />

      <OutputPanel output={output} 
       pipelineId={pipelineId}/>

    </Box>
  );
}

export default App;
