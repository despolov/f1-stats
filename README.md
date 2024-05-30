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

- fix the null in some sectors which makes the driver with a very fast lap e.g. Monaco, VB, Practice 3
- add "Gap" column in the Practice tables and in the tooltip for mobile tables
- add catch blocks on each api endpoint and display an error message if there is one
- add tests - and most importantly tests of the aggregated lap time logic
- implement Tyres route with its corresponding logic
