const EventEmitter = require("events"); 


const event = new EventEmitter(); 

event.on("testEvent", () => {
    console.log("This event runs"); 
}); 

event.emit("testEvent"); 