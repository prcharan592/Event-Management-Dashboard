const express=require('express')
const router=express.Router()
const {postAttendee,postTask,postEvent,deleteEvent,deleteTask,deleteAttendee, 
getEvents, getTasks, getEventTasks, getAllAttendees, 
UpdateEventDate, UpdateEventDescription, UpdateEventLocation,changeTaskStatus}=require('../controllers/controllers')


router.get('/getEvents',getEvents);
router.get('/getTasks',getTasks);
router.get('/getEventTasks',getEventTasks);
router.get('/getAttendees',getAllAttendees);

router.post('/postTask',postTask);
router.post('/postAttendee',postAttendee);
router.post('/postEvent',postEvent);

router.delete('/deleteEvent',deleteEvent);
router.delete('/deleteTask',deleteTask);
router.delete('/deleteAttendee',deleteAttendee);


router.put('/updateEventDate',UpdateEventDate);
router.put('/updateEventDescription',UpdateEventDescription);
router.put('/updateEventLocation',UpdateEventLocation);
router.put('/changeTaskStatus',changeTaskStatus);




module.exports=router;