import { Button } from "@/components/ui/button";
import { Shield, Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-secondary border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                BROKERANALYSIS
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Your trusted partner in finding the perfect online broker. We analyze 600+ data points 
              per broker and test them with real money to ensure you make the best choice.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#brokers" className="text-foreground/70 hover:text-primary transition-colors">Best Brokers</a></li>
              <li><a href="#reviews" className="text-foreground/70 hover:text-primary transition-colors">Broker Reviews</a></li>
              <li><a href="#tools" className="text-foreground/70 hover:text-primary transition-colors">Trading Tools</a></li>
              <li><a href="#match" className="text-foreground/70 hover:text-primary transition-colors">Broker Matching</a></li>
              <li><a href="#beginners" className="text-foreground/70 hover:text-primary transition-colors">For Beginners</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Trading Education</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Market Analysis</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Scam Warnings</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-foreground/70">
                <Mail className="h-4 w-4" />
                <span>support@brokeranalysis.com</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <Phone className="h-4 w-4" />
                <span>+63 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <MapPin className="h-4 w-4" />
                <span>Manila, Philippines</span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-accent mb-2">600+</div>
              <p className="text-sm text-foreground/60">Data Points Analyzed</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">9+</div>
              <p className="text-sm text-foreground/60">Years of Experience</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-2">992K</div>
              <p className="text-sm text-foreground/60">Successful Matches</p>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-border pt-8">
          {/* Disclaimers */}
          <div className="space-y-4 text-xs text-foreground/60 mb-6">
            <p>
              <strong>Risk Disclaimer:</strong> Please note that by investing in and/or trading financial instruments, 
              commodities and any other assets, you are taking a high degree of risk and you can lose all your deposited money. 
              You should engage in any such activity only if you are fully aware of the relevant risks. BrokerAnalysis does not 
              provide investment or any other advice.
            </p>
            <p>
              <strong>Advertiser Disclosure:</strong> At BrokerAnalysis, we consider clarity and transparency as core values. 
              BrokerAnalysis is free to use for everyone, but earns a commission from some of its partners with no additional cost to you.
              All material and information is based on our proprietary professional methodology, which is unbiased and independent 
              from our remuneration structure.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs text-foreground/60">
              © {currentYear} BrokerAnalysis Ltd. All rights reserved. Company Reg#: PH123456789
            </div>
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Cookie Policy</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}