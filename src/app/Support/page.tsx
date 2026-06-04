"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

import { PRODUCTS } from "@/lib/products";

const ISSUE_TYPES = [
  "Product Damaged",
  "Wrong Item Received",
  "Size Issues",
  "Quality Concerns",
  "Shipping Delay",
  "Return Request",
  "General Inquiry",
  "Other",
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    issue: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/Support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        product: "",
        issue: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-card border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle size={32} className="text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Customer Support
            </h1>
          </div>
          <p className="text-foreground/70 mt-4">
            Need help? We&apos;re here to assist you with any issues or
            questions about your mythological collection.
          </p>
        </div>
      </section>

      {/* Support Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Submit a Support Request
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400">
              Thank you for contacting us! Our support team will respond to your
              request within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary transition"
                placeholder="john@example.com"
              />
            </div>

            {/* Product Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Product (Optional)
              </label>
              <select
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer"
              >
                <option value="">Select a product...</option>
                {PRODUCTS.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Issue Type *
              </label>
              <select
                required
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition cursor-pointer"
              >
                <option value="">Select an issue type...</option>
                {ISSUE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={8}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary resize-none transition"
                placeholder="Please describe your issue in detail. The more information you provide, the better we can assist you..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Support Request"}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-background border border-primary/30 rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">
              Response Time
            </h3>
            <p className="text-foreground/70 text-sm">
              Our dedicated support team typically responds to all requests
              within 24 hours during business days. For urgent matters, please
              email support@mythiclegends.com directly.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">
                How long does shipping take?
              </h4>
              <p className="text-foreground/70 text-sm">
                Standard shipping takes 5-7 business days. Express shipping
                options are available at checkout for faster delivery.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">
                What is your return policy?
              </h4>
              <p className="text-foreground/70 text-sm">
                We offer a 30-day return policy for all items in original
                condition. Please contact our support team to initiate a return.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">
                Do you offer international shipping?
              </h4>
              <p className="text-foreground/70 text-sm">
                Yes! We ship to most countries worldwide. Shipping costs and
                times vary by location. Check the shipping calculator at
                checkout.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">
                How can I track my order?
              </h4>
              <p className="text-foreground/70 text-sm">
                You&apos;ll receive a tracking number via email once your order
                ships. Use it to monitor your package in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
