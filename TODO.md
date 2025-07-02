# TODO

- driver colors should be based on the selected year and race due to driver swaps mid season

- scatter plots with the driver laps for each practice and quali in the stints route (this will maybe not happen, beacuse we dont have the lap times, only the stints, maybe it can happen if we have a new route and fetch all of the)

- Race stats (new route) - get the positions of each driver for a race and show them in a graphic
  get meeting - api.openf1.org/v1/sessions?country_name=Brazil&year=2024&session_name=Race
  get drivers for the meeting - api.openf1.org/v1/drivers?session_key=9636
  get positions after that for the race (this will give all drivers and all position changes) - api.openf1.org/v1/position?session_key=9636 (session_key comes from the meeting)

- Intl of the whole app
