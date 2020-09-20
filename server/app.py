"""
eriklintunen.com

Designed by pixel-tree, 2020.
"""

import os

from flask import Flask, jsonify, request, send_file

# from taiga import detect_intent_texts

app = Flask(__name__,
            static_url_path="",
            static_folder=os.path.abspath("../static"))


# General.
@app.route('/', methods=['GET', 'POST'])
def index():
    return send_file("../static/index.html")


# # Contact form.
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     message = request.get_data()
#     destination = os.getenv('CONTACT_ADDRESS')
#


# # Dialogflow.
# @app.route('/send_message', methods=['POST'])
# def send_message():
#     message = request.get_data()
#     project_id = os.getenv('DIALOGFLOW_PROJECT_ID')
#     fulfillment_text = detect_intent_texts(project_id, "unique", message, 'en')
#     response_text = {"message":  fulfillment_text}
#
#     return jsonify(response_text)


# Use wsgi.py for deployment; this only for dev.
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
