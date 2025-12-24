'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';

import bentoImage from '@/assets/bento_image_v2.png';

const CTASection = () => {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section className="relative py-32 px-8 overflow-hidden">
      {/* Background with Texture and Overlay */}
      <div className="absolute inset-0 bg-textured-indigo opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>

      <div className="relative z-10 w-full max-w-[90%] mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {/* Cell 1: Main English Message (Top Left, Large) - Indigo Theme */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="md:col-span-2 md:row-span-2 bg-indigo-900/40 rounded-3xl p-10 flex items-center relative overflow-hidden group border border-indigo-500/20 shadow-lg shadow-indigo-900/10 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-500"></div>

            <h2 className="text-4xl md:text-6xl font-cormorant font-bold text-white leading-tight relative z-10">
              Ready to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">Transform</span><br />
              Your Language<br />
              Experience?
            </h2>
          </motion.div>

          {/* Cell 2: Filler Cell (Gray, Top Middle-Right) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
            }}
            className="hidden md:flex md:col-span-1 md:row-span-1 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner"
          ></motion.div>

          {/* Cell 3: Japanese Message (Top Right) - Purple Theme */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="md:col-span-1 md:row-span-1 bg-purple-900/40 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden group border border-purple-500/20 shadow-lg shadow-purple-900/10 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-lg text-purple-100 font-light leading-relaxed relative z-10 font-cormorant">
              AIの力で、<br />
              言語の壁を超えた<br />
              新しい体験を
            </p>
          </motion.div>

          {/* Cell 4: Middle Image (Middle Right) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden border border-white/10 shadow-lg group"
          >
            <NextImage
              src={bentoImage}
              alt="Bento Grid Image"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay for hover effect */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </motion.div>

          {/* Cell 5: Filler Cell (Gray, Middle Right-Edge) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
            }}
            className="hidden md:flex md:col-span-1 md:row-span-1 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner"
          ></motion.div>


          {/* Cell 6: Visual/Decorative (Bottom Left Split) - Cyan Theme */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="md:col-span-2 bg-cyan-900/40 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden group border border-cyan-500/20 shadow-lg shadow-cyan-900/10 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors duration-500"></div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <i className="ri-lightbulb-flash-line text-4xl text-cyan-200 group-hover:scale-110 transition-transform duration-300"></i>
              <span className="text-sm text-cyan-200/70 tracking-wider font-cormorant">INNOVATION</span>
            </div>
          </motion.div>

          {/* Cell 7: Secondary Action/Visual (Bottom Right Split) - Dark Indigo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="md:col-span-2 bg-indigo-950/60 rounded-3xl p-8 flex items-center justify-between relative overflow-hidden group border border-indigo-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 opacity-50"></div>

            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-xl font-cormorant font-bold text-indigo-100">View Our Profile</span>
              <p className="text-lg text-indigo-300/70 font-cormorant">Explore our journey and philosophy.</p>
            </div>

            <div className="relative z-10 w-12 h-12 rounded-full border border-indigo-300/30 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors cursor-pointer" onClick={() => router.push('/profile')}>
              <i className="ri-user-smile-line text-xl text-indigo-200"></i>
            </div>
          </motion.div>

        </motion.div>

        {/* Separated Contact Us Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 flex justify-center w-full"
        >
          <button
            onClick={handleContactClick}
            className="group relative px-12 py-5 rounded-full bg-white text-black font-cormorant font-bold text-xl md:text-2xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              Contact Us
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-white to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
