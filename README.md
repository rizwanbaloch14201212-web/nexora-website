# NEXORA — Full-stack website starter

A responsive website project using HTML, CSS, JavaScript and Python Flask.

## Files

- `app.py` — Python Flask server and demo JSON endpoints
- `templates/index.html` — website structure
- `static/style.css` — styling, responsive layout and animations
- `static/script.js` — search, theme switch, live clock, navigation and API calls
- `requirements.txt` — Python dependencies

## Run on your computer

1. Install Python 3 from https://www.python.org/downloads/ if it is not already installed.
2. Open a terminal in this project folder.
3. Create and activate a virtual environment (optional but recommended).
4. Install dependencies:

   `python -m pip install -r requirements.txt`

5. Start the development server:

   `python app.py`

6. Open `http://127.0.0.1:5000` in your browser.

Do not expose Flask's debug server to the public internet.

## Publish the frontend on Netlify

Netlify is suitable for the static HTML/CSS/JavaScript frontend, but this Flask project needs a Python server for `/api/status` and `/api/contact`. To publish only the frontend on Netlify, the frontend must be adjusted so API-dependent features use a separately hosted backend. Uploading this entire Flask project as a static folder will not run `app.py`.

Netlify Drop: https://app.netlify.com/drop

## Publish the full-stack project

A Python host such as Render can run Flask. One common deployment path is:

- Push this folder to a GitHub repository.
- In Render, create a new Web Service and connect that repository.
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`

See https://render.com/docs/deploy-flask for current instructions.

## Important notes

- The contact form is a demo endpoint. It does not email or permanently store messages.
- Do not put passwords, API keys or other secrets in frontend JavaScript.
- Before production use, add proper validation, rate limiting, a database/email provider, and any required privacy notice.
- External Google Fonts require an internet connection; system fonts will be used if they fail to load.
