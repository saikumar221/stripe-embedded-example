// Initialize Stripe.js
const stripe = Stripe('pk_test_51R2IMAJeCIcVVJSTnOBBdvcC4LSvQHC5glbxT6yjTlX43QVWndauKCynH2E40UvhMgts3pFHdqasR4xqSYfckVy600k5hA0Bmx');


// Fetch Checkout Session and retrieve the client secret
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("http://localhost:4240/create-checkout-session", {
      method: "POST",
    });
    console.log('response', response);
    const { clientSecret } = await response.json();
    console.log('clientSecret', clientSecret);
    return clientSecret;
  };

  //Handle the completion of the payment
  const handleComplete = async function() {
    alert('Payment successful');
  }

  // Initialize Checkout
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
    onComplete: handleComplete,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}

