import requests
import os
from dotenv import load_dotenv

load_dotenv()

def list_models():
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    print(f"Listing models from: {url.replace(api_key, 'HIDDEN')}")
    response = requests.get(url, headers=headers)
    
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        if "models" in data:
            for m in data["models"]:
                print(f"- {m['name']}")
        else:
            print("No 'models' field in response.")
            print(response.text)
    else:
        print(response.text)

if __name__ == "__main__":
    list_models()
