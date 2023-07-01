function rda(t, d) {
    // Calculate the quotient and remainder of t divided by d
    console.log("---RDA---")
    console.log("total duration is " + t + "and divisions is " + d)
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
    console.log(arr)
    return arr;
  }

export default rda