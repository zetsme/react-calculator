import { ACTIONS } from './actionTypes';

const calculate = ({ current, previous, operation }) => {
  const cur = parseFloat(current);
  const prev = parseFloat(previous);

  let result;

  switch (operation) {
    case '+':
      result = prev + cur;
      break;
    case '-':
      result = prev - cur;
      break;
    case '*':
      result = prev * cur;
      break;
    case '/':
      result = prev / cur;
      break;
    default:
      return result;
  }

  return result.toString();
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.CLEAR:
      return {
        current: null,
        previous: null,
        operation: null,
        overwrite: false,
      };
    case ACTIONS.ADD_ONE_CHAR:
      if (state.overwrite) {
        return {
          ...state,
          current: payload,
          overwrite: false,
        };
      }
      if (state.current === '0' && payload === '0') {
        return state;
      }
      return {
        ...state,
        current: `${state.current || ''}${payload}`,
      };
    case ACTIONS.ADD_DECIMAL_SEPARATOR:
      if (state.current?.includes('.')) {
        return state;
      }
      if (state.overwrite) {
        return {
          ...state,
          current: '0.',
          overwrite: false,
        };
      }
      if (state.current === '-') {
        return {
          ...state,
          current: '-0.',
        };
      }
      return {
        ...state,
        current: `${state.current || '0'}.`,
      };
    case ACTIONS.ADD_NEGATIVE_CHAR:
      if (state.overwrite) {
        return {
          ...state,
          current: '-',
          overwrite: false,
        };
      }
      if (state.current === null) {
        return {
          ...state,
          current: '-',
        };
      }
      if (state.current.startsWith('-')) {
        return {
          ...state,
          current: state.current.slice(1),
        };
      } else {
        return {
          ...state,
          current: `-${state.current}`,
        };
      }

    case ACTIONS.DELETE_ONE_CHAR:
      if (state.current === null) {
        return state;
      }
      if (state.current === '-0.') {
        return {
          ...state,
          current: '-',
        };
      }
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case ACTIONS.OPERATION:
      if (state.current === null && state.previous === null) {
        return state;
      }
      if (state.current === '-') {
        return state;
      }
      if (state.current === null) {
        return {
          ...state,
          operation: payload,
        };
      }
      if (state.current.endsWith('.')) {
        return {
          ...state,
          previous: state.current.slice(0, -1),
          operation: payload,
          current: null,
        };
      }
      if (state.current === '-0') {
        return {
          ...state,
          previous: '0',
          operation: payload,
          current: null,
        };
      }
      if (state.previous === null) {
        return {
          ...state,
          previous: state.current,
          operation: payload,
          current: null,
        };
      }
      return {
        ...state,
        previous: calculate(state),
        operation: payload,
        current: null,
      };
    case ACTIONS.EVALUATE:
      if (Object.values(state).some((i) => i === null)) return state;
      return {
        ...state,
        previous: null,
        operation: null,
        current: calculate(state),
        overwrite: true,
      };
    default:
      throw new Error();
  }
};
