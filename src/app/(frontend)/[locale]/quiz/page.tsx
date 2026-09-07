'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { submitQuizLead } from '@/app/(frontend)/[locale]/actions'

type ResultType = 'A' | 'B' | 'C'

// Scoring: each answer adds points to A, B, C
const QUESTIONS = [
  { key: 'q1', answers: [{ key: 'q1a1', scores: { A: 1, B: 1, C: 0 } }, { key: 'q1a2', scores: { A: 0, B: 0, C: 1 } }, { key: 'q1a3', scores: { A: 0, B: 0, C: 1 } }, { key: 'q1a4', scores: { A: 1, B: 1, C: 0 } }] },
  { key: 'q2', answers: [{ key: 'q2a1', scores: { A: 2, B: 0, C: 0 } }, { key: 'q2a2', scores: { A: 0, B: 2, C: 0 } }, { key: 'q2a3', scores: { A: 0, B: 0, C: 2 } }, { key: 'q2a4', scores: { A: 0, B: 0, C: 1 } }] },
  { key: 'q3', answers: [{ key: 'q3a1', scores: { A: 0, B: 0, C: 2 } }, { key: 'q3a2', scores: { A: 1, B: 1, C: 0 } }, { key: 'q3a3', scores: { A: 1, B: 1, C: 0 } }] },
  { key: 'q4', answers: [{ key: 'q4a1', scores: { A: 2, B: 0, C: 0 } }, { key: 'q4a2', scores: { A: 0, B: 2, C: 0 } }, { key: 'q4a3', scores: { A: 0, B: 0, C: 2 } }, { key: 'q4a4', scores: { A: 0, B: 0, C: 1 } }] },
  { key: 'q5', answers: [{ key: 'q5a1', scores: { A: 1, B: 1, C: 0 } }, { key: 'q5a2', scores: { A: 0, B: 0, C: 1 } }, { key: 'q5a3', scores: { A: 0, B: 0, C: 2 } }] },
  { key: 'q6', answers: [{ key: 'q6a1', scores: { A: 1, B: 1, C: 0 } }, { key: 'q6a2', scores: { A: 0, B: 0, C: 2 } }, { key: 'q6a3', scores: { A: 0, B: 0, C: 1 } }] },
]

const MEALS = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'] as const
const DAYS = ['d1', 'd2', 'd3'] as const

export default function QuizPage() {
  const t = useTranslations('quiz')
  const locale = useLocale()

  // Quiz only available in English for now
  if (locale === 'ru') {
    return (
      <section className="py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-2xl text-center">
          <p className="text-[#4b4b4b] text-[15px] mb-4">Этот тест пока доступен только на английском языке.</p>
          <a href="/en/quiz" className="text-primary hover:underline">Take the quiz in English →</a>
        </div>
      </section>
    )
  }

  const [step, setStep] = useState(0) // 0-5: questions, 6: result, 7: email, 8: download
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<ResultType>('A')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[step] = answerIndex
    setAnswers(newAnswers)
  }

  const calculateResult = (): ResultType => {
    const scores = { A: 0, B: 0, C: 0 }
    answers.forEach((ansIdx, qIdx) => {
      if (ansIdx !== undefined && QUESTIONS[qIdx]?.answers[ansIdx]) {
        const s = QUESTIONS[qIdx].answers[ansIdx].scores
        scores.A += s.A
        scores.B += s.B
        scores.C += s.C
      }
    })
    if (scores.A >= scores.B && scores.A >= scores.C) return 'A'
    if (scores.B >= scores.A && scores.B >= scores.C) return 'B'
    return 'C'
  }

  const goNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else if (step === 5) {
      const r = calculateResult()
      setResult(r)
      setStep(6) // show result
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const form = new FormData(e.currentTarget)
    await submitQuizLead({
      name: form.get('name') as string,
      email: form.get('email') as string,
      resultType: result,
      newsletterConsent: form.get('newsletter') === 'on',
      locale,
    })
    setStatus('done')
    setStep(8)
    // Trigger PDF download
    const link = document.createElement('a')
    link.href = pdfFiles[result]
    link.download = ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const planPrefix = result === 'A' ? 'planA' : result === 'B' ? 'planB' : 'planC'
  const pdfFiles: Record<ResultType, string> = {
    A: '/pdfs/Dairy-Free-Gut-Reset.pdf',
    B: '/pdfs/Low-FODMAP-Gut-Reset.pdf',
    C: '/pdfs/Gut-Calming-Habits-Reset.pdf',
  }

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
        <a href={`/${locale}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> {t('backHome')}
        </a>

        {/* Progress bar */}
        {step <= 5 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#9f9f9f] mb-2">
              <span>{t('questionOf', { current: step + 1, total: 6 })}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((step + 1) / 6) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Questions */}
        {step <= 5 && (
          <div>
            {step === 0 && (
              <div className="text-center mb-8">
                <h1 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-3">{t('title')}</h1>
                <p className="text-[#4b4b4b] text-[15px]">{t('subtitle')}</p>
              </div>
            )}

            <h2 className="font-[family-name:var(--font-heading)] text-[22px] md:text-[26px] font-medium text-foreground mb-6">
              {t(QUESTIONS[step].key)}
            </h2>

            <div className="space-y-3">
              {QUESTIONS[step].answers.map((ans, i) => (
                <button
                  key={ans.key}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all text-[15px] ${
                    answers[step] === i
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border hover:border-primary/50 text-[#4b4b4b]'
                  }`}
                >
                  {t(ans.key)}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>{t('prevBtn')}</Button>
              ) : <div />}
              <Button
                onClick={goNext}
                disabled={answers[step] === undefined}
                className="bg-primary hover:bg-primary/90"
              >
                {step === 5 ? t('seeResults') : t('nextBtn')}
              </Button>
            </div>
          </div>
        )}

        {/* Result */}
        {step === 6 && (
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] md:text-[26px] font-medium text-[#9f9f9f] mb-2">{t('resultTitle')}</h2>
            <h1 className="font-[family-name:var(--font-heading)] text-[30px] md:text-[38px] font-semibold text-primary mb-4">
              {t(`type${result}`)}
            </h1>
            <p className="text-[15px] text-[#4b4b4b] leading-relaxed mb-8 max-w-lg mx-auto">
              {t(`type${result}Desc`)}
            </p>
            <Button onClick={() => setStep(7)} className="bg-primary hover:bg-primary/90 px-8 py-5 text-base">
              {t('getYourPlan')}
            </Button>
          </div>
        )}

        {/* Email capture */}
        {step === 7 && (
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] md:text-[30px] font-medium text-foreground mb-2 text-center">
              {t('getYourPlan')}
            </h2>
            <p className="text-center text-[#4b4b4b] text-[15px] mb-6">{t('getYourPlanDesc')}</p>

            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-[#4b4b4b]">{t('resultTitle')}</p>
              <p className="font-semibold text-primary text-lg">{t(`type${result}`)} — {t(`${planPrefix}Title`)}</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="newsletter" name="newsletter" className="mt-1" />
                <Label htmlFor="newsletter" className="text-sm text-[#4b4b4b] font-normal leading-relaxed">
                  {t('newsletterConsent')}
                </Label>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-base py-5" disabled={status === 'loading'}>
                {status === 'loading' ? t('downloading') : t('download')}
              </Button>
            </form>
          </div>
        )}

        {/* Success / Download */}
        {step === 8 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📩</div>
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[34px] font-medium text-foreground mb-3">
              {t('successTitle')}
            </h2>
            <p className="text-[#4b4b4b] text-[15px] mb-2 max-w-md mx-auto">
              {t('successDesc')}
            </p>
            <p className="text-[#9f9f9f] text-sm mb-8 max-w-md mx-auto">
              {t('checkEmail')}
            </p>

            {/* Next-step Discovery Call card */}
            <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl p-6 max-w-md mx-auto mb-6 text-left">
              <h3 className="font-[family-name:var(--font-heading)] text-[20px] md:text-[22px] font-semibold text-foreground mb-2 text-center">
                {t('nextStepHeading')}
              </h3>
              <p className="text-[14px] text-[#4b4b4b] mb-4 text-center leading-relaxed">
                {t('nextStepDesc')}
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-base py-5">
                <a href={`/${locale}#contacts`}>{t('bookDiscoveryCall')}</a>
              </Button>
            </div>

            <Button asChild variant="ghost" className="text-[#9f9f9f] hover:text-foreground text-sm">
              <a href={pdfFiles[result]} download>
                ↓ {t('downloadAgain')}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
