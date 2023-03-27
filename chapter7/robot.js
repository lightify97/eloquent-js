let paths = ["A-B", "A-C", "A-E", "B-D", "B-L", "B-N", "C-B", "C-D", "C-E", "C-K", "E-K", "E-S", "E-Q", "E-M", "S-L", "S-B", "S-R", "R-A", "R-E", "R-K"];
let route = ["Q", "E", "M", "E", "S", "L", "B", "N", "B", "D", "C", "K", "E", "R", "A", "E", "Q"];

let pathGraph = buildGraph(paths);

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null)
            graph[from] = [to];
        else
            graph[from].push(to);
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

class VillageState {
    constructor(currentPlace, parcels) {
        this.place = currentPlace;
        this.parcels = parcels;
    }
    move(to) {
        if (!pathGraph[this.place].includes(to))
            return this;
        const newParcels = this.parcels.map(parcel => {
            if (parcel.from !== this.place)
                return parcel;
            return { from: to, to: parcel.to };
        })
            .filter(parcel => parcel.from !== parcel.to);
        return new VillageState(to, newParcels);
    }
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let to = randomPick(Object.keys(pathGraph));
        let from;
        do {
            from = randomPick(Object.keys(pathGraph));
        } while (from == to);
        parcels.push({ from, to });
    }
    return new VillageState("C", parcels);
};

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return { direction: randomPick(pathGraph[state.place]) };
}

function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = route;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

function goalOrientedRobot({ place: startingPoint, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.from != startingPoint) {
            route = findRoute(pathGraph, startingPoint, parcel.from);
        } else {
            route = findRoute(pathGraph, startingPoint, parcel.to);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}


function lazyRobot({ place, parcels }, route) {
    if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
            if (parcel.from != place)
                return { route: findRoute(pathGraph, place, parcel.from), pickUp: true };
            return { route: findRoute(pathGraph, place, parcel.to), pickUp: false };
        });

        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        const score = ({ route, pickUp }) => {
            return (pickUp ? 0.5 : 0) - route.length;
        };
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }

    return { direction: route[0], memory: route.slice(1) };
}


function runRobot(state, robot, memory) {
    let turn = 0;
    while (true) {
        if (state.parcels.length == 0) {
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
        turn++;
    }
    return turn;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    /* we test both functions 100 times and at each iteration 
       each robot delivers 100 parcels to randomly chosen locations */
    const NUM_OF_TESTS = 100;
    let robot1Steps = 0, robot2Steps = 0;
    for (let i = 0; i < NUM_OF_TESTS; i++) {
        let tasks = VillageState.random(100);
        robot1Steps += runRobot(tasks, robot1, memory1);
        robot2Steps += runRobot(tasks, robot2, memory2);
    }
    console.log(Math.round(robot1Steps / NUM_OF_TESTS));
    console.log(Math.round(robot2Steps / NUM_OF_TESTS));
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);
compareRobots(lazyRobot, [], goalOrientedRobot, []);