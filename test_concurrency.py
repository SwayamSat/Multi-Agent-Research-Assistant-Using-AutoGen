import asyncio
import aiohttp
import time
import json

URL = "http://localhost:8000/research-stream"
PAYLOAD = {"topic": "AI Trends 2026"}

async def fetch(session, request_id):
    print(f"Request {request_id}: Starting...")
    start_time = time.time()
    async with session.post(URL, json=PAYLOAD) as response:
        async for line in response.content:
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith("data: "):
                    try:
                        data = json.loads(decoded_line[6:])
                        if data.get("type") == "status" and data.get("status") == "finished":
                             print(f"Request {request_id}: Finished successfully.")
                             break
                    except:
                        pass
    end_time = time.time()
    duration = end_time - start_time
    print(f"Request {request_id}: Completed in {duration:.2f} seconds")
    return duration

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, i) for i in range(3)] # Run 3 concurrent requests
        start_total = time.time()
        results = await asyncio.gather(*tasks)
        end_total = time.time()
        
        print(f"\nTotal time for 3 requests: {end_total - start_total:.2f} seconds")
        print(f"Average time per request: {sum(results) / len(results):.2f} seconds")
        
        # If strictly sequential, Total ~= Sum(results). 
        # If concurrent, Total < Sum(results) (ideally close to max(results))
        if (end_total - start_total) < sum(results) * 0.8:
            print("SUCCESS: Concurrency detected!")
        else:
            print("WARNING: Requests appeared sequential.")

if __name__ == "__main__":
    asyncio.run(main())
