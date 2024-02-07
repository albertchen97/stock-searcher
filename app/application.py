from flask import Flask, render_template, jsonify, request, url_for
import os
from dotenv import load_dotenv
import requests

load_dotenv()

application = Flask(__name__)

@application.route('/')
def index():
    return render_template('index.html')


@application.route('/meta_data/<ticker>')
def get_meta_data(ticker):
    api_key = os.environ.get("API_KEY")
    headers = {'Content-Type': 'application/json'}

    # Tiingo REST API endpoint for meta data
    url = f'https://api.tiingo.com/tiingo/daily/{ticker}?token={api_key}'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        if len(data) > 0:
            return jsonify(data)

    return jsonify()

@application.route('/top_of_book/<ticker>')
def get_top_of_book(ticker):
    api_key = os.environ.get("API_KEY")
    headers = {'Content-Type': 'application/json'}

    # Tiingo REST API endpoint for current top-of-book & last price
    url = f'https://api.tiingo.com/iex/{ticker}?token={api_key}'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()

        if len(data) > 0:
            return jsonify(data)
        
    return jsonify()


if __name__ == '__main__':
    application.run(debug=True)
