import React, { useState, useEffect } from "react";
import LandingHeader from "../../components/landing/LandingHeader";
import Footer from "../../components/footer/Footer";
import { TrendingUp, Users, AlertTriangle, Target, BarChart3,  Shield, Award } from "lucide-react";
import { wastegeStats, impactMetrics, problemSolutions } from '../../data/DonationPageData';
import { HeartbeatLine } from '../../components/HeartBeatLine';
import ImpactStories from './component/ImpactStories'
import FundUtilization from './component/FundUtilization'
import DonationComponent from './component/MoneyDonation';

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

      <DonationComponent/>

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