import json

# print(json.loads('[]'))
with open('static/models.json') as fp:
	print(json.loads(fp.read()))