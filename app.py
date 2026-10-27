from flask import Flask, render_template, request, jsonify
from datetime import datetime, timezone

app = Flask(__name__)

@app.get("/")
def home():
    return render_template("index.html")

@app.get("/api/status")
def status():
    return jsonify({
        "name": "NEXORA",
        "status": "online",
        "server_time_utc": datetime.now(timezone.utc).isoformat()
    })

@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not message:
        return jsonify({"ok": False, "message": "Please enter your name and message."}), 400

    # Demo only: this does not email or permanently save the message.
    # Add a database or trusted email provider before using this in production.
    return jsonify({
        "ok": True,
        "message": f"Thanks, {name}! The demo form received your message."
    })

if __name__ == "__main__":
    # Local development only. For public hosting, use a production server.
    app.run(debug=True, host="127.0.0.1", port=5000)
