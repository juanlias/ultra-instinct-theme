// Compare with semantic highlighting enabled and disabled.
interface Task {
  readonly id: string;
  title: string;
  done?: boolean;
}

const MAX_VISIBLE = 12;
const titlePattern = /^task-\d+$/i;

function summarize(tasks: readonly Task[], limit: number = MAX_VISIBLE): string {
  const selected = tasks.filter(task => !task.done).slice(0, limit);
  return selected.map(({ title }) => `Task: "${title}"`).join('\n');
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const summary = summarize(tasks);
  return (
    <section aria-label="Tasks" data-count={tasks.length}>
      <h2>{summary || 'Nothing pending'}</h2>
      {tasks.map(task => <span key={task.id}>{task.title}</span>)}
    </section>
  );
}
