/**
 * Execute an asynchronous cli command as a process.
 *
 * @name cmdTask
 * @function
 * @param {string[] | string} args An array or whitespace separated string with cli args.
 * @returns {undefined}
 * @throws {InvalidTypeError} if type of args param is invalid.
 */
/**
 * Execute an asynchronous cli command as a process, if succeed run a callback.
 *
 * @name cmdTask^2
 * @function
 * @param {function | string[] | string} next A callback function.
 * @param {string[] | string} args An array or whitespace separated string with cli args.
 * @returns {undefined}
 * @throws {InvalidTypeError} if type of args param is invalid.
 */
export function cmdTask(next: Function | string[] | string, args: string[] | string): undefined;
//# sourceMappingURL=cmdTask.d.ts.map