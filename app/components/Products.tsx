import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import products from "../data/products.json";

const Products = () => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <section className="products  grid grid-cols-3 mx-auto gap-8">
      {products.map((product) => (
        <div
          key={product.sku}
          className="product w-[25rem] h-[25rem] rounded-full flex flex-col items-center justify-center hover:border-black border-4 bg-black text-white transition-all duration-500 hover:scale-105 border-white p-8"
        >
          <img
            src={product.image}
            className="w-[20rem] h-[20rem] object-cover rounded-full"
            alt={product.name}
          />
          <section className="flex justify-between py-2">
            <h2 className="font-sunflower text-2xl">{product.name}</h2>
            <p className="price ml-8">
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </p>
          </section>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
