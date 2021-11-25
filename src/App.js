import { useReducer } from 'react';
import { ACTIONS } from './actionTypes';
import { formatNumbers } from './formatNumbers';
import { reducer } from './reducer';

const initialState = {
  current: null,
  previous: null,
  operation: null,
  overwrite: false,
};

const App = () => {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='container'>
      <div className='grid'>
        <div className='display'>
          <div className='previous'>
            {formatNumbers(previous)} {operation}
          </div>
          <div className='current'>{formatNumbers(current)}</div>
        </div>
        {/* 2 row */}
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className='col-2'>
          C
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_ONE_CHAR })}>DEL</button>
        <button onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: '/' })}>/</button>
        {/* 3 row */}
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '7' })}>7</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '8' })}>8</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '9' })}>9</button>
        <button onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: '*' })}>*</button>
        {/* 4 row */}
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '4' })}>4</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '5' })}>5</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '6' })}>6</button>
        <button onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: '-' })}>-</button>
        {/* 5 row */}
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '1' })}>1</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '2' })}>2</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '3' })}>3</button>
        <button onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: '+' })}>+</button>
        {/* 6 row */}
        <button onClick={() => dispatch({ type: ACTIONS.ADD_NEGATIVE_CHAR })}>+/-</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_ONE_CHAR, payload: '0' })}>0</button>
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DECIMAL_SEPARATOR })}>.</button>
        <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </div>
  );
};

export default App;
