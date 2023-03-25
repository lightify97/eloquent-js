const loop = (num, test, update, body) => {
    while (test(num)) {
        body(num);
        num = update(num);
    }
};

loop(0, n => n < 10, n => n + 1, console.log);