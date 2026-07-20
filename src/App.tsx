import { useCallback, useEffect, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { getMotionExperiment, isMotionEligible, observeWebVitals, track, trackOnce, type MotionExperiment } from './analytics';
import { RecoveryComparison } from './v2/RecoveryComparison';
import { ConsultationCTA } from './v2/ConsultationCTA';
import ScienceRecoveryStory from './v2/ScienceRecoveryStory';
import PdpSectionNavV3 from './v3/PdpSectionNavV3';
import ComparisonV3 from './v3/ComparisonV3';
import ScienceStoryV3 from './v3/ScienceStoryV3';

const Arrow = ({left=false}:{left?:boolean}) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={left?'M15 5l-7 7 7 7':'M9 5l7 7-7 7'}/></svg>;
const Search = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4 4"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>;

// Phase 4: Product gallery sequence in exact user-requested order
const slides = [
  {
    src: '/assets/production/official-product.webp',
    mobileSrc: '/assets/production/official-product.webp',
    alt: 'Clean Neelibhringadi Keram bottle hero',
    label: 'Neelibhringadi Keram 200 ml',
    eyebrow: 'Authentic Ayurveda',
    shortLabel: 'Bottle',
    frameClass: 'frame-product-bottle'
  },
  {
    src: '/assets/production/oil-texture.webp',
    mobileSrc: '/assets/production/oil-texture-mobile.webp',
    alt: 'Deep violet-brown herbal oil flowing from a spoon',
    label: 'The medicated oil texture',
    eyebrow: 'Oil texture',
    shortLabel: 'Texture',
    frameClass: 'frame-texture'
  },
  {
    src: '/assets/production/ritual.webp',
    mobileSrc: '/assets/production/ritual-mobile.webp',
    alt: 'Gentle fingertip scalp massage with oil',
    label: 'Fingertip scalp massage',
    eyebrow: 'Ritual use',
    shortLabel: 'Massage',
    frameClass: 'frame-ritual'
  },
  {
    src: '/assets/production/ingredients.webp',
    mobileSrc: '/assets/production/ingredients-mobile.webp',
    alt: 'Amla, Neeli, Bhringaraj and coconut used in the formula',
    label: 'Active botanical components',
    eyebrow: 'Key herbs',
    shortLabel: 'Herbs',
    frameClass: 'frame-ingredients'
  },
  {
    src: '/assets/production/triple-milk.webp',
    mobileSrc: '/assets/production/triple-milk-mobile.webp',
    alt: 'Cow milk, goat milk and coconut milk in three bowls',
    label: 'Triple-milk brewing platform',
    eyebrow: 'Milk base',
    shortLabel: 'Milks',
    frameClass: 'frame-milks'
  },
  {
    src: '/assets/production/product-presence-poster.webp',
    mobileSrc: '/assets/production/product-presence-poster.webp',
    alt: 'Shadow movement video on bottle',
    label: 'Earthy lighting shadows',
    eyebrow: 'Product motion',
    shortLabel: 'Video',
    frameClass: 'frame-product'
  },
  {
    src: '/assets/gallery/neeli-back.webp',
    mobileSrc: '/assets/gallery/neeli-back.webp',
    alt: 'Product label showing formulation facts',
    label: 'Complete pack labelling details',
    eyebrow: 'Packaging',
    shortLabel: 'Label',
    frameClass: 'frame-label'
  }
];

const navItems = [['product','Overview'],['results','Results'],['formula','Formula'],['comparison','Compare'],['ritual','How to use'],['reviews','Reviews']];

const resultStages = [
  ['01','First application','Scalp cools immediately','Scalp feels instantly cool and soothed, while hair feels softer, smoother, deeply nourished, and easier to manage.'],
  ['02','Week 5–8','Less in the shower','Hair feels stronger and healthier. Visible reduction in dandruff and hair breakage, with noticeably less hair seen on the pillow, comb, or in the shower.'],
  ['03','Month 3+','Visible change','Hair looks fuller, thicker, and more voluminous, with better length and strength from root to tip.'],
];

function useMediaQuery(query:string){
  const [matches,setMatches]=useState(()=>typeof window!=='undefined'&&window.matchMedia(query).matches);
  useEffect(()=>{const media=window.matchMedia(query);const update=()=>setMatches(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[query]);
  return matches;
}

function ResponsiveImage({src,mobileSrc,alt,className,width=1600,height=2000,priority=false}:{src:string;mobileSrc:string;alt:string;className?:string;width?:number;height?:number;priority?:boolean}){
  return <picture className={className ? `${className}-picture` : undefined}><source media="(max-width: 699px)" srcSet={mobileSrc}/><img className={className} src={src} alt={alt} width={width} height={height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'}/></picture>
}

function StoryImage({src,mobileSrc,alt,priority=false}:{src:string;mobileSrc:string;alt:string;priority?:boolean}){
  const mobileViewport=useMediaQuery('(max-width: 699px)');
  return <img className="story-image" src={mobileViewport?mobileSrc:src} alt={alt} width={936} height={1248} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'}/>;
}

type PurchaseActionProps = {
  cart:number;
  buyState:'ready'|'adding'|'added';
  onAdd:()=>void;
  onDecrease:()=>void;
  onIncrease:()=>void;
  onViewCart:()=>void;
  className?:string;
  price?:number;
};

function PurchaseAction({cart,buyState,onAdd,onDecrease,onIncrease,onViewCart,className='',price=338}:PurchaseActionProps){
  if(cart>0)return <div className={`quantity purchase-action ${className}`}><button aria-label="Decrease quantity" onClick={onDecrease}>−</button><span aria-label={`${cart} in cart`}>{cart}</span><button aria-label="Increase quantity" onClick={onIncrease}>+</button><button className="viewbag" onClick={onViewCart}>View Bag <span className="viewbag-total">· ₹{price*cart}</span></button></div>;
  return <button className={`add ${buyState} ${className}`} disabled={buyState!=='ready'} onClick={onAdd}>{buyState==='ready'?'ADD TO BAG':buyState==='adding'?'Adding…':<><Check/> Added to Bag</>}</button>;
}

// Phase 2: Announcement Bar
function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Promo announcement">
      <span>FREE SHIPPING ON ORDERS OVER ₹499 • 100% AUTHENTIC AYURVEDIC FORMULAS</span>
    </div>
  );
}

// Phase 3: Breadcrumb Navigation
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb path">
      <a href="#product">Home</a>
      <span className="separator">/</span>
      <a href="#product">Scalp &amp; Hair Care</a>
      <span className="separator">/</span>
      <span className="current">Neelibhringadi Keram</span>
    </nav>
  );
}

// Phase 5: Minimal Trust Proof Strip
function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Product verification metrics">
      <div className="proof-strip__inner">
        <div className="proof-item">
          <strong>1945</strong>
          <span>Established Heritage</span>
        </div>
        <div className="proof-divider" />
        <div className="proof-item">
          <strong>100%</strong>
          <span>Ayurvedic Actives</span>
        </div>
        <div className="proof-divider" />
        <div className="proof-item">
          <strong>40K+</strong>
          <span>Bought This Year</span>
        </div>
        <div className="proof-divider" />
        <div className="proof-item">
          <strong>4.8★</strong>
          <span>Rating (137 Reviews)</span>
        </div>
      </div>
    </section>
  );
}

// Phase 6: Quick Benefit / Ritual Guide Strip
function RitualGuideStrip() {
  return (
    <section className="ritual-guide-strip" aria-label="Quick ritual guide">
      <div className="ritual-guide-inner">
        <div className="guide-item">
          <span className="guide-icon">🕒</span>
          <div className="guide-text">
            <h4>WHEN TO APPLY</h4>
            <p>Massage into dry scalp before washing.</p>
          </div>
        </div>
        <div className="guide-item">
          <span className="guide-icon">⌛</span>
          <div className="guide-text">
            <h4>DURATION</h4>
            <p>Leave on for 30 to 60 minutes.</p>
          </div>
        </div>
        <div className="guide-item">
          <span className="guide-icon">📅</span>
          <div className="guide-text">
            <h4>FREQUENCY</h4>
            <p>Apply 2× weekly for consistent results.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Phase 8: Refined Split Purity Panels
function IngredientsPuritySplit() {
  return (
    <section className="purity-split-section" id="purity-split">
      <div className="purity-split-header">
        <span className="purity-eyebrow">FORMULATION PURITY &amp; SOURCING</span>
        <h2>What’s in it. What is not.</h2>
        <p className="statement-location">Herbs sourced from their natural habitats. Neeli from Kerala’s wetlands, Bhringraj from the Western Ghats, Amla from Chhattisgarh.</p>
      </div>
      <div className="purity-split-grid">
        <div className="purity-panel positive-panel">
          <h3>WHAT’S IN IT</h3>
          <ul className="purity-list positive-list">
            <li>
              <span className="purity-icon">🍃</span>
              <div>
                <strong>21 Ayurvedic botanicals</strong>
                <p>Authentic herbs slow-brewed on low heat for 48 hours to extract full potency.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon">🌿</span>
              <div>
                <strong>Bhringraj &amp; Neeli</strong>
                <p>Bhringraj supports growth-phase follicles; Neeli maintains natural color depth.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon">🍒</span>
              <div>
                <strong>Fresh Amla fruit extract</strong>
                <p>A natural source of antioxidant Vitamin C to soothe and defend the scalp environment.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon">🥛</span>
              <div>
                <strong>Three nourishing milks</strong>
                <p>Coconut milk, Cow's milk, and Goat's milk form the lipid platform to condition hair shafts.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="purity-panel negative-panel">
          <h3>WHAT’S NOT IN IT</h3>
          <ul className="purity-list negative-list">
            <li>
              <span className="purity-icon close-icon">✕</span>
              <div>
                <strong>No mineral oil or liquid paraffin</strong>
                <p>Pure cold-pressed coconut oil base only. Never diluted with cheap petroleum derivatives.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon close-icon">✕</span>
              <div>
                <strong>No artificial fragrances or perfumes</strong>
                <p>The natural earthy aroma comes purely from authentic herbs and milk brewing.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon close-icon">✕</span>
              <div>
                <strong>No silicones or dimethicone</strong>
                <p>Shaft smoothing is achieved through natural plant lipids rather than synthetic sealants.</p>
              </div>
            </li>
            <li>
              <span className="purity-icon close-icon">✕</span>
              <div>
                <strong>No parabens, phthalates or synthetic dyes</strong>
                <p>Stable self-preserving formula with clean storage shelf life.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Phase 9: Kerala Ayurveda Difference Accordions
function KeralaAyurvedaDifference() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const diffItems = [
    {
      title: "80-Year Ayurvedic Lineage",
      copy: "Kerala Ayurveda was established in 1945 by Vaidyan K.G.K. Panicker. Today, we manage our own organic herbal farms, wellness clinics, research centers, and academy to guarantee complete authenticity."
    },
    {
      title: "Traditional Thaila Paaka Vidhi Preparation",
      copy: "Not a simple ingredient mixture. We slow-heat the botanical decoction (Kashaya) and paste (Kalka) in raw coconut oil for 48 hours. This allows water content to fully evaporate while trapping fat-soluble herbal actives."
    },
    {
      title: "Sourced from Natural Habitats",
      copy: "Herbs are sourced where they grow best: Neeli from Kerala's wetlands, Bhringraj from the Western Ghats, and Amla from Chhattisgarh. This ensures high concentrations of active phyto-compounds."
    },
    {
      title: "Global Standards & Patents",
      copy: "Our formulas are trusted worldwide, backed by GMP certification and patented research formulations in the United States, Japan, and Korea."
    }
  ];

  return (
    <section className="difference-section" id="difference">
      <div className="difference-grid">
        <div className="difference-visual">
          <img src="/assets/production/slow-cooking.webp" alt="Herbs boiling on low fire in oil" className="diff-image" />
          <div className="diff-visual-overlay">
            <strong>Authentic Thaila Paaka Vidhi</strong>
            <span>48-hour traditional cooking process</span>
          </div>
        </div>
        <div className="difference-content">
          <span className="diff-eyebrow">OUR HERITAGE</span>
          <h2>The Kerala Ayurveda Difference</h2>
          <p className="diff-lede">Why this traditional formula is difficult to replicate with modern assembly lines.</p>
          <div className="diff-accordion">
            {diffItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <article key={idx} className={`diff-acc-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="diff-acc-header"
                  >
                    <span>0{idx + 1}</span>
                    <h3>{item.title}</h3>
                    <span className="diff-acc-chevron">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="diff-acc-body">
                      <p>{item.copy}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Phase 10: Testimonials Carousel
function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reviews = [
    {
      quote: "My hair felt softer after washing, and the oil was easier to remove than I expected.",
      author: "Ananya R.",
      variant: "200 ml",
      duration: "Used for 6 weeks",
      rating: "★★★★★"
    },
    {
      quote: "This oil exceeded my expectation. I used it 2/3 times a week for a month, my hair fall has reduced drastically.",
      author: "Lipika S.",
      variant: "200 ml",
      duration: "Used for 4 weeks",
      rating: "★★★★★"
    },
    {
      quote: "Scalp feels soothed immediately after application. A natural, fresh botanical scent that washes out clean.",
      author: "Rahul M.",
      variant: "100 ml",
      duration: "Used for 8 weeks",
      rating: "★★★★★"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  return (
    <section
      className="testimonials-section"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Customer Testimonials"
    >
      <div className="testimonials-inner">
        <div className="testimonials-stars" aria-hidden="true">{reviews[currentSlide].rating}</div>
        <blockquote>
          <p>“{reviews[currentSlide].quote}”</p>
        </blockquote>
        <div className="testimonials-author">
          <strong>{reviews[currentSlide].author}</strong>
          <span>Verified Buyer • {reviews[currentSlide].variant} • {reviews[currentSlide].duration}</span>
        </div>
        <div className="testimonials-controls">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length)}
          >
            ←
          </button>
          <span aria-hidden="true">{currentSlide + 1} / {reviews.length}</span>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % reviews.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

// Phase 11: Key Ingredients Explorer
function KeyIngredientsGrid() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const ingredientData = [
    {
      name: "Bhringraj",
      botanical: "Eclipta alba",
      role: "Follicle Growth Anchor",
      summary: "Preclinical studies show Bhringraj stimulates follicle activity and supports the growth (anagen) phase.",
      details: "Part used: Whole plant. In classical texts, Bhringraj is celebrated for cooling the head and calming scalp irritation.",
      img: "/assets/production/ingredients.webp"
    },
    {
      name: "Neeli",
      botanical: "Indigofera tinctoria",
      role: "Natural Melanocyte Support",
      summary: "A signature scalp herb traditionally used to maintain natural dark hair pigmentation and soothe irritation.",
      details: "Part used: Leaves. Natural phyto-compounds in Neeli coat the hair fibers, reducing shaft porosity and splitting.",
      img: "/assets/production/ingredients.webp"
    },
    {
      name: "Amla",
      botanical: "Phyllanthus emblica",
      role: "Scalp Antioxidant Defence",
      summary: "Packed with active Vitamin C and polyphenols to calm scalp heat, dryness, and protect roots.",
      details: "Part used: Fruit. Offers potent antioxidant potential to fight environmental scalp stress and dandruff triggers.",
      img: "/assets/production/ingredients.webp"
    },
    {
      name: "Coconut Oil",
      botanical: "Cocos nucifera",
      role: "Lauric Shaft Penetration",
      summary: "Unlike mineral oils, coconut oil penetrates inside the hair shaft to reduce protein loss.",
      details: "Medium: Pure cold-pressed unrefined base. Lauric acid has a high binding affinity for hair keratin protein.",
      img: "/assets/production/ingredients.webp"
    }
  ];

  return (
    <section className="key-ingredients-section" id="ingredients-index">
      <div className="key-ingredients-header">
        <span className="ingredients-eyebrow">BOTANICAL INDEX</span>
        <h2>Four Primary Active Botanicals</h2>
        <p>Each herb is sourced from its natural habitat, fresh-pressed, and slow-brewed to keep plant molecules active.</p>
      </div>
      <div className="ingredients-grid">
        {ingredientData.map((item, idx) => (
          <article key={idx} className="ingredient-card">
            <div className="ingredient-card-image-box">
              <img src={item.img} alt={item.name} className="ingredient-card-image" />
            </div>
            <div className="ingredient-card-content">
              <span className="ingredient-card-botanical">{item.botanical}</span>
              <h3>{item.name}</h3>
              <span className="ingredient-card-role">{item.role}</span>
              <p>{item.summary}</p>
              <button
                type="button"
                className="ingredient-expand-btn"
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              >
                {expandedIdx === idx ? "Read less" : "Read Ayurvedic role →"}
              </button>
              {expandedIdx === idx && (
                <div className="ingredient-card-expanded">
                  <p>{item.details}</p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Phase 12: Three Milks Section
function ThreeMilksSection() {
  return (
    <section className="three-milks-section" id="milks-base">
      <div className="three-milks-grid">
        <div className="three-milks-content">
          <span className="milks-eyebrow">FORMULATION BASE</span>
          <h2>Three Nourishing Milks</h2>
          <p className="milks-lede">Why we brew Coconut, Cow, and Goat milks into a hair oil.</p>
          <div className="milks-stories">
            <article className="milk-story">
              <strong>COCONUT MILK (Nalikerakshira)</strong>
              <p>Provides rich vegetable lipids that smooth and coat the cuticles to minimize structural protein loss.</p>
            </article>
            <article className="milk-story">
              <strong>COW'S MILK (Dhenukshira)</strong>
              <p>Traditionally used as a cooling medium to calm scalp heat, leaving roots nourished.</p>
            </article>
            <article className="milk-story">
              <strong>GOAT'S MILK (Ajakshira)</strong>
              <p>Incorporated for gentle scalp nourishment, keeping dry skin hydrated and comfortable.</p>
            </article>
          </div>
          <div className="milk-honest-note">
            <strong>⚠️ Will the milks spoil or go rancid?</strong>
            <p>No. During our 48-hour slow-heat brewing, the water in the milks completely evaporates. Only the rich fat-soluble lipid essence and proteins bind with the oil base, creating a self-preserving, stable formula with no raw milk residue.</p>
          </div>
        </div>
        <div className="three-milks-sidebar">
          <img src="/assets/production/triple-milk.webp" alt="Cow, goat and coconut milk bowls" className="milks-image" />
          <div className="safety-patch-card">
            <h4>Safety &amp; Patch Testing</h4>
            <p>Neelibhringadi Keram is a 100% natural, external-use Ayurvedic formula. To ensure compatibility:</p>
            <ol>
              <li>Apply 2-3 drops of oil behind your ear or inside your elbow.</li>
              <li>Leave it for 20-30 minutes.</li>
              <li>If you notice any redness, burning, or irritation, wash immediately and stop use.</li>
            </ol>
            <small>Avoid contact with eyes. Keep out of reach of children. Store below 25°C in a dry place.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

// Phase 13: Easy Massage Ritual
function EasyMassageRitual() {
  return (
    <section className="massage-ritual-section" id="massage-steps">
      <div className="massage-grid">
        <div className="massage-visual">
          <img src="/assets/production/ritual.webp" alt="Scalp massage application" className="massage-image" />
          <div className="massage-visual-overlay">
            <strong>The Self-Care Ritual</strong>
            <span>Take 10 minutes for your scalp wellness</span>
          </div>
        </div>
        <div className="massage-content">
          <span className="massage-eyebrow">HOW TO USE</span>
          <h2>The Four-Step Ayurvedic Ritual</h2>
          <p className="massage-lede">Consistency is more important than vigorous rubbing. Perform this pre-wash ritual 2× weekly.</p>
          <ol className="massage-list">
            <li>
              <div className="massage-step-num">01</div>
              <div className="massage-step-text">
                <h3>Warm the Oil</h3>
                <p>If solidified below 24°C, gently warm the bottle in a bowl of warm water. Warm oil penetrates cuticles far better than cold oil.</p>
              </div>
            </li>
            <li>
              <div className="massage-step-num">02</div>
              <div className="massage-step-text">
                <h3>Section &amp; Apply</h3>
                <p>Pour 5–10 ml of oil. Part your hair and apply directly to dry scalp roots. Focus on zones experiencing thinning or dryness.</p>
              </div>
            </li>
            <li>
              <div className="massage-step-num">03</div>
              <div className="massage-step-text">
                <h3>Fingertip Massage</h3>
                <p>Use clean fingertips (not nails) to massage in gentle circular motions for 5 minutes. This stimulates blood flow to follicles.</p>
              </div>
            </li>
            <li>
              <div className="massage-step-num">04</div>
              <div className="massage-step-text">
                <h3>Rest &amp; Wash out</h3>
                <p>Leave on for 30 minutes to 1 hour to allow absorption. Rinse out thoroughly using a mild, sulfate-free shampoo.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

// Phase 14: Opt-in Cross Sell Companion
interface CrossSellProps {
  active: boolean;
  onToggle: () => void;
}

function CrossSellItem({ active, onToggle }: CrossSellProps) {
  return (
    <div className={`cross-sell-box ${active ? 'active' : ''}`}>
      <img src="/assets/production/official-product.webp" alt="Organic Hair Wash Powder" className="cross-sell-img" width="50" height="50" />
      <div className="cross-sell-info">
        <span className="cross-sell-tag">RECOMMENDED COMPANION</span>
        <h4>Organic Hair Cleansing Powder</h4>
        <p>A mild herbal wash that cleanses scalp oil without stripping hydration.</p>
        <div className="cross-sell-price">
          <strong>₹249</strong>
          <del>₹299</del>
        </div>
      </div>
      <label className="cross-sell-checkbox-label">
        <input type="checkbox" checked={active} onChange={onToggle} />
        <span>Add</span>
      </label>
    </div>
  );
}

// Phase 15: Go Deeper Accordions
function GoDeeperAccordions() {
  const [openSection, setOpenSection] = useState<string | null>("how-to-use");
  
  const sections = [
    {
      id: "how-to-use",
      title: "How to use",
      content: (
        <p>Apply 5–10 ml of Neelibhringadi Keram to your dry scalp. Massage gently with your fingertips in a circular motion for 5 minutes. Leave on for 30 to 60 minutes, then wash off with a mild, herbal shampoo. Use 2× weekly for best results.</p>
      )
    },
    {
      id: "full-ingredients",
      title: "Full ingredient list",
      content: (
        <div>
          <p><strong>Oil base:</strong> Coconut oil (Cocos nucifera).</p>
          <p><strong>Primary ingredients:</strong> Amla (Emblica officinalis), Bhringaraj (Eclipta alba), Neeli (Indigofera tinctoria), Karnasphota (Cardiospermum halicacabum).</p>
          <p><strong>Triple-milk base:</strong> Cow milk (Dhenukshira), Goat milk (Ajakshira), and Coconut milk (Nalikerakshira).</p>
          <p><strong>Supporting herbs:</strong> Yashtimadhu (Glycyrrhiza glabra), Dhatriphala (Phyllanthus emblica), Gunjamoola (Abrus precatorius), and Anjana.</p>
        </div>
      )
    },
    {
      id: "who-it-is-for",
      title: "Who it is for",
      content: (
        <p>Neelibhringadi Keram is formulated for adults experiencing hair fall, dry scalp, or premature greying. It is safe for colored and chemically treated hair. For children or during pregnancy, consult your healthcare physician before starting a routine.</p>
      )
    },
    {
      id: "safety-patch-testing",
      title: "Safety and patch testing",
      content: (
        <p>For external use only. Perform a patch test by applying a small amount to the inner arm or behind the ear for 20 minutes. If redness or irritation occurs, discontinue use immediately. Avoid contact with eyes.</p>
      )
    },
    {
      id: "storage-instructions",
      title: "Storage instructions",
      content: (
        <p>Store below 25°C in a dry place, away from direct sunlight. Because it uses a pure coconut oil base, the formula may solidify below 24°C. This is natural and does not affect the oil's quality. Warm gently before use.</p>
      )
    },
    {
      id: "product-details",
      title: "Product details",
      content: (
        <ul className="details-accordion-list">
          <li><strong>Net quantity:</strong> 200 ml / 100 ml</li>
          <li><strong>Manufactured by:</strong> Kerala Ayurveda Limited, Athani, Kerala, India</li>
          <li><strong>Shelf life:</strong> 3 years from manufacturing date</li>
          <li><strong>Country of origin:</strong> India</li>
        </ul>
      )
    },
    {
      id: "shipping-returns",
      title: "Shipping and returns",
      content: (
        <p>Free standard shipping on orders above ₹499. Flat shipping fee of ₹40 for smaller orders. We dispatch within 24 hours. Returns are accepted within 7 days of delivery for damaged or unopened items.</p>
      )
    },
    {
      id: "faqs",
      title: "Frequently asked questions",
      content: (
        <div className="faq-acc-list">
          <div>
            <strong>Will it make my hair greasy?</strong>
            <p>This is a pre-wash oil designed to be rinsed off, so it does not leave hair greasy after shampooing.</p>
          </div>
          <div>
            <strong>Can I leave it on overnight?</strong>
            <p>Ayurveda recommends leaving hair oils on for 30–60 minutes. Overnight application is not necessary and may cause excess scalp moisture in cool weather.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="go-deeper-section" id="product-details-accordions">
      <div className="go-deeper-header">
        <span className="go-deeper-eyebrow">PRODUCT KNOWLEDGE</span>
        <h2>Deep Dive &amp; Cautions</h2>
        <p>Explore the complete details, safety instructions, and classic directions for the oil.</p>
      </div>
      <div className="go-deeper-accordion">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <article key={section.id} id={section.id} className={`go-deeper-acc-item ${isOpen ? 'open' : ''}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`go-deeper-panel-${section.id}`}
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                >
                  <span>{section.title}</span>
                  <span className="chevron">{isOpen ? '−' : '+'}</span>
                </button>
              </h3>
              <div
                id={`go-deeper-panel-${section.id}`}
                className="go-deeper-panel"
                role="region"
                aria-label={section.title}
                hidden={!isOpen}
              >
                <div className="go-deeper-panel-content">
                  {section.content}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Phase 18: Related Products Grid
function RelatedProducts() {
  const related = [
    {
      id: "ksheerabala",
      name: "Ksheerabala Thailam",
      desc: "Ayurvedic massage oil for relaxing scalp, head, and body tension.",
      price: 260,
      img: "/assets/production/official-product.webp"
    },
    {
      id: "hairwash",
      name: "Organic Hair Wash Powder",
      desc: "Gentle powder cleanser to wash away oil without stripping hair lipids.",
      price: 249,
      img: "/assets/production/official-product.webp"
    }
  ];

  return (
    <section className="related-products-section" id="related-items">
      <div className="related-header">
        <span className="related-eyebrow">COMPLETE YOUR RITUAL</span>
        <h2>Related Products</h2>
      </div>
      <div className="related-grid">
        {related.map((prod) => (
          <article key={prod.id} className="related-card">
            <img src={prod.img} alt={prod.name} className="related-card-img" />
            <div className="related-card-content">
              <h3>{prod.name}</h3>
              <p>{prod.desc}</p>
              <div className="related-card-footer">
                <strong>₹{prod.price}</strong>
                <button type="button" className="quick-add-btn">
                  Quick Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Phase 17: Customer Reviews Dashboard
interface ReviewItem {
  name: string;
  date: string;
  rating: string;
  verified: boolean;
  size: string;
  duration: string;
  title: string;
  body: string;
  tags: string[];
}

function ReviewsSection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Helpful");
  const [showForm, setShowForm] = useState(false);

  const filters = [
    { label: "All", count: 137 },
    { label: "Hair fall", count: 64 },
    { label: "Dry scalp", count: 28 },
    { label: "Softness", count: 32 },
    { label: "Fragrance", count: 19 },
    { label: "Easy to wash", count: 22 },
    { label: "Repeat buyers", count: 41 }
  ];

  const reviewList: ReviewItem[] = [
    {
      name: "Ananya R.",
      date: "July 12, 2026",
      rating: "★★★★★",
      verified: true,
      size: "200 ml",
      duration: "Used for 6 weeks",
      title: "Reduced hair fall significantly!",
      body: "After 4 weeks of consistent twice-weekly use, I notice substantially less hair in my shower drain. It smells organic and earthy, and washes out easily with a mild herbal shampoo.",
      tags: ["Hair fall", "Easy to wash", "Softness"]
    },
    {
      name: "Rahul M.",
      date: "July 02, 2026",
      rating: "★★★★★",
      verified: true,
      size: "100 ml",
      duration: "Used for 8 weeks",
      title: "No more dry scalp",
      body: "My scalp irritation calmed down from the very first application. The cooling effect is really pleasant. Excellent natural option compared to chemical hair serums.",
      tags: ["Dry scalp", "Fragrance"]
    },
    {
      name: "Lipika S.",
      date: "June 25, 2026",
      rating: "★★★★★",
      verified: true,
      size: "200 ml",
      duration: "Used for 4 weeks",
      title: "Softer, healthier hair",
      body: "This is my second purchase. It makes my hair incredibly soft and manageable after washing. Highly recommend buying the 200ml best value bottle.",
      tags: ["Softness", "Repeat buyers"]
    }
  ];

  const filteredReviews = selectedFilter === "All"
    ? reviewList
    : reviewList.filter(r => r.tags.includes(selectedFilter));

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-header">
        <span className="reviews-eyebrow">CUSTOMER FEEDBACK</span>
        <h2>137 Verified Reviews</h2>
      </div>
      <div className="reviews-dashboard">
        <div className="reviews-summary-card">
          <div className="score-number">4.8</div>
          <div className="stars-rating" aria-hidden="true">★★★★★</div>
          <p className="summary-text">Based on 137 verified purchases</p>
          <button type="button" className="write-review-btn" onClick={() => setShowForm(!showForm)}>
            Write a Review
          </button>
        </div>
        <div className="ratings-chart">
          {[
            { stars: 5, pct: 84 },
            { stars: 4, pct: 11 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 }
          ].map((row) => (
            <div key={row.stars} className="chart-row">
              <span className="row-star-label">{row.stars} ★</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="row-pct-label">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={(e) => { e.preventDefault(); alert('Review submitted for approval!'); setShowForm(false); }}>
          <h3>Share your experience</h3>
          <div className="form-group">
            <label>Rating</label>
            <select required><option>5 Stars</option><option>4 Stars</option><option>3 Stars</option><option>2 Stars</option><option>1 Star</option></select>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" required placeholder="Summarize your review" />
          </div>
          <div className="form-group">
            <label>Review Body</label>
            <textarea required rows={4} placeholder="What did you like or dislike?"></textarea>
          </div>
          <button type="submit" className="submit-review-btn">Submit Review</button>
        </form>
      )}

      <div className="reviews-controls-bar">
        <div className="filter-tags">
          {filters.map((f) => (
            <button
              key={f.label}
              type="button"
              className={`filter-tag ${selectedFilter === f.label ? 'active' : ''}`}
              onClick={() => setSelectedFilter(f.label)}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <div className="sorting-select">
          <label htmlFor="reviews-sort">Sort by:</label>
          <select id="reviews-sort" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
            <option value="Helpful">Most Helpful</option>
            <option value="Recent">Most Recent</option>
            <option value="Rating">Highest Rating</option>
          </select>
        </div>
      </div>

      <div className="reviews-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev, idx) => (
            <article key={idx} className="review-item-card">
              <header className="review-item-header">
                <div>
                  <span className="review-stars-filled">{rev.rating}</span>
                  <h4>{rev.title}</h4>
                </div>
                <span className="review-date">{rev.date}</span>
              </header>
              <p className="review-body-text">{rev.body}</p>
              <footer className="review-item-footer">
                <strong>{rev.name}</strong>
                {rev.verified && <span className="verified-badge">✓ Verified Buyer</span>}
                <span className="review-variant-info">{rev.size} • {rev.duration}</span>
              </footer>
            </article>
          ))
        ) : (
          <p className="no-reviews-msg">No reviews match the selected filter.</p>
        )}
      </div>
    </section>
  );
}

// Phase 20: Verified Heritage & Credentials
function HeritageSection() {
  return (
    <section className="heritage adapted-heritage">
      <div className="heritage-title">
        <p className="kicker">KERALA AYURVEDA</p>
        <h2>Rooted in Authentic Ayurveda.</h2>
      </div>
      <div className="heritage-metrics">
        <div className="metric-box">
          <strong>1945</strong>
          <span>Established</span>
        </div>
        <div className="metric-box">
          <strong>350+</strong>
          <span>Classical Formulations</span>
        </div>
        <div className="metric-box">
          <strong>100k+</strong>
          <span>Expert Led Consultations</span>
        </div>
      </div>
      <div className="heritage-spectrum">
        <p>Full Spectrum Care</p>
        <span>GMP Certified Laboratories • Organic Herbal Plant Farms • Wellness Clinics &amp; Academy Retreats • Global Ayurvedic Research Initiatives</span>
      </div>
      <div className="heritage-patents">
        <p>Globally Recognized Quality</p>
        <h3>Patented formulations</h3>
        <span>Patented active formulations in the United States, Japan and Korea.</span>
      </div>
    </section>
  );
}

function ProductIdentity() {
  return (
    <div className="product-identity">
      <div className="hero-eyebrow">KERALA AYURVEDA · AUTHENTIC FORMULATION</div>
      <h1 className="hero-title">Neelibhringadi Keram</h1>
      <p className="hero-promise">Ayurvedic scalp &amp; hair oil to minimize hair fall and support growth.</p>
      
      <div className="hero-social-row">
        <a className="hero-rating-link" href="#reviews" aria-label="4.8 out of 5, 137 reviews">
          <span className="stars" aria-hidden="true">★★★★★</span>
          <strong>4.8</strong>
          <span className="count">(137 reviews)</span>
        </a>
        <span className="hero-volume-badge">40,000+ bought last year</span>
      </div>

      <ul className="identity-benefits-list">
        <li><span className="check">✓</span> Reduced hair fall due to breakage</li>
        <li><span className="check">✓</span> Nourished scalp &amp; root strength</li>
        <li><span className="check">✓</span> Softer, healthier-looking hair</li>
      </ul>
    </div>
  );
}

function ProductPresenceMotion(){
  const videoRef=useRef<HTMLVideoElement>(null);
  const regionRef=useRef<HTMLDivElement>(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
  const mobileViewport=useMediaQuery('(max-width: 699px)');
  const [motionState,setMotionState]=useState<'idle'|'playing'|'paused'|'ended'>('playing');
  const toggle=()=>{
    const video=videoRef.current;
    if(!video)return;
    if(!video.paused){video.pause();setMotionState('paused');return}
    if(motionState==='ended')video.currentTime=0;
    void video.play().then(()=>setMotionState('playing')).catch(()=>setMotionState('paused'));
  };
  useEffect(()=>{
    if(reducedMotion)return;
    const region=regionRef.current;
    const video=videoRef.current;
    if(!region||!video)return;
    const observer=new IntersectionObserver(([entry])=>{
      if((!entry.isIntersecting||entry.intersectionRatio<.4)&&!video.paused){
        video.pause();
        setMotionState('paused');
      }else if(entry.isIntersecting&&entry.intersectionRatio>=.4&&video.paused&&motionState==='playing'){
        void video.play().catch(()=>{});
      }
    },{threshold:[0,.4]});
    observer.observe(region);
    return()=>observer.disconnect();
  },[motionState,reducedMotion]);
  const alt='Official Neelibhringadi Keram bottle with Amla and coconut in warm natural light';
  if(reducedMotion||mobileViewport)return <img className="story-image" src="/assets/production/product-presence-poster.webp" alt={alt} width={936} height={1248} loading="eager" fetchPriority="high"/>;
  const controlLabel=motionState==='playing'?'Pause':motionState==='ended'?'Replay':'Play motion';
  const accessibleControlLabel=motionState==='playing'?'Pause product lighting motion':motionState==='ended'?'Replay product lighting motion':'Play product lighting motion';
  return <div ref={regionRef} className={`story-motion-shell presence-motion-shell ${motionState}`}>
    <video ref={videoRef} className="story-motion presence-motion" muted playsInline autoPlay preload="metadata" poster="/assets/production/product-presence-poster.webp" aria-label="Natural light and botanical shadows moving gently behind the Neelibhringadi Keram bottle" onPlay={()=>setMotionState('playing')} onPause={()=>setMotionState(current=>current==='ended'?'ended':'paused')} onEnded={()=>setMotionState('ended')} onError={()=>setMotionState('paused')}>
      <source media="(max-width: 699px)" src="/assets/production/product-presence-motion-mobile.webm" type="video/webm"/>
      <source media="(max-width: 699px)" src="/assets/production/product-presence-motion-mobile.mp4" type="video/mp4"/>
      <source src="/assets/production/product-presence-motion.webm" type="video/webm"/>
      <source src="/assets/production/product-presence-motion.mp4" type="video/mp4"/>
    </video>
    <button type="button" className="story-motion-control presence-motion-control" onClick={toggle} aria-label={accessibleControlLabel}><span aria-hidden="true">{motionState==='playing'?'Ⅱ':motionState==='ended'?'↻':'▶'}</span>{controlLabel}</button>
  </div>
}

interface TextureMotionProps {
  autoPlayOnce: boolean;
  onAutoPlay: () => void;
  experiment: MotionExperiment;
}

function ProductTextureMotion({autoPlayOnce,onAutoPlay,experiment}:TextureMotionProps){
  const videoRef=useRef<HTMLVideoElement>(null);
  const regionRef=useRef<HTMLDivElement>(null);
  const attemptedAutoPlay=useRef(false);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
  const mobileViewport=useMediaQuery('(max-width: 699px)');
  const [motionState,setMotionState]=useState<'idle'|'playing'|'paused'|'ended'>('idle');
  const report=(action:string)=>{
    const detail={action,asset:'oil-texture',experiment_id:experiment.id,experiment_variant:experiment.variant};
    window.dispatchEvent(new CustomEvent('neeli:product-motion',{detail}));
    track(action==='play'||action==='replay'||action==='pause'?'product_motion_interacted':'product_motion_state_changed',detail);
  };
  const play=(action:'play'|'replay'|'autoplay')=>{
    const video=videoRef.current;
    if(!video)return;
    if(action==='replay'||video.ended)video.currentTime=0;
    void video.play().then(()=>{setMotionState('playing');report(action)}).catch(()=>setMotionState('paused'));
  };
  const toggle=()=>{
    const video=videoRef.current;
    if(!video)return;
    if(!video.paused){video.pause();setMotionState('paused');report('pause');return}
    play(motionState==='ended'?'replay':'play');
  };
  useEffect(()=>{
    if(reducedMotion)return;
    const region=regionRef.current;
    const video=videoRef.current;
    if(!region||!video)return;
    const observer=new IntersectionObserver(([entry])=>{
      const substantiallyVisible=entry.isIntersecting&&entry.intersectionRatio>=.55;
      if(substantiallyVisible&&autoPlayOnce&&!attemptedAutoPlay.current){
        attemptedAutoPlay.current=true;
        onAutoPlay();
        play('autoplay');
      }else if(!substantiallyVisible&&!video.paused){
        video.pause();
        setMotionState('paused');
        report('pause-offscreen');
      }
    },{threshold:[0,.55]});
    observer.observe(region);
    return()=>observer.disconnect();
  },[autoPlayOnce,onAutoPlay,reducedMotion]);
  if(reducedMotion||mobileViewport)return <StoryImage src="/assets/production/oil-texture.webp" mobileSrc="/assets/production/oil-texture-mobile.webp" alt="Deep violet-brown herbal oil flowing from a spoon"/>;
  const controlLabel=motionState==='playing'?'Pause':motionState==='ended'?'Replay':'Play';
  return <div ref={regionRef} className={`story-motion-shell ${motionState}`}>
    <video ref={videoRef} className="story-motion" muted playsInline autoPlay preload="metadata" poster="/assets/production/oil-texture.webp" aria-label="Deep violet-brown herbal oil dropping from a spoon into a brass vessel" onLoadedMetadata={event=>{const video=event.currentTarget;trackOnce('product_motion_loaded','product_motion_loaded',{experiment_id:experiment.id,experiment_variant:experiment.variant,duration_seconds:Number(video.duration.toFixed(3))})}} onError={()=>track('product_motion_error',{experiment_id:experiment.id,experiment_variant:experiment.variant,asset:'oil-texture'})} onPlay={()=>setMotionState('playing')} onPause={()=>setMotionState(current=>current==='ended'?'ended':'paused')} onEnded={()=>{setMotionState('ended');report('complete')}}>
      <source src="/assets/production/oil-texture-motion.webm" type="video/webm"/>
      <source src="/assets/production/oil-texture-motion.mp4" type="video/mp4"/>
    </video>
    <button type="button" className="story-motion-control" onClick={toggle} aria-label={`${controlLabel} oil texture motion`}><span aria-hidden="true">{motionState==='playing'?'Ⅱ':motionState==='ended'?'↻':'▶'}</span>{controlLabel}</button>
  </div>
}

interface StoryGalleryProps {
  slide: number;
  setSlide: Dispatch<SetStateAction<number>>;
  experiment: MotionExperiment;
  onTextureExposure: () => void;
}

function StoryGallery({slide,setSlide,experiment,onTextureExposure}:StoryGalleryProps){
  const touchStartX=useRef<number|null>(null);
  const textureHasPlayed=useRef(false);
  const [direction,setDirection]=useState<'next'|'previous'>('next');
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
  const mobileViewport=useMediaQuery('(max-width: 699px)');
  const move=(nextDirection:'previous'|'next')=>{setDirection(nextDirection);setSlide(current=>{const target=nextDirection==='previous'?(current+slides.length-1)%slides.length:(current+1)%slides.length;track('gallery_navigated',{interaction:nextDirection,from_frame:current+1,to_frame:target+1,experiment_id:experiment.id,experiment_variant:experiment.variant});return target})};
  const previous=()=>move('previous');
  const next=()=>move('next');
  useEffect(()=>{
    trackOnce(`gallery_frame_viewed:${slide}`,'gallery_frame_viewed',{frame_index:slide+1,frame_name:slides[slide].shortLabel.toLowerCase(),experiment_id:experiment.id,experiment_variant:experiment.variant});
    if(slide===1){
      onTextureExposure();
      trackOnce('oil_texture_motion_v1:exposure','experiment_exposure',{experiment_id:experiment.id,experiment_variant:experiment.variant,motion_eligible:!reducedMotion});
    }
  },[experiment.id,experiment.variant,onTextureExposure,reducedMotion,slide]);
  
  return <div className="story-gallery" role="region" aria-roledescription="carousel" aria-label="Seven-frame product story" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft')previous();if(event.key==='ArrowRight')next()}} onTouchStart={event=>{touchStartX.current=event.touches[0].clientX}} onTouchEnd={event=>{if(touchStartX.current===null)return;const distance=event.changedTouches[0].clientX-touchStartX.current;if(Math.abs(distance)>45)(distance<0?next:previous)();touchStartX.current=null}}>
    <div className={`story-frame story-${direction} ${slides[slide].frameClass}`} key={slide} style={{backgroundImage:`url(${mobileViewport?slides[slide].mobileSrc:slides[slide].src})`}}>
      {slides[slide].frameClass==='frame-product'?<ProductPresenceMotion/>:slides[slide].frameClass==='frame-texture'?<ProductTextureMotion autoPlayOnce={!textureHasPlayed.current} onAutoPlay={()=>{textureHasPlayed.current=true}} experiment={experiment}/>:<StoryImage src={slides[slide].src} mobileSrc={slides[slide].mobileSrc} alt={slides[slide].alt} priority={slide===0}/>}
      <div className="story-counter" aria-hidden="true"><span>{String(slide+1).padStart(2,'0')}</span><i/><span>{String(slides.length).padStart(2,'0')}</span></div>
      <div className="story-arrows"><button onClick={previous} aria-label="Previous gallery frame"><Arrow left/></button><button onClick={next} aria-label="Next gallery frame"><Arrow/></button></div>
    </div>
    <div className="story-caption" aria-live="polite"><span>{String(slide+1).padStart(2,'0')}</span><div><small>{slides[slide].eyebrow}</small><strong>{slides[slide].label}</strong></div></div>
    <div className="story-selector" aria-label="Choose a gallery frame">{slides.map((frame,index)=><button key={frame.src} className={index===slide?'selected':''} aria-label={`${index+1}: ${frame.label}`} aria-current={index===slide?'true':undefined} onClick={()=>{setDirection(index<slide?'previous':'next');track('gallery_navigated',{interaction:'selector',from_frame:slide+1,to_frame:index+1,experiment_id:experiment.id,experiment_variant:experiment.variant});setSlide(index)}}><span>{String(index+1).padStart(2,'0')}</span><b>{frame.shortLabel}</b></button>)}</div>
  </div>
}

// Phase 7: Interactive timeline expectation section
function ResultsSection(){
  return <section className="results section adapted-results" id="results">
    <header className="results-intro">
      <div>
        <span className="results-eyebrow">WHAT TO EXPECT</span>
        <h2>The honest sequence.</h2>
      </div>
      <div className="results-intro-desc">
        <p>Based on consistent 2× weekly use as directed. Individual results may vary.</p>
        <div className="results-trust-tag">
          <span>✓ Authentic Ayurveda</span>
          <span>✓ 2× Weekly Wash-out</span>
        </div>
      </div>
    </header>
    <div className="results-layout">
      <figure className="results-media">
        <div>
          <ResponsiveImage src="/assets/production/hair-result.webp" mobileSrc="/assets/production/hair-result-mobile.webp" alt="Long, healthy-looking dark hair"/>
          <div className="results-media-overlay-chip">
            <span>Consistent Use Result</span>
            <small>Root to tip care</small>
          </div>
        </div>
        <figcaption>Consistent use, as directed</figcaption>
      </figure>
      <div className="results-sequence">
        {resultStages.map(([index,time,title,copy])=>(
          <article key={index} className="results-sequence-card">
            <div className="result-marker">
              <b>{index}</b>
            </div>
            <div className="results-sequence-content">
              <span className="results-stage-time">{time}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
    <div className="results-qualification-card">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p><strong>Clinical Honesty Note:</strong> Timeline based on consistent 2× weekly use as directed. Individual response times vary based on scalp health, lifestyle, and hair density.</p>
    </div>
  </section>
}

// Phase 20: Footer styling
function SiteFooter(){
  const groups = [
    { title: 'Quick Links', links: [['Shop', '#product'], ['Results', '#results'], ['Formula', '#formula'], ['How to use', '#ritual']] },
    { title: 'Policies', links: [['Shipping & returns', '#faq'], ['Privacy policy', '#faq'], ['Terms of service', '#faq']] },
    { title: 'Our Network', links: [['Kerala Ayurveda Ltd', 'https://www.keralaayurveda.biz'], ['Academy', 'https://www.keralaayurveda.academy'], ['Wellness Resorts', 'https://www.keralaayurveda.us']] },
  ] as const;
  return <footer className="theme-footer">
    <div className="theme-footer__wrap">
      <div className="theme-footer__grid">
        <div className="theme-footer__brand">
          <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="130" height="130"/>
          <span>Kerala Ayurveda</span>
        </div>
        {groups.map(group => (
          <div className="theme-footer__column" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="theme-footer__social">
        <strong>Follow Us</strong>
        <div>
          <a href="https://www.instagram.com/keralaayurvedaltd/?hl=en" aria-label="Instagram">◎</a>
          <a href="https://www.youtube.com/@KeralaAyurvedalimited" aria-label="YouTube">▶</a>
          <a href="https://www.facebook.com/keralaayurvedaltd/" aria-label="Facebook">f</a>
          <a href="https://in.linkedin.com/company/kerala-ayurveda" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <p className="theme-footer__tagline">Rooted in authentic Ayurveda since 1945.</p>
    </div>
    <div className="theme-footer__decoration" aria-hidden="true" />
  </footer>
}

function App(){
  const useV3=typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('version')!=='v2';
  const [slide,setSlide]=useState(0);
  const [cart,setCart]=useState(0);
  const [companionCart,setCompanionCart]=useState(0);
  const [buyState,setBuyState]=useState<'ready'|'adding'|'added'>('ready');
  const [motionExperiment]=useState(getMotionExperiment);
  const [drawer,setDrawer]=useState(false);
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [searchTerm,setSearchTerm]=useState('');
  const [searchStatus,setSearchStatus]=useState('');
  const [activeSection,setActiveSection]=useState('product');
  const [dockVisible,setDockVisible]=useState(false);
  const [scienceDockHidden,setScienceDockHidden]=useState(false);
  const [selectedSize,setSelectedSize]=useState<'100ml'|'200ml'>('200ml');
  const [quantity,setQuantity]=useState(1);
  const [addCrossSell,setAddCrossSell]=useState(false);

  const currentPrice=selectedSize==='200ml'?338:195;
  const currentMrp=selectedSize==='200ml'?375:215;
  const currentDiscount=selectedSize==='200ml'?'10% OFF':'9% OFF';

  const closeRef=useRef<HTMLButtonElement>(null);
  const drawerRef=useRef<HTMLElement>(null);
  const drawerOpenerRef=useRef<HTMLElement|null>(null);
  const heroCommerceRef=useRef<HTMLElement>(null);
  const searchRef=useRef<HTMLInputElement>(null);
  const textureExposed=useRef(false);
  
  const markTextureExposure=useCallback(()=>{textureExposed.current=true},[]);
  const trackScienceChapter=useCallback((chapter:number)=>trackOnce(`science_story_chapter:${chapter}`,'science_story_chapter_viewed',{chapter_index:chapter+1}),[]);
  const openDrawer=()=>{drawerOpenerRef.current=document.activeElement as HTMLElement;setDrawer(true)};
  const closeDrawer=()=>{setDrawer(false);requestAnimationFrame(()=>drawerOpenerRef.current?.focus())};

  // Cart Drawer effects & focus trap
  useEffect(()=>{
    if(!drawer){
      document.body.classList.remove('locked');
      return;
    }
    document.body.classList.add('locked');
    closeRef.current?.focus();
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){
        closeDrawer();
        return;
      }
      if(e.key!=='Tab'||!drawerRef.current)return;
      const controls=Array.from(drawerRef.current.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));
      if(!controls.length)return;
      const first=controls[0],last=controls[controls.length-1];
      if(e.shiftKey&&document.activeElement===first){
        e.preventDefault();
        last.focus();
      }else if(!e.shiftKey&&document.activeElement===last){
        e.preventDefault();
        first.focus();
      }
    };
    addEventListener('keydown',key);
    return()=>{
      removeEventListener('keydown',key);
      document.body.classList.remove('locked');
    }
  },[drawer]);

  // Mobile navigation drawer keyboard Escape listener
  useEffect(()=>{
    if(!mobileMenuOpen){
      document.body.classList.remove('locked');
      return;
    }
    document.body.classList.add('locked');
    const handleKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){
        setMobileMenuOpen(false);
      }
    };
    addEventListener('keydown',handleKey);
    return()=>{
      removeEventListener('keydown',handleKey);
      document.body.classList.remove('locked');
    }
  },[mobileMenuOpen]);

  useEffect(()=>{
    if(!searchOpen)return;
    searchRef.current?.focus();
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setSearchOpen(false)};
    addEventListener('keydown',key);
    return()=>removeEventListener('keydown',key);
  },[searchOpen]);

  useEffect(()=>observeWebVitals(motionExperiment),[motionExperiment]);

  // Active section scroll indicator
  useEffect(()=>{
    const sections=navItems.map(([id])=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)setActiveSection(visible.target.id);
    },{rootMargin:'-28% 0px -58% 0px',threshold:[0,.2,.5]});
    sections.forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[]);

  // Show/hide contextual sticky bar
  useEffect(()=>{
    const commerce=heroCommerceRef.current;
    if(!commerce)return;
    const observer=new IntersectionObserver(([entry])=>setDockVisible(!entry.isIntersecting&&entry.boundingClientRect.bottom<0),{threshold:[0,.15]});
    observer.observe(commerce);
    return()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    const science=document.getElementById('science');
    if(!science)return;
    const observer=new IntersectionObserver(([entry])=>setScienceDockHidden(entry.isIntersecting),{threshold:0});
    observer.observe(science);
    return()=>observer.disconnect();
  },[]);

  // Motion reveal on scroll
  useEffect(()=>{
    if(!isMotionEligible())return;
    const selectors=[
      '.checkpoint-hero',
      '.proof-strip',
      '.ritual-guide-strip',
      '.purity-split-section',
      '.adapted-results',
      '.difference-section',
      '.testimonials-section',
      '.key-ingredients-section',
      '.three-milks-section',
      '.massage-ritual-section',
      '.go-deeper-section',
      '.reviews-section',
      '.related-products-section'
    ];
    const targets=Array.from(document.querySelectorAll<HTMLElement>(selectors.join(', ')));
    document.documentElement.classList.add('page-motion-ready');
    targets.forEach((target)=>{
      target.classList.add('page-scroll-reveal');
      const idx=Array.from(target.parentElement?.children||[]).indexOf(target);
      target.style.setProperty('--reveal-index',String(Math.max(0,idx)));
    });
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-revealed');
        }
      });
    },{rootMargin:'0px 0px -6% 0px',threshold:0.06});
    targets.forEach(target=>observer.observe(target));
    return()=>{
      observer.disconnect();
      document.documentElement.classList.remove('page-motion-ready');
      targets.forEach(t=>t.classList.remove('page-scroll-reveal','is-revealed'));
    };
  },[]);

  useEffect(()=>{
    const sections=[['comparison','comparison_section_viewed'],['consultation','consultation_route_viewed']] as const;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const match=sections.find(([id])=>id===entry.target.id);
      if(match){
        trackOnce(`section_view:${match[0]}`,match[1],{section_id:match[0]});
        observer.unobserve(entry.target);
      }
    }),{threshold:.35});
    sections.forEach(([id])=>{
      const section=document.getElementById(id);
      if(section)observer.observe(section);
    });
    return()=>observer.disconnect();
  },[]);

  const add=(source:'hero'|'dock')=>{
    if(buyState!=='ready')return;
    const finalQuantity = quantity;
    track('add_to_cart_clicked',{
      product_id:`neelibhringadi_keram_${selectedSize}`,
      purchase_source:source,
      value:currentPrice*finalQuantity,
      currency:'INR',
      experiment_id:motionExperiment.id,
      experiment_variant:motionExperiment.variant,
      texture_exposed:textureExposed.current
    });
    setBuyState('adding');
    setTimeout(()=>{
      setCart(c=>c+finalQuantity);
      if (addCrossSell) {
        setCompanionCart(c=>c+1);
      }
      setBuyState('added');
      track('cart_product_added',{
        product_id:`neelibhringadi_keram_${selectedSize}`,
        purchase_source:source,
        value:currentPrice*finalQuantity,
        currency:'INR',
        experiment_id:motionExperiment.id,
        experiment_variant:motionExperiment.variant,
        texture_exposed:textureExposed.current
      });
      setTimeout(()=>{
        setBuyState('ready');
        setQuantity(1); // reset quantity selection
      },520);
    },360);
  };

  const viewCart=(source:'hero'|'dock')=>{
    track('view_cart_clicked',{
      purchase_source:source,
      experiment_id:motionExperiment.id,
      experiment_variant:motionExperiment.variant,
      texture_exposed:textureExposed.current,
      cart_quantity:cart
    });
    openDrawer();
  };

  const submitSearch=(event:FormEvent)=>{
    event.preventDefault();
    const query=searchTerm.trim().toLowerCase();
    if(!query)return;
    const targets=[
      {terms:'overview product neelibhringadi hair oil',id:'product'},
      {terms:'result results hair fall hair growth expect',id:'results'},
      {terms:'formula ingredient ingredients amla bhringaraj neeli coconut milk',id:'formula'},
      {terms:'mechanism science works recovery pathway shaft scalp follicle anagen',id:'science'},
      {terms:'ritual how to use apply massage wash mild shampoo',id:'ritual'},
      {terms:'compare comparison minoxidil serum rosemary alternative',id:'comparison'},
      {terms:'doctor consultation whatsapp persistent sudden clinical',id:'consultation'},
      {terms:'review reviews rating',id:'reviews'},
      {terms:'faq questions pregnancy coloured greying dandruff everyday science',id:'faq'},
      {terms:'details size pack label zoom external taxes price',id:'details'}
    ];
    const match=targets.find(item=>item.terms.includes(query)||query.split(/\s+/).some(word=>word.length>2&&item.terms.includes(word)));
    if(match){
      document.getElementById(match.id)?.scrollIntoView({behavior:'smooth'});
      setSearchStatus(`Showing ${match.id==='product'?'product overview':match.id}.`);
      setSearchOpen(false);
    }else{
      setSearchStatus('No matching section in this product prototype.');
    }
  };

  const totalCartItems = cart + companionCart;

  return <>
    <a className="skip" href="#main">Skip to product</a>
    
    {/* Announcement bar at the absolute top */}
    <AnnouncementBar />

    <header className={`header ${searchOpen?'searching':''}`}>
      <div className="header-mobile-left">
        <button
          type="button"
          className="hamburger-btn"
          aria-expanded={mobileMenuOpen}
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      <a className="brand" href="#main" aria-label="Kerala Ayurveda home">
        <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="130" height="130"/>
      </a>

      <nav className="header-primary-nav" aria-label="Primary navigation">
        <a href="#product">Shop</a>
        <a href="#ingredients-index">Ayurveda</a>
        <a href="#science">Our approach</a>
        <a href="#reviews">Journal</a>
      </nav>

      {searchOpen && (
        <form className="header-search" role="search" onSubmit={submitSearch}>
          <Search/>
          <label className="visually-hidden" htmlFor="site-search">Search this product page</label>
          <input ref={searchRef} id="site-search" value={searchTerm} onChange={event=>setSearchTerm(event.target.value)} placeholder="Search results, ingredients, how to use…" autoComplete="off"/>
          <button className="search-submit" type="submit">
            <span className="search-submit-desktop">Search</span>
            <span className="search-submit-mobile">Go</span>
          </button>
          <button className="search-close" type="button" onClick={()=>setSearchOpen(false)} aria-label="Close search">×</button>
        </form>
      )}

      <div className="header-actions">
        <button className="search-button" onClick={()=>setSearchOpen(true)} aria-expanded={searchOpen} aria-label="Open search"><Search/></button>
        <button className="header-bag" type="button" onClick={()=>totalCartItems?openDrawer():document.getElementById('product')?.scrollIntoView({behavior:'smooth'})} aria-label={totalCartItems?`Open bag, ${totalCartItems} items`:'View product purchase options'}>
          Bag{totalCartItems>0&&<span>{totalCartItems}</span>}
        </button>
      </div>
      <p className="live" aria-live="polite">{searchStatus}</p>
    </header>

    {/* Section navigation bars */}
    {useV3 ? <PdpSectionNavV3/> : (
      <nav className="anchorbar" aria-label="Product sections">
        {navItems.map(([id,label])=>(
          <a key={id} href={`#${id}`} className={`standard-nav-link ${activeSection===id?'active':''}`} aria-current={activeSection===id?'location':undefined}>{label}</a>
        ))}
      </nav>
    )}

    {/* Mobile Navigation Drawer */}
    <div className={`mobile-nav-scrim ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
      <aside className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Navigation Menu">
        <header className="mobile-nav-header">
          <h3>Kerala Ayurveda</h3>
          <button type="button" className="mobile-nav-close" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>×</button>
        </header>
        <nav className="mobile-nav-links">
          <a href="#product" onClick={() => setMobileMenuOpen(false)}>Shop Online</a>
          <a href="#ingredients-index" onClick={() => setMobileMenuOpen(false)}>Active Botanicals</a>
          <a href="#difference" onClick={() => setMobileMenuOpen(false)}>Our Heritage</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Journal &amp; Reviews</a>
          <a href="#massage-steps" onClick={() => setMobileMenuOpen(false)}>How To Apply</a>
        </nav>
      </aside>
    </div>

    <main id="main" className={scienceDockHidden?'science-is-active':undefined}>
      
      {/* 4. HERO SECTION */}
      <section className="hero checkpoint-hero" id="product">
        {/* Left Side: Product gallery carousel */}
        <StoryGallery slide={slide} setSlide={setSlide} experiment={motionExperiment} onTextureExposure={markTextureExposure}/>
        
        {/* Right Side: Consolidated Buy box */}
        <section ref={heroCommerceRef} className="hero-commerce-panel" aria-label="Purchase details">
          <Breadcrumb />
          <ProductIdentity/>

          <div className="size-selector">
            <span className="size-selector-label">SELECT SIZE:</span>
            <div className="size-selector-options">
              <button type="button" className={`size-option ${selectedSize==='200ml'?'selected':''}`} onClick={()=>setSelectedSize('200ml')}>
                <span className="size-radio"/>
                <span className="size-name">200 ml</span>
                <span className="size-price">₹338</span>
                <span className="size-badge">Best value • Save ₹37</span>
              </button>
              <button type="button" className={`size-option ${selectedSize==='100ml'?'selected':''}`} onClick={()=>setSelectedSize('100ml')}>
                <span className="size-radio"/>
                <span className="size-name">100 ml</span>
                <span className="size-price">₹195</span>
              </button>
            </div>
          </div>

          <div className="hero-price-row">
            <div className="hero-price">
              <strong>₹{currentPrice}</strong>
              <del>₹{currentMrp}</del>
              <span className="discount-chip">{currentDiscount}</span>
            </div>
            <p className="price-note">{selectedSize==='200ml'?'₹1.69 / ml':'₹1.95 / ml'} • Inclusive of all taxes</p>
          </div>

          {/* Quantity selector & Cross Sell wrapper */}
          <div className="hero-action-area">
            <div className="hero-qty-row">
              <span className="qty-label">QTY:</span>
              <div className="hero-qty-control">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>−</button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(prev => prev + 1)}>+</button>
              </div>
            </div>

            <CrossSellItem active={addCrossSell} onToggle={() => setAddCrossSell(!addCrossSell)} />

            <div className="hero-purchase-btn-row">
              <PurchaseAction
                cart={cart}
                buyState={buyState}
                price={currentPrice}
                onAdd={()=>add('hero')}
                onDecrease={()=>setCart(Math.max(0,cart-1))}
                onIncrease={()=>setCart(cart+1)}
                onViewCart={()=>viewCart('hero')}
                className="hero-purchase-action"
              />
            </div>
          </div>

          <div className="hero-reassurance-strip">
            <span>✓ Free shipping above ₹499</span>
            <span>✓ COD available</span>
            <span>✓ 100% Authentic Ayurveda</span>
          </div>
          <p className="live" aria-live="polite">{buyState==='added'?'Product added to the cart':''}</p>
        </section>
      </section>

      {/* 5. Proof strip */}
      <ProofStrip/>

      {/* 6. Quick benefit guide */}
      <RitualGuideStrip />

      {/* 7. Timeline sequencing expectancies */}
      <ResultsSection/>

      {/* 8. Purity split screens */}
      <IngredientsPuritySplit />

      {/* 9. Key ingredients index */}
      <KeyIngredientsGrid />

      {/* Science Story mechanism */}
      {useV3 ? <ScienceStoryV3 onSceneChange={trackScienceChapter}/> : <ScienceRecoveryStory onChapterChange={trackScienceChapter}/>}

      {/* 10. Three milks base */}
      <ThreeMilksSection />

      {/* 11. 4 step easy application massage */}
      <EasyMassageRitual />

      {/* 12. Lineage Difference */}
      <KeralaAyurvedaDifference />

      {/* 13. High green block customer quotes */}
      <TestimonialsSlider />

      {/* Comparison routes */}
      {useV3 ? (
        <ComparisonV3
          consultHref={`https://wa.me/919995559842?text=${encodeURIComponent("I am viewing Neelibhringadi Keram and would like guidance on whether my hair-fall concern needs an Ayurveda consultation.")}`}
          onConsultClick={()=>track('consultation_cta_clicked',{source:'v3_comparison',channel:'whatsapp',product_id:'neelibhringadi_keram_200ml'})}
        />
      ) : (
        <RecoveryComparison/>
      )}

      {/* 14. Spacious information details */}
      <GoDeeperAccordions />

      {/* 15. Real review listings */}
      <ReviewsSection />

      {/* 16. Heritage Credentials banner */}
      <HeritageSection/>

      {/* 17. Related product secondary grids */}
      <RelatedProducts />

    </main>

    <SiteFooter />

    {/* 19. Contextual Sticky Buy Bar - Hidden when drawer is open */}
    <aside className={`purchase contextual-purchase ${dockVisible && !scienceDockHidden && !drawer ? 'visible' : ''}`} aria-label="Purchase Neelibhringadi Keram" aria-hidden={!(dockVisible && !scienceDockHidden && !drawer)} inert={!(dockVisible && !scienceDockHidden && !drawer) ? true : undefined}>
      <div className="purchase-product">
        <img src="/assets/production/official-product.webp" width="40" height="40" alt="" className="dock-thumb" />
        <div>
          <strong>Neelibhringadi Keram</strong>
          <span>{selectedSize} · ₹{currentPrice}</span>
        </div>
      </div>
      <PurchaseAction cart={cart} buyState={buyState} price={currentPrice} onAdd={()=>add('dock')} onDecrease={()=>setCart(Math.max(0,cart-1))} onIncrease={()=>setCart(cart+1)} onViewCart={()=>viewCart('dock')} className="dock-purchase-action"/>
      <p className="live" aria-live="polite">{buyState==='added'?'Product added to the cart':''}</p>
    </aside>

    {/* Cart Bag Drawer */}
    <div className={`scrim ${drawer?'open':''}`} inert={!drawer ? true : undefined} onMouseDown={e=>{if(e.target===e.currentTarget)closeDrawer()}} aria-hidden={!drawer}>
      <section ref={drawerRef} className="drawer" role="dialog" aria-modal="true" aria-label="Your bag">
        <header>
          <div>
            <p>Your bag</p>
            <h2>{totalCartItems ? `${totalCartItems} item${totalCartItems>1?'s':''}` : 'Your cart is empty'}</h2>
          </div>
          <button ref={closeRef} onClick={closeDrawer} aria-label="Close bag">×</button>
        </header>

        {totalCartItems ? (
          <>
            <div className="cart-items-wrapper">
              {cart > 0 && (
                <div className="cart-item">
                  <div className="cart-thumb">
                    <img src="/assets/production/official-product.webp" alt="" width="609" height="1800"/>
                  </div>
                  <div>
                    <h3>Neelibhringadi Keram</h3>
                    <p>{selectedSize}</p>
                    <strong>₹{currentPrice}</strong> <del>₹{currentMrp}</del>
                  </div>
                  <div className="quantity small">
                    <button aria-label="Decrease quantity" onClick={()=>setCart(Math.max(0,cart-1))}>−</button>
                    <span>{cart}</span>
                    <button aria-label="Increase quantity" onClick={()=>setCart(cart+1)}>+</button>
                  </div>
                </div>
              )}

              {companionCart > 0 && (
                <div className="cart-item">
                  <div className="cart-thumb">
                    <img src="/assets/production/official-product.webp" alt="" width="609" height="1800"/>
                  </div>
                  <div>
                    <h3>Organic Hair Cleansing Powder</h3>
                    <p>Standard size</p>
                    <strong>₹249</strong> <del>₹299</del>
                  </div>
                  <div className="quantity small">
                    <button aria-label="Decrease quantity" onClick={()=>setCompanionCart(Math.max(0,companionCart-1))}>−</button>
                    <span>{companionCart}</span>
                    <button aria-label="Increase quantity" onClick={()=>setCompanionCart(companionCart+1)}>+</button>
                  </div>
                </div>
              )}
            </div>

            <div className="subtotal">
              <span>Subtotal</span>
              <strong>₹{(currentPrice * cart) + (249 * companionCart)}</strong>
            </div>

            <button
              className="checkout"
              onClick={()=>track('checkout_clicked',{
                experiment_id:motionExperiment.id,
                experiment_variant:motionExperiment.variant,
                texture_exposed:textureExposed.current,
                cart_quantity:totalCartItems,
                value:(currentPrice * cart) + (249 * companionCart),
                currency:'INR'
              })}
            >
              Checkout Now
            </button>
            <small>Inclusive of all taxes</small>
          </>
        ) : (
          <p className="empty">Explore our range.</p>
        )}
      </section>
    </div>
  </>;
}

export default App;
