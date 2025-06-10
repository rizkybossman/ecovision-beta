import React from 'react';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formId = '1FAIpQLSdi9lPzx-fBM45czTQCohR6pRuOmfm64CvhYJTvz6i1WEEa_w';
    const fieldIds = {
      name: 'entry.959803784',
      email: 'entry.1540262878',
      subject: 'entry.1773444618',
      message: 'entry.570310905'
    };

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          [fieldIds.name]: formData.get('name'),
          [fieldIds.email]: formData.get('email'),
          [fieldIds.subject]: formData.get('subject'),
          [fieldIds.message]: formData.get('message')
        })
      });

      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      const googleFormsUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse?usp=pp_url&` +
        `${fieldIds.name}=${encodeURIComponent(formData.get('name'))}&` +
        `${fieldIds.email}=${encodeURIComponent(formData.get('email'))}&` +
        `${fieldIds.subject}=${encodeURIComponent(formData.get('subject'))}&` +
        `${fieldIds.message}=${encodeURIComponent(formData.get('message'))}`;

      window.open(googleFormsUrl, '_blank');
      alert('Thank you! Please click "Submit" on the opened page to confirm.');
      e.target.reset();
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-700 to-green-600 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows="5" 
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70"
                placeholder="Your detailed message..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-white text-emerald-800 hover:bg-emerald-100 font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
