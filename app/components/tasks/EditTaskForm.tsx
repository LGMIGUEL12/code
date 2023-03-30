import { useNavigate } from '@remix-run/react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { Timestamp } from 'firebase/firestore';

import type { Task } from '~/lib/tasks/types/task';
import useUpdateTask from '~/lib/tasks/hooks/use-update-task';
import { toast } from 'react-hot-toast';

const EditTaskForm: React.FC<{ task: Task }> = ({ task }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: getDatetimeFormat(task.dueDate.toDate()),
    },
  });
  const [updateTask, requestState] = useUpdateTask();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const titleControl = register('title', { required: true });
  const descriptionControl = register('description', { required: true });
  const dueDateControl = register('dueDate', { required: true });

  const onSubmit = (title: string, description: string, dueDate: string) => {
    const dueDateTimestamp = Timestamp.fromDate(new Date(dueDate));
    const editedTask: Task = {
      ...task,
      title,
      description,
      dueDate: dueDateTimestamp,
    };
    const promise = updateTask(editedTask);
    toast.promise(promise, {
      loading: t<string>('task:updateTaskLoading'),
      success: t<string>('task:updateTaskSuccess'),
      error: t<string>('task:updateTaskError'),
    });
    navigate(-1);
  };

  return (
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit(values.title, values.description, values.dueDate)
      )}
      className="space-y-5"
    >
      <TextField>
        <TextField.Label>
          <Trans i18nKey={'task:titleInputLabel'} />
          <TextField.Input
            type="text"
            name={titleControl.name}
            onChange={titleControl.onChange}
            onBlur={titleControl.onBlur}
            innerRef={titleControl.ref}
            required={titleControl.required}
            placeholder="Enter the task title"
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          <Trans i18nKey={'task:descriptionInputLabel'} />
          <TextField.Input
            type="text"
            name={descriptionControl.name}
            onChange={descriptionControl.onChange}
            onBlur={descriptionControl.onBlur}
            innerRef={descriptionControl.ref}
            required={descriptionControl.required}
            placeholder="Enter the task description"
          />
        </TextField.Label>
      </TextField>

      <TextField>
        <TextField.Label>
          <Trans i18nKey={'task:dueDateInputLabel'} />
          <TextField.Input
            type="datetime-local"
            name={dueDateControl.name}
            onChange={dueDateControl.onChange}
            onBlur={dueDateControl.onBlur}
            innerRef={dueDateControl.ref}
            required={dueDateControl.required}
          />
        </TextField.Label>
      </TextField>

      <Button className="w-full" loading={requestState.loading}>
        <Trans i18nKey={'task:editTaskSubmitLabel'} />
      </Button>
    </form>
  );
};

function getDatetimeFormat(date: Date): string {
  const datetimeLocal = format(date, `yyyy-MM-dd'T'HH:mm`);
  return datetimeLocal;
}

export default EditTaskForm;
