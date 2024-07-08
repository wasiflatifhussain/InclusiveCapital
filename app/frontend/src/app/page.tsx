// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Posts from "./posts";
import Articles from "./articles";
import TermsAndConditions from "./terms-and-conditions";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <div id="terms-and-conditions" className="scroll-margin-top">
        <TermsAndConditions />
      </div>
      <Posts />
      <Articles />
      <Footer />
    </>
  );
}

