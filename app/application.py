from flask import Flask, render_template, jsonify, request, url_for
import os
from dotenv import load_dotenv  # For the API key in the local environment
import requests

load_dotenv()

application = Flask(__name__)


# Use the route decorator to define the root page
@application.route('/')
def index():
    # Renders the template using Jinja and return the rendered HTML
    return render_template('index.html')

@application.route('/meta_data/<ticker>')
def get_meta_data(ticker):

    # The API key from the environment variable
    api_key = os.environ.get("API_KEY")

    headers = {'Content-Type': 'application/json'}  # The HTTP header

    # Tiingo REST API endpoint for meta data
    url = f'https://api.tiingo.com/tiingo/daily/{ticker}?token={api_key}'

    # Send a GET HTTP request to the
    response = requests.get(url, headers=headers)

    # If the REST API endpoint responded with a 200 OK status code, load the JSON data
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
