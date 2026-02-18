import SmartToyIcon from "@mui/icons-material/SmartToy";
import Typography from "@mui/material/Typography";

import BaseNode from "./BaseNode";

export default function LLMNode({ selected }) {

  return (

    <BaseNode
      title="LLM"
      icon={<SmartToyIcon fontSize="small" />}
      color="#9c27b0"
      selected={selected}
    >

      <Typography variant="body2">

        OpenRouter AI Model

      </Typography>

    </BaseNode>

  );

}
