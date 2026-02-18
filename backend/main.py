"""
main.py

Production backend with compile + chat architecture.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dag_validator import DAGValidator
from info_service import info_service
from pipeline_store import pipeline_store
from pipeline_executor import pipeline_executor


app = FastAPI()

validator = DAGValidator()


# Enable CORS
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request models

class PipelineRequest(BaseModel):

    nodes: list
    edges: list


class ChatRequest(BaseModel):

    pipeline_id: str
    message: str


# Health check

@app.get("/")
def root():

    return {"status": "running"}


# Compile pipeline

@app.post("/pipelines/compile")
def compile_pipeline(request: PipelineRequest):

    nodes = request.nodes
    edges = request.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    is_dag, execution_order = validator.validate(nodes, edges)

    if not is_dag:

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": False,
            "success": False
        }

    system_prompt = ""
    context = ""

    for node in nodes:

        node_type = node["type"]

        if node_type == "input":

            system_prompt = node["data"].get("role", "")

        elif node_type == "text":

            context += node["data"].get("content", "") + "\n"

        elif node_type == "info":

            url = node["data"].get("url", "")

            context += info_service.fetch(url) + "\n"

    pipeline_id = pipeline_store.create(

        system_prompt=system_prompt,
        context=context

    )

    return {

        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": True,
        "success": True,
        "pipeline_id": pipeline_id

    }


# Chat endpoint

@app.post("/pipelines/chat")
def chat(request: ChatRequest):

    compiled_pipeline = pipeline_store.get(

        request.pipeline_id

    )

    if not compiled_pipeline:

        raise HTTPException(

            status_code=404,
            detail="Pipeline not found"

        )

    result = pipeline_executor.execute(

        compiled_pipeline,
        request.message

    )

    return {

        "success": True,
        "output": result

    }
