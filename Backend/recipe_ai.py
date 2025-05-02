from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os


load_dotenv()
HF_ACCESS_TOKEN = os.getenv('HF_ACCESS_TOKEN')


client = InferenceClient(
    model='mistralai/Mixtral-8x7B-Instruct-v0.1',
    token=HF_ACCESS_TOKEN
)

SYSTEM_PROMPT = """
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your answer in clean Markdown, with:
- a **title**
- a list of **ingredients**
- step-by-step **instructions**

Do not wrap your response in triple backticks or code blocks. Be friendly, explain your choices if needed, and feel free to include creative substitutions.
"""


def get_recipe_from_mistral(ingredients_list):

    ingredients_string = ", ".join(ingredients_list)

    try:
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"I have {ingredients_string}. Please give me a recipe you'd recommend I make!"},
        ]
        response = client.chat_completion(
            messages=messages,
            max_tokens=1024,
        )
        return response.choices[0].message['content']

    except Exception as e:
        print('Error:', str(e))
        return None
