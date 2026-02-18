import PreviewIcon from "@mui/icons-material/Preview";
import Typography from "@mui/material/Typography";

import BaseNode from "./BaseNode";

export default function OutputNode({ selected }) {

  return (

    <BaseNode
      title="Output"
      icon={<PreviewIcon fontSize="small" />}
      color="#0288d1"
      selected={selected}
      hasOutput={false}
    >

      <Typography variant="body2">

        Displays result

      </Typography>

    </BaseNode>

  );

}
