import { memo, type FormEvent } from 'react';
import Flex from '@/shared/ui/Flex/Flex';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import styles from './ClockWidgetUI.module.scss';

type ClockWidgetUIProps = {
  state: {
    clockController: {
      dateText: string;
      timeText: string;
      greeting: string;
      nameDraft: string;
      hasUsername: boolean;
    };
  };
  actions: {
    clockController: {
      updateNameDraft: (value: string) => void;
      submitName: () => void;
      clearUsername: () => void;
    };
  };
};

const ClockWidgetUI = ({ state, actions }: ClockWidgetUIProps) => {
  const { dateText, timeText, greeting, nameDraft, hasUsername } = state.clockController;
  const { updateNameDraft, submitName, clearUsername } = actions.clockController;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitName();
  };

  return (
    <Flex className={styles.Widget} direction="column" gap={12}>
      <Flex as="h1" className={styles.Time}>
        {timeText}
      </Flex>
      <Flex as="p" className={styles.Date}>
        {dateText}
      </Flex>

      {/* {hasUsername ? (
        <Flex direction="row" justify="space-between" align="center" gap={12}>
          <Flex as="p" className={styles.Greeting}>
            {greeting}
          </Flex>
          <Button variant="ghost" size="sm" color="#f0f4ff" onClick={clearUsername}>
            Rename
          </Button>
        </Flex>
      ) : (
        <Flex as="form" direction="row" gap={8} onSubmit={onSubmit}>
          <Input
            placeholder="Type your nickname"
            value={nameDraft}
            onChange={(event) => updateNameDraft(event.target.value)}
            fullWidth
          />
          <Button type="submit" color="#2b4eff">
            Save
          </Button>
        </Flex>
      )} */}
    </Flex>
  );
};

export default memo(ClockWidgetUI);
