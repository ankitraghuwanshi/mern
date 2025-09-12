const mongoose = require('mongoose');

const bookingSchemaRules = {
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shows"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    seats: {
        type: Array,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
};
const bookingSchema = new mongoose.Schema(bookingSchemaRules, { timestamps: true })
const BookingModel = mongoose.model("bookings", bookingSchema);

module.exports=BookingModel