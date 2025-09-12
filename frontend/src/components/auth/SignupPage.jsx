import React, { useState } from 'react';
import { Heart, Stethoscope, Shield } from 'lucide-react';
import { IconHeartbeat } from '@tabler/icons-react';
import SignupCard from './SignupCard';

export default function SignupPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden flex">
      <div className="absolute inset-0 bg-black opacity-10" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>

      <div className="hidden md:flex flex-col flex-1 pt-4 pl-6 justify-between text-white max-w-lg">
        <div className="flex gap-2 items-center blinking-shine">
          <IconHeartbeat size={40} stroke={2.5} className="text-primary-200" />
          <span className="font-heading text-3xl font-semibold text-primary-200">HopeMeds</span>
        </div>

        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6">Reducing Medicine <span className='text-[#FACC15]'>waste</span>, Saving Lives.</h1>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-blue-300" />
              <span className="text-teal-100">Patients - Find affordable medicines and connect with NGOs</span>
            </div>
            <div className="flex items-center space-x-3">
              <Stethoscope className="w-6 h-6 text-green-300" />
              <span className="text-teal-100">Doctors - Verify medicine quality and approve donations</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-300" />
              <span className="text-teal-100">Admins - Oversee distribution network and partnerships</span>
            </div>
          </div>
        </div>

        <div className="text-teal-200 text-sm">© 2025 HopeMeds. Fighting medicine <span className='text-[#FACC15]'>wastage</span> together.</div>
      </div>

       <div className="flex-1 flex items-center justify-end px-4 py-8 md:py-0">
        <SignupCard isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
      </div>
    </div>
  );
}