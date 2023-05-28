const LAUNCHES_API_URL = "https://api.spacexdata.com/v4/launches";
const ROCKETS_API_URL = "https://api.spacexdata.com/v4/rockets";
const PAYLOADS_API_URL = "https://api.spacexdata.com/v4/payloads";

async function fetchLaunches() {
  const response = await fetch(LAUNCHES_API_URL);
  const data = await response.json();
  return data;
}

async function fetchRockets() {
  const response = await fetch(ROCKETS_API_URL);
  const data = await response.json();
  return data;
}

async function fetchPayloads() {
  const response = await fetch(PAYLOADS_API_URL);
  const data = await response.json();
  return data;
}

async function countLaunches() {
  const launches = await fetchLaunches();
  const successfulLaunches = launches.filter(
    (launch) => launch.success === true
  );
  const unsuccessfulLaunches = launches.filter(
    (launch) => launch.success === false
  );
  return {
    successful: successfulLaunches.length,
    unsuccessful: unsuccessfulLaunches.length
  };
}

async function getTopRocketIds() {
  const launches = await fetchLaunches();
  const rockets = await fetchRockets();

  const rocketIdCounts = {};
  launches.forEach((launch) => {
    const rocketId = launch.rocket;
    rocketIdCounts[rocketId] = (rocketIdCounts[rocketId] || 0) + 1;
  });

  const topRocketIds = Object.entries(rocketIdCounts)
    .sort(([, count1], [, count2]) => count2 - count1)
    .slice(0, 5);

  const topRockets = topRocketIds.map(([rocketId, count]) => {
    const rocket = rockets.find((r) => r.id === rocketId);
    return {
      rocket: rocketId,
      name: rocket.name,
      launches: count
    };
  });

  return topRockets;
}

async function countLaunchesAndPayloadsPerYear() {
  const launches = await fetchLaunches();
  const payloads = await fetchPayloads();

  const launchCountByYear = {};
  const payloadCountByYear = {};

  launches.forEach((launch) => {
    const year = new Date(launch.date_utc).getFullYear().toString();
    launchCountByYear[year] = (launchCountByYear[year] || 0) + 1;
  });

  payloads.forEach((payload) => {
    const year = new Date(payload.created_at).getFullYear().toString();
    payloadCountByYear[year] = (payloadCountByYear[year] || 0) + 1;
  });

  const years = Array.from(
    new Set([
      ...Object.keys(launchCountByYear),
      ...Object.keys(payloadCountByYear)
    ])
  );
  const result = years.map((year) => ({
    year,
    launches: launchCountByYear[year] || 0,
    payloads: payloadCountByYear[year] || 0
  }));

  return result;
}

async function calculateTotalPayloadMass() {
  const launches = await fetchLaunches();
  const rockets = await fetchRockets();
  const payloads = await fetchPayloads();

  const rocketPayloadMass = {};

  launches.forEach((launch) => {
    const rocket = rockets.find((r) => r.id === launch.rocket);
    const payload = payloads.find((p) => p.id === launch.payloads[0]);
    if (rocket && payload) {
      const rocketId = rocket.id;
      rocketPayloadMass[rocketId] =
        (rocketPayloadMass[rocketId] || 0) + payload.mass_kg;
    }
  });

  const result = Object.entries(rocketPayloadMass).map(
    ([rocketId, totalMass]) => {
      const rocket = rockets.find((r) => r.id === rocketId);
      return {
        rocket: rocketId,
        name: rocket.name,
        totalMass
      };
    }
  );

  return result;
}

// Usage examples
countLaunches().then((counts) => console.log("Launches:", counts));
getTopRocketIds().then((rockets) => console.log("Top Rockets:", rockets));
countLaunchesAndPayloadsPerYear().then((data) =>
  console.log("Launches and Payloads:", data)
);
calculateTotalPayloadMass().then((data) => console.log("Payload Mass:", data));
