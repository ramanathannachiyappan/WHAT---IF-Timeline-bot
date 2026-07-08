from flask import Flask, render_template, request, jsonify
from chatbot import ask_gemini

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/simulate", methods=["POST"])
def simulate():
    try:
        data = request.get_json()

        question = data.get("question", "").strip()

        if not question:
            return jsonify({
                "success": False,
                "message": "Please enter a scenario."
            })

        answer = ask_gemini(question)

        return jsonify({
            "success": True,
            "answer": answer
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
if __name__ == "__main__":
    app.run(debug=True)