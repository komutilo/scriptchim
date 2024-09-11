import spawk from 'spawk';
import { jest } from '@jest/globals';
import { cmdTask } from './cmdTask';

describe('cmdTask function', () => {
  beforeEach(() => {
    spawk.clean();
    spawk.preventUnmatched();
  });

  afterEach(() => {
    spawk.done();
    jest.clearAllMocks();
  });

  it('should call cli command with cmdTask with just args as 1st parameter', async () => {
    const mockCliCall = spawk.spawn('ls');

    await cmdTask(['ls', '-la']);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        '-la',
      ],
      options: { stdio: 'inherit', shell: true },
    });
  });

  it('should call cli command with cmdTask with args and run the next function after', async () => {
    const mockCliCall = spawk.spawn('ls');
    let value = 0;

    await cmdTask(async () => { value = 33; }, ['ls', '-la']);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        '-la',
      ],
      options: { stdio: 'inherit', shell: true },
    });

    expect(value).toBe(33);
  });

  it('should fail on call cli command with cmdTask with args and didn\'t run the next function after', async () => {
    spawk.spawn('ls').exit(1);
    let value = 0;

    await expect(async () => {
      await cmdTask(async () => { value = 33; }, ['ls', '-la']);
    }).rejects.toThrow(Error); // TODO:

    expect(value).toBe(0);
  });
});
