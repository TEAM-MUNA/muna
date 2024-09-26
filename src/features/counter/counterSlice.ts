// 이 파일은 Redux Toolkit의 createSlice 함수 사용 예시를 보여줍니다.
// 리듀서 로직과 액션을 정의하고, 관련된 thunk와 selector를 포함합니다.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState, AppThunk } from "../../app/store";

import fetchCount from "./counterAPI";
// 카운터 슬라이스의 상태에 대한 TypeScript 타입 정의
export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

// 슬라이스 상태의 초기값 정의
const initialState: CounterState = {
  value: 0,
  status: "idle",
};

// Thunk는 데이터 가져오기와 같은 비동기 로직에 흔히 사용됩니다.
// `createAsyncThunk` 메서드는 promise 기반의 비동기 작업을 처리하는 thunk를 생성합니다.
// 이 예시에서는 mock 비동기 요청을 만들어 결과를 반환합니다.
// `createSlice.extraReducers` 필드에서 이러한 액션을 처리하여 결과로 상태를 업데이트할 수 있습니다.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // 반환된 값은 `fulfilled` 액션 payload가 됩니다.
    return response.data;
  }
);

// 슬라이스는 Redux 리듀서 로직을 포함하며, 상태를 업데이트하기 위한 액션을 생성합니다.
// 이러한 액션을 디스패치하여 상태 업데이트를 트리거할 수 있습니다.
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // `reducers` 필드는 리듀서를 정의하고 관련된 액션을 생성하게 해줍니다.
  reducers: {
    increment: (state) => {
      // Redux Toolkit은 리듀서 안에서 "변경"하는 로직을 작성할 수 있도록 허용합니다.
      // 이는 실제로 상태를 변경하지 않으며, Immer 라이브러리를 사용하여 "초안 상태"에서의
      // 변경 사항을 감지하고 그 변경 사항을 바탕으로 새로운 불변 상태를 생성합니다.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // PayloadAction 타입을 사용하여 `action.payload`의 내용을 선언합니다.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // `extraReducers` 필드는 다른 곳에서 정의된 액션을 슬라이스에서 처리할 수 있게 해줍니다.
  // createAsyncThunk나 다른 슬라이스에서 생성된 액션을 포함합니다.
  extraReducers: (builder) => {
    builder
      // 위에 정의된 `incrementAsync` thunk에서 생성된 액션 타입을 처리합니다.
      // 이를 통해 슬라이스 리듀서가 요청 상태 및 결과로 상태를 업데이트할 수 있게 됩니다.
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// 컴포넌트에서 사용할 생성된 액션 크리에이터를 내보냅니다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 스토어 설정에서 사용할 슬라이스 리듀서를 내보냅니다.
export default counterSlice.reducer;

// selector 함수는 Redux 루트 상태에서 값을 선택하는 역할을 합니다.
// selector는 컴포넌트 내에서 `useSelector` 호출 시 인라인으로 정의할 수도 있으며,
// `createSlice.selectors` 필드 안에 정의할 수도 있습니다.
export const selectCount = (state: RootState) => state.counter.value;
export const selectStatus = (state: RootState) => state.counter.status;

// 아래 함수는 thunk라고 하며, 동기 및 비동기 로직을 모두 포함할 수 있습니다.
// `dispatch`와 `getState`에 접근할 수 있으며, 일반 액션처럼 디스패치할 수 있습니다: `dispatch(incrementIfOdd(10))`.
// 현재 상태에 따라 조건부로 액션을 디스패치하는 예시입니다.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
