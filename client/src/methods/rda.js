function rda(t, d) {
    // Calculate the quotient and remainder of t divided by d
    console.log("RDA RDA RDA: t is " + t + " and d is " + d)
    var quotient = Math.floor(t / d);
    var remainder = t % d;
  
    // Create an array of length d filled with the quotient
    var arr = []
    for (let i = 0; i < d; i++){
      arr.push(quotient)
    }
    // Add the remainder to the first elements of the array
    for(var i=0; i<remainder; i++) {
      arr[i] += 1;
    }

    let adj = 0
    for (let i = 0; i < d; i++){
      let rounded = Math.round(arr[i] / 5) * 5;
      adj += arr[i] - rounded;
      arr[i] = rounded;
    }

    arr[d-1] += adj

    return arr;
  }

export default rda