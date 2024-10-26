import React, { useState } from "react";

function RuleForm({ onRuleCreated }) {
  const [rule, setRule] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const handleSubmitRule = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5
        000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rule_string: rule }),
      });
      const data = await response.json();
      onRuleCreated(data.ast);
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/evaluate_rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: parseInt(age),
          department,
          salary: parseInt(salary),
        }),
      });
      const data = await response.json();
      setEligibilityResult(data.result ? "Eligible" : "Not Eligible");
    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };

  return (
    <div className="container">
      {/* Rule creation form */}
      <form onSubmit={handleSubmitRule}>
        <h2>Rule Engine</h2>
        <label htmlFor="rule">Enter Rule:</label>
        <input
          type="text"
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          placeholder="e.g., age > 30 AND salary > 3000"
        />
        <button type="submit" className="btn-create-rule">Create Rule</button>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </form>

      {/* Divider */}
      <hr />

      {/* Eligibility check form */}
      <form onSubmit={handleCheckEligibility}>
        <h3>Check User Eligibility</h3>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
        
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter department"
        />
        
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter salary"
        />
        
        <button type="submit" className="btn-check-eligibility">Check Eligibility</button>
      </form>

      {/* Display eligibility result */}
      {eligibilityResult && (
        <div className="eligibility-result">
          <h4>Eligibility Result: {eligibilityResult}</h4>
        </div>
      )}
    </div>
  );
}

export default RuleForm;
