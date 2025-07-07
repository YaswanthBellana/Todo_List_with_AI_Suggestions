import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("AIzaSyC9nk77j-kcFo_ddTq6fWMIeUtcR79X8Lk"))

def suggest_priority_and_deadline(task_description):
    try:
        model = genai.GenerativeModel("gemini-pro")
        prompt = f"""
        I have a task: "{task_description}".
        Suggest:
        1. A priority level (High, Medium, Low)
        2. A deadline (e.g., "Tomorrow", "In 3 days", or a specific day)
        Respond in this JSON format:
        {{
          "priority": "...",
          "deadline": "..."
        }}
        """
        response = model.generate_content(prompt)
        return eval(response.text)
    except Exception as e:
        return {"error": str(e)}