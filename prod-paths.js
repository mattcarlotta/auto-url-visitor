const tsconfigpaths = require('tsconfig-paths')
const { compilerOptions } = require('./tsconfig.json')

tsconfigpaths.register({
  baseUrl: compilerOptions.outDir,
  paths: compilerOptions.paths
})
