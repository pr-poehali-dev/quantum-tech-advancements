import { Mail, Send } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const SEND_CONTACT_URL = "https://functions.poehali.dev/3d5a4103-5fbd-4a6f-8ce8-a19c0b2e1cd5"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setSubmitSuccess(false), 6000)
      } else {
        setSubmitError("Что-то пошло не так. Попробуйте ещё раз.")
      }
    } catch {
      setSubmitError("Ошибка сети. Проверьте подключение.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                Нужна
                <br />
                стабильная
                <br />
                платформа?
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">/ Проведу аудит или составлю план быстрого запуска</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:btn77@bk.ru"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="Mail" size={12} className="text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Email</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  btn77@bk.ru
                </p>
              </a>

              <a
                href="https://t.me/TaBogacheva"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="Send" size={12} className="text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Telegram</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  @TaBogacheva
                </p>
              </a>

              <div
                className={`flex gap-4 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <a
                  href="https://t.me/TaBogacheva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                >
                  Telegram
                </a>
                <a
                  href="mailto:btn77@bk.ru"
                  className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col justify-center">
            {submitSuccess ? (
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <p className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">Заявка отправлена!</p>
                <p className="font-mono text-sm text-foreground/60">Я отвечу вам в течение часа.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                    placeholder="Ваше имя"
                  />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Сообщение</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                    placeholder="Расскажите о вашей школе: платформа, задача, сроки..."
                  />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "650ms" }}
                >
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </MagneticButton>
                  {submitError && (
                    <p className="mt-3 text-center font-mono text-sm text-red-400">{submitError}</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
