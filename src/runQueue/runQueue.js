const chalk = require('chalk');
const { InvalidTypeError } = require('../errors');

/**
 * @typedef {Object} Task
 * @property {boolean | undefined} executed If the task was already executed once.
 * @property {string | undefined} label The task label for console output.
 * @property {function} task The task function to be executed.
 */

/**
 * Run a queue of task functions in order.
 *
 * @param {Task[]} tasks An array of Task objects.
 * @returns {undefined}
 * @throws {InvalidTypeError} if type of tasks is not an array or task item is not a a function.
 */
async function runQueue(tasks) {
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

  await task(() => {
    tasks[this.current].executed = true;
    this.current += 1;
    runQueue(tasks);
  });
}

module.exports = { runQueue };
