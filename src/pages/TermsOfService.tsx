import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8 text-white uppercase">Terms of Service</h1>
        <p className="text-muted-foreground mb-4">Last updated: {new Date().getFullYear()}</p>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Membership & Services</h2>
            <p>
              All memberships are subject to the terms and conditions outlined in your membership agreement. We reserve the right to modify, suspend or discontinue any aspect of our services at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Health & Safety</h2>
            <p>
              By using our facilities, you acknowledge that participation in physical exercise involves inherent risks. You agree that you are voluntarily participating in these activities and assume all risk of injury, illness, or death. We recommend consulting with a physician before starting any new exercise program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Code of Conduct</h2>
            <p>
              Members are expected to behave in a respectful manner towards staff and other members. Harassment, intimidation, or any form of disruptive behavior will not be tolerated and may result in the termination of membership.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
