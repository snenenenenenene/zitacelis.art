export function formatCart(body: any) {
  return Object.values(body).map((item: any) => ({
    quantity: item.quantity,
    price_data: {
      currency: "eur",
      unit_amount: item.price,
      product_data: {
        description: item.description || "No description",
        name: item.title,
        images: [
          `https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${item.id}/${item.image}`,
        ],
        // images: [item.image],
      },
    },
  }));
}
