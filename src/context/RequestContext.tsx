// src/context/RequestContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import axios from "axios";

interface RequestContextType {
  incrementRequestCount: (location: string) => void;
}

const RequestContext = createContext<RequestContextType>({
  incrementRequestCount: () => {},
});

export const useRequestContext = () => useContext(RequestContext);

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const TIME_WINDOW = 1000; // 1초
const REQUEST_LIMIT = 30; // 1초 동안 30번 이상 요청 발생 시 알림

function RequestProvider({ children }: { children: React.ReactNode }) {
  const [requestTimestamps, setRequestTimestamps] = useState<
    { location: string; timestamp: number }[]
  >([]);

  const sendDiscordNotification = async (
    count: number,
    requests: { location: string; timestamp: number }[]
  ) => {
    try {
      const locationSummary = requests.reduce(
        (acc, { location }) => {
          acc[location] = (acc[location] || 0) + 1;
          return acc;
        },
        {} as { [key: string]: number }
      );

      const locationDetails = Object.entries(locationSummary)
        .map(([location, localCount]) => `${location}: ${localCount}번`)
        .join(", ");

      await axios.post(DISCORD_WEBHOOK_URL || "", {
        content: `1초 내 요청 수가 ${count}을 초과했습니다! 각 위치별 발생 횟수: ${locationDetails}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Discord 알림 전송 실패:", error);
    }
  };

  useEffect(() => {
    // 타임 윈도우 안의 요청 카운트를 계산합니다.
    const checkRequestCount = () => {
      const now = Date.now();
      const recentRequests = requestTimestamps.filter(
        (req) => now - req.timestamp <= TIME_WINDOW
      );

      if (recentRequests.length > REQUEST_LIMIT) {
        sendDiscordNotification(recentRequests.length, recentRequests);
      }

      // 타임 윈도우 내의 요청만 유지
      setRequestTimestamps(recentRequests);
    };

    const intervalId = setInterval(checkRequestCount, 1000); // 1초마다 확인

    return () => clearInterval(intervalId);
  }, [requestTimestamps]);

  const incrementRequestCount = (location: string) => {
    const timestamp = Date.now();
    setRequestTimestamps((prevTimestamps) => [
      ...prevTimestamps,
      { location, timestamp },
    ]);
  };

  const contextValue = useMemo(
    () => ({ incrementRequestCount }),
    [] // `incrementRequestCount`는 변경되지 않으므로 의존성 배열은 비워둡니다.
  );

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
}

export default RequestProvider;
