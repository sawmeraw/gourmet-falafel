export default function Location() {
  return (
    <section id="location" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Find Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
            <address className="not-italic text-gray-600 mb-6">
              <p>123 Coffee Street</p>
              <p>Cafe District</p>
              <p>City, State 12345</p>
            </address>
            
            <h3 className="text-2xl font-semibold mb-4">Opening Hours</h3>
            <div className="text-gray-600 mb-6">
              <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
              <p>Saturday: 8:00 AM - 9:00 PM</p>
              <p>Sunday: 8:00 AM - 5:00 PM</p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <div className="text-gray-600">
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@ourcafe.com</p>
            </div>
          </div>
          
          <div className="h-80 bg-gray-200 rounded-lg">
            {/* Replace with actual map or embed Google Maps here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map goes here (Google Maps embed)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}