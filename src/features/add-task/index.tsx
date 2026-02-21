import { useMemo } from 'react';
import { useAddTaskController } from './logic';
import { TaskWidgetUI } from './components';

const AddTaskWidget = () => {
  const addTaskController = useAddTaskController();
  const { draft, todos, openCount, updateDraft, addTask, toggleTask, removeTask, clearCompleted } = addTaskController;

  const state = useMemo(
    () => ({
      addTaskController: {
        draft,
        todos,
        openCount,
      },
    }),
    [draft, todos, openCount]
  );

  const actions = useMemo(
    () => ({
      addTaskController: {
        updateDraft,
        addTask,
        toggleTask,
        removeTask,
        clearCompleted,
      },
    }),
    [updateDraft, addTask, toggleTask, removeTask, clearCompleted]
  );

  return <TaskWidgetUI state={state} actions={actions} />;
};

export default AddTaskWidget;
