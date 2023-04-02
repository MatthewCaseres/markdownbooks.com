# Markdown Books

This is a Docusaurus clone Next.js template that uses the github-books npm package.

The code is in the public domain so do whatever you want with it. If you do something cool be sure to send me an email about your project.


## How to run
1. Clone repo into local directory
2. Run `yarn` to install dependencies
3. Run `yarn dev`

##How to integrate
1. To run a local "bookConfig.ts" script, you may need to add/modify the "ts-node" config options in tsconfig.json as shown below:

```
"ts-node": {
    // these options are overrides used only by ts-node
    // same as our --compilerOptions flag and our TS_NODE_COMPILER_OPTIONS environment variable
    "compilerOptions": {
      "module": "commonjs",
      "allowJs": true
    }
  },
"compilerOptions":{...}
```
