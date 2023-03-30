import { useParams } from '@remix-run/react';
import EditTaskModal from '~/components/tasks/EditTaskModal';

function EditTaskPage() {
  const { taskId } = useParams();

  return (
    <>
      <EditTaskModal taskId={taskId as string} />
    </>
  );
}

export default EditTaskPage;
