import { useEffect, useState } from "react";

const useScroll = (): boolean => {
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsEnd(
        document.documentElement.offsetHeight - 100 <=
          window.innerHeight + document.documentElement.scrollTop
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isEnd;
};

export default useScroll;
