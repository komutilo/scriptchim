import chalk from 'chalk';
import { InvalidTypeError } from '../errors';

/**
 * @typedef {Object} Task
 * @property {boolean | undefined} executed If the task was already executed once.
 * @property {string | undefined} label The task label for console output.
 * @property {function} task The task function to be executed.
 */
type Task = {
  executed?: boolean;
  label?: string;
  task: (next: () => Promise<void>) => Promise<void>;
}

class Queue {
  private current: number | null;

  public constructor() {
    this.current = null;
  }

  public async runQueue(tasks: Array<Task>): Promise<void> {
    if (!tasks || !Array.isArray(tasks)) {
      throw new InvalidTypeError('tasks', tasks, 'object (Array)');
    }

    if (!this.current) this.current = 0;
    if (this.current >= tasks.length) return;

    const { label, task } = tasks[this.current];

    console.log(chalk.green(`[${this.current + 1}/${tasks.length}] ${label}`));

    if (!task || typeof task !== 'function') {
      throw new InvalidTypeError(`task[${this.current}]`, task, 'function');
    }

    await task(async () => {
      if (!this.current) return;
      tasks[this.current].executed = true;
      this.current += 1;
      await this.runQueue(tasks);
    });
  }
}

/**
 * Run a queue of task functions in order.
 *
 * @param {Task[]} tasks An array of Task objects.
 * @returns {Promise<void>}
 * @throws {InvalidTypeError} if type of tasks is not an array or task item is not a a function.
 */
async function runQueue(tasks: Array<Task>): Promise<void> {
  const queue = new Queue();
  queue.runQueue(tasks);
};

export { runQueue };
