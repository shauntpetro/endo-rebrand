import ContactPageContent from "./ContactPageContent";
import { isFormDeliveryConfigured } from "@/lib/server/form-delivery";

type ContactPageSearchParams = Record<
  string,
  string | string[] | undefined
>;

export default async function ContactPage({
  searchParams = Promise.resolve({}),
}: {
  searchParams?: Promise<ContactPageSearchParams>;
} = {}) {
  return ContactPageContent({
    searchParams,
    deliveryAvailable: isFormDeliveryConfigured(),
  });
}
