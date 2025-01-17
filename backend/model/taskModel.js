const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    deadline: {
        type: Date,
        required: false
    },
    status: {
        type: Boolean,
        required: false
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    attendee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendee"
    }]
});

module.exports = mongoose.model("Task", taskSchema);
