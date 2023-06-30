function rda(t, d) {
    // Calculate the quotient and remainder of t divided by d
    var quotient = Math.floor(t / d);
    var remainder = t % d;
  
    // Create an array of length d filled with the quotient
    var arr = Array(d).fill(quotient);
  
    // Add the remainder to the first elements of the array
    for(var i=0; i<remainder; i++) {
      arr[i] += 1;
    }
  
    return arr;
  }

export default rda