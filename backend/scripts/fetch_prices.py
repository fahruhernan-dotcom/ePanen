import requests
from bs4 import BeautifulSoup
import json
import sys
from datetime import datetime

def fetch_prices():
    print("DEBUG: Starting fetch_prices...", file=sys.stderr)
    today = datetime.now().strftime("%Y-%m-%d")
    # For testing, let's just use a 3-day range to keep it light
    r1 = "2026-03-01"
    r2 = today
    
    url = f"https://sigaokmas.banyumaskab.go.id/site/komoditas?p1=&ark%5B%5D=143&ark%5B%5D=133&ark%5B%5D=134&ark%5B%5D=2&ark%5B%5D=104&ark%5B%5D=105&ark%5B%5D=103&ark%5B%5D=102&ark%5B%5D=125&ark%5B%5D=126&ark%5B%5D=127&ark%5B%5D=128&ark%5B%5D=129&ark%5B%5D=132&ark%5B%5D=130&ark%5B%5D=131&ark%5B%5D=107&ark%5B%5D=109&ark%5B%5D=108&ark%5B%5D=110&ark%5B%5D=117&ark%5B%5D=144&ark%5B%5D=112&ark%5B%5D=111&ark%5B%5D=116&ark%5B%5D=113&ark%5B%5D=114&ark%5B%5D=115&ark%5B%5D=118&ark%5B%5D=120&ark%5B%5D=106&ark%5B%5D=145&ark%5B%5D=139&ark%5B%5D=122&ark%5B%5D=121&ark%5B%5D=146&ark%5B%5D=147&ark%5B%5D=119&ark%5B%5D=148&ark%5B%5D=149&ark%5B%5D=124&ark%5B%5D=123&ark%5B%5D=150&ark%5B%5D=140&ark%5B%5D=141&ark%5B%5D=151&ark%5B%5D=152&ark%5B%5D=142&ark%5B%5D=137&ark%5B%5D=135&ark%5B%5D=138&ark%5B%5D=136&r1={r1}&r2={r2}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    }

    try:
        print(f"DEBUG: Requesting {url}...", file=sys.stderr)
        response = requests.get(url, headers=headers, timeout=20)
        print(f"DEBUG: Status code: {response.status_code}", file=sys.stderr)
        response.raise_for_status()
        
        print("DEBUG: Parsing HTML...", file=sys.stderr)
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', class_='table-hover')
        
        if not table:
            return {"error": "Table not found in the response"}

        # Get headers (dates)
        thead = table.find('thead')
        date_headers = []
        if thead:
            header_cells = thead.find_all('th')
            # Columns: No, Komoditas, Pasar/Satuan, Date1, Date2, ...
            # Actually checking the subagent report, it might be slightly different.
            # Let's assume columns 4 and onwards are dates.
            for i in range(3, len(header_cells)):
                date_headers.append(header_cells[i].get_text(strip=True))

        rows = table.find('tbody').find_all('tr')
        commodities = []

        for row in rows:
            cols = row.find_all('td')
            if len(cols) < 4:
                continue

            name = cols[1].get_text(strip=True)
            # Some names have unit in them like "Ikan Kembung, 1kg"
            unit = "kg"
            if "," in name:
                parts = name.split(",")
                name = parts[0].strip()
                unit = parts[1].strip()
            
            location = cols[2].get_text(strip=True)
            
            # Use the latest available price (last non-zero)
            prices = []
            for i in range(3, len(cols)):
                price_str = cols[i].get_text(strip=True).replace('.', '').replace(',', '.')
                try:
                    price = float(price_str)
                    if price > 0:
                        prices.append({
                            "date": date_headers[i-3] if (i-3) < len(date_headers) else datetime.now().strftime("%Y-%m-%d"),
                            "price": price
                        })
                except ValueError:
                    continue

            if prices:
                # Add ALL prices from the row to populate history
                for j in range(len(prices)):
                    curr_data = prices[j]
                    
                    # Determine trend relative to previous recorded price in the row
                    trend = 'stable'
                    if j > 0:
                        prev_p = prices[j-1]['price']
                        curr_p = curr_data['price']
                        if curr_p > prev_p: trend = 'up'
                        elif curr_p < prev_p: trend = 'down'

                    commodities.append({
                        "name": name,
                        "category": "Pertanian",
                        "price": curr_data['price'],
                        "unit": unit,
                        "location": location,
                        "trend": trend,
                        "date": curr_data['date']
                    })

        return commodities

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    result = fetch_prices()
    print(json.dumps(result))
