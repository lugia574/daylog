import { useCallback, useMemo, useState } from 'react';

type CalendarCell = {
  key: string;
  value: number;
  unixTime: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

const buildCalendarCells = (monthDate: Date, selectedDate: Date): CalendarCell[] => {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

  const startOffset = monthStart.getDay();
  const totalDays = monthEnd.getDate();
  const today = new Date();
  const cells: CalendarCell[] = [];

  for (let index = 0; index < 42; index += 1) {
    const day = index - startOffset + 1;
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);

    cells.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      value: date.getDate(),
      unixTime: date.getTime(),
      inCurrentMonth: day > 0 && day <= totalDays,
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
      isSelected:
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate(),
    });
  }

  return cells;
};

export const useCalendarController = () => {
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const prevMonth = useCallback(() => {
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const selectDate = useCallback((unixTime: number) => {
    setSelectedDate(new Date(unixTime));
  }, []);

  const goToday = useCallback(() => {
    const now = new Date();
    setMonthDate(now);
    setSelectedDate(now);
  }, []);

  const monthLabel = useMemo(
    () =>
      monthDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      }),
    [monthDate]
  );

  const selectedLabel = useMemo(
    () =>
      selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [selectedDate]
  );

  const weekdayLabels = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], []);
  const cells = useMemo(() => buildCalendarCells(monthDate, selectedDate), [monthDate, selectedDate]);

  return {
    monthLabel,
    selectedLabel,
    weekdayLabels,
    cells,
    prevMonth,
    nextMonth,
    selectDate,
    goToday,
  };
};
