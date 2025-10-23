import FeaturesImage from "../../assets/features.png";

export default function ImpactSection() {
  return (
    <section
      id="sustainability"
      className="bg-teal-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text  */}
        <div>
          <h2 className="text-2xl font-semi-bold text-gray-100 mb-4">
            Our Sustainability Impact
          </h2>
          <p className="mb-6 text-gray-100">
            By choosing CirqleX, you're not just buying and selling products—
            you're making a tangible difference for our planet. Here’s what our
            community has achieved together.
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-800">1,250+</p>
              <p className="text-gray-100 text-sm">Tons of Waste Diverted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800">5M+</p>
              <p className="text-gray-100 text-sm">Litres of Water Saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800">850+</p>
              <p className="text-gray-100 text-sm">Tons of CO₂ Reduced</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={FeaturesImage}
            alt="Sustainability"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
