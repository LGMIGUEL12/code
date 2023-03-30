import useRequestState from '~/core/hooks/use-request-state';
import { useFirestore } from 'reactfire';
import { useCallback } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { Task } from '../types/task';
import { FirebaseError } from 'firebase/app';

function useUpdateTask() {
  const firestore = useFirestore();
  const { setLoading, setData, setError, state } = useRequestState();

  const updateTaskCallback = useCallback(async (task: Task) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, TASKS_COLLECTION, `/${task.id as string}`);

      await updateDoc(docRef, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
      });

      setData({ ...task });
    } catch (error) {
      setError((error as FirebaseError).message);
      console.error(error);
    }
  }, []);

  return [updateTaskCallback, state] as [
    typeof updateTaskCallback,
    typeof state
  ];
}

export default useUpdateTask;
