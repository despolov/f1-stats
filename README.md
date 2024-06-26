# F1 Stats

F1 stats is an app for quick check of F1 stats from Practice sessions for each race of the current season

## Main Features

- Aggregated lap time based on the best sectors of each driver from every Practice session and the actual standings for comparison

## Sources

- Data source: <https://openf1.org/>

## Commands

- deps install: npm i
- local run: npm run start
- app deploy: npm run deploy

## TODO

- the year in the bottom should be dynamic
- the years in the select in practice tab must be dynamic starting 2023
- add caching of the api calls
- add tests - and most importantly tests of the aggregated lap time logic
- implement Tyres route with its corresponding logic
