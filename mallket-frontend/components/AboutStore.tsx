'use client';

export default function MallKetAboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MallKet — Nigeria's Trusted Platform for Smart Shopping
          </h1>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="mb-6">
            Welcome to MallKet, Nigeria's leading online shopping destination where convenience meets trust. 
            From electronics and mobile phones to home appliances, groceries, fashion, and lifestyle essentials, 
            MallKet offers millions of Nigerians a smarter way to shop, save, and enjoy fast nationwide delivery.
          </p>

          <p className="mb-6">
            Our mission is simple: to make shopping easier, faster, and more rewarding. Whether you're restocking 
            your kitchen, upgrading your gadgets, or exploring fashion trends, MallKet guarantees genuine products, 
            unbeatable prices, and reliable after-sales support.
          </p>

          <p className="mb-6">
            Powered by MallKetPay, our secure payment solution, shoppers enjoy seamless checkout, instant cashback, 
            and discounts on bill payments, airtime, data, electricity, and cable TV subscriptions. We also bring you 
            seasonal campaigns like MallKet Yakata (Black Friday), Freedom Sale, and Back-to-School Promos, giving you 
            the chance to save big on trusted brands like Samsung, Apple, Tecno, Xiaomi, LG, HP, Infinix, Oraimo, 
            Haier Thermocool, Sony, Philips, and many more.
          </p>

          <p className="mb-6">
            At MallKet, we don't just sell — we deliver smiles, speed, and satisfaction to every doorstep. With 
            MallKetNow same-day delivery and nationwide logistics coverage, your orders are safe, fast, and always 
            right on time.
          </p>

          <p className="font-semibold text-gray-900">
            Enjoy exclusive in-app deals when you shop via the MallKet App. Download the app on Play Store or App Store 
            today and experience shopping made simple, secure, and smart.
          </p>
        </div>

        {/* App Download CTA */}
        <div className="mt-12 text-center border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Download MallKet App Today
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 transition-colors duration-300 inline-flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.924 17.315c-.057.174-.193.332-.348.367-.156.035-.34-.054-.484-.227-.144-.173-.188-.402-.131-.576.057-.174.193-.332.348-.367.156-.035.34.054.484.227.144.173.188.402.131.576zm-1.239 1.804c-.166.248-.437.405-.713.36-.276-.045-.484-.277-.593-.586-.109-.309-.109-.648.057-.896.166-.248.437-.405.713-.36.276.045.484.277.593.586.109.309.109.648-.057.896zm2.665-2.342c-.208.311-.579.508-.93.467-.351-.041-.623-.3-.767-.677-.144-.377-.144-.792.063-1.103.208-.311.579-.508.93-.467.351.041.623.3.767.677.144.377.144.792-.063 1.103zm-1.596 3.061c-.186.278-.492.438-.806.414-.314-.024-.573-.216-.732-.513-.159-.297-.191-.649-.028-.927.163-.278.469-.438.783-.414.314.024.573.216.732.513.159.297.191.649.028.927zm2.361-2.799c-.224.335-.634.548-1.027.511-.393-.037-.708-.28-.885-.656-.177-.376-.191-.806.033-1.141.224-.335.634-.548 1.027-.511.393.037.708.28.885.656.177.376.191.806-.033 1.141z"/>
              </svg>
              Download on App Store
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 transition-colors duration-300 inline-flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.748l-2.807 1.626-2.302-2.302 2.302-2.302zm-8.635-8.635L16.581 5.5 5.644 11.833 7.946 9.53l6.356-6.357z"/>
              </svg>
              Get it on Google Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}