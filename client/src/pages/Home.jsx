import HeroImage from "../assets/heros.png";
import CartImage from "../assets/cart.png";
import ShoppingImage from "../assets/shopping.png";
import PaperbagImage from "../assets/paperbag.png";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={HeroImage}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green bg-opacity-40 flex items-center justify-center">
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            {[
              {
                img: CartImage,
                title: "Buy Pre-Loved",
                desc: "Shop from a wide range of pre-loved items, reducing waste and saving money.",
              },
              {
                img: ShoppingImage,
                title: "Sell Your Items",
                desc: "Give your items a second life by selling them on our platform.",
              },
              {
                img: PaperbagImage,
                title: "Reduce Waste",
                desc: "Contribute to a sustainable future by reducing your environmental impact.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center bg-black-50 p-6 rounded-xl shadow-md hover:shadow-lg transition w-full md:w-1/3"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="bg-teal-900 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Sustainability Impact</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-3xl text-green-500 font-bold">1,250+</p>

            <p className="text-sm">Tons of Waste Diverted</p>
          </div>
          <div>
            <p className="text-3xl text-green-500 font-bold">5M+</p>
            <p className="text-sm">Litres of Water Saved</p>
          </div>
          <div>
            <p className="text-3xl text-green-500 font-bold">850+</p>
            <p className="text-sm">Tons of CO₂ Reduced</p>
          </div>
        </div>
      </section>
    </div>
  );
}
