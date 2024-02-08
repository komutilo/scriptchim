const chalk = require('chalk');
const { execCmd } = require('../execCmd');

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
async function cmdTask(next, args) {
  if (next && typeof next !== 'function' && (typeof next === 'string' || typeof next === 'object')) {
    args = next;
  }
  const ps = await execCmd(args);
  if (ps.code !== 0) process.exit(ps.code);
  if (next && typeof next === 'function') {
    next();
  } else {
    console.log(chalk.red(`no next() callback function was provided for command:\n${args}`));
  }
}

module.exports = { cmdTask };
