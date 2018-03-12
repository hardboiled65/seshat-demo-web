#!/usr/bin/env python3
from flask import Flask, render_template
from property_names import property_names

class App(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update({
        'variable_start_string': '((',
        'variable_end_string': '))',
    })

app = App(__name__, static_url_path='')
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/', defaults={'demo': ''})
@app.route('/<path:demo>', strict_slashes=False)
def index(demo, cp=None):
    print('demo is: ' + str(demo))
    return render_template('index.html', property_names=property_names)

@app.route('/browse')
@app.route('/browse/<cp>')
def browse_index(cp=None):
    return render_template('index.html', property_names=property_names)

@app.route('/segmentation', defaults={'_type': ''})
@app.route('/segmentation/<_type>')
@app.route('/segmentation/<_type>/<text>')
def segmentation_index(_type, text=''):
    return render_template('index.html', property_names=property_names)

if __name__ == '__main__':
    app.run(port=5000)
