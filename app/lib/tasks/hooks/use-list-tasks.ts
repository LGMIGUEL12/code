import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { TASKS_COLLECTION } from '~/lib/firestore-collections';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

import type { CollectionReference } from 'firebase/firestore';
import type { Task } from '../types/task';

/**
 * @name useListTasks
 * @description Hook to retrieve a list of tasks
 */
function useListTasks() {
  const firestore = useFirestore();
  const organization = useCurrentOrganization();
  const tasksCollection = collection(
    firestore,
    TASKS_COLLECTION
  ) as CollectionReference<Task>;
  const q = query(
    tasksCollection,
    where('organizationId', '==', organization?.id as string)
  );

  return useFirestoreCollectionData(q, { idField: 'id', initialData: [] });
}

export default useListTasks;
