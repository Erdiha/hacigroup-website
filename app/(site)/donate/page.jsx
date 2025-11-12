"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { donateContent } from "@/data/content";

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
    await new Promise((r) => setTimeout(r, 1200)); // simulate
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
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 mb-8"
          >
            <span className="text-4xl">{hero.badgeIcon}</span>
            <span className="text-white font-bold">{hero.badgeText}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{
              textShadow: "3px 3px 0px #10b981, 6px 6px 0px #f59e0b",
              WebkitTextStroke: "2px black",
            }}
          >
            {hero.titleTop}
            <br />
            <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
              {hero.titleGradient}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-12"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {hero.impactStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-green-400 mb-2">
                  ${stat.amount}
                </div>
                <div className="text-white/70 text-sm">{stat.text}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-4 uppercase">
            Choose Your Impact
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Select a giving level or enter a custom amount. 100% of your
            donation supports our programs.
          </p>

          {/* Frequency */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-2">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  isMonthly
                    ? "bg-gradient-to-r from-green-500 to-amber-500 text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  !isMonthly
                    ? "bg-gradient-to-r from-green-500 to-amber-500 text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                One-Time
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tiers.map((tier, i) => (
              <motion.button
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleTierSelect(tier.id)}
                className={`text-left bg[#161b22] bg-[#161b22] border-2 rounded-2xl p-6 transition-all hover:scale-105 ${
                  selectedTier === tier.id
                    ? "border-green-500 shadow-lg shadow-green-500/25"
                    : "border-white/10 hover:border-green-500/50"
                } ${
                  tier.popular
                    ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0f1528]"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="inline-flex items-center gap-1 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <span>⭐</span>
                    <span>MOST POPULAR</span>
                  </div>
                )}
                <div className="text-4xl mb-4">{tier.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {tier.title}
                </h3>
                <div className="text-3xl font-black text-green-400 mb-3">
                  ${tier.amount}
                  <span className="text-white/50 text-sm font-normal">
                    /{isMonthly ? "month" : "once"}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-white/60 text-sm"
                    >
                      <span className="text-green-400">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="max-w-md mx-auto">
            <label className="block text-center">
              <span className="text-white/70 text-sm font-semibold mb-3 block">
                Or enter custom amount
              </span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  placeholder="Enter amount"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-12 py-4 text-white text-center text-xl font-bold placeholder-white/30 focus:border-green-500 focus:outline-none"
                />
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#161b22] border-4 border-green-500 rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-3xl font-black text-white uppercase mb-2">
                Complete Your Donation
              </h2>
              <div className="text-4xl font-black text-green-400 mb-2">
                ${displayAmount}
                <span className="text-white/50 text-lg font-normal">
                  /{isMonthly ? "month" : "one-time"}
                </span>
              </div>
              <p className="text-white/70">
                {selectedTierData?.description ||
                  "Your custom donation supports our mission"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
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
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
                  />
                </label>
              </div>

              <div>
                <span className="text-white/70 text-sm font-semibold mb-3 block">
                  Payment Method *
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/10 bg-white/5 hover:border-green-500/50"
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
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
                    />
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        Expiry Date
                      </span>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        CVC
                      </span>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-white/70 text-sm font-semibold mb-2 block">
                        ZIP Code
                      </span>
                      <input
                        type="text"
                        placeholder="12345"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              )}

              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  Encouragement Message (Optional)
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Share why you're supporting our mission..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-green-500 focus:outline-none resize-none"
                />
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-500 bg-white/5 border-2 border-white/10 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="text-white/70 text-sm">
                  Make this donation anonymous
                </span>
              </label>

              <button
                type="submit"
                disabled={isProcessing || !formData.name || !formData.email}
                className={`w-full py-4 font-black text-lg rounded-xl border-4 border-black transition-all ${
                  isProcessing || !formData.name || !formData.email
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-amber-500 text-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  `DONATE $${displayAmount} ${isMonthly ? "MONTHLY" : "TODAY"}`
                )}
              </button>

              <p className="text-center text-white/50 text-sm">
                Your donation is secure and tax-deductible. HaciGroup is a
                501(c)(3) nonprofit organization.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Allocations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12 uppercase">
            Where Your Money Goes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {allocations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B1020] border-4 border-black rounded-3xl p-12"
          >
            <h2 className="text-3xl font-black text-white mb-8 uppercase">
              YOUR DONATION IS SAFE & SECURE
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-white/70">
              {trust.map((t, i) => (
                <div key={i}>
                  <div className="text-4xl mb-4">{t.icon}</div>
                  <h3 className="font-bold text-white mb-2">{t.title}</h3>
                  <p className="text-sm">{t.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
