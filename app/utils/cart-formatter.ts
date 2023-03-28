export function formatCart(body: any) {
  return Object.values(body).map((item: any) => ({
    quantity: item.quantity,
    price_data: {
      currency: "eur",
      unit_amount: item.price,
      product_data: {
        description: item.description,
        name: item.name,
        images: [item.image],
      },
    },
  }));
}
