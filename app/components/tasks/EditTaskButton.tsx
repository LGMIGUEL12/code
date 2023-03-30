import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';
import IconButton from '~/core/ui/IconButton';

import type { Task } from '~/lib/tasks/types/task';

const EditTaskButton: React.FC<{ task: Task }> = ({ task }) => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/tasks/${task.id as string}/edit`);
  };

  return (
    <IconButton onClick={onEdit}>
      <PencilSquareIcon className="h-6" />
    </IconButton>
  );
};

export default EditTaskButton;
