import React from "react";

export default function About() {
  return (
    <div className="pt-24 bg-[#f9fafb] text-gray-800 min-h-screen">
      {/* Header Section */}
      <section className="text-center px-6 py-16 bg-teal-900 text-white">
        <h1 className="text-5xl font-bold mb-4">What We Do</h1>
        <p className="text-lg max-w-2xl mx-auto">
       CirqleX is an AI-powered circular economy marketplace that connects people who want to buy, sell, or donate pre-owned, upcycled, and eco-friendly products.Our platform helps reduce landfill waste and encourages responsible consumption by:
<div className="flex justify-center">
  <ul className="list-disc list-inside text-white space-y-2 text-left">
    <li>Enabling users to give items a second life</li>
    <li>Using AI insights to recommend greener alternatives</li>
    <li>Highlighting products with the lowest environmental impact</li>
    <li>Estimating carbon footprint savings for every reused item</li>
  </ul>
</div>



        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-black-700 mb-3">
            Our Mission
          </h2>
          <p className="text-black-800 leading-relaxed">
            At CirqleX, we believe technology can power a cleaner, 
            more sustainable future. Our mission is to make sustainable consumption simple,
           rewarding, and accessible to everyone. By promoting reuse, upcycling, and responsible 
           shopping, we aim to reduce waste, extend product lifecycles, and contribute to global Climate Action (SDG 13).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black-700 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to create a future where every product lives many lives.
            Through technology, education, and community, we empower people to
            make sustainable choices effortlessly.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-black-700 mb-10">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-300 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-sm text-black-900">
                Every decision we make is guided by our commitment to protect
                the planet for future generations.
              </p>
            </div>
            <div className="p-6 bg-green-300 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-sm text-black-900">
                We leverage technology to drive positive change and enable a
                smarter, greener way to shop.
              </p>
            </div>
            <div className="p-6 bg-green-300 rounded-lg shadow text-center">
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-sm text-black-900">
                We believe sustainability is a shared mission, achieved through
                collaboration, awareness, and action.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
