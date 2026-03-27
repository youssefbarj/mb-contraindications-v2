"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Scissors,
  Pill,
  Layers,
  Eye,
  HeartPulse,
  FlaskConical,
  ShieldOff,
  Baby,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";

const contraindications = [
  {
    title: "Recent Scars",
    description:
      "Recent scars present fragile and unstable skin. The healing process is not complete, increasing risks of infection and poor pigment retention.",
    icon: Scissors,
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-500",
    accentColor: "bg-rose-100",
  },
  {
    title: "Heavy Medications",
    description:
      "Treatments such as chemotherapy, anticoagulants, corticosteroids, and Roaccutane affect the skin\u2019s healing capacity and can cause excessive bleeding.",
    icon: Pill,
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    accentColor: "bg-amber-100",
  },
  {
    title: "Dermatological Conditions",
    description:
      "Active skin conditions like eczema, psoriasis, or severe acne in the eyebrow area can worsen with microblading.",
    icon: Layers,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500",
    accentColor: "bg-orange-100",
  },
  {
    title: "Eye Disorders",
    description:
      "Conditions like conjunctivitis or recent eye surgery require full healing before any brow procedure.",
    icon: Eye,
    color: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-500",
    accentColor: "bg-sky-100",
  },
  {
    title: "Diabetes & Heart Disease",
    description:
      "These conditions slow healing and increase infection risk. Medical clearance is required.",
    icon: HeartPulse,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    accentColor: "bg-red-100",
  },
  {
    title: "Component Allergies",
    description:
      "Allergies to pigments, anesthetics, or metals used in the procedure can cause severe reactions.",
    icon: FlaskConical,
    color: "bg-violet-50 border-violet-200",
    iconColor: "text-violet-500",
    accentColor: "bg-violet-100",
  },
  {
    title: "Immune Deficiencies",
    description:
      "A weakened immune system cannot properly heal micro-incisions, leading to complications.",
    icon: ShieldOff,
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-500",
    accentColor: "bg-teal-100",
  },
  {
    title: "Pregnancy & Nursing",
    description:
      "During pregnancy and nursing, hormonal changes affect healing and pigment retention.",
    icon: Baby,
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-400",
    accentColor: "bg-pink-100",
  },
];

function ContraindicationCard({
  item,
}: {
  item: (typeof contraindications)[number];
}) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <Card
      className={`border ${item.color} shadow-sm hover:shadow-md transition-shadow duration-200 ring-0`}
    >
      <CardHeader className="flex flex-row items-center gap-3 pb-0">
        <div className={`rounded-lg p-2.5 ${item.accentColor}`}>
          <Icon className={`h-5 w-5 ${item.iconColor}`} strokeWidth={2} />
        </div>
        <CardTitle className="text-base font-semibold text-gray-800">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors mt-1 mb-1">
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
            Why is this a contraindication?
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden">
            <p className="text-sm text-gray-600 leading-relaxed pt-2 pl-3 border-l-2 border-gray-200 ml-1.5">
              {item.description}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <ShieldAlert className="h-3.5 w-3.5" />
            Professional Reference
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Contraindications for Microblading
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            As a professional, you must identify these medical contraindications
            before any microblading procedure.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {contraindications.map((item) => (
            <ContraindicationCard key={item.title} item={item} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 border-t border-gray-200 pt-8">
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Professional Responsibility
            </h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              As a practitioner, you must screen every client through a medical
              questionnaire and visual evaluation before treatment to ensure your
              clients&apos; safety.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
