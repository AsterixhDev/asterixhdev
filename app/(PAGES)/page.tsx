import AboutSection from "@/components/Sections/Home/About";
import ContactMePage from "@/components/Sections/Home/Contact";
import Main from "@/components/Sections/Home/Main";
import Projects from "@/components/Sections/Home/Projects";
import Services from "@/components/Sections/Home/Services";


export default function Home() {
 
  return (
    <>
      
      <Main/>
      <AboutSection />
      <Services/>
      <Projects/>
      <ContactMePage/>
    </>
  );
}
