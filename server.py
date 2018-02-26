#!/usr/bin/env python3
from flask import Flask, render_template

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/browse/<cp>')
def browse(cp):
    print(cp)
    return render_template('index.html', character=chr(int(cp, base=16)))


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
