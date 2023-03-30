import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import If from '~/core/ui/If';
import Modal from '~/core/ui/Modal';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import useFetchTask from '~/lib/tasks/hooks/use-fetch-task';
import EditTaskForm from './EditTaskForm';

const EditTaskModal: React.FC<{ taskId: string }> = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: actualTask, error, status } = useFetchTask(taskId as string);
  const navigate = useNavigate();

  const onClose = (flag: boolean) => {
    navigate(-1);
    setIsOpen(flag);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={onClose}
        heading={<Trans i18nKey={'task:editTaskModalHeading'} />}
      >
        <If condition={status === 'loading'}>
          <PageLoadingIndicator />
        </If>
        <If condition={status === 'error'}>
          <p className="bg-danger-500">{error?.message}</p>
        </If>
        <If condition={status === 'success'}>
          <EditTaskForm task={actualTask} />
        </If>
      </Modal>
    </>
  );
};

export default EditTaskModal;
