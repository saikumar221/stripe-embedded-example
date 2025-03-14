const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const stripe = require('stripe')('sk_test_51R2IMAJeCIcVVJSTXajRek41W2OSnoMUNmY04eFK5eiTkrcyYKtF0kTNUHPKVMQq96trCLOU2BIB1BRQXlRADVAQ007Rd7WiN2');

// Create a Checkout Session
app.post('/create-checkout-session', async (req, res) => {
    console.log( `${req.protocol}://${req.get('host')}`)
const session = await stripe.checkout.sessions.create({
    line_items: [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: 'T-shirt',
            },
            unit_amount: 2000,
        },
        quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
});
  console.log('session', session.client_secret);
  res.send({clientSecret: session.client_secret});
});

app.listen(4240, () => console.log(`Listening on port ${4240}!`));