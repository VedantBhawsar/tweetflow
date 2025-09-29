
import React from 'react';

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Rating: React.FC<{ score: number }> = ({ score }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < score} />)}
  </div>
);

interface Testimonial {
  avatar: string;
  name: string;
  text: string;
  rating: number;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    avatar: "https://picsum.photos/100/100?random=1",
    name: "David Gilroy",
    text: "Nowadays, it isn't great uncommon to see lenders rapidly adopting our solutions. The platform is intuitive and has saved us countless hours.",
    rating: 5,
    featured: true,
  },
  {
    avatar: "https://picsum.photos/100/100?random=2",
    name: "Kyle Stowable",
    text: "This is a game-changer for our social media strategy. The analytics are deep, and scheduling is a breeze. Highly recommended!",
    rating: 5,
  },
  {
    avatar: "https://picsum.photos/100/100?random=3",
    name: "Alla Holland",
    text: "As a content creator, I can't imagine my workflow without this tool. It lets me focus on creating, not just posting.",
    rating: 5,
  },
];


const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Testimonials</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          See what our customers are saying about their experience with our platform.
        </p>
      </div>
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-8 rounded-2xl ${testimonial.featured ? 'bg-violet-50' : 'bg-white'} border border-gray-100 shadow-lg`}>
              <div className="flex items-center mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                   <Rating score={testimonial.rating} />
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="h-2 w-24 bg-gray-200 rounded-full flex">
            <div className="h-full w-1/3 bg-violet-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
