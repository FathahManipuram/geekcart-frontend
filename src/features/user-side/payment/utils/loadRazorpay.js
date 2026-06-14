const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY,

  amount: razorpayOrder.amount,

  currency: "INR",

  order_id: razorpayOrder.id,

  name: "GeekCart",

  description: "Order Payment",

  handler: async (response) => {
    console.log(response);
  },
};

const paymentObject= new window.Razorpay(options)

paymentObject.open()