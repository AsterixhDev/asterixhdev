import AboutSection from "@/components/Sections/Home/About";
import ContactForm from "@/components/Sections/Home/ContactForm";
import Main from "@/components/Sections/Home/Main";
import Projects from "@/components/Sections/Home/Projects";
import Services from "@/components/Sections/Home/Services";
import Illustration1 from "@/components/shapes/illustration1";

export default function Home() {
  return (
    <>
      <Main />
      <AboutSection />
      <Services />
      <Projects />
      <div id="contact" className="w-full py-10 px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="w-full flex sm:flex-row flex-col-reverse sm:items-center gap-4">
          <ContactForm />
          <div className="size-full flex items-center justify-center flex-col gap-2">
            <span className="w-full flex items-center justify-center drop-shadow-2xl shadow-primary">
              <Illustration1
                svg={{
                  className: "max-w-[80vw] size-[20rem] sm:size-[10rem] md:size-[20rem]",
                }}
                colors={{
                  "2": "var(--color-primary)",
                }}
              />
            </span>
            <div className="w-full flex flex-col gap-2 items-center">
              <h4 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-primary to-primary-foreground text-transparent">
                Let&apos;s Build Your Future
              </h4>
              <p className="text-muted-foreground">
                Hire Me to Bring Your Vision to Life
              </p>
            </div>
            <nav className="mt-2" aria-label="Social Links">
            <ul className="socialLinks">
              <li>
                <a href="https://www.github.com/CodeWithAsterixh">
                  <i className="pi pi-github"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/AsterixhThanks?t=URfI8qwSIK1SbDijca99BA&s=09">
                  <i className="pi pi-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/code_with_asterixh">
                  <i className="pi pi-instagram"></i>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/paul-peter-eyinnaya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                  <i className="pi pi-linkedin"></i>
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
      </div>
    </>
  );
}
