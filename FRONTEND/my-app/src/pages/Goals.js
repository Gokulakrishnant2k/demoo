// src/pages/Goals.js
import { useContext, useState } from 'react';
import GoalContext from '../context/GoalContext';

const Goals = () => {
  const { goals, addGoal, deleteGoal, updateGoal } = useContext(GoalContext);
  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(goalData);
    setGoalData({ name: '', targetAmount: '', deadline: '' });
  };

  return (
    <div>
      <h2>🎯 Budget Goals</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={goalData.name}
          onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={goalData.targetAmount}
          onChange={(e) => setGoalData({ ...goalData, targetAmount: e.target.value })}
        />
        <input
          type="date"
          value={goalData.deadline}
          onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
        />
        <button type="submit">Add Goal</button>
      </form>

      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            <span>{goal.name} - ₹{goal.currentAmount}/{goal.targetAmount} by {goal.deadline.split('T')[0]}</span>
            <button onClick={() => deleteGoal(goal._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
