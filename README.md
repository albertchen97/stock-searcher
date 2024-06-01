# 💹 Stock Searcher

A server-side rendered single-page application (SPA) that allows users to search for stock information using the ticker symbol.

## 🎥 Demo

![demo](/demo/stock-searcher-demo.gif)

## Directory Structure (Main Files)

- `.venv/`: A Python virtual environment where Flask and other dependencies are installed.
- `app/`
  - `application.py`: The main Flask application 
  - `static/`: The static files directory.
    - `script.js`: The JavaScript file for the client-side application
  - `templates/`
    - `index.html`: The HTML template to be rendered by the Jinja engine.

## 💻 Try It!

1. You will need to get your free Tiingo API first: https://www.tiingo.com/documentation/general/overview

2. Create a `.env` file under the `app` directory. Paste the Tiingo API there in this format: `API_KEY = [Your API Key]`.

3. Navigate to the `app/` directory to see the build commands.

## 👨‍💻 Tech Stack

- **Front-End**: JavaScript, HTML, CSS

- **Back-End**: Flask (Python)

- **Infrastructure**: AWS EC2, AWS Elastic Beanstalk
  - *Originally deployed on an EC2 instance using Elastic Beanstalk, I shut it down due to cost.*

- **API for Stock Data**: [Tiingo API](https://www.tiingo.com/documentation/general/overview)
