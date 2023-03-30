import If from '~/core/ui/If';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import useListTasks from '~/lib/tasks/hooks/use-list-tasks';
import TaskCard from './TaskCard';

const ListTasks: React.FC<{}> = () => {
  const { data: tasks, error, status } = useListTasks();

  return (
    <div className="grid grid-cols-1 gap-5">
      <If condition={status === 'loading'}>
        <PageLoadingIndicator />
      </If>
      <If condition={status === 'success'}>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </If>
      <If condition={status === 'error'}>
        <p className="text-red-500">Error: {error?.message}</p>
      </If>
    </div>
  );
};

export default ListTasks;
