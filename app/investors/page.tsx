import InvestorsPageContent from "./InvestorsPageContent";
import { isFormDeliveryConfigured } from "@/lib/server/form-delivery";

export default function InvestorsPage() {
  return (
    <InvestorsPageContent
      deliveryAvailable={isFormDeliveryConfigured()}
    />
  );
}
