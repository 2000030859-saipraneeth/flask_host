from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_data():
    data = request.get_json().get('data')
    # Perform data processing on the received data
    processed_data = data.upper()
    print(processed_data)  # Example processing: convert to uppercase
    return jsonify({'result': processed_data})

# Wrap the Flask app with the Werkzeug request/response middleware
@app.route('/', methods=['GET'])
def handle_request():
    # Create a new Werkzeug request
    
    # Return the response as a Flask response
    return "<h1> Server running</h1>"

if __name__ == '__main__':
    app.run(host="0.0.0.0",threaded=True,port=3000)
