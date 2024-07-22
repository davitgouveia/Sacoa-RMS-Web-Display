import { useState, useEffect } from 'react';

const CountUpAnimation = ({ initialValue = 0, targetValue }) => {
  const [count, setCount] = useState(initialValue);
  const duration = 800; // ms

  useEffect(() => {
    let startTime;
    let requestId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.ceil((targetValue - initialValue) * (progress / duration));
      const nextValue = initialValue + increment;

      if (nextValue <= targetValue) {
        setCount(nextValue);
        requestId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestId);
  }, [targetValue, initialValue]);

  return Intl.NumberFormat('en-US').format(count);
};

export default CountUpAnimation;
