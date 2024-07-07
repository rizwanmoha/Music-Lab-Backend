const express = require("express");
const { PaymentController } = require("../controllers/PaymentController");
const router = express.Router();
const { requireSignIn } = require("../middleware/authmiddleware");
// const {registerController , loginController} = require('../controllers/AuthController');

router.post('/create-order' , requireSignIn, PaymentController
// #swagger.description = 'Create RazorPay Order for Payment Gateway Facilitation'
/* #swagger.responses[200] = {
    description: 'Payment order created successfully',
    schema: {
        id: 'order_id',
        entity: 'order_entity',
        amount: 'order_amount',
        currency: 'order_currency',
        receipt: 'order_receipt',
        status: 'order_status',
        
    }
} */

/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */
);


module.exports = router;
