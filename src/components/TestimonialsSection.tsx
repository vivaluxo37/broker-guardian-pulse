import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dion Rozema",
    role: "Business Owner",
    content: "I just wanted to give you a big thanks! I really enjoyed your website, searching for the best broker for my wishes. The easy to understand fees table was great! Thanks again, keep up the amazing work!",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  },
  {
    name: "Željko Dejanović",
    role: "International Sales and Marketing Graduate",
    content: "Thank you guys, I can hands down say you are one of the greatest built websites I have ever used. Everything is done with so much detail and information, it helped me so much in narrowing down the broker options.",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  },
  {
    name: "Jacques Fischbach",
    role: "Trader",
    content: "Thank you for your work, it is oftentimes difficult to find information about the best online brokers and you make it very easy and clear!",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  },
  {
    name: "Richard Schuster",
    role: "Investor",
    content: "I'm astonished at the quality and the amount of information you guys put out for completely free. It's one of the amazing things about the internet. You get this very high quality output and it's completely free.",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  },
  {
    name: "Tim Fowlds",
    role: "Professional Trader",
    content: "I decided on opening an account based on your comparison and intelligent tailoring of services to requirements. I can confirm that your description and comparative opinion seems to be accurate in every respect.",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  },
  {
    name: "Hesham El-gammal",
    role: "Egypt",
    content: "BrokerGuard easily found me two brokers that are available in my country and fit my exact needs to invest in the international market, it was an enjoyable experience.",
    rating: 5,
    image: "/lovable-uploads/18d09656-4d10-44cf-87c0-34dc7f0d2f45.png"
  }
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Real feedback from traders and investors who found their perfect broker match through BrokerGuard
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="group hover:shadow-elegant transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-sm border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-accent" />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 text-accent fill-current" 
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-foreground/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-primary p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">9+</div>
            <p className="text-foreground/70">Years of Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">992K</div>
            <p className="text-foreground/70">Successful Matches</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">600+</div>
            <p className="text-foreground/70">Data Points Analyzed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <p className="text-foreground/70">Trusted Brokers</p>
          </div>
        </div>
      </div>
    </section>
  );
}