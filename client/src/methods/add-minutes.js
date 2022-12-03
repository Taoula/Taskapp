function addMinutes(dt, minutes){
        dt = new Date(dt)
        return new Date(dt.getTime() + minutes*60000);
}
export default addMinutes;