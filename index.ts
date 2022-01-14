import { config } from '@noshot/env'
import { env } from 'process'
import notifier from 'node-notifier'
import { chromium } from 'playwright'
import { errorMessage, infoMessage } from '~loggers'

config()

const { DOMAIN, LOGIN_NAME, LOGIN_PASSWORD, URL_ADDRESS } = env

/**
 * Automatically visits a website URL and retrieves some stats.
 */
;(async (): Promise<void> => {
  try {
    infoMessage('Spinning up headless browser...')
    const browser = await chromium.launch()
    const page = await browser.newPage()

    infoMessage('Attempting to visit website URL...')
    await page.goto(URL_ADDRESS as string)

    infoMessage('Filling in username...')
    await page.fill('input[name="username"]', LOGIN_NAME as string)

    infoMessage('Filling in password...')
    await page.fill('input[name="password"]', LOGIN_PASSWORD as string)

    infoMessage('Submitting login...')
    await page.click('button[type="submit"]')

    infoMessage('Finding results...')
    await page.waitForSelector('div.results')

    infoMessage('Visiting profile...')
    await page.locator('div[title="Achievements"] > span.link').click()

    infoMessage('Finding stats...')
    await page.waitForSelector('table')

    infoMessage('Parsing stats...')
    const statsRow = await page.locator('tr.cat3').nth(4)
    const statNode = await statsRow.locator('td').nth(2)
    const statText = await statNode.evaluate((node) => node.innerText)
    const stats = statText.substr(0, 3).trim()

    infoMessage('Sending desktop notification...')
    notifier.notify({
      title: `Auto Notification from ${DOMAIN}`,
      message: `Your current ${DOMAIN} stats: ${stats}`
    })

    infoMessage('Closing headless browser...')
    await browser.close()

    infoMessage('Successfully updated stats.')
    process.exit(0)
  } catch (err: any) {
    errorMessage(err.toString())
    process.exit(1)
  }
})()
