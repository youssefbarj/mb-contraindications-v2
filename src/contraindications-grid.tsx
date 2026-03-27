"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const contraindications = [
  {
    id: 1,
    title: "CICATRICES RÉCENTES",
    image: "/images/cicatrices-inflammees.png",
    description:
      "Les cicatrices récentes ou inflammées présentent une peau fragile et instable. Le processus de microblading pourrait aggraver l'inflammation, retarder la cicatrisation et créer des complications infectieuses.",
    category: "Cicatrisation",
  },
  {
    id: 2,
    title: "TRAITEMENTS LOURDS",
    image: "/images/traitements-medicaux.png",
    description:
      "Les traitements comme la chimiothérapie, anticoagulants, corticoïdes et Roaccutane affectent la capacité de cicatrisation de la peau et peuvent provoquer des saignements excessifs ou des réactions imprévisibles.",
    category: "Médications",
  },
  {
    id: 3,
    title: "MALADIES DERMATOLOGIQUES",
    image: "/images/deficits-immunitaires.png",
    description:
      "Les conditions comme l'eczéma, le psoriasis ou la dermatite créent une barrière cutanée compromise. Le microblading peut déclencher des poussées inflammatoires et compromettre la rétention du pigment.",
    category: "Dermatologie",
  },
  {
    id: 4,
    title: "TROUBLES OCULAIRES",
    image: "/images/troubles-oculaires.png",
    description:
      "Les infections oculaires ou inflammations dans la zone des sourcils peuvent se propager lors du microblading. La proximité avec les yeux nécessite une peau parfaitement saine pour éviter les complications.",
    category: "Ophtalmologie",
  },
  {
    id: 5,
    title: "DIABÈTE & MALADIES CARDIAQUES",
    image: "/images/diabete-cardiaque.png",
    description:
      "Le diabète ralentit considérablement la cicatrisation et augmente les risques d'infection. Les maladies cardiaques peuvent être aggravées par le stress du traitement et les risques hémorragiques.",
    category: "Pathologies chroniques",
  },
  {
    id: 6,
    title: "ALLERGIES AUX COMPOSANTS",
    image: "/images/allergies-composants.png",
    description:
      "Les allergies à l'iode, nickel, latex ou autres composants des pigments peuvent provoquer des réactions graves, des gonflements importants et des cicatrices permanentes dans la zone traitée.",
    category: "Allergies",
  },
  {
    id: 7,
    title: "DÉFICITS IMMUNITAIRES",
    image: "/images/maladies-dermatologiques.png",
    description:
      "Un système immunitaire affaibli (VIH, greffes, traitements immunosuppresseurs) ne peut pas lutter efficacement contre les infections et compromet gravement le processus de cicatrisation.",
    category: "Immunologie",
  },
  {
    id: 8,
    title: "GROSSESSE & ALLAITEMENT",
    image: "/images/grossesse-allaitement.webp",
    description:
      "Pendant la grossesse et l'allaitement, les changements hormonaux affectent la cicatrisation et la rétention des pigments. Les risques d'infection peuvent également affecter la santé du bébé.",
    category: "Maternité",
  },
]

export default function ContraindicationsGrid() {
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
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 ease-out" />
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

          <div className="absolute inset-0 bg-red-600 bg-opacity-95 text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-center transform translate-y-2 group-hover:translate-y-0">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Pourquoi cette contre-indication ?</h4>
              </div>
              <p className="text-sm leading-relaxed text-white text-opacity-90">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
