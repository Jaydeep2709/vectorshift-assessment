import React from "react";
import { Handle } from "reactflow";
import { Card, CardContent, TextField, Typography } from "@mui/material";

export default function InputNode({ data }) {

    return (

        <Card sx={{ width: 200 }}>

            <CardContent>

                <Typography variant="h6">
                    Input
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter prompt"
                    onChange={(e) =>
                        data.text = e.target.value
                    }
                />

            </CardContent>

            <Handle type="source" position="right" />

        </Card>

    );

}
