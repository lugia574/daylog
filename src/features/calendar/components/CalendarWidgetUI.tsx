import { memo } from 'react';
import Flex from '@/shared/ui/Flex/Flex';
import Grid from '@/shared/ui/Grid/Grid';
import Button from '@/shared/ui/Button/Button';
import styles from './CalendarWidgetUI.module.scss';
import { getThemeColor } from '@/shared/utils/css/getThemeColor';

type CalendarCell = {
  key: string;
  value: number;
  unixTime: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

type CalendarWidgetUIProps = {
  state: {
    calendarController: {
      monthLabel: string;
      selectedLabel: string;
      weekdayLabels: string[];
      cells: CalendarCell[];
    };
  };
  actions: {
    calendarController: {
      prevMonth: () => void;
      nextMonth: () => void;
      selectDate: (unixTime: number) => void;
      goToday: () => void;
    };
  };
};

const CalendarWidgetUI = ({ state, actions }: CalendarWidgetUIProps) => {
  const { monthLabel, selectedLabel, weekdayLabels, cells } = state.calendarController;
  const { prevMonth, nextMonth, selectDate, goToday } = actions.calendarController;

  return (
    <Flex className={styles.Widget} direction="column" gap={12}>
      <Flex justify="space-between" align="center" gap={8}>
        <Flex as="h2" className={styles.Title}>
          Calendar
        </Flex>
        <Flex gap={6} direction="row" justify="space-between" width={'100%'}>
          <Button variant="outlined" size="sm" color="#5b7aab" onClick={prevMonth}>
            {'<'}
          </Button>
          <Button variant="outlined" size="sm" color="#5b7aab" onClick={nextMonth}>
            {'>'}
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" direction="row" className={styles.MetaRow}>
        <Flex as="p" className={styles.MonthLabel} color={getThemeColor('White1')}>
          {monthLabel}
        </Flex>
        <Button variant="ghost" size="sm" color={getThemeColor('White1')} onClick={goToday}>
          Today
        </Button>
      </Flex>

      <Grid columns={7} gap={6} className={styles.WeekGrid}>
        {weekdayLabels.map((day) => (
          <Flex key={day} justify="center" className={styles.WeekDay}>
            {day}
          </Flex>
        ))}
      </Grid>

      <Grid columns={7} gap={6} className={styles.DayGrid}>
        {cells.map((cell) => (
          <Button
            key={cell.key}
            variant={cell.isSelected ? 'filled' : 'outlined'}
            size="sm"
            color={cell.isSelected ? '#355997' : '#9eb2cc'}
            className={`${styles.DayButton} ${cell.isToday ? styles.Today : ''} ${cell.inCurrentMonth ? '' : styles.OutOfMonth}`}
            onClick={() => selectDate(cell.unixTime)}
          >
            {cell.value}
          </Button>
        ))}
      </Grid>

      <Flex as="p" className={styles.SelectedLabel}>
        Selected: {selectedLabel}
      </Flex>
    </Flex>
  );
};

export default memo(CalendarWidgetUI);
