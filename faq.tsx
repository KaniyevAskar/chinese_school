import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Нужна ли подготовка, чтобы начать?',
    a: 'Нет. Начальный курс рассчитан на полный ноль — мы ставим произношение и учим читать пиньинь с первого занятия. Если вы уже что-то знаете, тест уровня поможет определить подходящую группу.',
  },
  {
    q: 'Сколько времени занимает обучение до HSK?',
    a: 'В среднем до HSK 1–2 — около 3 месяцев, до HSK 3–4 — 6 месяцев при занятиях дважды в неделю и регулярной практике. Точные сроки зависят от целей и темпа, мы фиксируем их в личном плане.',
  },
  {
    q: 'Занятия проходят онлайн или офлайн?',
    a: 'Все наши занятия проходят исключительно в онлайн-формате. Это полноценные живые уроки на платформе, поэтому учиться можно из любой точки мира.',
  },
  {
    q: 'Чем вы отличаетесь от приложений и самоучителей?',
    a: 'Живой преподаватель исправляет произношение и ошибки сразу, программа адаптируется под вас, а разговорная практика с носителями убирает языковой барьер. Приложение можно бросить — группу и методиста бросить сложнее.',
  },
  {
    q: 'Есть ли курсы для детей?',
    a: 'В наши группы мы принимаем ребят с 13 лет. Программа курса разработана с учетом особенностей подростков и взрослых, поэтому для более младшего возраста формат может не подойти. Будем рады видеть вас чуть позже!',
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Частые вопросы"
            title={
              <>
                Отвечаем на то,
                <br />что важно <span className="text-cinnabar">до старта</span>
              </>
            }
            description="Не нашли ответ? Напишите нам — расскажем подробно и поможем выбрать формат."
          />

          <Reveal>
            <Accordion type="single" collapsible className="w-full border-t border-ink/12">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
