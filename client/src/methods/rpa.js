function rpa(total, proportions) {
    var sumOfProportions = proportions.reduce((a, b) => a + b, 0);
    var scaledValues = proportions.map(x => Math.floor(total * x / sumOfProportions));
    
    var remainder = total - scaledValues.reduce((a, b) => a + b, 0);

    // Distribute the remainder, if there is any
    for (var i = 0; remainder > 0; i = (i + 1) % scaledValues.length, remainder--) {
        scaledValues[i]++;
    }
    return scaledValues;
}

export default rpa