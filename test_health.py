import requests
import sys

try:
    response = requests.get("http://localhost:8000/health")
    if response.status_code == 200:
        data = response.json()
        print(f"Health Check Passed: {data}")
        if data.get("status") == "ok":
            sys.exit(0)
    else:
        print(f"Health Check Failed: Status Code {response.status_code}")
except Exception as e:
    print(f"Health Check Failed: {e}")

sys.exit(1)
