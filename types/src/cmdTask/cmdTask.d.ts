/**
 * Execute an asynchronous cli command as a process, if succeed run a callback.
 *
 * @param {function | undefined} next A callback function.
 * @param {string[] | string} args An array or whitespace separated string with cli args.
 * @returns {undefined}
 * @throws {InvalidTypeError} if type of args param is invalid.
 */
export function cmdTask(next: Function | undefined, args: string[] | string): undefined;
//# sourceMappingURL=cmdTask.d.ts.map