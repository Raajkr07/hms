import React, { useState, useEffect } from "react";
import LandingHeader from "../../components/landing/LandingHeader";
import Footer from "../../components/footer/Footer";
import { TrendingUp, Heart, Users, Globe, DollarSign, CheckCircle, AlertTriangle, Target, BarChart3, ArrowRight, Shield, Award, Zap } from "lucide-react";
import { wastegeStats } from '../../data/DonationPageData';
import { impactMetrics } from '../../data/DonationPageData';
import { pricingPlans } from '../../data/DonationPageData';
import { problemSolutions } from '../../data/DonationPageData';
import { HeartbeatLine } from '../../components/HeartBeatLine';
import ImpactStories from './component/ImpactStories'
import FundUtilization from './component/FundUtilization'

const donationAmounts = [500, 1000, 2500, 5000, 10000, 25000];

export default function MoneyDonatePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    pan: "",
    address: "",
    isAdult: false,
    newsletter: true
  });
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % wastegeStats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setSelectedPlan(null);
    setCustomAmount(value);
  };

  const getSelectedAmount = () => {
    return selectedPlan ? selectedPlan.amount : parseInt(customAmount) || 0;
  };

  const handleSubmit = () => {
    const amount = getSelectedAmount();
    if (amount < 100) {
      alert("Minimum amount ₹100");
      return;
    }
    if (!form.name || !form.email || !form.mobile || !form.isAdult) {
      alert("Please fill all required fields");
      return;
    }
    // this section is for Payment integration here i will write this.

    console.log("Processing donation:", { ...form, amount });
    alert(`Thank you! i will implement payment gateway of ₹${amount.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black ">
      <LandingHeader />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-black text-white">
        <div className="absolute inset-0 bg-white dark:bg-dark opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-300 ">
              Transform Medicine <span className="text-yellow-400">Waste</span> into <span className="text-green-400">Hope</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 text-gray-600 dark:text-gray-300">
              Join India's medicine redistribution network. Your contribution directly saves lives and reduces pharmaceutical waste.
            </p>
            
            {/* Live Impact Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-black backdrop-blur rounded-lg p-4">
                  <metric.icon className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <HeartbeatLine/>
      {/* Global Wastage Statistics */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-400">
              The Global Medicine Crisis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Data-driven insights into pharmaceutical waste worldwide and how we're addressing this critical issue
            </p>
          </div>

          {/* Animated Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {wastegeStats.map((stat, index) => (
              <div key={index} className={`relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                currentStat === index 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-2xl' 
                  : 'bg-gray-100 dark:bg-black hover:shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{stat.country}</h3>
                  <div className="text-sm opacity-75">{stat.population}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{stat.waste}</div>
                  <div className="text-sm font-medium">{stat.percentage} wastage rate</div>
                  <p className="text-xs opacity-80">{stat.description}</p>
                </div>
                {currentStat === index && (
                  <div className="absolute top-2 right-2">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Problem & Solution Matrix */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-black dark:to-black rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              How HopeMeds Tackles Global Challenges
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {problemSolutions.map((item, index) => (
                <div key={index} className="bg-white dark:bg-black rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.problem}</h4>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">{item.stat}</div>
                  <div className="flex items-start mb-3">
                    <Target className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.solution}</p>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-600">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Donation Plans */}
      <section className=" bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">
              Choose Your Impact Level
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Every contribution creates measurable change. Select a plan that matches your commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                onClick={() => handlePlanSelect(plan)}
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan?.name === plan.name ? 'ring-4 ring-blue-500' : ''
                } ${plan.popular ? 'lg:-mt-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`bg-gradient-to-br ${plan.color} p-6 rounded-2xl text-white h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <plan.icon className="w-8 h-8" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{plan.amount.toLocaleString()}</div>
                      <div className="text-sm opacity-80">one-time</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                  <p className="text-sm mb-4 opacity-90">{plan.impact}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 opacity-80" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">Or enter amount:</p>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmount}
              placeholder="Min amount ₹500"
              className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-center text-xl font-semibold w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </section>

      {/* Donation Details Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-slate-700 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 dark:text-white text-black">
                Complete Your Donation
              </h2>
              {getSelectedAmount() > 0 && (
                <div className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-full text-lg font-semibold">
                  
                  of Amount: ₹{getSelectedAmount().toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number *"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                
                <input
                  type="text"
                  name="pan"
                  value={form.pan}
                  onChange={handleInputChange}
                  placeholder="PAN Number (for 80G receipt)"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Address (Optional)"
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <div className="space-y-3">
                <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAdult"
                    checked={form.isAdult}
                    onChange={handleInputChange}
                    required
                    className="mt-1 accent-blue-500"
                  />
                  <span className="text-sm">
                    I declare that I am above 18 years of age and a resident of India. I understand this donation will help redistribute medicines to those in need.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 accent-blue-500"
                  />
                  <span className="text-sm">
                    Send me impact updates and success stories from our community.
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={getSelectedAmount() < 500}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Heart className="w-6 h-6" />
                Donate ₹{getSelectedAmount().toLocaleString()} Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>🔒 Secure payment powered by Razorpay • 80G Tax exemption available</p>
                <p className="mt-1">Your donation will be processed within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Breakdown */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-black dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FundUtilization/>
          <ImpactStories />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="pt-10 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">80G Certified</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Tax deduction available</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Award className="w-8 h-8 text-blue-500" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Transparency Score</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">98% fund utilization</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Users className="w-8 h-8 text-purple-500" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Community Driven</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">25K+ active donors</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}