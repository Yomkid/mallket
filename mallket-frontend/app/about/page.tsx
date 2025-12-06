'use client';

import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Adeola Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      bio: 'Former e-commerce executive with 10+ years experience in digital marketplaces across Africa.',
      expertise: 'Strategy & Business Development'
    },
    {
      name: 'Chinedu Okoro',
      role: 'CTO',
      image: '👨‍💻',
      bio: 'Tech entrepreneur and software architect specializing in scalable e-commerce platforms.',
      expertise: 'Technology & Innovation'
    },
    {
      name: 'Funke Adebayo',
      role: 'Head of Seller Success',
      image: '👩‍🎓',
      bio: 'Passionate about empowering small businesses with digital tools for growth.',
      expertise: 'Seller Relations & Support'
    },
    {
      name: 'Emeka Nwosu',
      role: 'Head of Operations',
      image: '👨‍💼',
      bio: 'Logistics and operations expert with background in supply chain management.',
      expertise: 'Operations & Logistics'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Platform Launch',
      description: 'MallKet launched with 50 sellers and 1,000 products'
    },
    {
      year: '2023',
      title: 'Growth Phase',
      description: 'Reached 10,000 sellers and 500,000 products'
    },
    {
      year: '2024',
      title: 'Market Leadership',
      description: 'Become Nigeria\'s fastest-growing multivendor marketplace'
    },
    {
      year: '2025',
      title: 'Regional Expansion',
      description: 'Expanding to other African markets'
    }
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We believe in building honest relationships with our buyers and sellers.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Constantly evolving to provide the best e-commerce experience in Africa.'
    },
    {
      icon: '🌍',
      title: 'Inclusion',
      description: 'Making e-commerce accessible to businesses of all sizes across Nigeria.'
    },
    {
      icon: '💡',
      title: 'Empowerment',
      description: 'Equipping sellers with tools to grow and buyers with great choices.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Sellers' },
    { number: '2M+', label: 'Happy Customers' },
    { number: '5M+', label: 'Products Available' },
    { number: '₦10B+', label: 'Annual Sales' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frequent Buyer',
      quote: 'MallKet has transformed how I shop. The variety and customer service are exceptional!',
      avatar: '👩'
    },
    {
      name: 'Chukwuma Eze',
      role: 'Electronics Seller',
      quote: 'Started with 10 products, now selling 500+ monthly. MallKet made it possible.',
      avatar: '👨'
    },
    {
      name: 'Amina Bello',
      role: 'Fashion Entrepreneur',
      quote: 'The seller tools and support helped me grow my fashion brand beyond expectations.',
      avatar: '👩'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">MallKet</span>
                <div className="text-xs text-gray-500 -mt-1">Multivendor Marketplace</div>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-green-600 transition-colors">
                Shop
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About MallKet
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Building Nigeria's most trusted marketplace where buyers discover amazing products 
              and sellers grow thriving businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/become-seller"
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start Selling
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  MallKet was born from a simple observation: while e-commerce was growing in Nigeria, 
                  small and medium businesses were being left behind. Large marketplaces had high barriers 
                  to entry, and individual online stores struggled with visibility and logistics.
                </p>
                <p>
                  In 2022, we set out to change this. Our mission was to create a platform that truly 
                  serves both buyers and sellers - where businesses of any size could thrive, and 
                  customers could discover unique products with confidence.
                </p>
                <p>
                  Today, MallKet stands as Nigeria's fastest-growing multivendor marketplace, 
                  connecting thousands of sellers with millions of buyers. But our journey is just 
                  beginning.
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg mb-2 flex items-center justify-center mx-auto">
                      <span className="text-green-600 font-bold">P{item}</span>
                    </div>
                    <div className="text-sm font-semibold">Product {item}</div>
                    <div className="text-green-600 font-bold">₦99,999</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To democratize e-commerce in Africa by providing a platform where every business, 
                regardless of size, can access the tools, audience, and support needed to succeed 
                in the digital economy.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become Africa's most trusted marketplace, known for innovation, reliability, 
                and our unwavering commitment to the success of our sellers and satisfaction of our buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at MallKet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind MallKet's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-green-700 text-xs font-medium">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in MallKet's growth story
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-200 h-full hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/2 lg:px-8 mb-4 lg:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="text-green-600 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-4 lg:flex lg:justify-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 lg:px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-green-100 text-xl">
              Real stories from buyers and sellers on MallKet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-green-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-green-100 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the MallKet Community
          </h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to shop the best products or start your selling journey, 
            MallKet is here to support you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/become-seller"
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <span className="text-xl font-bold">MallKet</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nigeria's trusted multivendor marketplace connecting buyers and sellers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-green-400">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-green-400">Careers</Link></li>
                <li><Link href="/press" className="hover:text-green-400">Press</Link></li>
                <li><Link href="/blog" className="hover:text-green-400">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-green-400">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-green-400">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-green-400">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-green-400">Returns</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-green-400">Terms of Service</Link></li>
                <li><Link href="/seller-agreement" className="hover:text-green-400">Seller Agreement</Link></li>
                <li><Link href="/cookies" className="hover:text-green-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MallKet. All rights reserved. Building the future of ecommerce in Nigeria.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}