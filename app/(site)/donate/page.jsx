"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { donateContent } from "@/data/content";
import Container from "@/components/ui/Container";

export default function DonatePage() {
  const { hero, tiers, paymentMethods, allocations, trust } = donateContent;

  const [selectedTier, setSelectedTier] = useState("sustainer");
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 50,
    message: "",
    anonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId);
    const tier = tiers.find((t) => t.id === tierId);
    setFormData((prev) => ({ ...prev, amount: tier.amount }));
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedTier("custom");
      setFormData((prev) => ({ ...prev, amount: parseInt(value, 10) || 0 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Donation submitted:", {
      ...formData,
      frequency: isMonthly ? "monthly" : "one-time",
      paymentMethod,
    });
    alert(
      "Thank you for your donation! You'll receive a confirmation email shortly."
    );
    setIsProcessing(false);
  };

  const selectedTierData = tiers.find((t) => t.id === selectedTier);
  const displayAmount = customAmount
    ? parseInt(customAmount, 10)
    : selectedTierData?.amount;

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Mission Banner */}
      <section className="py-4 px-4">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/80 text-xs sm:text-sm font-medium">
              Supporting nonprofit technology platforms • 501(c)(3)
              tax-deductible
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        <Container className="relative max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Support Platform{" "}
            <span className="bg-linear-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Your contribution funds the development and operation of NELA Ride
            and The Handy Hack—nonprofit platforms that prioritize fair wages
            for workers and affordable services for communities.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base text-white/60 max-w-xl mx-auto"
          >
            100% of donations support platform operations and development.
            HaciGroup is a registered 501(c)(3) nonprofit organization.
          </motion.p>
        </Container>
      </section>

      {/* Why Donate Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <Container className="max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Why Your Support Matters
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              We&apos;re building something different: technology platforms that
              serve people, not profits. Your donation directly funds the
              development and operation of fair, transparent alternatives to
              profit-first tech companies.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Community-Owned
                </h3>
                <p className="text-sm text-white/70">
                  Built by and for the people who use it
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Fully Transparent
                </h3>
                <p className="text-sm text-white/70">
                  See exactly where every dollar goes
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Sustainable Growth
                </h3>
                <p className="text-sm text-white/70">
                  No investor skim, just fair operations
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-3">
            Choose Your Impact Level
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Every contribution makes a difference. Pick an amount that works for
            you, or create your own.
          </p>

          {/* Frequency Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-1 flex gap-1">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-6 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                  isMonthly
                    ? "bg-linear-to-r from-purple-500 to-amber-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-6 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                  !isMonthly
                    ? "bg-linear-to-r from-purple-500 to-amber-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                One-Time
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-10">
            {tiers.map((tier, i) => (
              <motion.button
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleTierSelect(tier.id)}
                className={`text-left bg-[#161b22] border-2 rounded-3xl p-5 sm:p-6 transition-all ${
                  selectedTier === tier.id
                    ? "border-purple-500 shadow-lg shadow-purple-500/25 ring-2 ring-purple-500/40 scale-[1.01]"
                    : "border-white/10 hover:border-purple-500/50"
                } ${tier.popular ? "ring-2 ring-amber-400" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500`}
              >
                {tier.popular && (
                  <div className="inline-flex items-center gap-1 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <span>⭐</span>
                    <span>MOST POPULAR</span>
                  </div>
                )}
                <div className="text-4xl mb-3">{tier.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {tier.title}
                </h3>
                <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-2">
                  ${tier.amount}
                  <span className="text-white/50 text-sm font-normal">
                    /{isMonthly ? "mo" : "once"}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  {tier.description}
                </p>
                <ul className="space-y-1.5">
                  {tier.benefits.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-white/60 text-sm"
                    >
                      <span className="text-purple-400 mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto">
            <label className="block text-center">
              <span className="text-white/70 text-sm font-semibold mb-3 block">
                Or choose your own amount
              </span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  placeholder="Any amount helps"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-12 py-3 text-white text-center text-lg sm:text-xl font-bold placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </label>
          </div>
        </Container>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#161b22] border-2 border-purple-500/30 rounded-3xl p-6 sm:p-10"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Complete Your Gift
              </h2>
              <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-2">
                ${displayAmount}
                <span className="text-white/50 text-lg font-normal">
                  /{isMonthly ? "month" : "once"}
                </span>
              </div>
              <p className="text-white/70">
                {selectedTierData?.description ||
                  "Your contribution supports our mission"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Your Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Smith"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <div>
                <span className="text-white/70 text-sm font-semibold mb-3 block">
                  Payment Method *
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-white/5 hover:border-purple-500/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-white text-sm font-semibold">
                        {method.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Card Number
                    </span>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        Expiry
                      </span>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        CVC
                      </span>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        ZIP
                      </span>
                      <input
                        type="text"
                        placeholder="12345"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </label>
                  </div>
                </div>
              )}

              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  Leave a Message (Optional)
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Share why you're supporting our mission..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none transition-colors"
                />
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-500 bg-white/5 border-2 border-white/10 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-white/70 text-sm">
                  Make this donation anonymous
                </span>
              </label>

              <button
                type="submit"
                disabled={isProcessing || !formData.name || !formData.email}
                className={`w-full py-5 font-bold text-lg rounded-2xl transition-all ${
                  isProcessing || !formData.name || !formData.email
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-500 via-amber-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `Donate $${displayAmount} ${isMonthly ? "Monthly" : "Today"}`
                )}
              </button>

              <p className="text-center text-white/50 text-sm">
                🔒 Secure & encrypted • Tax-deductible • 501(c)(3) nonprofit
              </p>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* Impact Allocation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-4">
            Where Your Money Goes
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            We believe in complete transparency. Here&apos;s exactly how we use
            your contribution.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allocations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <Container className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#161b22] border-2 border-white/10 rounded-3xl p-8 sm:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
              Your Donation is Safe & Secure
            </h2>
            <div className="grid gap-6 sm:grid-cols-3 text-white/70 text-sm">
              {trust.map((t, i) => (
                <div key={i}>
                  <div className="text-5xl mb-4">{t.icon}</div>
                  <h3 className="font-bold text-white mb-2 text-lg">
                    {t.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
