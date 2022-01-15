import chalk from 'chalk'

/**
 * Helper function to log an error to console.
 *
 * @function errorMessage
 * @param error - string;
 */
export const errorMessage = (error: string): void => {
  console.log(
    `\n${chalk.rgb(255, 255, 255).bgRgb(255, 17, 0)(' ERROR ')} ${chalk.red(
      `${error}`
    )}`
  )
}

/**
 * Helper function to log an info to console.
 *
 * @function infoMessage
 * @param message - string;
 */
export const infoMessage = (message: string): void => {
  console.log(
    `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(' INFO ')} ${chalk.blue(
      `${message}`
    )}`
  )
}
