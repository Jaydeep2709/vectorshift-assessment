from openai import OpenAI


class LLMService:

    def __init__(self):

        # EXACT OpenRouter syntax
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="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",
        )


    def generate(self, system_prompt: str, user_prompt: str):

        print("Calling OpenRouter using OpenAI SDK...")

        response = self.client.chat.completions.create(

            # EXACT model name
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

            # EXACT extra_body syntax
            extra_body={
                "reasoning": {
                    "enabled": True
                }
            }

        )
        output = response.choices[0].message.content

# Remove escaped newlines
        output = output.replace("\n", "")
        return {
            "success": True,
            "output": output
        }


# Singleton instance
llm_service = LLMService()
