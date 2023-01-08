from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'], )
def hello():
    body = request.json
    print(body['message'])
    return 'Hello, world!'

