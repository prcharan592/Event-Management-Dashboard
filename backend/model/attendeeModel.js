const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }
});

module.exports = mongoose.model("Attendee", attendeeSchema);
