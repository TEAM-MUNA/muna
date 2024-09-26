import React, { useState } from "react";

// Use pre-typed versions of the React-Redux
// `useDispatch` and `useSelector` hooks
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectStatus,
} from "../slices/counterSlice";

import styles from "./Counter.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          type='button'
          className={styles.button}
          aria-label='Decrement value'
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
        <span aria-label='Count' className={styles.value}>
          {count}
        </span>
        <button
          type='button'
          className={styles.button}
          aria-label='Increment value'
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label='Set increment amount'
          value={incrementAmount}
          type='number'
          onChange={(e) => {
            setIncrementAmount(e.target.value);
          }}
        />
        <button
          type='button'
          className={styles.button}
          onClick={() => {
            dispatch(incrementByAmount(incrementValue));
          }}
        >
          Add Amount
        </button>
      </div>
      <div className={styles.row}>
        <button
          type='button'
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => {
            dispatch(incrementAsync(incrementValue));
          }}
        >
          Add Async
        </button>
        <button
          type='button'
          className={styles.oddButton}
          onClick={() => {
            dispatch(incrementIfOdd(incrementValue));
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
export default Counter;
