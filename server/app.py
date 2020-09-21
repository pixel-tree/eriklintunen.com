"""
eriklintunen.com

Designed by pixel-tree, 2020.
"""

import json
import os

from flask import Flask, request, send_file

# from taiga import detect_intent_texts

app = Flask(__name__,
            static_url_path="",
            static_folder=os.path.abspath("../static"))


# General.
@app.route('/', methods=['GET', 'POST'])
def index():
    return send_file("../static/index.html")


# Contact form.
@app.route('/send_message', methods=['POST'])
def send_message():
    data = json.loads(request.get_data())
    # TO DO: set up mail server to send message etc.
    print()
    print("Data received:")
    print(data)
    print()
    print("Name: " + data['data'][0])
    print("Contact: " + data['data'][1])
    print("Message: " + data['data'][2])
    print()
    # destination = os.getenv('CONTACT_ADDRESS')
    return data  # placeholder


# Use wsgi.py for deployment; this only for dev.
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
