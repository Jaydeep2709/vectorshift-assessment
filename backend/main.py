from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

from dagValidator import DAGValidator

# Optional LLM support
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request models
class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# Health check
@app.get("/")
def root():
    return {"status": "Backend running"}


# MAIN EXECUTION ENDPOINT
@app.post("/execute")
def execute_pipeline(pipeline: Pipeline):

    nodes = [node.dict() for node in pipeline.nodes]
    edges = [edge.dict() for edge in pipeline.edges]

    # Step 1 — Validate DAG
    validator = DAGValidator(nodes, edges)
    result = validator.validate()

    if not result["valid"]:
        return {
            "success": False,
            "error": result["error"]
        }

    execution_order = result["order"]

    # Step 2 — Execute nodes
    output = run_pipeline(nodes, execution_order)

    return {
        "success": True,
        "execution_order": execution_order,
        "output": output
    }


# Pipeline execution engine
def run_pipeline(nodes, execution_order):

    node_map = {node["id"]: node for node in nodes}

    context = {}

    for node_id in execution_order:

        node = node_map[node_id]

        if node["type"] == "input":

            context[node_id] = node["data"].get("text", "")

        elif node["type"] == "llm":

            prompt = context.get(get_previous_node(node_id, nodes), "")

            context[node_id] = call_llm(prompt)

        elif node["type"] == "output":

            prev = get_previous_node(node_id, nodes)

            return context.get(prev, "")

    return ""


# Find previous node
def get_previous_node(node_id, nodes):

    # simple version (will improve later)
    for node in nodes:
        if node["id"] != node_id:
            return node["id"]

    return None


# LLM CALL
def call_llm(prompt):

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        # fallback mock response
        return f"""
        <html>
        <body>
        <h1>{prompt}</h1>
        </body>
        </html>
        """

    from openai import OpenAI

    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Create a simple HTML webpage for: {prompt}"
            }
        ]
    )

    return response.choices[0].message.content
