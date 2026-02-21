import { useCallback, useEffect, useMemo, useState } from 'react';

const USERNAME_KEY = 'daylog.username';

const getGreetingByHour = (hour: number) => {
  if (hour >= 5 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 19) return 'Good afternoon';
  return 'Good evening';
};

export const useClockController = () => {
  const [now, setNow] = useState(() => new Date());
  const [username, setUsername] = useState(() => localStorage.getItem(USERNAME_KEY) ?? '');
  const [nameDraft, setNameDraft] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const updateNameDraft = useCallback((value: string) => {
    setNameDraft(value);
  }, []);

  const submitName = useCallback(() => {
    const trimmed = nameDraft.trim();
    if (!trimmed) return;

    localStorage.setItem(USERNAME_KEY, trimmed);
    setUsername(trimmed);
    setNameDraft('');
  }, [nameDraft]);

  const clearUsername = useCallback(() => {
    localStorage.removeItem(USERNAME_KEY);
    setUsername('');
    setNameDraft('');
  }, []);

  const greeting = useMemo(() => {
    if (!username) return '';
    return `${getGreetingByHour(now.getHours())}, ${username}`;
  }, [now, username]);

  const dateText = useMemo(
    () =>
      now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
    [now]
  );

  const timeText = useMemo(
    () =>
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [now]
  );

  return {
    dateText,
    timeText,
    greeting,
    nameDraft,
    hasUsername: Boolean(username),
    updateNameDraft,
    submitName,
    clearUsername,
  };
};
