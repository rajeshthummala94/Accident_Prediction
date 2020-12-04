from flask import Flask, render_template
from flask import request, redirect, make_response, jsonify
# from flask.ext.responses import json_response
from flask_cors import CORS, cross_origin
import os
import os.path
import json
from preprocessNew import prediction

# @app.route('/predict', methods=['POST'])
# @cross_origin()
# def predict():
# data = request.get_json()
# print(data)
# val = obj.predictResult(data)
# r = {"result": val}
# result = "Slight"
# resp = make_response(json.dumps(r))
# resp.status_code = 200
# resp.headers['Access-Control-Allow-Origin'] = '*'
# return resp


# @app.route("/")
# @cross_origin(supports_credentials=True)
# def first_page():
#     return render_template("index.html")


app = Flask(__name__)
CORS(app, support_credentials=True)

# initialize the data and model
obj = prediction()


@app.route('/predict', methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def index():
    if(request.method == 'POST'):
        data = request.get_json()
        print(data)
        val = obj.predictResult(data)
        r = {"result": val}
        # result = "Slight"
        resp = make_response(json.dumps(r))
        resp.status_code = 200
        # resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, threaded=True)
