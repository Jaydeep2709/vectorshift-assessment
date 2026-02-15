import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TopBar({ onExecute, onClear }) {

    return (

        <AppBar position="static">

            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    VectorShift Clone
                </Typography>

                <Button
                    color="inherit"
                    startIcon={<PlayArrowIcon />}
                    onClick={onExecute}
                >
                    Execute
                </Button>

                <Button
                    color="inherit"
                    startIcon={<DeleteIcon />}
                    onClick={onClear}
                >
                    Clear
                </Button>

            </Toolbar>

        </AppBar>

    );

}
