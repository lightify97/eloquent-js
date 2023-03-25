const countBy = (items, groupName) => {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.type == name);
        if (known == -1) {
            counts.push({ type: name, count: 1 });
        } else {
            counts[known].count++;
        }
    }
    return counts;
};

module.exports = countBy;