import 'dotenv/config';
import Stripe from 'stripe';
import express from 'express';

const port = 3000;
const domain = process.env.DOMAIN;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/create-checkout-session', async (req, res) => {
    const { quantity } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        { price: process.env.TEST_PRODUCT_ID, quantity },
      ],
      mode: 'payment',
      success_url: `${domain}/success.html`,
      cancel_url: `${domain}/cancel.html`,
    });
  
    res.redirect(303, session.url);
  });

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
