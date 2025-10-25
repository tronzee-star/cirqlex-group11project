
import React from "react";

const SellerDashboard = () => {
	const listings = [
		{ id: 1, item: "Denim jacket", price: "ksh 3,500", date: "2024-07-20" },
		{ id: 2, item: "Brown leather boots", price: "ksh 2,000", date: "2024-07-15" },
		{ id: 3, item: "Ceramic vase", price: "ksh 3,000", date: "2024-07-10" },
		{ id: 4, item: "Canvas tote bag", price: "ksh 2,800", date: "2024-07-05" },
		{ id: 5, item: "GreenHome Breakfast Set", price: "ksh 2,400", date: "2024-06-30" },
	];

	return (
		<div className="min-h-screen bg-teal-800 text-gray-900 py-8">
			<div className="max-w-6xl mx-auto px-6">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden flex">
					{/* Left Sidebar */}
					<aside className="w-64 bg-gray-50 border-r border-gray-100 p-6">
						<nav className="space-y-4 text-sm text-gray-700">
							<button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg bg-white shadow-sm">
								<span className="inline-block w-6 text-center">📋</span>
								<span>My Listings</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
								<span className="inline-block w-6 text-center">📈</span>
								<span>Sales Analytics</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
								<span className="inline-block w-6 text-center">💸</span>
								<span>Payouts</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
								<span className="inline-block w-6 text-center">💬</span>
								<span>Messages</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
								<span className="inline-block w-6 text-center">🌿</span>
								<span>Sustainability Impact</span>
							</button>
						</nav>
					</aside>

					{/* Main Content */}
					<main className="flex-1 p-8">
						<header className="mb-6">
							<h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
							<p className="text-sm text-gray-500">Manage your listings, track sales, and view your impact.</p>
						</header>

						{/* Stats */}
						<div className="flex gap-4 mb-6">
							<div className="flex-1 bg-white border border-gray-100 rounded p-4 text-center">
								<h3 className="text-sm text-gray-500 mb-1">active listings</h3>
								<p className="text-2xl">15</p>
							</div>
							<div className="flex-1 bg-white border border-gray-100 rounded p-4 text-center">
								<h3 className="text-sm text-gray-500 mb-1">Total revenue</h3>
								<p className="text-2xl">ksh 32,000</p>
							</div>
							<div className="flex-1 bg-white border border-gray-100 rounded p-4 text-center">
								<h3 className="text-sm text-gray-500 mb-1">Total sales</h3>
								<p className="text-2xl">8</p>
							</div>
						</div>

						{/* Recent Purchases Table */}
						<section className="bg-white border rounded-lg p-6">
							<h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Purchases</h2>
							<div className="overflow-x-auto">
								<table className="w-full text-left">
									<thead>
										<tr className="text-sm text-gray-600 border-b">
											<th className="py-3 px-4">Item</th>
											<th className="py-3 px-4">Item name</th>
											<th className="py-3 px-4">Price</th>
										</tr>
									</thead>
									<tbody className="text-sm text-gray-700">
										{listings.map((o, idx) => (
											<tr key={idx} className="border-b hover:bg-gray-50">
												<td className="py-3 px-4 align-middle">
													<div className="w-10 h-10 bg-gray-200 rounded-full" />
												</td>
												<td className="py-3 px-4">{o.item}</td>
												<td className="py-3 px-4 text-green-600">{o.price}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>

						{/* Environmental Impact Placeholder */}
						<section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-white border rounded-lg p-6">
								<h3 className="text-sm font-semibold text-gray-700">Environmental Impact</h3>
								<p className="text-xs text-gray-500 mt-2">Summary of savings and impact from your listings and sales.</p>
							</div>
							<div className="bg-white border rounded-lg p-6">
								<h3 className="text-sm font-semibold text-gray-700">Recommendations</h3>
								<p className="text-xs text-gray-500 mt-2">Tips to further reduce environmental footprint for your listings.</p>
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
};

export default SellerDashboard;
