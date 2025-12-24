import Footer from '../components/feature/Footer';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <main>
        <HeroSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
