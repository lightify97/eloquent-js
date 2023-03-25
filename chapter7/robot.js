// const roads = [
//     "Alice's House-Bob's House", "Alice's House-Cabin",
//     "Alice's House-Post Office", "Bob's House-Town Hall",
//     "Daria's House-Ernie's House", "Daria's House-Town Hall",
//     "Ernie's House-Grete's House", "Grete's House-Farm",
//     "Grete's House-Shop", "Marketplace-Farm",
//     "Marketplace-Post Office", "Marketplace-Shop",
//     "Marketplace-Town Hall", "Shop-Town Hall"
// ];

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
    constructor(place, parcels) {
        this.place = place;
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
    return new VillageState("A", parcels);
};

function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let from of graph[at]) {
            if (from == to) return route.concat(from);
            if (!work.some(w => w.at == from)) {
                work.push({ at: from, route: route.concat(from) });
            }
        }
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return { direction: randomPick(pathGraph[state.from]) };
}

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = route;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

function goalOrientedRobot({ place, parcels }, route) {
    let steps = 0;
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.from != place) {
            route = findRoute(pathGraph, place, parcel.from);
        } else {
            route = findRoute(pathGraph, place, parcel.to);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
    return memory.length;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let tasks = VillageState.random(100);
    console.log(runRobot(tasks, robot2, memory2));
    console.log(runRobot(tasks, robot1, memory1));
    // console.log(robot2(tasks, memory1));
    // console.log(findRoute(pathGraph, 'K', 'L'));
}


compareRobots(routeRobot, [], goalOrientedRobot, []);