import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function SecurityPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Label htmlFor="current-password">Current Password</Label>
        <Input id="current-password" type="password" placeholder="Enter current password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="new-password">New Password</Label>
        <Input id="new-password" type="password" placeholder="Enter new password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input id="confirm-password" type="password" placeholder="Confirm new password" />
      </div>

      <Button
        className="mt-4 border border-gray-300 hover:border-red-500 hover:text-red-600"
        variant="outline"
      >
        Update Password
      </Button>
    </div>
  );
}
