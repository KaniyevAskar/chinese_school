import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { WhyChinese } from '@/components/sections/why-chinese'
import { Programs } from '@/components/sections/programs'
import { Process } from '@/components/sections/process'
import { Teachers } from '@/components/sections/teachers'
{/*import { Results } from '@/components/sections/results'*/}
import { Testimonials } from '@/components/sections/testimonials'
import { Faq } from '@/components/sections/faq'
import { Enroll } from '@/components/sections/enroll'
import { Footer } from '@/components/sections/footer'

function App() {
  return (
    <>
      <a
        href="#programs"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
      >
        Перейти к содержанию
      </a>
      <Navbar />
      <main>
        <Hero />
        <WhyChinese />
        <Programs />
        <Process />
        <Teachers />
        {/*<Results />*/}
        <Testimonials />
        <Faq />
        <Enroll />
      </main>
      <Footer />
    </>
  )
}

export default App
