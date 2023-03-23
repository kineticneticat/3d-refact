import json
from parse import parse


def read(name):
	with open('static/models.json') as fp:
		files = json.loads(fp.read())
	for i in files:
		if files[i]['name'] == name:
			return
	data = {'name': name, 'data': parse(name)}
	print(type(files))
	files = files.append(data)
	
	with open('static/models.json', 'wt') as f:
		json.dump(files, f)


read(input('file: \n'))