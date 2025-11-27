import { useState } from 'react'
import { useLang } from '../App'
import { STRINGS } from '../i18n/strings'
import { MagnifyingGlassIcon, TicketIcon, CurrencyDollarIcon, PhoneIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function HelpCenter() {
  const { lang } = useLang()
  const t = STRINGS[lang]
  const [view, setView] = useState<'main' | 'buying'>('main')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: t.faq1Q, a: "Go to the Map page or select a route to see upcoming arrival times." },
    { q: t.faq2Q, a: "Yes, our kiosks accept both cash and credit/debit cards." },
    { q: t.faq3Q, a: "Tap the globe icon in the bottom right corner to switch languages." },
  ]

  if (view === 'buying') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView('main')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{t.buyingATicket}</h2>
        </div>

        <div className="space-y-6 px-2 overflow-y-auto pb-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-gray-900">{t.selectTicketType}</h3>
            <p className="text-gray-600 leading-relaxed">{t.selectTicketTypeDesc}</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-lg text-gray-900">{t.enterDestinationStep}</h3>
            <p className="text-gray-600 leading-relaxed">{t.enterDestinationDesc}</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-lg text-gray-900">{t.selectQuantity}</h3>
            <p className="text-gray-600 leading-relaxed">{t.selectQuantityDesc}</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-lg text-gray-900">{t.confirmAndPay}</h3>
            <p className="text-gray-600 leading-relaxed">{t.confirmAndPayDesc}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{t.howCanWeHelp}</h2>

      {/* Search Bar */}
      <div className="relative mb-8">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
          placeholder={t.searchPlaceholder}
        />
      </div>

      {/* Help Options Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setView('buying')}
          className="flex flex-col items-center justify-center p-4 bg-white border border-orange-200 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-3 h-32"
        >
          <TicketIcon className="w-10 h-10 text-orange-500" />
          <span className="font-bold text-center text-gray-800 leading-tight">{t.buyingATicket}</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4 bg-white border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-3 h-32">
          <CurrencyDollarIcon className="w-10 h-10 text-blue-500" />
          <span className="font-bold text-center text-gray-800 leading-tight">{t.paymentHelp}</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4 bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-3 h-32">
          <PhoneIcon className="w-10 h-10 text-green-500" />
          <span className="font-bold text-center text-gray-800 leading-tight">{t.contactSupport}</span>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <h3 className="font-bold text-lg mb-4 text-gray-900">{t.faq}</h3>
        <div className="space-y-3 overflow-y-auto pr-2 pb-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
              <button
                className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-gray-800">{f.q}</span>
                {openFaq === i ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2">
                  <div className="pt-2">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}