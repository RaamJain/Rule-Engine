from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def create_rule():
    data = request.get_json()
    rule_string = data['rule_string']

    ast = rule_string  # Replace this with actual AST conversion logic
    return jsonify({"message": "Rule created successfully!", "ast": ast})

@app.route('/', methods=['POST'])
def evaluate_rule():
    data = request.get_json()
    age = data.get('age')
    department = data.get('department')
    salary = data.get('salary')

    # Example logic for eligibility checking
    if age > 30 and salary > 3000 and department.lower() in ['engineering', 'hr']:
        result = True
    else:
        result = False

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
