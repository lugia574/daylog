import { useMemo } from 'react';
import { useCalendarController } from './logic';
import { CalendarWidgetUI } from './components';

const CalendarWidget = () => {
  const calendarController = useCalendarController();
  const { monthLabel, selectedLabel, weekdayLabels, cells, prevMonth, nextMonth, selectDate, goToday } =
    calendarController;

  const state = useMemo(
    () => ({
      calendarController: {
        monthLabel,
        selectedLabel,
        weekdayLabels,
        cells,
      },
    }),
    [monthLabel, selectedLabel, weekdayLabels, cells]
  );

  const actions = useMemo(
    () => ({
      calendarController: {
        prevMonth,
        nextMonth,
        selectDate,
        goToday,
      },
    }),
    [prevMonth, nextMonth, selectDate, goToday]
  );

  return <CalendarWidgetUI state={state} actions={actions} />;
};

export default CalendarWidget;
