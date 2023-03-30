import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import IconButton from '~/core/ui/IconButton';
import useDeleteTask from '~/lib/tasks/hooks/use-delete-task';

import type { Task } from '~/lib/tasks/types/task';

const DeleteTaskButton: React.FCC<{ task: Task }> = ({ task }) => {
  const [deleteTask] = useDeleteTask();
  const { t } = useTranslation();

  const onDelete = () => {
    const promise = deleteTask(task);
    toast.promise(promise, {
      loading: t<string>('task:deleteTaskLoading'),
      success: t<string>('task:deleteTaskSuccess'),
      error: t<string>('task:deleteTaskError'),
    });
  };

  return (
    <IconButton onClick={onDelete}>
      <TrashIcon className="h-6" />
    </IconButton>
  );
};

export default DeleteTaskButton;
