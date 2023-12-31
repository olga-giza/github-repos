# Github Repositories App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

* Node >=v20.10.0
* NPM >=10.2.3
* Create files .env .env.local basing on .env.template file 
  * [How to get Github token?](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  * [Managing tokens](https://github.com/settings/tokens?type=beta)

## Available Scripts

* `yarn start` - runs app locally
* `yarn build` - builds the app
* `yarn serve` - serves built app
* `yarn test` - runs tests (pre-push git hook)
* `yarn lint` - runs linter for project files (pre-commit git hook)
* `yarn lint:fix` - runs linter for project files and fixes found issues if possible

## Run project in a Docker container 

* `docker compose up web`

## Notes

* If there would be actual need to localize the app, locale module can be easily replaced by lib like `react-i18next`.
* As this is super-small task I decided not to use any design library and play more with styled component themes.
* Ah, and I used a list which fits better for smaller devices. Hope it's fine, but in any case I can quickly change it into a table view. 
