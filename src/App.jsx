import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bgPrimary = '/images/hero.png';
const bgSecondary = '/images/worship.png';
const speakerImage = '/images/speaker.png';
const paymentQr = '/images/payment-qr.jpeg';

const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {particles.map((i) => (
        <motion.div
          key={i}
          className='absolute rounded-full bg-white'
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -180, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 10 + Math.random() * 5, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

const LightBeam = ({ className }) => {
  return (
    <motion.div
      className={`absolute bg-gradient-to-b from-yellow-100/30 via-white/10 to-transparent blur-3xl ${className}`}
      animate={{ opacity: [0.2, 0.7, 0.2] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
  );
};

export default function LandingPage() {
  const [registrationStep, setRegistrationStep] = useState(1);
const [formData, setFormData] = useState({
  fullName: '',
  phone: '',
  churchName: '',
  place: '',
  paymentMode: '',
  utr: '',
});

const submitRegistration = async () => {
if (
  !formData.fullName ||
  !formData.phone ||
  !formData.churchName ||
  !formData.place
) {
  alert("Please fill all fields");
  return;
}

if (!/^\d{10}$/.test(formData.phone)) {
  alert("Please enter valid phone number");
  return;
}

if (
  formData.paymentMode === "online" &&
  !formData.utr
) {
  alert("Please enter UTR number");
  return;
}
  try {

await fetch(
  "https://script.google.com/macros/s/AKfycbxy20P6d5acq-_SwrF4ISkL-hEmn4rfMznboc498AcSSPe8vsYTnz1eGC-_FpvEBtwy/exec",
  {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: formData.fullName,
      phone: formData.phone,
      churchName: formData.churchName,
      place: formData.place,
      paymentMode: formData.paymentMode,
      utr: formData.utr
    }),
  }
);

    alert("Registration Successful!");

  } catch (error) {
    console.error(error);
    alert("Submission failed");
  }
};
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1200], [0, 350]);
  const textY = useTransform(scrollY, [0, 800], [0, 120]);

  useEffect(() => {
    document.body.style.background = '#000';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className='bg-black text-white overflow-x-hidden'>
      <section className='relative min-h-screen flex items-center justify-center'>
        <motion.div style={{ y: heroY, backgroundImage: `url(${bgPrimary})` }} className='absolute inset-0 bg-cover bg-center opacity-35 scale-110' />
        <div style={{ backgroundImage: `url(${bgSecondary})` }} className='absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen' />
        <div className='absolute inset-0 bg-gradient-to-b from-black via-black/75 to-[#0b0600]' />
        <LightBeam className='top-0 left-[20%] w-32 h-[80vh] rotate-12' />
        <LightBeam className='top-0 right-[20%] w-40 h-[80vh] -rotate-12' />
        <Particles />

        <motion.div style={{ y: textY }} className='relative z-20 text-center px-6 max-w-7xl'>
          <div className='mb-8 inline-block px-8 py-3 rounded-full border border-yellow-200/20 bg-white/10 backdrop-blur-2xl text-sm md:text-base tracking-[0.25em] uppercase text-yellow-100/85'>
            Youth Retreat 2026 • St Paul's Lutheran Church
          </div>
          <h1 className='text-5xl sm:text-7xl md:text-9xl font-black leading-[0.9] bg-gradient-to-b from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent'>
            Slaves to <br /> Righteousness
          </h1>
          <p className='mt-6 text-lg md:text-2xl tracking-[0.4em] text-white/75'>Romans 6:18</p>
        </motion.div>
      </section>

      <section className='relative py-24 px-6 bg-gradient-to-b from-black via-[#0b0600] to-black'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center'>
          <div className='flex justify-center'>
            <img src={speakerImage} alt='Bro Sunny Joseph' className='w-[380px] md:w-[460px] rounded-[2rem] border border-yellow-200/20' />
          </div>
          <div className='rounded-3xl border border-white/15 bg-white/10 backdrop-blur-3xl p-10'>
            <p className='uppercase tracking-[0.4em] text-yellow-200/70 text-sm mb-4'>Guest Speaker</p>
            <h2 className='text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-yellow-200 bg-clip-text text-transparent'>Bro Sunny Joseph</h2>
            <p className='mt-4 text-yellow-100/80 text-lg font-medium'>Director, Missions – People Focus, India</p>
          </div>
        </div>
      </section>

      <section className='relative py-24 px-6 bg-gradient-to-b from-[#050505] via-black to-[#0b0600]'>
        <div className='max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-10 md:p-14 shadow-2xl'>
          <h2 className='text-3xl md:text-5xl font-bold text-center bg-gradient-to-b from-white to-yellow-200 bg-clip-text text-transparent'>Registration</h2>

          {registrationStep === 1 && (
            <div className='grid gap-6 mt-10'>
              <input type='text' placeholder='Full Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className='w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-5 text-white' />
              <input type='tel' placeholder='Phone Number' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className='w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-5 text-white' />
              <input type='text' placeholder='Church Name' value={formData.churchName} onChange={(e) => setFormData({ ...formData, churchName: e.target.value })} className='w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-5 text-white' />
              <input type='text' placeholder='Place' value={formData.place} onChange={(e) => setFormData({ ...formData, place: e.target.value })} className='w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-5 text-white' />
              <button
                onClick={() => {
                    if (
                      !formData.fullName ||
                      !formData.phone ||
                      !formData.churchName ||
                      !formData.place
                    ) {
                      alert("Please fill all fields");
                      return;
                    }

                    if (!/^\d{10}$/.test(formData.phone)) {
                      alert("Please enter valid phone number");
                      return;
                    }

                    setRegistrationStep(2);
                  }}
                 className='py-7 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 text-black'>Continue</button>
            </div>
          )}

          {registrationStep === 2 && (
            <div className='mt-10 rounded-3xl border border-yellow-200/20 bg-white/5 p-8 space-y-6'>
              <h3 className='text-2xl font-bold text-yellow-100'>Please Verify Your Details</h3>
              <div className='space-y-3 text-white/80'>
                <p>Name: {formData.fullName}</p>
                <p>Phone: {formData.phone}</p>
                <p>Church: {formData.churchName}</p>
                <p>Place: {formData.place}</p>
                <p>Registration Fee: ₹30 per head</p>
              </div>
              <div className='flex gap-4'>
                <button onClick={() => setRegistrationStep(1)} className='flex-1'>Edit</button>
                <button
                 onClick={() => {
                      if (
                        !formData.fullName ||
                        !formData.phone ||
                        !formData.churchName ||
                        !formData.place
                      ) {
                        alert("Please fill all fields");
                        return;
                      }

                      if (!/^\d{10}$/.test(formData.phone)) {
                        alert("Please enter valid phone number");
                        return;
                      }

                      setRegistrationStep(3);
                    }}
                className='flex-1 bg-yellow-400 text-black'>Choose Payment Method</button>
              </div>
            </div>
          )}

          {registrationStep === 3 && (
            <div className='mt-10 space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <button onClick={() => setFormData({ ...formData, paymentMode: 'online' })} className='rounded-3xl border border-yellow-300/20 bg-white/10 p-8'>Online Payment</button>
                <button onClick={() => setFormData({ ...formData, paymentMode: 'cash' })} className='rounded-3xl border border-green-300/20 bg-white/10 p-8'>Cash Payment</button>
              </div>

              {formData.paymentMode === 'online' && (
                <div className='grid md:grid-cols-2 gap-10 items-center'>
                  <div className='rounded-3xl border border-white/10 bg-white/5 p-8 text-center'>
                    <h3 className='text-2xl font-bold text-yellow-100 mb-6'>Scan & Pay ₹30 per Head</h3>
                    <img src={paymentQr} alt='Payment QR' className='w-full max-w-xs mx-auto rounded-2xl border border-white/10' />
                    <div className='mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-5 text-left'>
                      <p>Expected Receiver Name:</p>
                      <p className='text-yellow-200 font-semibold'>Kamatham Jonathan Samuel</p>
                    </div>
                  </div>
                  <div className='space-y-6'>
                    <input type='text' placeholder='Transaction ID / UTR Number' value={formData.utr} onChange={(e) => setFormData({ ...formData, utr: e.target.value })} className='w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-5 text-white' />
                    <button className='w-full bg-yellow-400 text-black' onClick={submitRegistration}>Submit Registration</button>
                  </div>
                </div>
              )}

              {formData.paymentMode === 'cash' && (
                <div className='rounded-3xl border border-green-300/20 bg-green-300/10 p-10 text-center'>
                  <h3 className='text-3xl font-bold text-green-200'>Cash Payment Selected</h3>
                  <p className='mt-6'>Pay ₹30 per head at the venue during check-in.</p>
                  <button
                    className='mt-8 bg-green-400 text-black px-8 py-4 rounded-2xl'
                    onClick={submitRegistration}
                  >
                    Confirm Cash Registration
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className='relative py-20 px-6 bg-gradient-to-b from-black to-[#050505]'>
        <div className='max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-10 md:p-14'>
          <h2 className='text-3xl md:text-5xl font-bold text-center bg-gradient-to-b from-white to-yellow-200 bg-clip-text text-transparent'>Important Notes</h2>
          <div className='grid md:grid-cols-2 gap-6 text-white/80 text-lg mt-10'>
            {[
              'Registration is mandatory for all participants',
              'For singing participation, each team must have a minimum of 5 members',
              'For quiz participation, only 3 members are allowed from each church',
              'Instruments allowed: Keyboard, Drums/Pads, Guitar',
              'Auto-Rhythm is not supported',
              'Please carry your Bible',
            ].map((note) => (
              <div key={note} className='rounded-2xl border border-white/10 bg-white/5 p-5'>
                ✓ {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}