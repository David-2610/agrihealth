
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-agrihealth-green to-agrihealth-green-light text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Soil Analysis for Better Farming
            </h1>
            <p className="text-xl mb-8">
              Get detailed soil reports and recommendations to maximize your crop yield
              and maintain soil health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/soil-report">
                <Button className="bg-white text-agrihealth-green hover:bg-agrihealth-cream w-full sm:w-auto">
                  Analyze Your Soil
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-2 rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Healthy soil in hands"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-agrihealth-cream">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-agrihealth-green">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-agrihealth-green-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-agrihealth-green">
                AI-Powered Soil Analysis
              </h3>
              <p className="text-gray-600 text-center">
                Get detailed insights about your soil composition and health using
                our advanced AI technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-agrihealth-green-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-agrihealth-green">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600 text-center">
                Receive customized recommendations for crop selection and soil
                treatment based on your analysis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-agrihealth-green-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-agrihealth-green">
                Agricultural Knowledge Base
              </h3>
              <p className="text-gray-600 text-center">
                Access our comprehensive database of farming practices and soil
                management techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-agrihealth-green">
            Ready to Improve Your Farm's Productivity?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Join thousands of farmers who use AgriHealth's soil analysis to make
            data-driven decisions for their farms.
          </p>
          <Link to="/soil-report">
            <Button className="bg-agrihealth-green hover:bg-agrihealth-green-light text-white px-8 py-3 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
