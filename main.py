from flask import Flask, render_template
app = Flask('app')

@app.route('/')
def index():
  return render_template('index.html')

app.run(host='0.0.0.0', port=443, debug=True)
