import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Home, Box, ChartPie, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div className="p-4 flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Product Dashboard</h2>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/")}
        >
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/products")}
        >
          <Box className="w-4 h-4" /> Products
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/analytics")}
        >
          <ChartPie className="w-4 h-4" /> Analytics
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-4 h-4" /> Settings
        </Button>
      </div>

      <div className="p-4 border-t flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Lincy Bainiwal</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </aside>
  )
}
