from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RULES = {
    "memory": ["Restart service", "Increase heap memory", "Investigate memory leak"],
    "cpu": ["Scale up CPU resources", "Kill heavy processes", "Restart service"],
    "database": ["Restart DB service", "Check DB credentials", "Increase connection pool"],
    "network": ["Check firewall", "Restart network interface", "Check DNS settings"]
}

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json or {}
        incident_type = (data.get("incident_type") or data.get("type") or "").lower()
        description = data.get("description", "")
        recs = []

        for k, v in RULES.items():
            if k in incident_type or k in description.lower():
                recs = v
                break

        if not recs:
            recs = ["Check logs", "Restart service", "Notify admin"]

        return jsonify({
            "incident_type": incident_type,
            "recommendations": recs,
            "count": len(recs),
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e), "status": "failed"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
