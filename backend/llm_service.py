# from openai import OpenAI


# class LLMService:

#     def __init__(self):

#         # EXACT OpenRouter syntax
#         self.client = OpenAI(
#             base_url="https://openrouter.ai/api/v1",
#             api_key="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",
#         )


#     def generate(self, system_prompt: str, user_prompt: str):

#         print("Calling OpenRouter using OpenAI SDK...")

#         response = self.client.chat.completions.create(

#             # EXACT model name
#             model="openai/gpt-oss-20b:free",

#             messages=[
#                 {
#                     "role": "system",
#                     "content": system_prompt
#                 },
#                 {
#                     "role": "user",
#                     "content": user_prompt
#                 }
#             ],

#             # EXACT extra_body syntax
#             extra_body={
#                 "reasoning": {
#                     "enabled": True
#                 }
#             }

#         )
#         output = response.choices[0].message.content

# # Remove escaped newlines
#         output = output.replace("\n", "")
#         return {
#             "success": True,
#             "output": output
#         }


# # Singleton instance
# llm_service = LLMService()
"""
llm_service.py

Handles OpenRouter LLM calls.
"""

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


class LLMService:

    def __init__(self):

          self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="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",
        )

        # self.model = os.getenv(
        #     "OPENROUTER_MODEL",
        #     "openai/gpt-oss-20b:free"
        # )

    def generate(self, system_prompt, user_prompt):

        print("Calling OpenRouter...")

        response = self.client.chat.completions.create(

            model="openai/gpt-oss-20b:free",

            messages=[

                {
                    "role": "system",
                    "content": system_prompt
                },

                {
                    "role": "user",
                    "content": user_prompt
                }
            ],

            extra_body={
                "reasoning": {"enabled": True}
            }

        )

        return response.choices[0].message.content


llm_service = LLMService()
