import { readFileSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'
import { errorMessage } from '~loggers'

const statsFile = join(process.cwd(), 'stats.json')

/**
 * Sends an OS notification.
 *
 * @param title - title of the notification
 * @param message - message body of the notification
 */
export const notify = (title: string, message: string): void => {
  execSync(`DISPLAY=:0 notify-send '${title}' '${message}'`)
}

/**
 * Helper function to check if the `stats.json` file exists.
 *
 * @returns a boolean;
 */
export const resultsFileExists = (): boolean => {
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
export const readResultFile = (): Record<string, unknown> => {
  const file = readFileSync(statsFile, { encoding: 'utf-8' })

  return JSON.parse(file)
}

/**
 * Writes the collected `stat` to the `stat.json` file.
 *
 * @throws an error if writing the stat fails
 */
export const writeFileResultsToFile = (stat: string): void => {
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
