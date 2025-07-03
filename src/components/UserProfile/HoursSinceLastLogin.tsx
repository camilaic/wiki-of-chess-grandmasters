import { useEffect, useState } from "react";
import { getFormattedHours } from "../../libraries/helpers";

interface HoursSinceLastLoginProps {
  lastOnline: number;
}

function HoursSinceLastLogin({ lastOnline }: HoursSinceLastLoginProps) {
  const currentDate = new Date();
  const lastLoginDate = new Date(lastOnline * 1000); // Unix timestamp is in seconds. Date expects miliseconds

  const [diffInMilliseconds, setDiffInMilliseconds] = useState(
    currentDate.getTime() - lastLoginDate.getTime(),
  );

  useEffect(() => {
    // prev refers to the previous (current) value of the state variable (elapsedSeconds)
    const timer = setInterval(
      () => setDiffInMilliseconds((prev) => prev + 1000),
      1000,
    );

    return function cleanup() {
      // clean up to reset the whole process and avoid any memory leaks
      clearInterval(timer);
    };
  }, []);

  return <span>{getFormattedHours(diffInMilliseconds)}</span>;
}

export default HoursSinceLastLogin;
