const chalk = require('chalk');
const { execCmd } = require('../execCmd');

/**
 * Execute an asynchronous cli command as a process, if succeed run a callback.
 *
 * @param {function | undefined} next A callback function.
 * @param {string[] | string} args An array or whitespace separated string with cli args.
 * @returns {undefined}
 */
async function cmdTask(next, args) {
  const ps = await execCmd(args);
  if (ps.code !== 0) process.exit(ps.code);
  if (next && typeof next === 'function') {
    next();
  } else {
    console.log(chalk.red(`no next() callback function was provided for command:\n${args}`));
  }
}

module.exports = { cmdTask };
