import puzzle from './puzzle_input.txt';

const hikingMap = puzzle.split('\n').map((r) => r.split(''));

const STARTING_POINT = [0, 1];
const END_POINT = [hikingMap.length - 1, 21];
// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
const completedPaths = [];
const findShortestPath = (startCoordinates, grid) => {
  const distanceFromTop = startCoordinates[0];
  const distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  const location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };
  console.log('LOCATION', location);

  // Initialize the queue with the start location already inside
  const queue = [location];
  let counter = 0

  // Loop through the grid searching for the goal
  while (counter < 5) {
    counter++;
    console.log('queue', queue);
    // Take the first location off the queue
    const currentLocation = queue.shift();

    // Explore North
    let newLocation = exploreInDirection(currentLocation, 'North', grid);
    if (newLocation.status === 'Goal') {
      completedPaths.push(newLocation.path)
      // return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore East
    newLocation = exploreInDirection(currentLocation, 'East', grid);
    if (newLocation.status === 'Goal') {
      completedPaths.push(newLocation.path)
      // return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore South
    newLocation = exploreInDirection(currentLocation, 'South', grid);
    if (newLocation.status === 'Goal') {
      completedPaths.push(newLocation.path)
      // return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    // Explore West
    newLocation = exploreInDirection(currentLocation, 'West', grid);
    if (newLocation.status === 'Goal') {
      completedPaths.push(newLocation.path)
      // return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;
};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
const locationStatus = (location, grid, direction) => {
  const gridSize = grid.length;
  const dft = location.distanceFromTop;
  const dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl] === 'Goal') {
    return 'Goal';
  } else if (grid[dft][dfl] === '#' || grid[dft][dfl] === 'Visited') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else if (grid[dft][dfl] === '<' && direction === "East") {
    return 'Blocked';
  } else if (grid[dft][dfl] === '>' && direction === "West") {
    return 'Blocked';
  } else if (grid[dft][dfl] === '^' && direction === "South") {
    return 'Blocked';
  } else if (grid[dft][dfl] === 'v' && direction === "North") {
    return 'Blocked';
  }
  else {
    return 'Valid';
  }
};


// Explores the grid from the given location in the given
// direction
const exploreInDirection = (currentLocation, direction, grid) => {
  const newPath = currentLocation.path.slice();
  newPath.push(direction);

  let dft = currentLocation.distanceFromTop;
  let dfl = currentLocation.distanceFromLeft;


  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  const newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid, direction);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};


console.log(findShortestPath(STARTING_POINT, hikingMap));
console.log('PATHS', completedPaths);
console.log('grid', hikingMap[0])
