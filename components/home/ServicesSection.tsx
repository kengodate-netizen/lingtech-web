'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

const ServicesSection = () => {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const services = [
    {
      englishLabel: 'Web Design',
      title: 'ウェブ制作',
      description: '最新のAI技術を活用した、高性能で美しいウェブサイトを制作します。ユーザー体験を最優先に、ビジネスの成長を加速させるデジタルソリューションを提供します。',
      link: '/services/web-development',
      bgColor: 'bg-black',
    },
    {
      englishLabel: 'AI Seminar',
      title: 'AIセミナー',
      description: '人工知能の基礎から応用まで、実践的なAIセミナーを提供します。機械学習、ディープラーニング、自然言語処理など、最先端の技術を学べます。',
      link: '/services/ai-education',
      bgColor: 'bg-gray-800',
    },
    {
      englishLabel: 'Translation',
      title: '翻訳',
      description: 'AI翻訳技術と人間の専門知識を組み合わせた、高品質な翻訳サービスを提供します。技術文書、ビジネス文書、マーケティング資料など、あらゆる分野に対応します。',
      link: '/services/translation',
      bgColor: 'bg-black',
    },
    {
      englishLabel: 'Language Education',
      title: '語学教育',
      description: 'AIパーソナライズド学習システムを活用した、効果的な語学教育プログラムを提供します。個々の学習スタイルに合わせた最適な学習体験を実現します。',
      link: '/services/language-education',
      bgColor: 'bg-gray-800',
    },
  ];

  return (
    <section id="services" className="relative py-32 px-8 overflow-hidden">
      {/* Background Image with Texture */}
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-textured-indigo"></div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-cormorant font-bold text-white mb-6 tracking-wider">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            AIと言語技術を融合させた、革新的なサービスで<br />
            あなたのビジネスと学習を次のレベルへ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -200 : 200
              }}
              animate={inView ? {
                opacity: 1,
                x: 0
              } : {
                opacity: 0,
                x: index % 2 === 0 ? -200 : 200
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: "linear"
              }}
              onClick={() => router.push(service.link)}
              className={`group relative ${service.bgColor} neumorphic-card rounded-2xl p-8 hover:!bg-white hover:!bg-none hover:shadow-cyan-glow transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2`}
            >
              {/* Background Gradient - Removed on hover via bg-none */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500"></div>

              <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                {/* English Label */}
                <div className="mb-6">
                  <p className="text-sm font-cormorant font-light text-gray-400 tracking-widest uppercase group-hover:text-gray-600 transition-colors duration-300">
                    {service.englishLabel}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-cormorant font-bold text-white mb-4 group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-white font-cormorant font-medium group-hover:gap-4 group-hover:text-black transition-all duration-300">
                  <span>Learn More</span>
                  <i className="ri-arrow-right-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
