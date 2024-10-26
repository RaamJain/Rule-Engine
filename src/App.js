import React, { useState } from "react";
import RuleForm from "./components/RuleForm";
import RuleEvaluator from "./components/RuleEvaluator";
import './App.css';

function App() {
  const [ruleAst, setRuleAst] = useState(null);

  const handleRuleCreation = (ast) => {
    setRuleAst(ast);
  };

  return (
    // <div className="container">
    <div>
      <RuleForm onRuleCreated={handleRuleCreation} />
      {ruleAst && <RuleEvaluator ruleAst={ruleAst} />}
    </div>
  );
}

export default App;
