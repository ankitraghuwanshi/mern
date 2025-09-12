const mongoose = require('mongoose');

const theatreSchemaRules={
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: false
    },
}

// This will add two fields - createdAt and updatedAt ot our collection
const theatreSchema = new mongoose.Schema(theatreSchemaRules, {timestamps: true})

const TheatreModel = mongoose.model("theatres", theatreSchema);

module.exports = TheatreModel