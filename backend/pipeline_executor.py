"""
pipeline_executor.py

Executes compiled pipeline with user message.
"""

from llm_service import llm_service


class PipelineExecutor:

    def execute(self, compiled_pipeline, user_message):

        system_prompt = compiled_pipeline["system_prompt"]

        context = compiled_pipeline["context"]

        final_prompt = f"""
Context:
{context}

User Message:
{user_message}

Respond as instructed.
"""

        result = llm_service.generate(

            system_prompt=system_prompt,
            user_prompt=final_prompt

        )

        return result


pipeline_executor = PipelineExecutor()
