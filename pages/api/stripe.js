import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SK}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        line_items: req.body.map((item) => {
          const imgRef = item.image[0].asset._ref;
          const img = imgRef
            .replace(
              "image-",
              `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT}/production`
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
                images: [img],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LvQT4I3U5lmy7K0xtqMpiDS" },
          { shipping_rate: "shr_1LvQVpI3U5lmy7K0OWuIajPo" },
          { shipping_rate: "shr_1LvQWkI3U5lmy7K09edOBlJw" },
        ],
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
