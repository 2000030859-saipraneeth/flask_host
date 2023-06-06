from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_data():
    data = request.json.get('data')
    # Perform data processing on the received data
    processed_data = data.upper()
    print(processed_data)  # Example processing: convert to uppercase
    return jsonify({'result': processed_data})
    

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
