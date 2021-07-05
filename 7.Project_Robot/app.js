const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  // graph= { 'Bob's House': [Alice's House], 'Alice's House: ['Bob's house']}
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) {
          return p;
        } 

        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);

      return new VillageState(destination, parcels);
    }
  }
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

// {}, Post Grete's Hous
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];

  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        return route.concat(place);
      } 

      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function routeRobot(state, memory) {
  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

const finalDestination = new VillageState('Post Office', [{place: 'Cabin', address: 'Bob\'s House'}])

// runRobot(VillageState.random(1), goalOrientedRobot, []);

/* TASK 1 */

function countSteps(state, robot, memory) {
  for (let step = 0;;step++) {
    if (state.parcels.length == 0) {
      return step;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let resCount1 = 0;
    let resCount2 = 0;

    for (let i = 0;  i < 100; i++) {
      const state = VillageState.random();
      resCount1 += countSteps(state, robot1, memory1);
      resCount2 += countSteps(state, robot2, memory2);
    }

    console.log(`Robot1 needs ${resCount1 / 100} per task`);
    console.log(`Robot2 needs ${resCount2 / 100} per task`);
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);


/* TASK 2 */

function optimizedRobot({place, parcels}, route) {
  if (route.length === 0) {
    const routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return { route: findRoute(roadGraph, place, parcel.place), pickUp: true };
      } else {
        return { route: findRoute(roadGraph, place, parcel.address), pickUp: false };
      }
    })
    
    function score(route) {
      return (route.pickUp ? 1 : 0,5) - route.length;
    }
    
    route = routes.reduce((acc, el) => score(acc) > score(el) ? acc : el).route
    
  }

  return { direction: route[0], memory: route.slice(1) };
}


compareRobots(goalOrientedRobot, [], optimizedRobot, []);