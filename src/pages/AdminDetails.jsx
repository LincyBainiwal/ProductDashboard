import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useAdmin } from "../context/AdminContext";
import { useState } from "react";

export default function AdminDetails() {
  const { admin, setAdmin } = useAdmin();
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [avatar, setAvatar] = useState(admin.avatar);

  const handleSave = () => {
    setAdmin((prev) => ({ ...prev, name, email, avatar }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Label htmlFor="admin-name">Name</Label>
        <Input
          id="admin-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="admin-email">Email</Label>
        <Input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="admin-avatar">Avatar URL</Label>
        <Input
          id="admin-avatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="role">Role</Label>
        <Input id="role" value={admin.role} readOnly />
      </div>

      <Button
        className="p-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}
