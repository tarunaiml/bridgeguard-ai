import urllib.request
import json
import re

html = urllib.request.urlopen(urllib.request.Request('https://data.mendeley.com/datasets/hh52mhtndg/2', headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
match = re.search(r'window\.INITIAL_STATE = (\{.*?\});</script>', html)
if match:
    data = json.loads(match.group(1))
    print(json.dumps(data.get('dataset', {}), indent=2))
