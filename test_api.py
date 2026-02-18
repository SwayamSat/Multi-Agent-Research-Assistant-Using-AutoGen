import requests
import json

url = "http://localhost:8000/research-stream"
payload = {"topic": "Artificial Intelligence in 2026"}
headers = {"Content-Type": "application/json"}

print(f"Testing {url} with payload: {payload}")

try:
    response = requests.post(url, json=payload, stream=True)
    response.raise_for_status()
    
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            if decoded_line.startswith("data: "):
                data_str = decoded_line[6:]
                try:
                    data = json.loads(data_str)
                    print(f"Received event: {data}")
                    if data.get("type") == "error":
                        print(f"ERROR found in stream: {data['content']}")
                        break
                    if data.get("type") == "status" and data.get("status") == "finished":
                        print("Stream finished successfully.")
                        break
                except json.JSONDecodeError:
                    print(f"Failed to decode JSON: {data_str}")
            
except Exception as e:
    print(f"Request failed: {e}")
