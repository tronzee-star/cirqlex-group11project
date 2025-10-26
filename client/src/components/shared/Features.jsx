import CartImage from "../../assets/cart.png";
import ShoppingImage from "../../assets/shopping.png";
import PaperbagImage from "../../assets/paperbag.png";

export default function Features() {
  const features = [
    {
      img: CartImage,
      title: "Buy Pre-Loved",
      desc: "Discover unique, high-quality pre-owned items at great prices.",
    },
    {
      img: ShoppingImage,
      title: "Sell What You Don’t Need",
      desc: "Turn your items into cash while promoting sustainability.",
    },
    {
      img: PaperbagImage,
      title: "Go Circular",
      desc: "Join a growing community of eco-conscious shoppers.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Force side-by-side layout */}
        <div className="flex flex-row justify-center items-stretch gap-8 flex-wrap">

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-1 text-center bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-20 h-20 mx-auto mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
