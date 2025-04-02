// src/context/GoalContext.js
import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const GoalContext = createContext();

const goalReducer = (state, action) => {
  switch (action.type) {
    case 'GET_GOALS':
      return { ...state, goals: action.payload, loading: false };
    case 'ADD_GOAL':
      return { ...state, goals: [action.payload, ...state.goals] };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal._id === action.payload._id ? action.payload : goal
        ),
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((goal) => goal._id !== action.payload),
      };
    default:
      return state;
  }
};

export const GoalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, { goals: [], loading: true });

  // ✅ Fetch Goals
  const getGoals = async () => {
    try {
      const res = await axios.get('/api/goals');
      dispatch({ type: 'GET_GOALS', payload: res.data });
    } catch (error) {
      console.error('Error fetching goals');
    }
  };

  // ✅ Add Goal
  const addGoal = async (goal) => {
    const res = await axios.post('/api/goals', goal);
    dispatch({ type: 'ADD_GOAL', payload: res.data });
  };

  // ✅ Update Goal
  const updateGoal = async (id, goalData) => {
    const res = await axios.put(`/api/goals/${id}`, goalData);
    dispatch({ type: 'UPDATE_GOAL', payload: res.data });
  };

  // ✅ Delete Goal
  const deleteGoal = async (id) => {
    await axios.delete(`/api/goals/${id}`);
    dispatch({ type: 'DELETE_GOAL', payload: id });
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <GoalContext.Provider
      value={{
        goals: state.goals,
        loading: state.loading,
        addGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
