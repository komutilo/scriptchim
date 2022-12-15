/**
 * Execute an asynchronous cli command as sub process.
 *
 * @param {string[] | string} args An array or whitespace separated string with cli args.
 * @returns {import("promisify-child-process").ChildProcessPromise | null} The cli results or null.
 * @throws {InvalidTypeError} if type of args param is invalid.
 */
export function execCmd(args: string[] | string): import("promisify-child-process").ChildProcessPromise | null;
//# sourceMappingURL=execCmd.d.ts.map