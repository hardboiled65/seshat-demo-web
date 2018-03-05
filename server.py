#!/usr/bin/env python3
from flask import Flask, render_template
from property_names import property_names

app = Flask(__name__, static_url_path='')

@app.route('/', defaults={'demo': ''})
@app.route('/<demo>', strict_slashes=False)
# @app.route('/browse/<cp>')
def index(demo, cp=None):
    return render_template('index.html', property_names=property_names)

@app.route('/browse/<cp>')
def browse(cp):
    return render_template('index.html', property_names=property_names)

'''
def demo_index(demo):
    return render_template('index.html')

@app.route('/browse')
def browse_index():
    return render_template('index.html')

@app.route('/browse/<cp>')
def browse(cp):
    print(cp)
    codepoint = 'U+' + cp.upper()
    return render_template('browse.html', character=chr(int(cp, base=16)),
        codepoint=codepoint)
'''

'''
@app.route('/<username>')
def show_user(username):
    print(username)
    if username != 'main.js':
        return render_template('index.html')

@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')
'''

if __name__ == '__main__':
    app.run(port=5000)
