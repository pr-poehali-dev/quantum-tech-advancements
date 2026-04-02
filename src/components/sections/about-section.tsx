import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  const utps = [
    {
      title: "Быстро и без лишних усилий с вашей стороны",
      text: "Внедряю решение «под ключ» — от настройки тренингов до интеграции анкет и приёма платежей. Вам не нужно тратить время на обучение или исправление ошибок.",
    },
    {
      title: "Точность и предсказуемость",
      text: "Никаких нарушений дедлайнов. Работаю по чётким ТЗ и предоставляю своевременные отчёты о проделанной работе.",
    },
    {
      title: "Тот самый «человек в теме»",
      text: "Понимаю задачи с полуслова. Вам не придётся тратить часы на объяснение элементарных вещей — я сама предложу технические новшества, если это усилит продукт.",
    },
  ]

  const reviews = [
    {
      text: "Татьяна эффективна в деловой коммуникации, обладает хорошими исполнительскими качествами и ответственностью перед обязательствами",
      author: "Галина Савиных",
      company: "Всероссийская Школа Методистов",
    },
    {
      text: "Работает быстро и качественно, предлагает новшества, которые мы с радостью внедрили. Человек полностью «в теме» — не требуется дополнительных объяснений",
      author: "Майя",
      company: "Проект по запуску онлайн-курсов",
    },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center overflow-y-auto px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl py-8">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Почему выбирают меня
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ УТП через боли клиента</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left — УТП */}
          <div className="space-y-5">
            {utps.map((item, i) => (
              <div
                key={i}
                className={`border-l border-foreground/20 pl-4 transition-all duration-700 md:pl-6 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                <p className="mb-1 font-sans text-sm font-medium text-foreground md:text-base">{item.title}</p>
                <p className="text-xs leading-relaxed text-foreground/70 md:text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Right — Отзывы */}
          <div className="space-y-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <p className="mb-3 font-mono text-xs leading-relaxed text-foreground/60 md:text-sm">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px w-4 bg-foreground/30" />
                  <div>
                    <p className="font-sans text-xs font-medium text-foreground">{review.author}</p>
                    <p className="font-mono text-xs text-foreground/50">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-10 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
            Оставить заявку
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Мои кейсы
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
