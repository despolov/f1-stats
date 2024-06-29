[![pages-build-deployment](https://github.com/despolov/f1-stats/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/despolov/f1-stats/actions/workflows/pages/pages-build-deployment) <br><br>
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/despolov/f1-stats/main?label=main%20-%20last%20commit&labelColor=%233D464E&color=0C7EBF)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/despolov/f1-stats/gh-pages?label=gh%20page%20-%20last%20commit&labelColor=%233D464E&color=0C7EBF)

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

- add tests - and most importantly tests of the aggregated lap time logic
- implement Tyres route with its corresponding logic
- render Tyres per driver in a beautiful way for the practices
- get the used tyres for quali sprint and sprint quali
