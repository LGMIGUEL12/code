import { useState } from 'react';
import { Switch } from '@headlessui/react';
import formatDistance from 'date-fns/formatDistance';
import useCompleteTask from '~/lib/tasks/hooks/use-complete-task';
import DeleteTaskButton from './DeleteTaskButton';
import EditTaskButton from './EditTaskButton';

import type { Task } from '~/lib/tasks/types/task';
import { format } from 'date-fns';

const TaskCard: React.FCC<{ task: Task }> = ({ task }) => {
  const [isEnabled, setIsEnabled] = useState(task.done);
  const [completeTask] = useCompleteTask();

  const onComplete = () => {
    setIsEnabled((previousValue: boolean) => !previousValue);
    completeTask(task);
  };

  return (
    <div className="w-full rounded-lg bg-zinc-900 p-4 shadow-xl">
      <div className="mt-4 mb-4 flex justify-between">
        <div className="ml-4 mr-4 flex-initial">
          <h5
            className={
              (isEnabled ? 'line-through decoration-2 ' : '') +
              'mb-2 text-xl font-bold'
            }
          >
            {task.title}
          </h5>
          <p
            className={
              (isEnabled ? 'line-through decoration-2 ' : '') +
              'mb-2 text-lg font-normal'
            }
          >
            {task.description}
          </p>
          <p
            className={
              (isEnabled ? 'line-through decoration-2 ' : '') +
              'mb-2 text-base font-light'
            }
          >
            {'Due date: ' +
              format(task.dueDate.toDate(), 'EEEE, MMMM dd, yyyy, HH:mm:ss')}
          </p>
          <p className="mb-2 text-base font-extralight italic">
            {'Created ' +
              formatDistance(task.createdAt?.toDate() as Date, new Date(), {
                addSuffix: true,
              })}
          </p>
        </div>
        <div className="flex-initial">
          <div className="ml-5 mr-5 flex h-full flex-col items-center justify-around">
            <div className="flex-initial">
              <Switch
                checked={isEnabled}
                onChange={onComplete}
                className={`${
                  isEnabled ? 'bg-primary-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className={(isEnabled ? 'blur-lg ' : '') + 'flex-initial'}>
              <EditTaskButton task={task} />
            </div>
            <div className={(isEnabled ? 'blur-lg ' : '') + 'flex-initial'}>
              <DeleteTaskButton task={task} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
