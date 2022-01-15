## Automated URL Visitor

An automated service to visit a website using playwright.

### Requirements

- Linux based OS with the `notify-send` binary installed

### Installation

- Place the `icon/scheduler.png` into either `.local/share/icons` or `usr/share/icons` (or remove the `-i scheduler` string from the `notify` utility function)
- Compile the source with `yarn build` or `npm run build`
- Open a terminal and type `which node` to get the node binary **directory** location
- Open a terminal and create a crontab by typing `crontab -e` and hitting enter
  - At the top of the crontab file, include the **directory** path to node `PATH=/usr/bin`
  - Create a cron job, for example, this runs every day at noon: `* 12 * * * cd /path/to/auto-url-visitor && npm start`
  - Save the file and exit the editor
