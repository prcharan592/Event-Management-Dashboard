const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    attendee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendee"
    }]
});

module.exports = mongoose.model("Event", eventSchema);
