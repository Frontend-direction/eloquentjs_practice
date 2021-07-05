async function locateScalpel(nest) {
    let current = nest.name;
    for (;;) {
        let next = await anyStorage(nest, current, "scalpel");
        if (next === current) return current;
        current = next;
    }
}

function locateScalpel2(nest) {
    function loop(current) {
        return anyStorage(nest, current, "scalpel").then(next => {
            if (next === current) return current;
            else return loop(next);
        });
    }
    return loop(nest.name);
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop

function anyStorage(nest, source, name) {
    if (source === nest.name) {
        return storage(nest, name);
    }

    return routeRequest(nest, source, "storage", name);
}

async function chicks(nest, year) {
    let list = "";
    await Promise.all(network(nest).map(async name => {
        list += `${name}: ${
            await anyStorage(nest, name, `chicks in ${year}`)
        }\n`;
    }));
    return list;
}
