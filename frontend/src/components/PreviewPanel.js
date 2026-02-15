import React from "react";

export default function PreviewPanel({ html }) {

    return (

        <div style={{
            width: "50%",
            height: "100vh",
            borderLeft: "1px solid gray"
        }}>

            <iframe
                title="preview"
                srcDoc={html}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none"
                }}
            />

        </div>

    );

}
