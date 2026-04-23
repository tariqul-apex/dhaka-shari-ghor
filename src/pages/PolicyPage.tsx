import { useParams, Link } from "react-router-dom";
import NotFound from "./NotFound";

type PolicyKey = "shipping" | "returns" | "privacy" | "terms";

const policies: Record<PolicyKey, { title: string; sections: { heading: string; body: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    sections: [
      {
        heading: "Processing time",
        body: "All orders are processed within 1–2 business days (excluding weekends and holidays). You will receive a shipping confirmation email with tracking information once your order has been dispatched.",
      },
      {
        heading: "Shipping rates",
        body: "Standard shipping (3–5 business days) is free on all orders over $80. Orders under $80 incur a flat shipping fee of $8. Express shipping (1–2 business days) is available for $18.",
      },
      {
        heading: "International shipping",
        body: "We ship worldwide. International orders are subject to customs and import duties, which are the responsibility of the recipient. Delivery times for international orders vary between 7–21 business days depending on destination and customs processing.",
      },
      {
        heading: "Order tracking",
        body: "Once your order is dispatched, you will receive an email with a tracking number. You can use this to track your order directly on the carrier's website.",
      },
      {
        heading: "Lost or delayed packages",
        body: "If your package has not arrived within the estimated delivery window, please contact our support team at support@bloom.store and we will investigate with the carrier.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    sections: [
      {
        heading: "Return window",
        body: "We accept returns on unworn, unwashed, and unaltered items within 30 days of the delivery date. Items must be in their original condition with all tags attached.",
      },
      {
        heading: "How to initiate a return",
        body: "To start a return, log into your account and navigate to your order history, or contact us at returns@bloom.store with your order number and reason for return. We will provide a prepaid return label for domestic orders.",
      },
      {
        heading: "Refunds",
        body: "Once your return is received and inspected, we will process your refund within 5–7 business days to the original payment method. You will receive an email confirmation when your refund has been issued.",
      },
      {
        heading: "Exchanges",
        body: "We currently do not offer direct exchanges. To exchange an item for a different size or color, please return the original item for a refund and place a new order.",
      },
      {
        heading: "Non-returnable items",
        body: "For hygiene reasons, sale items marked as 'Final Sale', gift cards, and items that have been worn, washed, or altered cannot be returned.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you provide directly to us, such as when you create an account, place an order, or contact support. This includes name, email address, shipping address, payment information (tokenized), and communication preferences.",
      },
      {
        heading: "How we use your information",
        body: "We use your information to process orders, send transactional emails, provide customer support, send marketing communications (with your consent), and improve our products and services.",
      },
      {
        heading: "Cookies and tracking",
        body: "We use cookies and similar technologies for essential site functionality, analytics, and marketing. You can manage your cookie preferences at any time via our Cookie Preferences centre, accessible from any page footer.",
      },
      {
        heading: "Data sharing",
        body: "We do not sell your personal data. We share your information only with service providers who assist in our operations (payment processors, shipping carriers, email providers) under strict confidentiality agreements.",
      },
      {
        heading: "Your rights",
        body: "You have the right to access, correct, or delete your personal data at any time. To make a data request, log into your account or contact privacy@bloom.store. We will respond within 30 days.",
      },
      {
        heading: "Data retention",
        body: "We retain customer data for as long as your account is active or as required by law. Order data is retained for 7 years for tax and legal compliance purposes.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        heading: "Acceptance of terms",
        body: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
      },
      {
        heading: "Products and pricing",
        body: "We reserve the right to modify prices at any time without notice. All prices are displayed in USD and are inclusive of applicable taxes unless otherwise stated. Product colors may vary slightly from what is displayed on screen.",
      },
      {
        heading: "Order acceptance",
        body: "Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to cancel any order at any time for reasons including product availability, errors in pricing, or suspected fraudulent activity.",
      },
      {
        heading: "Intellectual property",
        body: "All content on this website including text, images, graphics, and designs are the property of Bloom and may not be reproduced, distributed, or used without our written permission.",
      },
      {
        heading: "Limitation of liability",
        body: "Bloom shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or purchase of our products, to the maximum extent permitted by applicable law.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.",
      },
    ],
  },
};

const PolicyPage = () => {
  const { policy } = useParams<{ policy: string }>();

  if (!policy || !(policy in policies)) return <NotFound />;

  const { title, sections } = policies[policy as PolicyKey];

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:text-foreground">Home</Link> / {title}
        </p>
        <h1 className="font-display font-black text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground text-sm mt-3">Last updated: April 2026</p>
      </div>

      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display font-bold text-xl mb-2">{s.heading}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-3xl">
        <p className="text-sm text-muted-foreground">
          Questions? Contact us at{" "}
          <a href="mailto:support@bloom.store" className="text-primary underline">support@bloom.store</a>
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
