import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { BusinessRounds } from "@/components/business-rounds"
import { Networking } from "@/components/networking"
import { Testimonials } from "@/components/testimonials"
import { Benefits } from "@/components/benefits"
import { Tickets } from "@/components/tickets"
import { Sponsorship } from "@/components/sponsorship"
import { Faq } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <About />
      <BusinessRounds />
      <Networking />
      {/* <Testimonials /> */}
      <Benefits />
      <Tickets />
      <Sponsorship />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}
