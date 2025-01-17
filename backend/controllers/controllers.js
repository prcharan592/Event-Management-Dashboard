const eventModel = require('../model/eventModel');
const attendeeModel = require('../model/attendeeModel');
const taskModel = require('../model/taskModel');




/* get */

exports.getEvents=async(req,res)=>{

try{

    const result=await eventModel.find()

    res.send(result);
}

catch(error)
{
    console.log(error);
}
    
}

exports.getTasks=async(req,res)=>{


    try{
        const result=await taskModel.find()
        console.log(result);


        const tasks=await Promise.all(
            result.map(async (task) => {
              const event = await eventModel.findOne({ _id: task.event });
              if (!event) {
                console.log(`Event not found for task ID: ${task._id}`);
                return task; // Skip updating task.event if no event is found
              }
              const t={
                name:task.name,
                deadline:task.deadline,
                status:task.status,
                event:event.name

              }
              console.log(`Event found: ${event.name}`); // Confirm event retrieval
              task.event = event.name; // Assign event name
              console.log(`Updated task event: ${task.event}`); // Confirm assignment
              return t;
            })
          );

        console.log(tasks);
        res.send(tasks);
    }

    catch(error)
    {
        console.log(error);
    }


}


exports.getEventTasks = async (req, res) => {
        try {
          const eventTaskName = req.query.name; // Retrieve 'name' from query parameters
          const event = await eventModel.findOne({ name: eventTaskName });
          if (!event) {
            return res.status(404).send('Event not found');
          }
          const eventTasks = event.task;
          const tasks = await Promise.all(
            eventTasks.map(async (taskId) => {
              return await taskModel.findById(taskId);
            })
          );
          res.send(tasks);
        } catch (error) {
          console.error('Error fetching event tasks:', error);
          res.status(500).send('Internal Server Error');
        }
      
      

}


exports.getAllAttendees=async(req,res)=>{

    try{
        const result=await attendeeModel.find()
        console.log(result);
        const attendies=await Promise.all(
            result.map(async(data)=>{
                const event=await eventModel.findOne({_id:data.event})
                const task=await taskModel.findOne({_id:data.task})
                const t={
                    name:data.name,
                    eventName:event.name,
                    taskName:task.name
                }
                return t;
            })
        );
        console.log(attendies);
        res.send(attendies);
    }

    catch(error)
    {
        console.log(error);
    }

}


/* create */

exports.postEvent = async (req, res) => {
    try {
        const { name, date, description, location } = req.body;
        
        

        const event = {
            name,
            date,
            description,
            location,
            task: [],
            attendee: [],
        };

        const data = await eventModel.create(event);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating event.");
    }
};

exports.postAttendee = async (req, res) => {
    try {
        console.log("recieved");
        const { name, eventName,taskName } = req.body;

        const event = await eventModel.findOne({ name: eventName });
        const task = await taskModel.findOne({ name: taskName });

        if (!event || !task) {
            return res.status(404).send("Event or Task not found.");
        }
        
        if(!event.task.includes(task._id))
        {
            return res.status(404).send("Task not exist in event");
        }


      

        const attendee = {
            name,
            event: event._id,
            task: task._id,
        };

        const result = await attendeeModel.create(attendee);

        taskModel.updateOne(
            { _id: task._id }, 
            { $push: { attendee: result._id } } 
        )
        .then(() => {
            console.log("Attendee added to task successfully.");
        })
        .catch((error) => {
            console.error("Error updating event:", error);
            res.status(500).send("Error updating event.");
        });

        eventModel.updateOne(
            { _id: event._id }, 
            { $push: { attendee: result._id } } 
        ). then(() => {
            console.log("Attendee added to event successfully.");
            
        })
        .catch((error) => {
            console.error("Error updating event:", error);
            res.status(500).send("Error updating event.");
        });


        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating attendee.");
    }
};

exports.postTask = async (req, res) => {
    try {
        const { name, deadline, status,eventName } = req.body;

        const event = await eventModel.findOne({ name: eventName });
        if (!event) {
            return res.status(404).send("Event not found.");
        }

        

        const task = {
            name,
            deadline,
            status,
            event: event._id,
            attendee: []
        };

        const data = await taskModel.create(task);
        
        eventModel.updateOne(
            { _id: event._id }, // Filter to match the event
            { $push: { task: data._id } } // Update operation to push task ID
        )
            .then(() => {
                console.log("Task added to event successfully.");
            })
            .catch((error) => {
                console.error("Error updating event:", error);
                res.status(500).send("Error updating event.");
            });
        

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating task.");
    }
};

/*delete*/


exports.deleteEvent = async (req, res) => {
    try {
        const name = req.body.name;
        const event=await eventModel.findOne({name:name});
        const taskNames=event.task;
        const attendeeNames=event.attendee;
        const tasks = await Promise.all(
            taskNames.map(async (taskid) => {
                await taskModel.deleteOne({ _id: taskid._id });
            
            })

        );

        const attendees = await Promise.all(
            attendeeNames.map(async (attendeeid) => {
                await attendeeModel.deleteOne({ _id: attendeeid._id });
                
            })
        );

        

        const data = await eventModel.deleteOne({_id:event._id});
        res.send("Event Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting event.");
    }
};

exports.deleteAttendee = async (req, res) => {
    try {
        const name = req.body.name;

        const attendee = await attendeeModel.findOne({ name: name });
        await eventModel.updateOne({ _id: attendee.event },{$pull: { attendee: attendee._id }}).then((e)=>console.log("Succesfully deleted from event"))
        .catch(error=>console.log("Error in deleting from event"));
        await taskModel.updateOne({ _id:attendee.task},{$pull: { attendee: attendee._id }}).then(e=>console.log("Succesfully deleted from task")).catch(error=>console.log("error in deleting from task"));
        await attendeeModel.deleteOne({_id:attendee._id});
        res.send("Attendee Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting attendee.");
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const name= req.body.name;
        console.log(name);
        const task = await taskModel.findOne({ name: name });

        if(task.attendee!=null){
        const attendeeNames=task.attendee;

        const attendees = await Promise.all(
            attendeeNames.map(async (attendeeid) => {
                await attendeeModel.deleteOne({ _id: attendeeid._id });
                await eventModel.updateOne({ _id: task.event },{$pull: { attendee: attendeeid._id }});

                
            })
        );

    }

        await eventModel.updateOne({ _id: task.event },{$pull: { task: task._id }});
        await taskModel.deleteOne({_id:task._id}); 

        res.send("Task Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting task.");
    }
};

/*update*/

exports.UpdateEventDate=async (req,res)=>{

    try{
    const date=req.body.date;
    const name=req.body.name;
    const updateDate=await eventModel.updateOne({name:name},{$set:{date:date}});
    res.send(updateDate);
    }

    catch(error)
    {
        console.log(error);
    }


}

/*Update*/

exports.UpdateEventDescription=async (req,res)=>{

    try{
    const description=req.body.description;
    const name=req.body.name;
    const updateDescription=await eventModel.updateOne({name:name},{$set:{description:description}});
    res.send(updateDescription);
    }

    catch(error)
    {
        console.log(error);
    }


}

exports.UpdateEventLocation=async (req,res)=>{

    try{
    const location=req.body.location;
    const name=req.body.name;
    const updateLocation=await eventModel.updateOne({name:name},{$set:{location:location}});
    res.send(updateLocation);
    }

    catch(error)
    {
        console.log(error);
    }


}

exports.changeTaskStatus=async(req,res)=>{
    
    try{
    const name=req.body.name;

try {
    const task = await taskModel.findOne({ name: name });

    if (!task) {
        return res.status(404).send("Task not found.");
    }

    task.status = !task.status; 
    await task.save(); 

    res.send(`Task status updated successfully. New status: ${task.status}`);
} catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).send("Error updating task status.");
}
    
}

catch(error)
{
    console.log(error);
}


}



