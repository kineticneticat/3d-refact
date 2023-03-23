
def parse(name):
	print(name)
	txt = []
	with open(name) as f:
		# with open('static/cube.obj') as f:
		data = f.read()
	
	data = data.split('\n')
	for i, x in enumerate(data):
		line = x.split(' ')
		if line[0] == 'v':
			txt.append({
			 'type':
			 'v',
			 'coords': [
			  round(float(line[1]) * 10, 5),
			  round(float(line[2]) * 10, 5),
			  round(float(line[3]) * 10, 5)
			 ]
			})
		elif line[0] == 'f':
			index = line[1::]
			index = list(map(lambda a: a.split('/'), index))
			print(index)
			points = list(map(lambda a: str(int(a[0]) - 1), index))
			txt.append({'type': 'f', 'indices': points})
	return txt
# txt = f'export let data = {txt}'

# print(txt)
# with open('static/obj.mjs', 'w') as f:
# 	f.write(txt)
