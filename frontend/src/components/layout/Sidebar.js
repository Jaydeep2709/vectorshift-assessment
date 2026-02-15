import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Sidebar({ addNode }) {

    return (

        <Box
            sx={{
                width: 200,
                background: "#f4f4f4",
                padding: 2,
                borderRight: "1px solid gray",
                height: "100vh"
            }}
        >

            <Typography variant="h6">
                Nodes
            </Typography>

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => addNode("inputNode")}
            >
                Input Node
            </Button>

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => addNode("llmNode")}
            >
                LLM Node
            </Button>

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => addNode("outputNode")}
            >
                Output Node
            </Button>

        </Box>

    );

}
