import CreateTaskButton from './CreateTaskButton';
import ListTasks from './ListTasks';

const TasksLayout: React.FC<{}> = () => {
  return (
    <div className="flex w-full flex-col items-center space-y-5">
      <div className="mb-4 flex-initial">
        <CreateTaskButton />
      </div>
      <div className="mb-4 w-full flex-initial">
        <ListTasks />
      </div>
    </div>
  );
};

export default TasksLayout;
