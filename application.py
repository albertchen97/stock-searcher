from flask import Flask, render_template, jsonify, request, url_for
import requests

application = Flask(__name__)

@application.route('/')
def index():
    print("debug: rendering template from template/index.html")
    return render_template('index.html')


@application.route('/meta_data/<ticker>')
def get_meta_data(ticker):
    print("In get_meta_data():")
    print(f"ticker = {ticker}")
    # print("debug: get_data() is being called")
    api_key = '6dc9424884dbc5f5b4bbc312d6f1f994d1076f01'
    headers = {'Content-Type': 'application/json'}
    # Tiingo REST API endpoint for meta data
    url = f'https://api.tiingo.com/tiingo/daily/{ticker}?token={api_key}'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(f"response.status_code  {response.status_code}")

        data = response.json()
        print(f'data = {data}')

        if len(data) > 0:
            return jsonify(data)

    return jsonify()

@application.route('/top_of_book/<ticker>')
def get_top_of_book(ticker):
    print("In get_top_of_book():")
    print(f"ticker = {ticker}")
    api_key = '6dc9424884dbc5f5b4bbc312d6f1f994d1076f01'
    headers = {'Content-Type': 'application/json'}
    # Tiingo REST API endpoint for current top-of-book & last price
    url = f'https://api.tiingo.com/iex/{ticker}?token={api_key}'
    print(f"url = {url}")
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(f"response.status_code  {response.status_code}")

        data = response.json()
        print(f'data = {data}')

        if len(data) > 0:
            return jsonify(data)
        
    return jsonify()


if __name__ == '__main__':
    application.run(debug=True)
