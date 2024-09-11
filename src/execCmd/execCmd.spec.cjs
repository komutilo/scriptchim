import spawk from 'spawk';
import { jest } from '@jest/globals';
import { execCmd } from './execCmd.cjs';
import { InvalidTypeError } from '../errors';

describe('execCmd function', () => {
  beforeEach(() => {
    spawk.clean();
    spawk.preventUnmatched();
  });

  afterEach(() => {
    spawk.done();
    jest.clearAllMocks();
  });

  it('should call command with passed args', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'foo apply --refresh --foo bar'.split(' ');

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar',
      ],
      options: { stdio: 'inherit', shell: true },
    });
  });

  it('should define environment variable on call execCmd function with variable definition on argv', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'ENV_TEST=is-a-env-test foo apply --refresh --foo bar'.split(' ');

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar',
      ],
      options: {
        stdio: 'inherit',
        shell: true,
        env: { 'ENV_TEST': 'is-a-env-test' },
      },
    });
  });

  it('should define environment variable on call execCmd function with variable definition on argv using double quotes', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'ENV_TEST="is-a-env-test" foo apply --refresh --foo bar'.split(' ');

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar',
      ],
      options: {
        stdio: 'inherit',
        shell: true,
        env: { 'ENV_TEST': 'is-a-env-test' },
      },
    });
  });

  it('should define environment variable on call execCmd function with variable definition on argv using single quotes', async () => {
    const mockCliCall = spawk.spawn('foo');
    // eslint-disable-next-line quotes
    const argv = `ENV_TEST='is-a-env-test' foo apply --refresh --foo bar`;

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar',
      ],
      options: {
        stdio: 'inherit',
        shell: true,
        env: { 'ENV_TEST': 'is-a-env-test' },
      },
    });
  });

  it('should call command with passed args as single string', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'foo apply --refresh --foo bar';

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar',
      ],
      options: { stdio: 'inherit', shell: true },
    });
  });

  it('should fail with invalid args value type', async () => {
    await expect(async () => await execCmd(123)).rejects.toThrow(InvalidTypeError);
  });

  it('should call command with passed args with double quoted arg', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'foo apply --refresh --foo "bar doo"';

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar doo',
      ],
      options: { stdio: 'inherit', shell: true },
    });
  });

  it('should call command with passed args with single quoted arg', async () => {
    const mockCliCall = spawk.spawn('foo');
    const argv = 'foo apply --refresh --foo \'bar doo\'';

    const proc = await execCmd(argv);

    expect(proc.code).toBe(0);

    expect(mockCliCall.calledWith).toMatchObject({
      args: [
        'apply',
        '--refresh',
        '--foo', 'bar doo',
      ],
      options: { stdio: 'inherit', shell: true },
    });
  });
});
