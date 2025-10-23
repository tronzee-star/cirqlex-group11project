// src/pages/Home.jsx
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <img
          src="./src/assets/heros.png"
          alt="CirqleX Hero"
        className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Features */}
      <section className="flex-row justify-center gap-6 max-w-4xl mx-auto">
        {[
          {
            title: 'Buy Pre-Loved',
            desc: 'Shop from a wide range of pre-loved items, reducing waste and saving money.',
          },
          {
            title: 'Sell Your Items',
            desc: 'Give your items a second life by selling them on our platform.',
          },
          {
            title: 'Reduce Waste',
            desc: 'Contribute to a sustainable future by reducing your environmental impact.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-green-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-green-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Sustainability Impact */}
      <section className="bg-green-900 text-white py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Sustainability Impact</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-3xl font-bold">1,250+</p>
            <p className="text-sm">Tons of Waste Diverted</p>
          </div>
          <div>
            <p className="text-3xl font-bold">5M+</p>
            <p className="text-sm">Litres of Water Saved</p>
          </div>
          <div>
            <p className="text-3xl font-bold">850+</p>
            <p className="text-sm">Tons of CO₂ Reduced</p>
          </div>
        </div>
      </section>
    </div>
  );
}
