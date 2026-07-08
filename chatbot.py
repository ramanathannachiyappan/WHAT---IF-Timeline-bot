from google import genai
from dotenv import load_dotenv
from prompts import SYSTEM_PROMPT
import os

load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)
def ask_gemini(question):
    full_prompt = f"""
{SYSTEM_PROMPT}

User Question:
{question}
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_prompt
    )

    return response.text