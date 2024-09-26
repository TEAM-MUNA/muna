// 이 파일은 미리 타입이 지정된 Redux 훅을 다시 내보내는 중앙 허브 역할을 합니다.
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// 일반 `useDispatch`와 `useSelector` 대신 앱 전체에서 사용하세요.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
