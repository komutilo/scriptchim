import chalk from 'chalk';
import { execCmd } from '../execCmd/index.cjs';

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
async function cmdTask(next: (() => void) | Array<string> | string, args?: Array<string> | string): Promise<void> {
  const ps = next && typeof next !== 'function' && (typeof next === 'string' || typeof next === 'object') ?
    await execCmd(next) :
    await execCmd(args as Array<string> | string);

  if (ps?.code !== 0) process.exit(ps?.code);

  if (next && typeof next === 'function') {
    await next();
  } else {
    console.log(chalk.yellow(`no next() callback function was provided for command:\n${args}`));
  }
}

export { cmdTask };
