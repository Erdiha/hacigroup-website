"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { donateContent } from "@/data/content";
import Container from "@/components/ui/Container";
import DonateBackground from "@/components/ui/DonateBackground";
import Link from "next/link";

export default function DonatePage() {
  const { hero, whyDonate, tierSection, banner, tiers, paymentMethods, allocations, trust } = donateContent;

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
  const [isSuccess, setIsSuccess] = useState(false);

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
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    
    console.log("Donation submitted:", {
      ...formData,
      frequency: isMonthly ? "monthly" : "one-time",
      paymentMethod,
    });
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Scroll to top of form area
    const formSection = document.getElementById("donation-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const selectedTierData = tiers.find((t) => t.id === selectedTier);
  const displayAmount = customAmount
    ? parseInt(customAmount, 10)
    : selectedTierData?.amount;

  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-x-hidden">
      {/* Mission Banner */}
      <div className="bg-brand-purple/10 border-b border-white/5 py-3 px-4 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <p className="text-center text-white/90 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
            <span className="text-brand-amber">{banner.icon}</span>
            {banner.text}
          </p>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-12 ">
        <DonateBackground />
        
        <Container className="relative z-10 max-w-4xl text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              {hero.title.split(" ").slice(0, 2).join(" ")} <br />
              <span className="gradient-text">{hero.title.split(" ").slice(2).join(" ")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">{hero.badge}</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020] via-[#13182b] to-[#0B1020]" />
        <Container className="relative z-10 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {whyDonate.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="donation-options">
        <Container className="max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {tierSection.title}
            </h2>
            
            {/* Frequency Toggle */}
            <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1 mt-6">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isMonthly
                    ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  !isMonthly
                    ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                One-Time
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-12">
            {tiers.map((tier, i) => (
              <motion.button
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleTierSelect(tier.id)}
                className={`relative text-left h-full flex flex-col bg-[#161b22] border-2 rounded-3xl p-6 transition-all duration-300 group ${
                  selectedTier === tier.id
                    ? "border-brand-purple shadow-xl shadow-brand-purple/20 scale-[1.02] z-10"
                    : "border-white/5 hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-4 right-4 bg-brand-amber text-white text-[10px] font-white uppercase tracking-wider px-2 py-1.5 rounded-full shadow-lg shadow-amber-500/20 pointer-events-none">
                    Most Popular
                  </div>
                )}
                
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{tier.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {tier.title}
                </h3>
                <div className="text-3xl font-black text-white mb-2">
                  ${tier.amount}
                  <span className="text-white/40 text-sm font-medium ml-1">
                    /{isMonthly ? "mo" : "once"}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-6 leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5">
                  <ul className="space-y-3">
                    {tier.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/70 text-xs font-medium">
                        <span className="text-brand-green mt-0.5">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-purple/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#161b22] border border-white/10 rounded-2xl p-2 flex items-center">
                <div className="px-4 text-white/40 font-bold">$</div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  placeholder="Enter custom amount"
                  className="w-full bg-transparent border-none text-white font-bold placeholder-white/20 focus:ring-0 text-lg"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Donation Form Section */}
      <section id="donation-form-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <Container className="max-w-3xl relative z-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#161b22] border border-brand-green/30 rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-brand-green/10"
              >
                <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  Thank You, {formData.name.split(' ')[0]}!
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
                  Your donation of <strong className="text-white">${displayAmount}</strong> has been received. 
                  You are helping us build a fairer future for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/"
                    className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                  >
                    Return Home
                  </Link>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData(prev => ({ ...prev, amount: 50, message: "" }));
                      setSelectedTier("sustainer");
                    }}
                    className="px-8 py-3 rounded-xl bg-brand-purple text-white font-bold hover:bg-brand-purple/90 transition-colors"
                  >
                    Make Another Donation
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#161b22] border border-white/10 rounded-3xl p-5 sm:p-10 shadow-2xl"
              >
                <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">
                Complete Your Gift
              </h2>
              <div className="flex items-baseline justify-center gap-1 sm:gap-2 text-3xl sm:text-5xl font-black text-white mb-2">
                <span className="text-brand-purple">$</span>
                {displayAmount}
                <span className="text-white/40 text-sm sm:text-lg font-medium">
                  /{isMonthly ? "mo" : "once"}
                </span>
              </div>
            </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                        Full Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Jane Doe"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                        Email Address
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider block">
                      Payment Method
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                            paymentMethod === method.id
                              ? "border-brand-purple bg-brand-purple/10 text-white"
                              : "border-white/10 bg-[#0B1020] text-white/50 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span className="text-xl">{method.icon}</span>
                          <span className="text-xs font-bold">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="p-4 rounded-xl bg-[#0B1020] border border-white/5 space-y-4">
                      <div className="space-y-2">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Card Details</span>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white placeholder-white/20 focus:border-brand-purple focus:ring-0 focus:outline-none transition-colors font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white placeholder-white/20 focus:border-brand-purple focus:ring-0 focus:outline-none transition-colors font-mono text-center"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white placeholder-white/20 focus:border-brand-purple focus:ring-0 focus:outline-none transition-colors font-mono text-center"
                        />
                        <input
                          type="text"
                          placeholder="ZIP"
                          className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white placeholder-white/20 focus:border-brand-purple focus:ring-0 focus:outline-none transition-colors font-mono text-center"
                        />
                      </div>
                    </div>
                  )}

                  <label className="block space-y-2">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                      Message (Optional)
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Why are you supporting us?"
                      className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none resize-none transition-all"
                    />
                  </label>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing || !formData.name || !formData.email}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                        isProcessing || !formData.name || !formData.email
                          ? "bg-white/10 text-white/30 cursor-not-allowed"
                          : "bg-gradient-to-r from-brand-purple to-brand-amber text-white hover:shadow-brand-purple/25 hover:scale-[1.01] active:scale-[0.99]"
                      }`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Donate $${displayAmount}`
                      )}
                    </button>
                    <p className="text-center text-white/30 text-xs mt-4 flex items-center justify-center gap-1">
                      <span>🔒</span> 256-bit SSL Encrypted Payment
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Impact Allocation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Where Your Money Goes
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We believe in radical transparency. Here is exactly how we use your contribution.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            {allocations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

