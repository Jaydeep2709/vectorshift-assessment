"""
main.py

Backend entry point.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from dag_validator import DAGValidator
from pipeline_executor import pipeline_executor
import traceback

app = FastAPI()

validator = DAGValidator()


class PipelineRequest(BaseModel):

    nodes: list
    edges: list


@app.get("/")
def root():
    return {"status": "running"}




@app.post("/pipelines/parse")
def parse_pipeline(request: PipelineRequest):

    try:

        nodes = request.nodes
        edges = request.edges

        print("Nodes:", nodes)
        print("Edges:", edges)

        num_nodes = len(nodes)
        num_edges = len(edges)

        is_dag, execution_order = validator.validate(nodes, edges)

        print("Execution order:", execution_order)

        response = {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag
        }

        if is_dag:

            result = pipeline_executor.execute({
                "nodes": nodes,
                "edges": edges
            })

            print("Executor result:", result)

            response["success"] = result["success"]
            response["output"] = result["output"]

        else:

            response["success"] = False
            response["output"] = None

        return response

    except Exception as e:

        traceback.print_exc()   # THIS IS IMPORTANT
        raise HTTPException(500, str(e))


    
    try:

        nodes = request.nodes
        edges = request.edges

        num_nodes = len(nodes)
        num_edges = len(edges)

        is_dag, execution_order = validator.validate(nodes, edges)

        response = {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag
        }

        if is_dag:

            result = pipeline_executor.execute({
                "nodes": nodes,
                "edges": edges
            })

            response["success"] = result["success"]
            response["output"] = result["output"]

        else:

            response["success"] = False
            response["output"] = None

        return response

    except Exception as e:

        raise HTTPException(500, str(e))
