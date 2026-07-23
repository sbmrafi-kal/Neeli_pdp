import React, { useState } from 'react';
import { IngredientsCarousel } from './IngredientsCarousel';
import { IngredientDetailModal } from './IngredientDetailModal';
import { IngredientItem } from './IngredientCard';

export const DEFAULT_INGREDIENTS: IngredientItem[] = [
  {
    id: 'neeli',
    name: 'Neeli',
    scientificName: 'Indigofera tinctoria',
    description: 'A natural hair darkener & conditioner, hair darkening with time. Strengthening and hair-growing, protects hair moisture and scalp.',
    videoSrc: '/assets/production/Neeli.mp4',
    imageSrc: '/assets/production/ingredients.webp',
    fullDetails: {
      role: 'Signature Scalp-Care & Hair Darkening Herb',
      benefits: [
        'Minimises premature greying by supporting natural hair pigmentation',
        'Cools the scalp and calms inflammation',
        'Forms a protective moisture barrier around the hair shaft',
        'Reduces environmental damage and brittle split-ends'
      ],
      sourcing: "Sourced directly from Kerala's wetlands",
      ayurvedicProperties: 'Rasa: Tikta, Katu | Virya: Ushna | Vipaka: Katu',
      keyCompounds: 'Indican, Indigo blue, Flavonoids, Polyphenols'
    }
  },
  {
    id: 'bhringraj',
    name: 'False Daisy',
    scientificName: 'Eclipta alba / Bhringraj',
    description: 'The legendary "King of Hair" traditionally used to stimulate root follicles, reduce hair fall, and support natural dark shine.',
    videoSrc: '/assets/production/Bringraj.mp4',
    imageSrc: '/assets/production/ingredients-mobile.webp',
    fullDetails: {
      role: 'Follicle Reinvigorator & Anagen Stimulator',
      benefits: [
        'Reactivates dormant hair roots to extend the anagen growth phase',
        'Reduces excessive daily hair fall and root thinning',
        'Enriches hair melanin for deep, lustrous dark color',
        'Improves scalp blood circulation for thicker strand density'
      ],
      sourcing: 'Hand-picked from the Western Ghats mountain range',
      ayurvedicProperties: 'Rasa: Katu, Tikta | Virya: Ushna | Vipaka: Katu',
      keyCompounds: 'Ecliptine, Wedelolactone, Demethylwedelolactone, Coumestans'
    }
  },
  {
    id: 'amla',
    name: 'Dhatri',
    scientificName: 'Phyllanthus emblica / Amla',
    description: 'Supercharged with Vitamin C and potent antioxidants to fortify root strength, prevent breakage, and add radiant shine.',
    videoSrc: '/assets/production/Amla.mp4',
    imageSrc: '/assets/production/official-product.webp',
    fullDetails: {
      role: 'Scalp Antioxidant & Strand Fortifier',
      benefits: [
        'Supplies concentrated Vitamin C directly to scalp follicles',
        'Strengthens hair protein matrix to combat breakage',
        'Neutralizes free radical damage caused by UV rays and pollution',
        'Imparts natural gloss and smoothness to dull hair'
      ],
      sourcing: 'Wild-harvested from the pristine forests of Chhattisgarh',
      ayurvedicProperties: 'Rasa: Amla, Tikta, Kashaya | Virya: Sita | Vipaka: Madhura',
      keyCompounds: 'Ascorbic Acid (Vitamin C), Gallic Acid, Ellagic Acid, Tannins'
    }
  },
  {
    id: 'kera',
    name: 'Kera',
    scientificName: 'Cocos nucifera / Coconut Oil',
    description: 'Unrefined cold-pressed coconut oil base rich in lauric acid, enabling deep lipid penetration into the hair cortex.',
    videoSrc: '/assets/production/Coconu_Oil.mp4',
    imageSrc: '/assets/production/oil-texture.webp',
    fullDetails: {
      role: 'Nourishing Lipid Base & Bio-Carrier',
      benefits: [
        'Penetrates deep into hair cortex to prevent protein loss',
        'Protects hair against hygral fatigue and cuticle swelling',
        'Locks in essential herbal phyto-nutrients during paaka vidhi',
        'Keeps scalp hydrated, supple, and flake-free'
      ],
      sourcing: 'Sourced from organic, sun-dried coastal Kerala coconuts',
      ayurvedicProperties: 'Rasa: Madhura | Virya: Sita | Vipaka: Madhura',
      keyCompounds: 'Lauric Acid, Myristic Acid, Caprylic Acid, Vitamin E'
    }
  },
  {
    id: 'madhu',
    name: 'Madhu & Milks',
    scientificName: 'Mel / Natural Honey & Triple Milk',
    description: 'Natural humectant combined with Cow, Goat & Coconut milks to deliver intense moisture and repair damaged cuticles.',
    videoSrc: '/assets/production/Honey.mp4',
    imageSrc: '/assets/production/triple-milk.webp',
    fullDetails: {
      role: 'Humectant & Cuticle Smoothing Platform',
      benefits: [
        'Attracts and retains atmospheric moisture inside hair shafts',
        'Softens coarse, frizzy strands for smooth hair texture',
        'Nourishes dry scalp with essential bio-lipids & proteins',
        'Soothes itchiness and dry scalp irritation'
      ],
      sourcing: 'Pure raw forest honey & fresh triple-milk extraction base',
      ayurvedicProperties: 'Rasa: Madhura, Kashaya | Virya: Sita | Vipaka: Madhura',
      keyCompounds: 'Enzymes, Amino Acids, Fructose, Milk Lipids (Lactic Acid)'
    }
  }
];

export interface PotentIngredientsSectionProps {
  title?: string;
  eyebrow?: string;
  ingredients?: IngredientItem[];
  className?: string;
}

export const PotentIngredientsSection: React.FC<PotentIngredientsSectionProps> = ({
  title = 'Our Potent Ingredients',
  eyebrow = '',
  ingredients = DEFAULT_INGREDIENTS,
  className = '',
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientItem | null>(null);

  return (
    <section
      id="ingredients"
      className={`potent-ingredients-section w-full relative py-12 sm:py-16 !pb-8 sm:!pb-8 bg-[#5F6C3D] text-[#FAF8F5] overflow-hidden ${className}`}
    >
      {/* Background Decorative Soft Blur Spheres */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-900/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container relative z-10">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-0 sm:mb-0 space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FAF8F5] leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-stone-200/90 max-w-2xl mx-auto font-light leading-relaxed mt-3">
              Hand-harvested botanicals and lipid carriers slow-cooked using classical Thaila Paaka Vidhi for targeted scalp and hair restoration.
            </p>
          </div>

          {/* Carousel Component */}
          <IngredientsCarousel
            ingredients={ingredients}
            onOpenDetails={(item) => setSelectedIngredient(item)}
          />
        </div>
      </div>

      {/* Ingredient Detail Modal */}
      <IngredientDetailModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      />
    </section>
  );
};
