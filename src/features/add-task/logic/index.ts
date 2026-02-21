import { useCallback, useEffect, useMemo, useState } from 'react';

const TODO_KEY = 'daylog.todos';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const readInitialTodos = (): Todo[] => {
  const stored = localStorage.getItem(TODO_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Todo[];
  } catch {
    return [];
  }
};

export const useAddTaskController = () => {
  const [draft, setDraft] = useState('');
  const [todos, setTodos] = useState<Todo[]>(readInitialTodos);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  const updateDraft = useCallback((value: string) => {
    setDraft(value);
  }, []);

  const addTask = useCallback(() => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setTodos((prev) => [{ id: Date.now(), text: trimmed, done: false }, ...prev]);
    setDraft('');
  }, [draft]);

  const toggleTask = useCallback((id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }, []);

  const removeTask = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  }, []);

  const openCount = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  return {
    draft,
    todos,
    openCount,
    updateDraft,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
  };
};
