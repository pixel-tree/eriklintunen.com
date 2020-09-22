"""
eriklintunen.com

Designed by pixel-tree, 2020.
"""

import json
import os

from dotenv import load_dotenv
from flask import Flask, request, send_file
from flask_mail import Mail, Message

# from taiga import detect_intent_texts

app = Flask(__name__,
            static_url_path="",
            static_folder=os.path.abspath("../static"))

# Environment variables.
load_dotenv()

# Mail server configuration.
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')

mail = Mail(app)


# General.
@app.route('/', methods=['GET', 'POST'])
def index():
    return send_file("../static/index.html")


# Mail from contact form.
@app.route('/send_message', methods=['POST'])
def send_message():
    data = json.loads(request.get_data())
    message = Message('Message from: ' + data['data'][0],
                      sender=os.getenv('MAIL_USERNAME'),
                      recipients=[os.getenv('CONTACT_ADDRESS')])
    message.body = data['data'][1] + '\n\n' + data['data'][2]
    mail.send(message)
    return 'message sent!'


# Use wsgi.py for deployment; this only for dev.
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
