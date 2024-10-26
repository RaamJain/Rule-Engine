import React, { useState } from "react";

function RuleEvaluator({ ruleAst }) {
  const [userData, setUserData] = useState({
    age: '',
    department: '',
    salary: ''
  });
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleEvaluate = async () => {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ast: ruleAst,
        user_data: userData,
      }),
    });
    const data = await response.json();
    setEvaluationResult(data.result);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="evaluation-container">
      <h3>Check User Eligibility</h3>
      <div className="input-group">
        <label>Age: </label>
        <input type="number" name="age" onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label>Department: </label>
        <input type="text" name="department" onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label>Salary: </label>
        <input type="number" name="salary" onChange={handleInputChange} />
      </div>
      <button onClick={handleEvaluate}>Evaluate Eligibility</button>
      {evaluationResult !== null && (
        <div className="response-message">
          <h4>Eligibility Result: {evaluationResult ? "Eligible" : "Not Eligible"}</h4>
        </div>
      )}
    </div>
  );
}

export default RuleEvaluator;
