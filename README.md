## Day 5

1. Use the SpaceX API to fetch data about their launches, rockets, and payloads. 

      ```js
      const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches'
      const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets'
      const PAYLOADS_API_URL = 'https://api.spacexdata.com/v4/payloads'
      ```

   - Fetch the data from the API and store the launches, rockets, and payloads information in separate arrays.
   - Write a function to count the number of successful launches and unsuccessful launches.
   - Write a function to find the 5 most common rocket IDs used in the launches and their respective counts. Also, display the full rocket name alongside the rocket ID.

   Example output:
    ```sh
    [
    {rocket: "falcon9", name: "Falcon 9", launches: 120},
    {rocket: "falcon1", name: "Falcon 1", launches: 90},
    {rocket: "starship", name: "Starship", launches: 55},
    {rocket: "falconheavy", name: "Falcon Heavy", launches: 50},
    {rocket: "atlas", name: "Atlas V", launches: 30}
    ]
    ```

   - Write a function to find the number of launches per year, and display the total number of payloads sent to space each year.

   Example output:
    ```sh
    [
    {year: "2019", launches: 12, payloads: 30},
    {year: "2020", launches: 20, payloads: 45},
    {year: "2021", launches: 25, payloads: 55},
    {year: "2022", launches: 18, payloads: 42},
    {year: "2023", launches: 15, payloads: 35}
    ]
    ```

   - Write a function that calculates the total mass of payloads sent to space for each rocket. For this, you'll need to merge the payload and launch data.

   Example output:
    ```sh
    [
    {rocket: "falcon9", name: "Falcon 9", totalMass: 250000},
    {rocket: "falcon1", name: "Falcon 1", totalMass: 120000},
    {rocket: "starship", name: "Starship", totalMass: 480000},
    {rocket: "falconheavy", name: "Falcon Heavy", totalMass: 350000},
    {rocket: "atlas", name: "Atlas V", totalMass: 180000}
    ]
    ```

2. Explain the following questions in your own words

- What is the difference between some() and every()? Explain these using your own words.
- Explain the difference between the spread operator and the rest parameter in JavaScript.
- Explain the difference between splice() and slice() in JavaScript arrays.
- If you need to remove an object element from an array by its index, which method do you prefer to use: splice() or filter()? Explain.
- Explain the difference between `null` and `undefined` in JavaScript.
