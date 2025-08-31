import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function BillingPage() {
  return (
    <div className="space-y-5">
      <p className="text-gray-600 mb-4">
        Manage your payment methods and view billing history.
      </p>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" placeholder="**** **** **** 1234" readOnly />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="expiry">Expiry</Label>
            <Input id="expiry" placeholder="MM/YY" readOnly />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="***" readOnly />
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-4 border-gray-300 hover:border-blue-500 hover:text-blue-600"
      >
        Update Payment Method
      </Button>
    </div>
  );
}
