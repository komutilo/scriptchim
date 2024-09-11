const main = (): void => {
  console.log('bin execution should be here...');
  throw new Error();
};

main();
