"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const contraindications = [
  {
    id: 1,
    title: "RECENT SCARS",
    image: "/images/cicatrices-inflammees.png",
    description:
      "Recent or inflamed scars present fragile and unstable skin. The microblading process could worsen inflammation, delay healing, and create infectious complications.",
    category: "Healing",
  },
  {
    id: 2,
    title: "HEAVY MEDICATIONS",
    image: "/images/traitements-medicaux.png",
    description:
      "Treatments such as chemotherapy, anticoagulants, corticosteroids, and Roaccutane affect the skin's healing capacity and can cause excessive bleeding or unpredictable reactions.",
    category: "Medications",
  },
  {
    id: 3,
    title: "DERMATOLOGICAL CONDITIONS",
    image: "/images/deficits-immunitaires.png",
    description:
      "Conditions like eczema, psoriasis, or dermatitis create a compromised skin barrier. Microblading can trigger inflammatory flare-ups and compromise pigment retention.",
    category: "Dermatology",
  },
  {
    id: 4,
    title: "EYE DISORDERS",
    image: "/images/troubles-oculaires.png",
    description:
      "Eye infections or inflammation in the eyebrow area can spread during microblading. The proximity to the eyes requires perfectly healthy skin to avoid complications.",
    category: "Ophthalmology",
  },
  {
    id: 5,
    title: "DIABETES & HEART DISEASE",
    image: "/images/diabete-cardiaque.png",
    description:
      "Diabetes significantly slows healing and increases infection risks. Heart disease can be aggravated by treatment stress and hemorrhagic risks.",
    category: "Chronic conditions",
  },
  {
    id: 6,
    title: "COMPONENT ALLERGIES",
    image: "/images/allergies-composants.png",
    description:
      "Allergies to iodine, nickel, latex, or other pigment components can cause severe reactions, significant swelling, and permanent scarring in the treated area.",
    category: "Allergies",
  },
  {
    id: 7,
    title: "IMMUNE DEFICIENCIES",
    image: "/images/maladies-dermatologiques.png",
    description:
      "A weakened immune system (HIV, transplants, immunosuppressive treatments) cannot effectively fight infections and seriously compromises the healing process.",
    category: "Immunology",
  },
  {
    id: 8,
    title: "PREGNANCY & NURSING",
    image: "/images/grossesse-allaitement.webp",
    description:
      "During pregnancy and nursing, hormonal changes affect healing and pigment retention. Infection risks can also affect the baby's health.",
    category: "Maternity",
  },
]

function ContraindicationsGrid() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowHints(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasInteracted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setVisibleCards((prev) => new Set([...prev, cardId]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const cards = gridRef.current?.querySelectorAll("[data-card-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const handleCardHover = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHints(false)
    }
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {contraindications.map((item, index) => (
        <div
          key={item.id}
          data-card-id={item.id}
          className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden border-2 border-red-100 hover:border-red-300 hover:scale-105 transform ${
            visibleCards.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 80}ms`,
          }}
          onMouseEnter={handleCardHover}
        >
          {showHints && !hasInteracted && (
            <div className="absolute top-3 left-3 z-10 opacity-50 transition-opacity duration-200 group-hover:opacity-0">
              <Image src="/images/cursor-icon.png" alt="Hover hint" width={20} height={20} className="drop-shadow-md" />
            </div>
          )}

          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 transition-transform duration-200 group-hover:scale-110">
            ATTENTION
          </div>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-50 to-red-100">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-contain transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all duration-300 ease-out" />
          </div>

          <div className="p-6">
            <div className="mb-2">
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full transition-colors duration-200 group-hover:bg-red-200">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-200">
              {item.title}
            </h3>
          </div>

          <div className="absolute inset-0 bg-red-600/95 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-center transform translate-y-2 group-hover:translate-y-0">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Why is this a contraindication?</h4>
              </div>
              <p className="text-sm leading-relaxed text-white/90">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: "#E6D9FF" }}>
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Contraindications for Microblading
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Microblading is not recommended in the following cases.
          </p>
        </header>

        {/* Contraindications Grid */}
        <ContraindicationsGrid />

        {/* Warning footer */}
        <div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 mx-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Professional Responsibility</h3>
              <p className="text-red-700">
                As a professional, it is your responsibility to identify these contraindications during the preliminary
                consultation. A complete medical questionnaire and visual evaluation are essential for your clients&apos;
                safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
