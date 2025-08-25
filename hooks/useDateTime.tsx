// useDateTime.tsx
import { useState, useEffect } from 'react';

export const useDateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000); // updates every second

    return () => clearInterval(interval);
  }, []);

  const hour = now.getHours();
  let greeting = "Good morning";
  let emoji = "☀️";

  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good evening";
    emoji = "🌇";
  } else if (hour >= 21 || hour < 5) {
    greeting = "Good night";
    emoji = "🌙";
  }

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = weekdays[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  const getDateSuffix = (date: number) => {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const dateSuffix = getDateSuffix(date);

  const formattedDate = `${day}, ${month} ${date}${dateSuffix} ${year}`;

  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return { greeting, emoji, formattedDate, formattedTime };
};
