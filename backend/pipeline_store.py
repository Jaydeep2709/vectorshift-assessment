"""
pipeline_store.py

Stores compiled pipelines for reuse during chat.
"""

import uuid


class PipelineStore:

    def __init__(self):
        self.store = {}

    def create(self, system_prompt, context):

        pipeline_id = str(uuid.uuid4())

        self.store[pipeline_id] = {
            "system_prompt": system_prompt,
            "context": context
        }

        return pipeline_id

    def get(self, pipeline_id):

        return self.store.get(pipeline_id)


pipeline_store = PipelineStore()
