function copyChildren(tasks, clone) {
    // Find the first object with an empty "next" property (starting point)
    const startingIndex = tasks.findIndex(obj => obj.next === '');
  
    // If no object with an empty "next" property is found, exit the function
    if (startingIndex === -1) {
      return;
    }
  
    // Copy the starting object to the clone array and remove it from tasks array
    const startingObject = tasks[startingIndex];
    clone.push(startingObject);
    tasks.splice(startingIndex, 1);
  
    // Copy the remaining objects based on "next" property
    let nextId = startingObject.id;
    while (nextId !== '') {
      const nextIndex = tasks.findIndex(obj => obj.id === nextId);
      if (nextIndex === -1) {
        break; // Exit the loop if the next object is not found
      }
  
      const nextObject = tasks[nextIndex];
      clone.push(nextObject);
      tasks.splice(nextIndex, 1);
  
      nextId = nextObject.next;
    }
  }

  export default copyChildren