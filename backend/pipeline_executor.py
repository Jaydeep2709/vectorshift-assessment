"""
pipeline_executor.py

Executes pipeline nodes in DAG order.
"""

from dag_validator import DAGValidator
from llm_service import llm_service
from info_service import info_service


class PipelineExecutor:

    def __init__(self):

        self.validator = DAGValidator()


    def execute(self, pipeline):

        nodes = pipeline["nodes"]
        edges = pipeline["edges"]

        is_dag, execution_order = self.validator.validate(nodes, edges)

        if not is_dag:
            raise Exception("Pipeline is not DAG")

        node_map = {node["id"]: node for node in nodes}

        node_outputs = {}

        system_prompt = ""
        context = ""

        for node_id in execution_order:

            node = node_map[node_id]
            node_type = node["type"]

            # INPUT NODE
            if node_type == "input":

                system_prompt = str(node["data"].get("role", ""))


            # TEXT NODE
            elif node_type == "text":

                context += "\n" + str(node["data"].get("content", ""))


            # INFO NODE
            elif node_type == "info":

                url = node["data"].get("url", "")

                info_result = info_service.fetch(url)

                context += "\n" + str(info_result)


            # LLM NODE
            elif node_type == "llm":

                result = llm_service.generate(
                    system_prompt=system_prompt,
                    user_prompt=context
                )

                # IMPORTANT FIX: store only string output
                if isinstance(result, dict) and "output" in result:
                    node_outputs[node_id] = str(result["output"])
                else:
                    node_outputs[node_id] = str(result)


            # OUTPUT NODE
            elif node_type == "output":

                inputs = self.get_inputs(node_id, edges, node_outputs)

                # Convert all inputs safely to string
                clean_inputs = [str(i) for i in inputs]

                node_outputs[node_id] = "\n".join(clean_inputs)


        final_node = execution_order[-1]

        return {
            "success": True,
            "output": str(node_outputs.get(final_node, ""))
        }


    def get_inputs(self, node_id, edges, node_outputs):

        inputs = []

        for edge in edges:

            if edge["target"] == node_id:

                source = edge["source"]

                if source in node_outputs:

                    inputs.append(node_outputs[source])

        return inputs


pipeline_executor = PipelineExecutor()
