import { memo, type FormEvent } from 'react';
import Flex from '@/shared/ui/Flex/Flex';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import Chip from '@/shared/ui/Chip/Chip';
import styles from './TaskWidgetUI.module.scss';

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type TaskWidgetUIProps = {
  state: {
    addTaskController: {
      draft: string;
      todos: TodoItem[];
      openCount: number;
    };
  };
  actions: {
    addTaskController: {
      updateDraft: (value: string) => void;
      addTask: () => void;
      toggleTask: (id: number) => void;
      removeTask: (id: number) => void;
      clearCompleted: () => void;
    };
  };
};

const TaskWidgetUI = ({ state, actions }: TaskWidgetUIProps) => {
  const { draft, todos, openCount } = state.addTaskController;
  const { updateDraft, addTask, toggleTask, removeTask, clearCompleted } = actions.addTaskController;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask();
  };

  return (
    <Flex className={styles.Widget} direction="column" gap={14}>
      <Flex justify="space-between" align="center">
        <Flex as="h2" className={styles.Title}>
          Todo List
        </Flex>
        <Chip label={`${openCount} open`} variant="outlined" color="#ebf1ff" />
      </Flex>

      <Flex as="form" direction="row" gap={8} onSubmit={onSubmit}>
        <Input
          value={draft}
          onChange={(event) => updateDraft(event.target.value)}
          placeholder="Write a task"
          fullWidth
        />
        <Button type="submit" color="#5e8bff">
          Add
        </Button>
      </Flex>

      <Flex as="ul" direction="column" className={styles.List} gap={8}>
        {todos.map((todo) => (
          <Flex as="li" key={todo.id} align="center" justify="space-between" className={styles.Item} gap={10}>
            <Button variant="ghost" size="sm" color={todo.done ? '#9ccf85' : '#eaf0ff'} onClick={() => toggleTask(todo.id)}>
              {todo.done ? 'Done' : 'Open'}
            </Button>
            <Flex as="span" className={todo.done ? styles.DoneText : styles.Text}>
              {todo.text}
            </Flex>
            <Button variant="ghost" size="sm" color="#ffd7d2" onClick={() => removeTask(todo.id)}>
              Delete
            </Button>
          </Flex>
        ))}
      </Flex>

      <Flex justify="flex-end">
        <Button variant="outlined" size="sm" color="#ffb8af" onClick={clearCompleted}>
          Clear completed
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(TaskWidgetUI);
