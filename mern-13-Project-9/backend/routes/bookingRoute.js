const bookingRouter = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const {authMiddleware} = require('../middlewares/authMiddleware');
const BookingModel = require('../models/bookingModel');
const ShowModel = require('../models/showModel');

bookingRouter.post('/make-payment', authMiddleware, async (req, res) => {
    try{
        const {token, amount} = req.body;
        // const customer = await stripe.customers.create({
        //     email: token.email,
        //     source: token.id
        // });

        // This is what confirms that stripe has charged the card
        // which the user has provided from frontend
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!"
        });
        
        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: transactionId
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

// Create a booking after the payment
bookingRouter.post('/book-show', authMiddleware, async (req, res) => {
    try{
        const newBooking = new BookingModel(req.body);
        await newBooking.save();

        const show = await ShowModel.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await ShowModel.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});


bookingRouter.get("/get-all-bookings", authMiddleware, async (req, res) => {
    try{
        const bookings = await BookingModel.find({ user: req.body.userId })
        .populate("user")
        .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres"
                }
            });
        
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = bookingRouter;