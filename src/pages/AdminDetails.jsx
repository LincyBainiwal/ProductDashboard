import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function AdminDetails() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Label htmlFor="admin-name">Name</Label>
        <Input id="admin-name" defaultValue="Lincy Bainiwal" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="admin-email">Email</Label>
        <Input id="admin-email" type="email" defaultValue="lincy.bainiwal@example.com" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="role">Role</Label>
        <Input id="role" defaultValue="Administrator" readOnly />
      </div>
      <Button className="p-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Save Changes</Button>
    </div>
  );
}
