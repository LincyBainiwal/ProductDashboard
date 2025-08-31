import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ShoppingBag, DollarSign, Package, TrendingUp } from "lucide-react"

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const stockData = [
  { name: 'In Stock', value: 850, color: '#4CAF50' },
  { name: 'Low Stock', value: 100, color: '#FFC107' },
  { name: 'Out of Stock', value: 50, color: '#F44336' },
];

const recentProducts = [
  { id: 1, name: 'Wireless Headphones', date: '2024-08-28', status: 'Added' },
  { id: 2, name: 'Smartwatch', date: '2024-08-27', status: 'Updated' },
  { id: 3, name: 'Bluetooth Speaker', date: '2024-08-26', status: 'Added' },
  { id: 4, name: 'Portable Power Bank', date: '2024-08-25', status: 'Updated' },
];

const topProducts = [
  { id: 1, name: 'Wireless Headphones', sales: 1520 },
  { id: 2, name: 'Smartphone', sales: 1280 },
  { id: 3, name: '4K Smart TV', sales: 950 },
  { id: 4, name: 'Laptop', sales: 875 },
];

export default function Dashboard() {
  const summaryCards = [
    { icon: ShoppingBag, color: "from-blue-400 to-blue-600", title: "Total Products", value: "1,250" },
    { icon: Package, color: "from-green-400 to-green-600", title: "Total Stock", value: "15,480" },
    { icon: DollarSign, color: "from-purple-400 to-purple-600", title: "Total Revenue", value: "$2.5M" },
    { icon: TrendingUp, color: "from-orange-400 to-orange-600", title: "Recent Growth", value: "+12%" },
  ];

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen space-y-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Welcome back, Lincy!
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card
              key={idx}
              className={`shadow-xl bg-blue transform transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-r ${card.color} text-white p-6 flex flex-col items-center text-center rounded-xl`}
            >
              <div className="bg-white bg-opacity-20 p-3 rounded-full mb-3">
                <Icon className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
              <CardContent className="text-3xl font-bold mt-1">{card.value}</CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Product Stock Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={(entry) => `${entry.name} (${entry.value})`}
                >
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Product Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentProducts.map((product) => (
                <li key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                  <div>
                    <h3 className="font-medium text-gray-700">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.status} on {product.date}</p>
                  </div>
                  <TrendingUp className="text-green-500 h-5 w-5" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topProducts.map((product) => (
                <li key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                  <span className="font-medium text-gray-700">{product.name}</span>
                  <span className="text-gray-600 font-bold">{product.sales} units</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
