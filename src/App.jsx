import React, { useState } from "react";
import "./App.css";

const TIERS = {
  "Tier 1": { amount: 10000, interest: 0.05 },
  "Tier 2": { amount: 20000, interest: 0.10 },
  "Tier 3": { amount: 30000, interest: 0.20 },
};

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [totalSavings, setTotalSavings] = useState(0);

  const handleRegister = () => {
    if (!name || !tier) return;

    const tierDetails = TIERS[tier];
    const newStudent = {
      id: Date.now(),
      name,
      tier,
      deposit: tierDetails.amount,
      interest: tierDetails.amount * tierDetails.interest,
      total: tierDetails.amount * (1 + tierDetails.interest),
    };

    setStudents([...students, newStudent]);
    setTotalSavings(totalSavings + newStudent.deposit);
    setName("");
    setTier("");
  };

  const handleWithdraw = (id) => {
    const student = students.find((s) => s.id === id);
    setStudents(students.filter((s) => s.id !== id));
    setTotalSavings(totalSavings - student.deposit);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Savings Group</h1>

      <div className="registration-card">
        <h2 className="section-title">Student Registration</h2>
        <input
          className="input-field"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="input-field"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
        >
          <option value="">Select Tier</option>
          <option value="Tier 1">Tier 1 (₦10,000)</option>
          <option value="Tier 2">Tier 2 (₦20,000)</option>
          <option value="Tier 3">Tier 3 (₦30,000)</option>
        </select>
        <button
          className="register-button"
          onClick={handleRegister}
          disabled={students.length >= 12}
        >
          Register
        </button>
      </div>

      <div className="dashboard-card">
        <h2 className="section-title">Savings Dashboard</h2>
        <p className="dashboard-total">
          Total Group Savings: ₦{totalSavings.toLocaleString()}
        </p>

        {students.map((s) => (
          <div key={s.id} className="student-card">
            <div>
              <p className="student-name">
                {s.name} - {s.tier}
              </p>
              <p>Deposit: ₦{s.deposit.toLocaleString()}</p>
              <p>Weekly Interest: ₦{s.interest.toLocaleString()}</p>
              <p>Total After 1 Week: ₦{s.total.toLocaleString()}</p>
            </div>
            <button
              className="withdraw-button"
              onClick={() => handleWithdraw(s.id)}
            >
              Withdraw
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
