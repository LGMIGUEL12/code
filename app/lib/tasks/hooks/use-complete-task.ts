import { doc, updateDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import useRequestState from '~/core/hooks/use-request-state';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';

import type { Task } from '../types/task';
import type { FirebaseError } from 'firebase/app';

/**
 * @name useCompleteTask
 * @description Hook to complete/un-complete an existing task
 */
function useCompleteTask() {
  const firestore = useFirestore();
  const { setLoading, setData, setError, state } = useRequestState();

  const completeTaskCallback = useCallback(
    async (task: Task) => {
      setLoading(true);

      try {
        const docRef = doc(firestore, TASKS_COLLECTION, `/${task.id}`);
        await updateDoc(docRef, { done: !task.done });
        setData({ ...task, done: !task.done });
      } catch (error) {
        setError((error as FirebaseError).message);
        console.error(error);
      }
    },
    [setData, setError, setLoading, firestore]
  );

  return [completeTaskCallback, state] as [
    typeof completeTaskCallback,
    typeof state
  ];
}

export default useCompleteTask;
