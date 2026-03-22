import Image from 'next/image';

const platforms = [
  {
    name: 'Uber Eats',
    logo: '/misc/uber-eats.svg',
    logoWidth: 160,
    logoHeight: 27,
    url: 'https://www.ubereats.com/au/store/gourmet-falafel-rundle-mall/vTZ-NAi8V2meSPyayeQqiw',
    accent: '#06C167',
    hoverText: 'group-hover:text-[#06C167]',
    stripe: 'bg-[#06C167]',
  },
  {
    name: 'DoorDash',
    logo: '/misc/doordash.svg',
    logoWidth: 160,
    logoHeight: 19,
    url: 'https://www.doordash.com/en-AU/store/gourmet-falafel-adelaide-40090159/93588146/',
    accent: '#FF3008',
    hoverText: 'group-hover:text-[#FF3008]',
    stripe: 'bg-[#FF3008]',
  },
];

export default function DeliveryPlatforms() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Also Available At</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Order Online</h2>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto text-sm">
            Skip the queue and get your falafel delivered straight to you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch max-w-lg mx-auto">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-full h-1.5 ${p.stripe}`} />
              <div className="flex flex-col items-center gap-4 px-8 py-7">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.logoWidth}
                  height={p.logoHeight}
                />
                <span className={`text-sm font-medium text-gray-400 transition-colors duration-200 ${p.hoverText}`}>
                  Order now →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
