import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Home, Box, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import user from "../assets/user.webp";
export default function Sidebar() {
  const navigate = useNavigate();
  const { admin } = useAdmin(); 

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
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-4 h-4" /> Settings
        </Button>
      </div>

      <div
        onClick={() => navigate("/settings")}
        className="p-4 border-t flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition"
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src={user} />
          {/* <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback> */}
        </Avatar>
        <div>
          <p className="text-sm font-medium">{admin.name}</p>
          <p className="text-sm">{admin.role}</p>
        </div>
      </div>
    </aside>
  );
}
