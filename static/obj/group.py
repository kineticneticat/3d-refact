import json
from parse import parse


def read(name):
	with open('static/models.json') as fp:
		files = json.loads(fp.read())
	for i, _ in enumerate(files):
		if files[i]['name'] == name:
			return
	data = {'name': name, 'data': parse(name)}
	files.append(data)
	with open('static/models.json', 'wt') as f:
		json.dump(files, f)

while True:
	read(input('file: \n'))