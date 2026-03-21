const reviews = [
  {
    name: 'Sarah M.',
    text: 'Absolutely the best falafel I\'ve had in Adelaide. Fresh, crispy on the outside, perfectly spiced inside. The wrap is so generous — I can never finish it in one go but I always try!',
    stars: 5,
    source: 'Google Review',
  },
  {
    name: 'James T.',
    text: 'As someone who is both vegan and gluten-free, finding food at a market that ticks all the boxes is rare. Gourmet Falafel does it effortlessly and the staff are always so friendly.',
    stars: 5,
    source: 'Google Review',
  },
  {
    name: 'Priya K.',
    text: 'The falafel plate is something else. The hummus is homemade and you can absolutely tell. Been coming here every Saturday for months — it\'s a non-negotiable part of my market run.',
    stars: 5,
    source: 'Facebook Review',
  },
  {
    name: 'Daniel R.',
    text: 'Stopped in on a Friday evening on a whim and it was one of the best decisions I\'ve made. The mixed bowl is incredible value and the falafels were piping hot. Will be back next week.',
    stars: 5,
    source: 'Google Review',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-primary py-20 px-4">
      <div className="container mx-auto">

        <div className="text-center mb-12">
          <span className="text-[color:var(--color-primary)] text-sm font-semibold tracking-widest uppercase">What People Say</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Loved by Adelaide</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <Stars count={review.stars} />
              <p className="text-gray-600 font-secondary text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                  <p className="text-xs text-gray-400 font-secondary">{review.source}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}