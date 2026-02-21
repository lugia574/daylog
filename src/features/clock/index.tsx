import { useMemo } from 'react';
import { useClockController } from './logic';
import { ClockWidgetUI } from './components';

const ClockWidget = () => {
  const clockController = useClockController();
  const { dateText, timeText, greeting, nameDraft, hasUsername, updateNameDraft, submitName, clearUsername } =
    clockController;

  const state = useMemo(
    () => ({
      clockController: {
        dateText,
        timeText,
        greeting,
        nameDraft,
        hasUsername,
      },
    }),
    [dateText, timeText, greeting, nameDraft, hasUsername]
  );

  const actions = useMemo(
    () => ({
      clockController: {
        updateNameDraft,
        submitName,
        clearUsername,
      },
    }),
    [updateNameDraft, submitName, clearUsername]
  );

  return <ClockWidgetUI state={state} actions={actions} />;
};

export default ClockWidget;
