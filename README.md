# Scrapty
A quick and dirty way to run an ordered queue of tasks focused on cross OS command line processes.

---

## Why?
Cross OS scripting could be challenging to maintain, cause unix and windows system has some basic and advanced differences.  
The main idea of Scrapty is to DRY the automation scripts of a project, commands like `start`, `build`, `test` or even `deploy` can be simple at the beginning, but those scripts increase the complexity when the project scale, mainly for CI/CD into multiple environments.  
The main objective of Scrapty is to write command line instructions with javascript just once to run at Windows or Unix systems in a lean way.  
In practice is not much different of Grunt or Gulp, the only reason I prefer to create my own task runner library is because I was using some time already in other projects and decided to make it a standalone library to be used in any project, nothing special.  

---

## How to use
There is a function called `cmdTask`, that is the function which execute the scripts.  
```js
const { cmdTask } = require('scrapty');

cmdTask(null, 'cd ~');
```
The first argument is the `callback`, it is the first just because the the `args` the second parameter could be a lot bigger.  
So you could call an ordered sequence of commands (just for knowledge, is not the meant to be used this way):
```js
const { cmdTask } = require('scrapty');

const ls = () => cmdTask(null, 'ls');

cmdTask(ls, 'cd ~');
```
But the Scrapty uses another function called `runQueue` which facilitates the things for us:  
```js
const { cmdTask, runQueue } = require('scrapty');

runQueue([
  {
    label: 'Go to home directory',
    task:  (next) => cmdTask(next, 'cd ~'),
  },
  {
    label: 'List all files',
    task:  (next) => cmdTask(next, 'ls'),
  },
])
```
Other way to do that is using modules and the `scrapty.yaml` config file, this way:  
```js
// tasks.js

const { cmdTask, runQueue } = require('scrapty');

const goToHomeTask = {
  label: 'Go to home directory',
  task:  (next) => cmdTask(next, 'cd ~'),
};

const lsTask = {
  label: 'List all files',
  task:  (next) => cmdTask(next, 'ls'),
};

module.exports = {
  goToHomeTask,
  lsTask,
}
```
and in the config file:  
```yaml
# scrapty.yaml

scripts:
  lsHome:
    - tasks:goToHomeTask
    - tasks:lsTask
```
and how to call it on `package.json`:
```json
// package.json

{
  // ...
  "scripts": {
    "lsTask": "scrapty lsTask"
  }
  // ...
}
```
It will work this way with the config on the default path `./scrapty.yaml`, but can be used in another location with the `-c` paramater, for example: `scrapty lsTask -c ./config/my_scrapty.yaml`.  


___Observation: The scrapty don't emulate any unix or windows binaries, to run native binaries like "ls" it should be available on the running machine.___