import { statSync } from 'fs'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { errorMessage } from '~loggers'

const statsFile = join(process.cwd(), 'stats.json')

/**
 * Helper function to check if the `stats.json` file exists.
 *
 * @returns a boolean;
 */
export const resultsFileExists = () => {
  try {
    return statSync(statsFile).isFile()
  } catch (e) {
    return false
  }
}

/**
 * Reads the result file.
 *
 * @returns the read result of the JSON file
 */
export const readResultFile = () => {
  const file = readFileSync(statsFile, { encoding: 'utf-8' })

  return JSON.parse(file)
}

/**
 * Writes the collected `stat` to the `stat.json` file.
 *
 * @throws an error if writing the stat fails
 */
export const writeFileResultsToFile = (stat: string) => {
  try {
    let combinedFile = {}
    if (resultsFileExists()) combinedFile = readResultFile()

    Object.assign(combinedFile, { stat })

    writeFileSync(statsFile, JSON.stringify(combinedFile, null, 2), {
      encoding: 'utf-8'
    })
  } catch (error: any) {
    errorMessage(error.toString())
  }
}
