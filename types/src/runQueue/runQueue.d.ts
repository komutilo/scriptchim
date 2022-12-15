export type Task = {
    /**
     * If the task was already executed once.
     */
    executed: boolean | undefined;
    /**
     * The task label for console output.
     */
    label: string | undefined;
    /**
     * The task function to be executed.
     */
    task: Function;
};
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
export function runQueue(tasks: Task[]): undefined;
export class runQueue {
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
    constructor(tasks: Task[]);
    current: number;
}
//# sourceMappingURL=runQueue.d.ts.map