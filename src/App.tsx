import { useCallback, useEffect, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { getMotionExperiment, isMotionEligible, observeWebVitals, track, trackOnce, type MotionExperiment } from './analytics';
import { RecoveryComparison } from './v2/RecoveryComparison';
import { ConsultationCTA } from './v2/ConsultationCTA';
import ScienceRecoveryStory from './v2/ScienceRecoveryStory';
import PdpSectionNavV3 from './v3/PdpSectionNavV3';
import ComparisonV3 from './v3/ComparisonV3';
import ScienceStoryV3 from './v3/ScienceStoryV3';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { PotentIngredientsSection } from './components/PotentIngredientsSection';
import './components/potent-ingredients.css';

const Arrow = ({left=false}:{left?:boolean}) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={left?'M15 5l-7 7 7 7':'M9 5l7 7-7 7'}/></svg>;
const Search = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4 4"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>;

const slides = [
  {src:'/assets/production/product-presence-motion.mp4',mobileSrc:'/assets/production/product-presence-motion-mobile.mp4',poster:'/assets/production/product-presence-poster.webp',alt:'Official Neelibhringadi Keram bottle with Amla and coconut in warm natural light',label:'The complete hair recovery oil',eyebrow:'Complete hair recovery',shortLabel:'Bottle',frameClass:'frame-product',isVideo:true},
  {src:'/assets/production/oil-texture-motion.mp4',mobileSrc:'/assets/production/oil-texture-motion.mp4',poster:'/assets/production/oil-texture.webp',alt:'Deep violet-brown herbal oil flowing from a spoon',label:'The medicated oil texture',eyebrow:'The coconut oil base',shortLabel:'Texture',frameClass:'frame-texture',isVideo:true},
  {src:'/assets/production/ritual.webp',mobileSrc:'/assets/production/ritual-mobile.webp',alt:'Woman receiving a gentle fingertip scalp massage',label:'Fingertip scalp massage',eyebrow:'Ritual use',shortLabel:'Massage',frameClass:'frame-ritual'},
  {src:'/assets/production/ingredients.webp',mobileSrc:'/assets/production/ingredients-mobile.webp',alt:'Amla, Neeli, Bhringaraj and coconut used in the formula',label:'Four powerful ingredients',eyebrow:'Key ingredients',shortLabel:'Herbs',frameClass:'frame-ingredients'},
  {src:'/assets/production/triple-milk.webp',mobileSrc:'/assets/production/triple-milk-mobile.webp',alt:'Cow milk, goat milk and coconut milk in three bowls',label:'The triple-milk formula',eyebrow:'The special base',shortLabel:'Milks',frameClass:'frame-milks'},
  {src:'/assets/production/Honest_Sequence.mp4',mobileSrc:'/assets/production/Honest_Sequence.mp4',poster:'/assets/production/Honest_Sequence.png',alt:'Woman with long dark hair holding Neelibhringadi Keram',label:'The honest results sequence',eyebrow:'What to expect',shortLabel:'Result',frameClass:'frame-results',isVideo:true},
];

const navItems = [['product','Overview'],['results','Results'],['formula','Formula'],['comparison','Compare'],['ritual','How to use'],['reviews','Reviews']];

const ingredients = [
  ['Coconut oil','Lauric-acid-rich oil with a strong affinity for hair protein, associated with reduced protein loss from damaged and undamaged hair.'],
  ['Bhringaraj','The formula’s growth-cycle research anchor. Preclinical Eclipta research reports anagen-linked activity.'],
  ['Amla','An antioxidant-rich herb traditionally used to support hair quality; current evidence is ingredient-level.'],
  ['Neeli','The signature scalp-care herb, traditionally associated with dark-hair care and scalp support.'],
];

const ingredientsV3 = [
  ['Coconut oil','Lauric-acid-rich oil with a strong affinity for hair protein, associated with fibre penetration and reduced protein loss from damaged and undamaged hair.'],
  ['Amla','An antioxidant-rich herb with ingredient-level antioxidant potential and a long tradition of supporting hair quality.'],
  ['Neeli','The signature scalp-care herb, traditionally associated with dark-hair care and scalp support.'],
  ['Karnasphota','Traditionally used for an itchy, dandruff-prone scalp. Experimental Cardiospermum extracts have reported effects involving TNF-alpha and nitric oxide; this is ingredient-level evidence, not finished-product clinical proof.'],
  ['Bhringaraj','The growth-cycle research anchor. Preclinical Eclipta research reports activity in anagen-linked signals, including FGF-7, FGF-5 and mTOR.'],
];

const resultStages = [
  ['01','First application','Scalp cools immediately','Scalp feels instantly cool and soothed, while hair feels softer, smoother, deeply nourished, and easier to manage.'],
  ['02','Week 5–8','Less in the shower','Hair feels stronger and healthier. Visible reduction in dandruff and hair breakage, with noticeably less hair seen on the pillow, comb, or in the shower.'],
  ['03','Month 3+','Visible change','Hair looks fuller, thicker, and more voluminous, with better length and strength from root to tip.'],
];

const ritualSteps = [
  ['01','Warm','Warm oil penetrates-cold oil sits on the surface.'],
  ['02','Apply','Apply adequate amount gently onto the scalp and hair.'],
  ['03','Massage','Circular motion, 5 minutes. Fingertips, not nails.'],
  ['04','Wash','Rinse after 30 minutes to 1 hour with a mild shampoo.'],
];

const faqItems = [
  ['What is the full ingredients list?',<><b>Oil base:</b> Coconut oil (Cocos nucifera). <b>Primary ingredients:</b> Amla (Emblica officinalis), Bhringaraj (Eclipta alba), Neeli (Indigofera tinctoria), Karnasphota (Cardiospermum halicacabum). <b>Triple-milk base:</b> Cow milk (Dhenukshira), Goat milk (Ajakshira), and Coconut milk (Nalikerakshira). <b>Supporting herbs:</b> Yashtimadhu (Glycyrrhiza glabra), Dhatriphala (Phyllanthus emblica), Gunjamoola (Abrus precatorius), and Anjana.</>],
  ['How is it prepared?','Each bottle of Neelibhringadi Oil follows a 7-day process of preparation. It is prepared in small batches following the Thaila Paaka Vidhi process-a classical method requiring up to 48 hours of slow-heat extraction. Herbs are processed into a kashaya (decoction), and kalka (paste), then combined with the coconut oil base. The mixture is heated on low flame, stirred by hand, until the water content fully evaporates and the herbal essence binds to the oil.'],
  ['Are there any safety instructions for use?','External use only.'],
  ['Can I use it on coloured hair?','Yes. The formula is gentle. It may slightly darken hair over extended use due to the Bhringaraj and Neeli content.'],
  ['Does it help with greying?','Yes. Neeli and Bhringaraja are traditionally used to help minimise premature greying and support natural hair colour.'],
  ['Does it help with dandruff?','Yes, it does. Ingredients like Coconut Oil, Amla, and Yashimadhu (Licorice) work together to fight the fungal buildup and scalp irritation that cause dandruff.'],
  ['Is it safe during pregnancy?','Yes, this is an external-use oil with no known contraindicated ingredients for topical application.'],
  ['What is the Ayurveda science behind it?','The formula follows two complementary recovery paths across the hair shaft, scalp and follicle. Coconut oil’s lauric acid is associated with hair-fibre penetration and reduced protein loss. Amla and Neeli contribute traditional scalp-care and antioxidant support. Preclinical Bhringraj research reports activity in anagen-linked signals, including FGF-7, FGF-5 and mTOR. These ingredient findings do not establish clinically proven regrowth by the finished oil.'],
  ['Can I use it every day? Is it safe long-term?','Use it 2× weekly: massage into the scalp and hair, leave for 30–60 minutes, then rinse with a mild shampoo. Follow the current physical pack for final directions and stop use if irritation occurs.'],
] as const;

function useMediaQuery(query:string){
  const [matches,setMatches]=useState(()=>typeof window!=='undefined'&&window.matchMedia(query).matches);
  useEffect(()=>{const media=window.matchMedia(query);const update=()=>setMatches(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[query]);
  return matches;
}

function ResponsiveImage({src,mobileSrc,alt,className,width=1600,height=2000,priority=false}:{src:string;mobileSrc:string;alt:string;className?:string;width?:number;height?:number;priority?:boolean}){
  return <picture className={className ? `${className}-picture` : undefined}><source media="(max-width: 699px)" srcSet={mobileSrc}/><img className={className} src={src} alt={alt} width={width} height={height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'}/></picture>
}

type PurchaseActionProps = {
  cart:number;
  buyState:'ready'|'adding'|'added';
  onAdd:()=>void;
  onDecrease:()=>void;
  onIncrease:()=>void;
  onViewCart:()=>void;
  className?:string;
};

function PurchaseAction({cart,buyState,onAdd,onDecrease,onIncrease,onViewCart,price=338,className=''}:{cart:number;buyState:'ready'|'adding'|'added';onAdd:()=>void;onDecrease:()=>void;onIncrease:()=>void;onViewCart:()=>void;price?:number;className?:string}){
  if(cart>0) return (
    <div className="flex items-center gap-3 w-full mt-2">
      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-100 shrink-0">
        <button type="button" aria-label="Decrease quantity" onClick={onDecrease} className="px-4 py-3.5 font-bold text-stone-700 hover:bg-stone-200 cursor-pointer">−</button>
        <span aria-label={`${cart} in cart`} className="px-4 py-3.5 font-semibold text-stone-900">{cart}</span>
        <button type="button" aria-label="Increase quantity" onClick={onIncrease} className="px-4 py-3.5 font-bold text-stone-700 hover:bg-stone-200 cursor-pointer">+</button>
      </div>
      <button type="button" style={{ color: '#ffffff' }} className="w-full flex-1 bg-[#2C3E2E] hover:bg-[#1f2d21] !text-white text-white py-4 px-6 rounded-xl font-semibold tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans" onClick={onViewCart}>
        <span style={{ color: '#ffffff' }} className="!text-white">VIEW CART</span>
        <span style={{ color: '#ffffff' }} className="opacity-90 font-mono !text-white">· ₹{price * cart}</span>
      </button>
    </div>
  );

  return (
    <button 
      type="button" 
      disabled={buyState!=='ready'} 
      onClick={onAdd}
      style={{ color: '#ffffff' }}
      className="w-full bg-[#2C3E2E] hover:bg-[#1f2d21] !text-white py-4 rounded-xl font-semibold tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer font-sans text-white"
    >
      {buyState==='ready'?'ADD TO CART':buyState==='adding'?'ADDING…':<><Check/> ADDED TO CART</>}
    </button>
  );
}

function ProductIdentity(){
  return (
    <div>
      <div className="flex items-center mb-3" aria-label="Product benefit highlights">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFF6D6] border border-[#FCEBA2] text-[#2C3E24] text-[9.5px] xs:text-[10.5px] sm:text-[12px] font-extrabold tracking-normal sm:tracking-wider uppercase px-3 sm:px-4 py-1.5 rounded-full shadow-xs max-w-full leading-none">
          <span className="whitespace-nowrap">• HELPS MINIMIZE HAIR FALL</span>
          <span className="whitespace-nowrap">• SUPPORTS HAIR GROWTH</span>
        </div>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight mb-2 tracking-tight">
        Neelibhringadi Keram
      </h1>
      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-md">
        Traditional 48-hour slow-cooked Ayurvedic hair oil infused with Bhringraj, Neeli, and triple milks—formulated to strengthen roots, reduce hair fall, and nourish the scalp.
      </p>
    </div>
  );
}

function ProductPresenceMotion(){
  const videoRef=useRef<HTMLVideoElement>(null);
  const regionRef=useRef<HTMLDivElement>(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
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
      }
    },{threshold:[0,.4]});
    observer.observe(region);
    return()=>observer.disconnect();
  },[reducedMotion]);
  const controlLabel=motionState==='playing'?'Pause':motionState==='ended'?'Replay':'Play';
  const accessibleControlLabel=motionState==='playing'?'Pause product lighting motion':motionState==='ended'?'Replay product lighting motion':'Play product lighting motion';
  return <div ref={regionRef} className={`story-motion-shell presence-motion-shell ${motionState}`}>
    <picture>
      <source media="(max-width: 699px)" type="image/webp" srcSet="/assets/production/product-presence-poster-mobile.webp"/>
      <img className="story-image presence-poster" src="/assets/production/product-presence-poster.webp" alt="Neelibhringadi Keram bottle" width="936" height="1248" loading="eager" fetchPriority="high"/>
    </picture>
    {!reducedMotion && (
      <video ref={videoRef} className="story-motion presence-motion" muted playsInline autoPlay loop preload="auto" poster="/assets/production/product-presence-poster.webp" aria-label="Natural light and botanical shadows moving gently behind the Neelibhringadi Keram bottle" onPlay={()=>setMotionState('playing')} onPause={()=>setMotionState(current=>current==='ended'?'ended':'paused')} onEnded={()=>setMotionState('ended')} onError={()=>setMotionState('paused')}>
        <source media="(max-width: 699px)" src="/assets/production/product-presence-motion-mobile.webm" type="video/webm"/>
        <source media="(max-width: 699px)" src="/assets/production/product-presence-motion-mobile.mp4" type="video/mp4"/>
        <source src="/assets/production/product-presence-motion.webm" type="video/webm"/>
        <source src="/assets/production/product-presence-motion.mp4" type="video/mp4"/>
      </video>
    )}
    <button type="button" className="story-motion-control presence-motion-control" onClick={toggle} aria-label={accessibleControlLabel}><span aria-hidden="true">{motionState==='playing'?'Ⅱ':motionState==='ended'?'↻':'▶'}</span>{controlLabel}</button>
  </div>
}

function ProductTextureMotion({autoPlayOnce,onAutoPlay,experiment}:{autoPlayOnce:boolean;onAutoPlay:()=>void;experiment:MotionExperiment}){
  const videoRef=useRef<HTMLVideoElement>(null);
  const regionRef=useRef<HTMLDivElement>(null);
  const attemptedAutoPlay=useRef(false);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
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
  if(reducedMotion)return <ResponsiveImage className="story-image" src="/assets/production/oil-texture.webp" mobileSrc="/assets/production/oil-texture-mobile.webp" alt="Deep violet-brown herbal oil flowing from a spoon"/>;
  const controlLabel=motionState==='playing'?'Pause':motionState==='ended'?'Replay':'Play';
  return <div ref={regionRef} className={`story-motion-shell ${motionState}`}>
    <video ref={videoRef} className="story-motion" muted playsInline autoPlay preload="metadata" poster="/assets/production/oil-texture.webp" aria-label="Deep violet-brown herbal oil dropping from a spoon into a brass vessel" onLoadedMetadata={event=>{const video=event.currentTarget;trackOnce('product_motion_loaded','product_motion_loaded',{experiment_id:experiment.id,experiment_variant:experiment.variant,duration_seconds:Number(video.duration.toFixed(3))})}} onError={()=>track('product_motion_error',{experiment_id:experiment.id,experiment_variant:experiment.variant,asset:'oil-texture'})} onPlay={()=>setMotionState('playing')} onPause={()=>setMotionState(current=>current==='ended'?'ended':'paused')} onEnded={()=>{setMotionState('ended');report('complete')}}>
      <source src="/assets/production/oil-texture-motion.webm" type="video/webm"/>
      <source src="/assets/production/oil-texture-motion.mp4" type="video/mp4"/>
    </video>
    <button type="button" className="story-motion-control" onClick={toggle} aria-label={`${controlLabel} oil texture motion`}><span aria-hidden="true">{motionState==='playing'?'Ⅱ':motionState==='ended'?'↻':'▶'}</span>{controlLabel}</button>
  </div>
}

function StoryGallery({slide,setSlide,experiment,onTextureExposure}:{slide:number;setSlide:Dispatch<SetStateAction<number>>;experiment:MotionExperiment;onTextureExposure:()=>void}){
  const touchStartX=useRef<number|null>(null);
  const touchStartY=useRef<number|null>(null);
  const pointerStartX=useRef<number|null>(null);
  const textureHasPlayed=useRef(false);
  const [direction,setDirection]=useState<'next'|'previous'>('next');
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)')||!isMotionEligible();
  const move=(nextDirection:'previous'|'next')=>{setDirection(nextDirection);setSlide(current=>{const target=nextDirection==='previous'?(current+slides.length-1)%slides.length:(current+1)%slides.length;track('gallery_navigated',{interaction:nextDirection,from_frame:current+1,to_frame:target+1,experiment_id:experiment.id,experiment_variant:experiment.variant});return target})};
  const previous=()=>move('previous');
  const next=()=>move('next');
  useEffect(()=>{
    trackOnce(`gallery_frame_viewed:${slide}`,'gallery_frame_viewed',{frame_index:slide+1,frame_name:slides[slide].shortLabel.toLowerCase(),experiment_id:experiment.id,experiment_variant:experiment.variant});
    if(slide===2){
      onTextureExposure();
      trackOnce('oil_texture_motion_v1:exposure','experiment_exposure',{experiment_id:experiment.id,experiment_variant:experiment.variant,motion_eligible:!reducedMotion});
    }
  },[experiment.id,experiment.variant,onTextureExposure,reducedMotion,slide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) next();
      else previous();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diffX = e.clientX - pointerStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) next();
      else previous();
    }
    pointerStartX.current = null;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Viewport Card */}
      <div 
        className="w-full max-h-[460px] aspect-[4/3] rounded-3xl overflow-hidden bg-[#f0edeb] relative shadow-sm border border-stone-200/80" 
        role="region" 
        aria-roledescription="carousel" 
        aria-label="Product image gallery" 
        tabIndex={0} 
        onKeyDown={event=>{if(event.key==='ArrowLeft')previous();if(event.key==='ArrowRight')next()}} 
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd} 
        onPointerDown={handlePointerDown} 
        onPointerUp={handlePointerUp} 
        style={{ touchAction: 'pan-y' }}
      >
        {slides[slide].src.endsWith('.mp4') || (slides[slide] as any).isVideo ? (
          <video 
            key={slides[slide].src}
            src={slides[slide].src} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover object-center" 
          />
        ) : (
          <img 
            src={slides[slide].src} 
            alt={slides[slide].label || "Neelibhringadi Keram"} 
            className="w-full h-full object-cover object-center" 
          />
        )}
        <div className="story-counter absolute top-4 left-4 z-20 bg-black/40 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono" aria-hidden="true">
          <span>{String(slide+1).padStart(2,'0')}</span><i className="mx-1 opacity-50">/</i><span>{String(slides.length).padStart(2,'0')}</span>
        </div>
        
        {/* Left Arrow */}
        <button 
          type="button" 
          onClick={previous} 
          aria-label="Previous gallery frame" 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <Arrow left/>
        </button>

        {/* Right Arrow */}
        <button 
          type="button" 
          onClick={next} 
          aria-label="Next gallery frame" 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-stone-800 hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <Arrow/>
        </button>
      </div>

      {/* Thumbnails Container - Hidden on Mobile, Centered on Desktop */}
      <div className="hidden sm:flex justify-center items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none" aria-label="Choose a gallery image">
        {slides.map((frame, index) => {
          const isThumbVideo = frame.src.endsWith('.mp4') || (frame as any).isVideo;
          return (
            <button
              key={frame.src}
              type="button"
              onClick={() => {
                setDirection(index < slide ? 'previous' : 'next');
                setSlide(index);
              }}
              className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all bg-[#f0edeb] relative ${
                index === slide ? 'border-stone-900 shadow-sm scale-105' : 'border-stone-200/80 hover:border-stone-400 opacity-70'
              }`}
              aria-label={`View thumbnail ${index + 1}: ${frame.label}`}
            >
              {isThumbVideo ? (
                <video src={frame.src} autoPlay loop muted playsInline className="w-full h-full object-cover object-center" />
              ) : (
                <img 
                  src={frame.src} 
                  alt={frame.label} 
                  className="w-full h-full object-cover object-center" 
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConfidenceStrip(){
  return (
    <div className="w-full bg-[#f2efe9] border-y border-stone-200/80 mb-10 text-left confidence-strip-wrapper">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 site-container">
        <div className="bg-[#f2efe9] rounded-2xl grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 md:gap-0 text-center divide-y-0 md:divide-x divide-stone-300/70">
          <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4 border-r md:border-r-0 border-stone-300/70">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-stone-900">
              4.7 / 5
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-600 uppercase mt-1">
              FROM 137 VERIFIED REVIEWS
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-stone-900">
              100% AUTHENTIC
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-600 uppercase mt-1">
              CLASSICAL THAILA PAAKA VIDHI
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-3 md:py-0 md:px-4 border-t md:border-t-0 border-stone-300/70 pt-4 md:pt-0">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-stone-900">
              SINCE 1945
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-600 uppercase mt-1">
              ROOTED IN AYURVEDIC LINEAGE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsSection(){
  return (
    <section className="w-full bg-[#efe6dc] border-b border-stone-200/80 py-10 md:py-14 text-left" id="results">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        <header className="mb-10 border-b border-stone-300/60 pb-6">
        <span className="text-[11px] tracking-[0.2em] text-stone-500 font-semibold uppercase mb-2 block font-sans">
          What to expect
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-snug tracking-tight">
          The honest sequence.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans">
          Based on consistent use as directed. Individual results may vary.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Constrained Video Media (lg:col-span-5) */}
        <figure className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-sm">
          <video 
            src="/assets/production/Honest_Sequence.mp4" 
            poster="/assets/production/Honest_Sequence.png"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[440px] aspect-[4/5] object-cover rounded-3xl shadow-sm pointer-events-none" 
          />
        </figure>

        {/* Right Side: Clean Unboxed Editorial Timeline (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {resultStages.map(([index, time, title, copy]) => (
            <div key={index} className="flex items-start gap-5 border-b border-stone-200/80 pb-0 mb-6 last:border-b-0 last:mb-0">
              <span className="text-2xl sm:text-3xl font-serif text-stone-400 font-light w-10 shrink-0 mt-0.5">
                {index}
              </span>
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest text-[#954721] font-semibold uppercase block">
                  {time}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-sans font-normal mt-1">
                  {copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}

function FormulaSection({v3=false}:{v3?:boolean}){
  return <PotentIngredientsSection />;
}

function RitualSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeLineHeight, setActiveLineHeight] = useState(0);
  const [totalLineHeight, setTotalLineHeight] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const updateLineHeights = () => {
      if (stepRefs.current[0] && stepRefs.current[3]) {
        const total = stepRefs.current[3]!.offsetTop - stepRefs.current[0]!.offsetTop;
        setTotalLineHeight(total);

        if (activeStepIndex === 0) {
          setActiveLineHeight(0);
        } else if (stepRefs.current[activeStepIndex]) {
          const activeDist = stepRefs.current[activeStepIndex]!.offsetTop - stepRefs.current[0]!.offsetTop;
          setActiveLineHeight(activeDist);
        }
      }
    };

    updateLineHeights();
    window.addEventListener('resize', updateLineHeights);
    return () => window.removeEventListener('resize', updateLineHeights);
  }, [activeStepIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerTop = window.innerHeight * 0.60;
      let currentActive = 0;

      stepRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerTop) {
            currentActive = index;
          }
        }
      });

      // Step 1 (index 0) is ALWAYS active
      setActiveStepIndex(Math.max(0, currentActive));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stepsData = [
    {
      step: "01",
      title: "Warm",
      points: [
        "Pour 10–15ml oil into a small bowl",
        "Warm gently in warm water",
        "Activates botanical lipid carriers"
      ],
    },
    {
      step: "02",
      title: "Apply",
      points: [
        "Part hair into small sections",
        "Apply warm oil directly onto scalp",
        "Ensure complete root-to-tip coverage"
      ],
    },
    {
      step: "03",
      title: "Massage",
      points: [
        "Massage scalp gently for 5–10 min",
        "Stimulates micro-circulation at roots",
        "Encourages deep herb absorption"
      ],
    },
    {
      step: "04",
      title: "Wash",
      points: [
        "Leave on for 30–60 min (or overnight)",
        "Rinse with mild Ayurvedic shampoo",
        "Restores lustre & hair strength"
      ],
    },
  ];

  return (
    <section 
      id="ritual"
      className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-14 text-left relative box-border"
    >
      {/* SEED.COM GRID CONTAINER WITH RESPONSIVE MOBILE ORDERING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start w-full">
        
        {/* MOBILE HEADER (Order 1 on mobile, hidden on desktop) */}
        <div className="w-full lg:hidden">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-stone-500 uppercase block font-sans mb-1">
            APPLICATION RITUAL
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-1">
            The Ritual Guide
          </h2>
        </div>

        {/* TOP FEATURED VIDEO (Order 2 on mobile, Desktop right column top) */}
        <div className="w-full lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm relative border border-stone-200/80 bg-stone-100 group">
            <video
              ref={videoRef}
              src="/videos/ritual-combined-4step.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay (Single Play/Pause Pill positioned directly on top of Gemini Logo) */}
            <div className="absolute bottom-[22px] right-[24px] sm:bottom-[48px] sm:right-[44px] z-20">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="bg-[#1c2c20]/80 hover:bg-[#1c2c20]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-md"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: VERTICAL TIMELINE STACK (Order 3 on mobile, Desktop left column) */}
        <div className="w-full lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 space-y-4">
          {/* DESKTOP HEADER (Hidden on mobile) */}
          <div className="hidden lg:block">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-stone-500 uppercase block font-sans mb-1">
              APPLICATION RITUAL
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-1">
              The Ritual Guide
            </h2>
          </div>

          {/* VERTICAL CONNECTED NODE TIMELINE (Dynamic DOM-measured exact line) */}
          <div className="relative pl-5 space-y-3.5">
            {/* Background Line (Exact distance from Dot 1 center to Dot 4 center) */}
            <div 
              className="absolute left-[6px] top-[14px] w-[2px] bg-stone-300 pointer-events-none"
              style={{ height: `${totalLineHeight}px` }}
            />

            {/* Active Progress Line (Exact distance from Dot 1 center to active Dot center) */}
            <div 
              className="absolute left-[6px] top-[14px] w-[2px] bg-stone-900 transition-all duration-300 pointer-events-none"
              style={{ height: `${activeLineHeight}px` }}
            />

            {stepsData.map((step, idx) => {
              const isPassedOrActive = idx <= activeStepIndex;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative transition-all duration-300 cursor-pointer ${
                    isPassedOrActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* Step Header Line (Dot, Badge, Title aligned horizontally in center) */}
                  <div className="flex items-center gap-2 mb-1 relative">
                    {/* Timeline Dot Node */}
                    <div
                      className={`absolute -left-[19px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${
                        isPassedOrActive
                          ? 'bg-stone-900 border-stone-900 ring-2 ring-stone-900/15'
                          : 'bg-stone-300 border-stone-100'
                      }`}
                    />

                    <span
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold font-sans transition-colors shrink-0 ${
                        isPassedOrActive
                          ? 'bg-[#2C3E2E] text-[#EFE6DC]'
                          : 'bg-stone-200/80 text-stone-600'
                      }`}
                    >
                      {step.step}
                    </span>
                    <h3 className="font-serif text-[16px] font-medium text-stone-900 leading-none">
                      {step.title}
                    </h3>
                  </div>

                  {/* Sub-bullet Points (Unbold font-normal text-stone-600) */}
                  <ul className="text-[11px] sm:text-xs font-normal text-stone-600 space-y-0.5 pl-1">
                    {step.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-snug font-normal">
                        <span className="text-stone-400 text-[9px] mt-0.5">•</span>
                        <span className="font-normal">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* SEED.COM DOSAGE CARD */}
          <div className="bg-[#f5f1eb] border border-stone-200/80 rounded-2xl p-3 flex items-center gap-3 mt-3 text-left">
            <div className="w-8 h-8 rounded-xl bg-[#2C3E2E]/10 text-[#2C3E2E] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 text-xs font-sans">How to Use:</h4>
              <p className="text-[11px] text-stone-600 font-sans leading-tight mt-0.5 font-normal">
                Apply 10–15ml 2–3x weekly. Leave 30–60 min before rinsing with gentle shampoo.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM MEDIA CARDS (Order 4 on mobile, Desktop right column bottom) */}
        <div className="w-full lg:col-span-7 lg:col-start-6 lg:row-start-2">
          <div className="grid grid-cols-12 gap-4 items-center w-full">
            {/* LEFT CARD: ROUNDED RECTANGLE (ROUNDED RECTANGLE.png) */}
            <div className="col-span-8 w-full h-[135px] sm:h-[165px] md:h-[200px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-sm border border-stone-200/80 bg-stone-100">
              <img
                src="/images/rounded-rectangle.png"
                alt="Ayurvedic Ritual Ingredients"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* RIGHT CARD: CIRCULAR BADGE (CIRCULAR BADGE.png) */}
            <div className="col-span-4 aspect-square w-full rounded-full overflow-hidden relative shadow-md border border-stone-200/80 bg-stone-100">
              <img
                src="/images/circular-badge.png"
                alt="Handheld Oil Bottle"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Seasonal Care & Guidance Cards */}
      <div className="w-full max-w-7xl mx-auto px-0 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left" aria-label="Ritual guidance & seasonal care">
        <aside className="bg-[#f8f6f0] border border-stone-200/80 p-6 sm:p-8 rounded-2xl shadow-xs" aria-label="Dosage & Application">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-widest font-semibold uppercase text-stone-500 mb-3 bg-stone-200/70 px-3 py-1 rounded-full">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <span>Dosage &amp; Application</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-2">Recommended Usage</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Apply 10–15ml onto the scalp twice or thrice weekly. Leave for 30–60 minutes before washing with a gentle, sulfate-free cleanser like Kerala Ayurveda Gentle Shampoo.
          </p>
        </aside>

        <aside className="bg-[#f8f6f0] border border-stone-200/80 p-6 sm:p-8 rounded-2xl shadow-xs" aria-label="Seasonal Care Guidance">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-widest font-semibold uppercase text-stone-500 mb-3 bg-stone-200/70 px-3 py-1 rounded-full">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Seasonal Care Guidance</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-2">Coconut Oil Base &amp; Winter Care</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            In cooler weather, unrefined coconut oil may naturally solidify. Place the sealed bottle in warm water for 2–3 minutes before use. This does not alter potency or active absorption.
          </p>
        </aside>
      </div>
    </section>
  );
}

function ReviewsSection(){
  const sectionRef=useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cycleToken,setCycleToken]=useState(0);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
  const reviewDuration=5000;
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

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
    setCycleToken((token) => token + 1);
  };
  const previous = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    setCycleToken((token) => token + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) next();
      else previous();
    }
    touchStartX.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diffX = e.clientX - pointerStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) next();
      else previous();
    }
    pointerStartX.current = null;
  };

  useEffect(() => {
    if (reducedMotion) return;
    const timeout = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
      setCycleToken((token) => token + 1);
    }, reviewDuration);
    return () => window.clearTimeout(timeout);
  }, [currentSlide,cycleToken,reducedMotion,reviews.length]);

  const chooseReview=(index:number)=>{setCurrentSlide(index);setCycleToken(token=>token+1)};

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-0 bg-[#faf8f5] py-12 text-center my-0 !mb-0 border-y border-stone-200/80 relative"
      id="reviews"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
      aria-label="Customer Reviews"
    >
      <div className="max-w-4xl mx-auto" key={currentSlide}>
        <span className="text-[10px] tracking-[0.25em] font-semibold text-stone-500 uppercase mb-4 block font-sans">
          CUSTOMER STORIES
        </span>

        <div className="text-[#8C4A27] text-lg tracking-widest mb-4 font-sans" aria-label="5 out of 5 stars">
          {reviews[currentSlide].rating}
        </div>

        <blockquote className="my-4">
          <p 
            className="font-serif italic text-[22px] md:text-[22px] !text-[22px] text-stone-900 leading-relaxed text-center max-w-4xl mx-auto tracking-normal"
            style={{ fontFamily: 'Amstir, Georgia, serif', fontStyle: 'italic', fontSize: '22px' }}
          >
            “{reviews[currentSlide].quote}”
          </p>
        </blockquote>

        <div className="mt-6">
          <strong className="font-sans font-bold text-xs md:text-sm tracking-widest text-stone-900 uppercase mt-6 text-center block">
            {reviews[currentSlide].author}
          </strong>
          <span className="font-sans text-xs text-stone-600 font-medium text-center mt-1 block">
            Verified Buyer • {reviews[currentSlide].variant} • {reviews[currentSlide].duration}
          </span>
        </div>
      </div>

      <div className="bg-[#f0edeb] border border-stone-300/60 px-5 py-2.5 rounded-full flex items-center gap-3 w-fit mx-auto mt-8 shadow-sm" role="tablist" aria-label="Choose a customer review">
        {reviews.map((review, index) => {
          const isActive = currentSlide === index;

          return (
            <button
              type="button"
              role="tab"
              key={review.author}
              aria-label={`Show review ${index + 1} from ${review.author}`}
              aria-selected={isActive}
              onClick={() => chooseReview(index)}
              className="focus:outline-none flex items-center justify-center cursor-pointer p-0.5"
            >
              {isActive ? (
                <div className="h-2 bg-stone-300/50 rounded-full overflow-hidden min-w-[36px] relative">
                  <div 
                    key={`${currentSlide}-${cycleToken}`}
                    className="bg-[#2C3E2E] rounded-full h-full"
                    style={{
                      animation: !reducedMotion ? `reviewProgress ${reviewDuration}ms linear forwards` : 'none',
                      width: !reducedMotion ? '0%' : '100%',
                    }}
                  />
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-stone-300/80 hover:bg-stone-400 transition-all" />
              )}
            </button>
          );
        })}
      </div>
      
      <p className="visually-hidden" aria-live="polite">Showing review {currentSlide + 1} of {reviews.length}, by {reviews[currentSlide].author}.</p>
    </section>
  );
}

function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#faf8f5] py-16 md:py-24 text-left border-t border-stone-300/60" id="faq">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <header className="lg:col-span-5 lg:sticky lg:top-32">
          <h2 className="font-serif italic text-4xl md:text-5xl text-stone-900 mb-4 leading-tight">
            FAQ's
          </h2>
          <p className="text-base text-stone-600 font-serif italic max-w-md leading-relaxed">
            Everything you need to know about formula, application, and results.
          </p>
        </header>

        <div className="lg:col-span-7 w-full border-t border-stone-300/70">
          {faqItems.map(([question, answer], index) => {
            const open = openItem === index;

            return (
              <div key={question} className="border-b border-stone-300/70 py-6 transition-all">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenItem(open ? null : index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-serif text-xl md:text-2xl text-stone-900 font-normal tracking-tight group-hover:text-stone-600 transition-colors">
                    {question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-stone-200/80 group-hover:bg-stone-900 group-hover:text-white text-stone-800 flex items-center justify-center text-lg font-mono font-medium ml-4 select-none shrink-0 transition-all">
                    {open ? '−' : '+'}
                  </span>
                </button>

                {open && (
                  <div id={`faq-answer-${index}`} className="mt-4 text-sm md:text-base text-stone-600 font-sans leading-relaxed max-w-2xl">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * APPROVED AND LOCKED PDP SECTION
 * Preserve the current layout, copy, styling and responsive behavior.
 * Do not modify without explicit approval.
 */
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
    <section className="difference-section" id="difference" data-section="approved-testimonial">
      <header className="difference-header pt-9">
        <span className="diff-eyebrow font-mono tracking-[0.2em]">OUR HERITAGE</span>
        <h2>The Kerala Ayurveda Difference</h2>
        <div className="w-20 h-0.5 bg-[#B5967B]/50 mx-auto mt-3 mb-1 rounded-full" />
      </header>
      <div className="difference-grid">
        <div className="difference-visual">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            src="/assets/production/slow-cooking.mp4"
            poster="/assets/production/slow-cooking.webp"
            className="diff-image diff-video"
          />
          <div className="diff-visual-overlay">
            <strong>Authentic Thaila Paaka Vidhi</strong>
            <span>48-hour traditional cooking process</span>
          </div>
        </div>
        <div className="difference-content">
          <p className="diff-lede font-sans font-semibold text-lg md:text-xl text-stone-800 mb-6">
            Why this traditional formula is difficult to replicate with modern assembly lines.
          </p>
          <div className="diff-accordion">
            {diffItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <article key={idx} className={`diff-acc-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(idx)}
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

/**
 * APPROVED AND LOCKED PDP SECTION
 * Preserve the current layout, copy, styling and responsive behavior.
 * Do not modify without explicit approval.
 */
function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);

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

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };
  const previous = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) next();
      else previous();
    }
    touchStartX.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diffX = e.clientX - pointerStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) next();
      else previous();
    }
    pointerStartX.current = null;
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  return (
    <section
      className="testimonials-section font-serif"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
      aria-label="Customer Testimonials"
      data-section="approved-testimonial"
    >
      <div className="testimonials-inner">
        <div className="testimonials-stars" aria-hidden="true">{reviews[currentSlide].rating}</div>
        <blockquote>
          <p className="font-serif italic font-normal text-2xl md:text-3xl text-stone-900 leading-relaxed">“{reviews[currentSlide].quote}”</p>
        </blockquote>
        <div className="testimonials-author">
          <strong className="font-sans text-sm tracking-wide text-stone-900">{reviews[currentSlide].author}</strong>
          <span className="font-mono text-xs uppercase text-stone-500 tracking-widest mt-1">Verified Buyer • {reviews[currentSlide].variant} • {reviews[currentSlide].duration}</span>
        </div>
        <div className="testimonials-controls">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={previous}
          >
            ←
          </button>
          <span aria-hidden="true">{currentSlide + 1} / {reviews.length}</span>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductDetailsSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeZoom = () => dialogRef.current?.close();

  return (
    <section className="w-full bg-[#faf8f5] py-16 md:py-24 text-left border-t border-stone-300/60" id="details">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-stone-900/10">
          <span className="text-[10px] tracking-[0.3em] font-mono text-stone-500 uppercase mb-3 block">
            SPECIFICATIONS &amp; FORMULA DATA
          </span>
          <h2 className="font-serif italic text-3xl md:text-4xl text-stone-900 leading-tight">
            Neelibhringadi Keram Specifications.
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-serif italic">
            Official formulation &amp; back-of-pack specifications sheet.
          </p>
        </div>

        {/* OPEN EDITORIAL SPEC SHEET GRID */}
        <div className="border-y border-stone-900/10 py-4 my-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Available Sizes</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">200 ml &amp; 100 ml bottles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Administration</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">External scalp &amp; hair application</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Formula Lineage</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">Sahasrayogam classical Ayurvedic reference (Thaila Paaka Vidhi)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">200 ml Value Pack</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">
              ₹338 <del className="text-stone-400 font-normal ml-2 text-sm font-sans">₹375</del> <span className="text-[#8c4a27] text-sm font-semibold ml-2 font-sans">(Save ₹37)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">100 ml Standard Pack</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">₹195</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Taxes &amp; Shipping</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">Inclusive of all taxes • Free delivery above ₹299</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200/60 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Recommended Usage</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">Apply 10–15ml to scalp 2–3 times weekly, leave for 30–60 mins</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-baseline">
            <span className="md:col-span-4 text-xs font-mono tracking-[0.2em] uppercase text-stone-500">Safety &amp; Cautions</span>
            <span className="md:col-span-8 font-serif text-lg text-stone-900 font-medium">For external use only. In winter (&lt;24°C), warm bottle in warm water.</span>
          </div>
        </div>

        {/* Pack Label Zoom CTA Button */}
        <div className="mt-8 text-center">
          <button
            ref={openerRef}
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="px-6 py-2.5 text-xs font-mono tracking-[0.2em] uppercase bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <span>+ Zoom Pack Label</span>
          </button>
        </div>

        {/* Enlarged Dialog Modal */}
        <dialog 
          ref={dialogRef} 
          className="pack-zoom-dialog p-0 rounded-2xl border border-stone-300 shadow-2xl backdrop:bg-stone-950/70 max-w-2xl w-full" 
          onClick={event => { if (event.target === event.currentTarget) closeZoom(); }} 
          onClose={() => openerRef.current?.focus()}
        >
          <div className="p-6 bg-[#FAF8F5] text-stone-900 rounded-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] tracking-widest text-stone-500 font-mono uppercase">Pack Information</span>
                <h3 className="font-serif italic text-xl text-stone-900">Back-Label Detail</h3>
              </div>
              <button 
                type="button" 
                onClick={closeZoom} 
                className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center text-base cursor-pointer"
                aria-label="Close enlarged pack label"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto flex items-center justify-center p-2 bg-stone-900/5 rounded-xl border border-stone-200/60">
              <img src="/assets/gallery/neeli-back.webp" alt="Enlarged back of the Neelibhringadi Keram carton" className="max-h-[500px] w-auto object-contain" />
            </div>
            <p className="text-xs text-stone-500 mt-4 text-center font-sans">
              Use the current physical pack as the final authority for ingredients, directions and cautions.
            </p>
          </div>
        </dialog>
      </div>
    </section>
  );
}

function HeritageSection() {
  return (
    <section className="w-full bg-[#faf8f5] py-20 md:py-28 text-center border-t border-stone-300/60" id="heritage">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        
        {/* Large Kinfolk Serif Statement */}
        <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-stone-500 block mb-4">
          HERITAGE &amp; ORIGINS
        </span>
        <h2 className="font-serif italic text-3xl md:text-5xl text-stone-900 text-center max-w-3xl mx-auto mb-12 leading-tight">
          80 Years of Uncompromised Ayurvedic Lineage.
        </h2>

        {/* 3-Column Kinfolk Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-left border-t border-stone-900/10 pt-12">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500">01 / FOUNDATION</span>
            <h3 className="font-serif text-xl text-stone-900 font-medium">Established in 1945</h3>
            <p className="text-xs md:text-sm text-stone-600 font-sans leading-relaxed">
              Founded by Vaidyan K.G.K. Panicker, Kerala Ayurveda manages its own organic herbal farms, clinical research centers, and educational academy.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500">02 / CRAFTSMANSHIP</span>
            <h3 className="font-serif text-xl text-stone-900 font-medium">Thaila Paaka Vidhi</h3>
            <p className="text-xs md:text-sm text-stone-600 font-sans leading-relaxed">
              Herbal decoction (Kashaya) and paste (Kalka) slow-cooked in raw coconut oil for 48 hours to lock in full-spectrum phyto-actives.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-500">03 / GLOBAL RECOGNITION</span>
            <h3 className="font-serif text-xl text-stone-900 font-medium">Patented Formulations</h3>
            <p className="text-xs md:text-sm text-stone-600 font-sans leading-relaxed">
              Proprietary Ayurvedic formulations patented in the United States, Japan, and Korea, backed by 350+ classical remedies.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="w-full bg-[#2C3E24] text-[#faf8f5] text-left py-16 md:py-24 border-t border-[#3a5230] font-sans relative z-10">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
        
        {/* Brand & Editorial Statement Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-14 border-b border-white/15 items-end">
          <div className="md:col-span-7">
            <span className="text-[10px] tracking-[0.3em] font-mono text-stone-300 uppercase block mb-3">
              KERALA AYURVEDA INDIA
            </span>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white leading-tight">
              Rooted in Authentic Ayurveda.
            </h3>
          </div>
          <div className="md:col-span-5 text-left md:text-right">
            <p className="text-xs text-stone-300 font-mono tracking-widest uppercase">
              EST. 1945 • KERALA, INDIA
            </p>
          </div>
        </div>

        {/* Kinfolk Unboxed Links Grid with Thin Hairline Top Borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-12">
          <div>
            <h4 className="text-xs tracking-widest uppercase font-mono text-[#CCA54E] font-bold mb-4">
              Formulations
            </h4>
            <ul className="space-y-3 font-mono text-xs tracking-widest uppercase text-stone-300">
              <li><a href="#product" className="hover:text-white transition-colors">Neelibhringadi</a></li>
              <li><a href="#formula" className="hover:text-white transition-colors">Botanicals</a></li>
              <li><a href="#ritual" className="hover:text-white transition-colors">Application Ritual</a></li>
              <li><a href="#details" className="hover:text-white transition-colors">Specifications</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-mono text-[#CCA54E] font-bold mb-4">
              Science
            </h4>
            <ul className="space-y-3 font-mono text-xs tracking-widest uppercase text-stone-300">
              <li><a href="https://keralaayurveda.com/pages/about-us-1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">80-Year Lineage</a></li>
              <li><a href="https://keralaayurveda.com/pages/research-and-development" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Thaila Paaka Vidhi</a></li>
              <li><a href="https://keralaayurveda.com/pages/our-editorial-team" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sahasrayogam</a></li>
              <li><a href="https://keralaayurveda.com/blogs/news" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Clinical Research</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-mono text-[#CCA54E] font-bold mb-4">
              Network
            </h4>
            <ul className="space-y-3 font-mono text-xs tracking-widest uppercase text-stone-300">
              <li><a href="https://keralaayurveda.com/pages/clinics" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ayurvedic Clinics</a></li>
              <li><a href="https://www.ayurvedagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ayurvedagram</a></li>
              <li><a href="https://keralaayurvedaacademy.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ayurveda Academy</a></li>
              <li><a href="https://www.thehealthvillage.biz/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">The Health Village</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase font-mono text-[#CCA54E] font-bold mb-4">
              Support
            </h4>
            <ul className="space-y-3 font-mono text-xs tracking-widest uppercase text-stone-300">
              <li><a href="https://wa.me/919995559842" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Consultation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help &amp; FAQs</a></li>
              <li><a href="https://keralaayurveda.com/pages/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="https://keralaayurveda.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest uppercase text-stone-400">
          <span>© 2026 Kerala Ayurveda Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/keralaayurvedaltd/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <span>•</span>
            <a href="https://www.youtube.com/@KeralaAyurvedalimited" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            <span>•</span>
            <a href="https://www.facebook.com/keralaayurvedaltd/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

function ChatGPTRightNav({ activeSection }: { activeSection: string }) {
  return (
    <nav
      className="chatgpt-expanding-nav hidden md:block"
      role="navigation"
      aria-label="Section navigation menu"
    >
      <div className="expanding-nav-list flex flex-col items-end gap-2 text-right">
        {navItems.map(([id, label]) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              className={`expanding-nav-item ${isActive ? 'active' : 'inactive'}`}
              onClick={() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function App(){
  const useV3=typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('version')!=='v2';
  const [slide,setSlide]=useState(0), [cart,setCart]=useState(0), [buyState,setBuyState]=useState<'ready'|'adding'|'added'>('ready');
  const [motionExperiment]=useState(getMotionExperiment);
  const [drawer,setDrawer]=useState(false);
  const [landscapeMenu,setLandscapeMenu]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [searchTerm,setSearchTerm]=useState('');
  const [searchStatus,setSearchStatus]=useState('');
  const [activeSection,setActiveSection]=useState('product');
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [scienceDockHidden,setScienceDockHidden]=useState(false);
  const [selectedSize,setSelectedSize]=useState<'100ml'|'200ml'>('200ml');
  const currentPrice=selectedSize==='200ml'?338:195;
  const currentMrp=selectedSize==='200ml'?375:215;
  const currentDiscount=selectedSize==='200ml'?'10% OFF':'9% OFF';
  const closeRef=useRef<HTMLButtonElement>(null);
  const drawerRef=useRef<HTMLElement>(null);
  const drawerOpenerRef=useRef<HTMLElement|null>(null);
  const heroCommerceRef=useRef<HTMLDivElement>(null);
  const searchRef=useRef<HTMLInputElement>(null);
  const textureExposed=useRef(false);
  const markTextureExposure=useCallback(()=>{textureExposed.current=true},[]);
  const trackScienceChapter=useCallback((chapter:number)=>trackOnce(`science_story_chapter:${chapter}`,'science_story_chapter_viewed',{chapter_index:chapter+1}),[]);
  const openDrawer=()=>{drawerOpenerRef.current=document.activeElement as HTMLElement;setDrawer(true)};
  const closeDrawer=()=>{setDrawer(false);requestAnimationFrame(()=>drawerOpenerRef.current?.focus())};
  useEffect(()=>{if(!drawer){document.body.classList.remove('locked');return}document.body.classList.add('locked');closeRef.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){closeDrawer();return}if(e.key!=='Tab'||!drawerRef.current)return;const controls=Array.from(drawerRef.current.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};addEventListener('keydown',key);return()=>{removeEventListener('keydown',key);document.body.classList.remove('locked')}},[drawer]);
  useEffect(()=>{if(!searchOpen)return;searchRef.current?.focus();const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setSearchOpen(false)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[searchOpen]);
  useEffect(()=>observeWebVitals(motionExperiment),[motionExperiment]);
  useEffect(()=>{const sections=navItems.map(([id])=>document.getElementById(id)).filter(Boolean) as HTMLElement[];const observer=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActiveSection(visible.target.id)},{rootMargin:'-28% 0px -58% 0px',threshold:[0,.2,.5]});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect()},[]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(()=>{const science=document.getElementById('science');if(!science)return;const observer=new IntersectionObserver(([entry])=>setScienceDockHidden(entry.isIntersecting),{threshold:0});observer.observe(science);return()=>observer.disconnect()},[]);
  useEffect(()=>{
    if(!isMotionEligible())return;
    const selectors=[
      '.checkpoint-hero',
      '.confidence-strip',
      '.statement',
      '.statement-header',
      '.statement-content',
      '.adapted-results',
      '.results-sequence-card',
      '.adapted-formula',
      '.comparison-v3',
      '.comparison-v3__anchor',
      '.comparison-v3__matchup',
      '.comparison-v3__consult',
      '.adapted-ritual',
      '.ritual-reassurance-card',
      '.ritual-temperature-card',
      '.adapted-reviews',
      '.adapted-faq',
      '.adapted-pack',
      '.adapted-heritage'
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
  useEffect(()=>{const sections=[['comparison','comparison_section_viewed'],['consultation','consultation_route_viewed']] as const;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const match=sections.find(([id])=>id===entry.target.id);if(match){trackOnce(`section_view:${match[0]}`,match[1],{section_id:match[0]});observer.unobserve(entry.target)}}),{threshold:.35});sections.forEach(([id])=>{const section=document.getElementById(id);if(section)observer.observe(section)});return()=>observer.disconnect()},[]);
  const add=(source:'hero'|'dock')=>{ if(buyState!=='ready')return; track('add_to_cart_clicked',{product_id:`neelibhringadi_keram_${selectedSize}`,purchase_source:source,value:currentPrice,currency:'INR',experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current});setBuyState('adding');setTimeout(()=>{setCart(c=>c+1);setBuyState('added');track('cart_product_added',{product_id:`neelibhringadi_keram_${selectedSize}`,purchase_source:source,value:currentPrice,currency:'INR',experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current});setTimeout(()=>setBuyState('ready'),520)},360)};
  const viewCart=(source:'hero'|'dock')=>{track('view_cart_clicked',{purchase_source:source,experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current,cart_quantity:cart});openDrawer()};
  const submitSearch=(event:FormEvent)=>{event.preventDefault();const query=searchTerm.trim().toLowerCase();if(!query)return;const targets=[{terms:'overview product neelibhringadi hair oil',id:'product'},{terms:'result results hair fall hair growth expect',id:'results'},{terms:'formula ingredient ingredients amla bhringaraj neeli coconut milk',id:'formula'},{terms:'mechanism science works recovery pathway shaft scalp follicle anagen',id:'science'},{terms:'ritual how to use apply massage wash mild shampoo',id:'ritual'},{terms:'compare comparison minoxidil serum rosemary alternative',id:'comparison'},{terms:'doctor consultation whatsapp persistent sudden clinical',id:'consultation'},{terms:'review reviews rating',id:'reviews'},{terms:'faq questions pregnancy coloured greying dandruff everyday science',id:'faq'},{terms:'details size pack label zoom external taxes price',id:'details'}];const match=targets.find(item=>item.terms.includes(query)||query.split(/\s+/).some(word=>word.length>2&&item.terms.includes(word)));if(match){document.getElementById(match.id)?.scrollIntoView({behavior:'smooth'});setSearchStatus(`Showing ${match.id==='product'?'product overview':match.id}.`);setSearchOpen(false)}else setSearchStatus('No matching section in this product prototype.')};
  return <>
    <a className="skip" href="#main">Skip to product</a>
    
    {/* Official Header (Matching Images 2 & 3) */}
    <header className="official-site-header sticky top-0 z-50 bg-[#F4F3F0] border-b border-stone-300/70 shadow-xs text-[#2C3E24]">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-4 site-container min-h-[62px]">
        
        {/* Mobile Header Layout (< lg) - Matching Image 3 */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <button type="button" aria-label="Open menu" className="p-1.5 text-[#2C3E24] hover:opacity-80 cursor-pointer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>

          <a className="brand flex items-center" href="#main" aria-label="Kerala Ayurveda home">
            <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="130" height="40" className="h-9 w-auto object-contain"/>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Open Search" className="p-1.5 text-[#2C3E24] hover:opacity-80 cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            <button type="button" aria-label="Account" className="p-1.5 text-[#2C3E24] hover:opacity-80 cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <button type="button" onClick={() => cart ? openDrawer() : document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Cart" className="relative p-1.5 text-[#2C3E24] hover:opacity-80 cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cart > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#954721] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cart}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Header Layout (>= lg) - Matching Image 2 */}
        <div className="hidden lg:flex items-center justify-between w-full gap-6">
          <form onSubmit={submitSearch} className="relative flex items-center bg-white border border-[#2C3E24]/60 rounded-full px-4 py-1.5 w-64 focus-within:w-72 transition-all duration-300 shadow-xs">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2C3E24" strokeWidth="2" className="mr-2 shrink-0"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search For Hair Care..."
              className="bg-transparent text-xs text-[#2C3E24] outline-none focus:outline-none focus:ring-0 border-0 w-full placeholder:text-stone-500 font-sans italic"
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </form>

          <a className="brand flex items-center" href="#main" aria-label="Kerala Ayurveda home">
            <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="145" height="45" className="h-11 w-auto object-contain"/>
          </a>

          <div className="flex items-center gap-6 text-xs font-semibold tracking-wide text-[#2C3E24]">
            <nav className="flex items-center gap-3.5 text-stone-700 font-sans">
              <a href="https://keralaayurveda.com/pages/clinics" target="_blank" rel="noopener noreferrer" className="hover:text-[#2C3E24] transition-colors">Clinics</a>
              <span className="text-stone-400">|</span>
              <a href="https://www.ayurvedagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2C3E24] transition-colors">Resorts</a>
              <span className="text-stone-400">|</span>
              <a href="https://www.thehealthvillage.biz" target="_blank" rel="noopener noreferrer" className="hover:text-[#2C3E24] transition-colors">Hospitals</a>
              <span className="text-stone-400">|</span>
              <a href="https://keralaayurvedaacademy.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#2C3E24] transition-colors">Academy</a>
            </nav>
            <div className="flex items-center gap-3.5 border-l border-stone-300/80 pl-5">
              <button type="button" aria-label="Account" className="text-[#2C3E24] hover:opacity-80 cursor-pointer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              <button type="button" onClick={() => cart ? openDrawer() : document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Cart" className="relative text-[#2C3E24] hover:opacity-80 cursor-pointer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {cart > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#954721] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cart}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Interactive Search Overlay (When Search Icon Clicked - Overlays existing elements in line) */}
        {searchOpen && (
          <div className="absolute inset-0 bg-[#F4F3F0] z-50 flex items-center px-4 sm:px-6 gap-3 shadow-md animate-fade-in">
            <form onSubmit={submitSearch} className="flex-1 flex items-center bg-white border border-[#2C3E24] rounded-full px-4 py-2 shadow-inner">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2C3E24" strokeWidth="2" className="mr-2.5 shrink-0"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input 
                ref={searchRef}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-sm text-[#2C3E24] outline-none focus:outline-none focus:ring-0 border-0 w-full font-sans"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
            </form>
            <button 
              type="button" 
              onClick={() => setSearchOpen(false)} 
              className="p-2 text-[#2C3E24] hover:bg-stone-200 rounded-full cursor-pointer shrink-0"
              aria-label="Close search overlay"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}
      </div>
    </header>
    <ChatGPTRightNav activeSection={activeSection} />
    <main id="main" className={scienceDockHidden?'science-is-active':undefined}>
      <section className="w-full bg-[#faf8f5] py-6 md:py-10 text-left" id="product">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Gallery & 3 Thumbnails (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="sm:hidden text-[11px] font-semibold tracking-wider text-stone-500 uppercase mb-2 px-1 font-sans">
                HOME &gt; NEELI BHRINGADI
              </div>
              <StoryGallery slide={slide} setSlide={setSlide} experiment={motionExperiment} onTextureExposure={markTextureExposure}/>
            </div>

            {/* Right Column: Product Details & Purchase (lg:col-span-5) */}
            <div ref={heroCommerceRef} className="lg:col-span-5 flex flex-col justify-between space-y-4" aria-label="Purchase details">
              <ProductIdentity/>

              <div className="hero-price-row">
                <div className="flex items-baseline gap-3">
                  <strong className="text-2xl md:text-3xl font-semibold text-stone-900 font-sans">₹{currentPrice}</strong>
                  <del className="text-stone-400 text-base line-through font-sans">₹{currentMrp}</del>
                  <span className="bg-[#cca54e] text-stone-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold font-sans">{currentDiscount}</span>
                </div>
                <p className="price-note text-xs text-stone-600 mt-1 font-sans">Inclusive of all taxes • Free delivery above ₹299</p>
              </div>

              <div className="size-selector mt-3">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mb-2 block font-sans">SELECT SIZE:</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button 
                    type="button" 
                    className={`p-4 rounded-2xl border flex flex-col justify-between relative text-left transition-all cursor-pointer ${selectedSize==='200ml'?'border-stone-900 bg-white shadow-xs':'border-stone-200/80 bg-white/40 hover:bg-white'}`} 
                    onClick={()=>setSelectedSize('200ml')}
                  >
                    <div className="flex items-center justify-between font-sans w-full">
                      <span className="font-bold text-stone-900 text-sm">200 ml</span>
                      <span className="font-bold text-stone-900 text-sm">₹338</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#954721] uppercase tracking-wider mt-2 block font-sans">Best value • Save ₹37</span>
                  </button>
                  <button 
                    type="button" 
                    className={`p-4 rounded-2xl border flex flex-col justify-between relative text-left transition-all cursor-pointer ${selectedSize==='100ml'?'border-stone-900 bg-white shadow-xs':'border-stone-200/80 bg-white/40 hover:bg-white'}`} 
                    onClick={()=>setSelectedSize('100ml')}
                  >
                    <div className="flex items-center justify-between font-sans w-full">
                      <span className="font-bold text-stone-900 text-sm">100 ml</span>
                      <span className="font-bold text-stone-700 text-sm">₹195</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-2 block font-sans">Standard Pack</span>
                  </button>
                </div>
              </div>

              <PurchaseAction cart={cart} buyState={buyState} price={currentPrice} onAdd={()=>add('hero')} onDecrease={()=>setCart(Math.max(0,cart-1))} onIncrease={()=>setCart(cart+1)} onViewCart={()=>viewCart('hero')}/>
              
              <div className="flex items-center justify-center gap-4 pt-1">
                <button type="button" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors cursor-pointer font-sans">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  <span>Add to Wishlist</span>
                </button>
                <span className="text-stone-300">•</span>
                <a href="#ingredients" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors cursor-pointer font-sans">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>Explore Ingredients</span>
                </a>
              </div>

              <div className="hero-reassurance-strip grid grid-cols-2 gap-x-3 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-4 text-xs font-medium text-stone-600 pt-2 border-t border-stone-200/80 font-sans">
                <span>✓ Free shipping above ₹499</span>
                <span>✓ COD available</span>
                <span>✓ 100% Authentic Ayurveda</span>
              </div>
              <p className="live" aria-live="polite">{buyState==='added'?'Product added to the cart':''}</p>
            </div>
          </div>
        </div>
      </section>
      <ConfidenceStrip/>

      <section className="w-full bg-[#efe6dc] py-16 md:py-20 text-left border-b border-stone-200/80 box-border" id="purity-statement">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
            
            {/* LEFT COLUMN: HEADER & TEXT LISTS (7 COLS) */}
            <div className="lg:col-span-7 space-y-8">
              {/* HEADER STACK */}
              <div>
                <span className="text-[10px] tracking-[0.25em] font-mono text-stone-500 uppercase block mb-2">
                  FORMULATION PURITY &amp; SOURCING
                </span>
                <h2 className="font-serif italic text-3xl md:text-4xl text-stone-900 mb-3 leading-tight">
                  What’s in it. What is not in it.
                </h2>
                <p className="text-xs md:text-sm text-stone-600 font-serif italic max-w-lg leading-relaxed">
                  Herbs sourced from their natural habitats. Neeli from Kerala's wetlands, Bhringraj from Western Ghats.
                </p>
              </div>

              {/* SIDE-BY-SIDE LISTS CONTAINER (2 COLUMNS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* COLUMN 1: WHAT'S IN IT */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-semibold border-b border-stone-300 pb-2 block mb-3">
                    ✦ INCLUDED (21 BOTANICALS)
                  </span>
                  <div className="space-y-2.5">
                    <div className="text-xs md:text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-emerald-800 text-[10px]">✦</span>
                      <span>21 Herbs in Coconut Oil</span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-emerald-800 text-[10px]">✦</span>
                      <span>Bhringraj for Hair Growth</span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-emerald-800 text-[10px]">✦</span>
                      <span>Amla for Natural Vitamin C</span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-emerald-800 text-[10px]">✦</span>
                      <span>Neeli for Scalp Cooling</span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-stone-800 flex items-center gap-2">
                      <span className="text-emerald-800 text-[10px]">✦</span>
                      <span>Coconut, Cow &amp; Goat Milks</span>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: FREE FROM */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-semibold border-b border-stone-300 pb-2 block mb-3">
                    — EXCLUDED (0% SYNTHETICS)
                  </span>
                  <div className="space-y-2.5">
                    <div className="text-xs md:text-sm font-normal text-stone-600 flex items-center gap-2">
                      <span className="text-stone-400 font-mono text-[10px]">—</span>
                      <span>No Mineral Oils or Paraffin</span>
                    </div>
                    <div className="text-xs md:text-sm font-normal text-stone-600 flex items-center gap-2">
                      <span className="text-stone-400 font-mono text-[10px]">—</span>
                      <span>No Synthetic Perfumes</span>
                    </div>
                    <div className="text-xs md:text-sm font-normal text-stone-600 flex items-center gap-2">
                      <span className="text-stone-400 font-mono text-[10px]">—</span>
                      <span>No Silicones or Parabens</span>
                    </div>
                    <div className="text-xs md:text-sm font-normal text-stone-600 flex items-center gap-2">
                      <span className="text-stone-400 font-mono text-[10px]">—</span>
                      <span>No Artificial Colorants</span>
                    </div>
                    <div className="text-xs md:text-sm font-normal text-stone-600 flex items-center gap-2">
                      <span className="text-stone-400 font-mono text-[10px]">—</span>
                      <span>Cruelty-Free &amp; Vegetarian</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STRICT 4:5 PORTRAIT VIDEO FRAME (5 COLS) */}
            <div className="lg:col-span-5 w-full">
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative shadow-md border border-stone-200/80 bg-stone-100">
                <video
                  src="/videos/purity-sourcing.mp4"
                  poster="/images/purity-botanicals.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Translucent Editorial Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/60 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center justify-between text-white border border-white/10">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-90">
                    Traditional Thaila Paaka Vidhi
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Pure
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ResultsSection/>

      <FormulaSection v3={useV3}/>

      {useV3?<ScienceStoryV3 onSceneChange={trackScienceChapter}/>:<ScienceRecoveryStory onChapterChange={trackScienceChapter}/>}

      {useV3?<ComparisonV3 consultHref={`https://wa.me/919995559842?text=${encodeURIComponent("I am viewing Neelibhringadi Keram and would like guidance on whether my hair-fall concern needs an Ayurveda consultation.")}`} onConsultClick={()=>track('consultation_cta_clicked',{source:'v3_comparison',channel:'whatsapp',product_id:'neelibhringadi_keram_200ml'})}/>:<RecoveryComparison/>}

      <RitualSection/>

      <FaqSection/>

      <ProductDetailsSection/>

      <ConsultationCTA consultHref={`https://wa.me/919995559842?text=${encodeURIComponent("I am viewing Neelibhringadi Keram and would like guidance on whether my hair-fall concern needs an Ayurveda consultation.")}`} onConsultClick={()=>track('consultation_cta_clicked',{source:'pre_heritage',channel:'whatsapp',product_id:'neelibhringadi_keram_200ml'})}/>

      <HeritageSection/>
    </main>
    <SiteFooter />

    {/* FLOATING PURCHASE DOCK */}
    <div 
      className={`fixed z-[9999] transition-all duration-300 ease-out pointer-events-auto ${
        showFloatingCTA && !scienceDockHidden
          ? 'opacity-100 translate-y-0 visible' 
          : 'opacity-0 translate-y-8 invisible pointer-events-none'
      }`}
      aria-label="Floating Sticky Purchase Bar"
      aria-hidden={!(showFloatingCTA && !scienceDockHidden)}
    >
      {/* DESKTOP DOCK (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-[9999] hidden md:flex items-center gap-3 p-2 pr-3 bg-[#FAF8F5]/95 backdrop-blur-md border border-stone-300/80 rounded-full shadow-2xl transition-all duration-300">
        <img
          src="/assets/gallery/neeli-front.webp"
          alt="Neelibhringadi Keram bottle"
          className="w-10 h-10 rounded-full bg-stone-100 object-cover overflow-hidden shrink-0 border border-stone-200/80"
        />
        <div className="flex flex-col text-left leading-tight pr-1">
          <h4 className="text-xs font-serif font-bold text-stone-900 leading-tight">
            Neelibhringadi Keram
          </h4>
          <p className="text-[11px] font-semibold text-stone-700 font-sans">
            ₹{currentPrice} <span className="text-[9px] text-stone-500 font-normal ml-0.5 font-sans">incl. taxes</span>
          </p>
        </div>
        <button
          type="button"
          disabled={buyState !== 'ready'}
          onClick={() => (cart > 0 ? openDrawer() : add('dock'))}
          className="bg-[#2C3E2E] hover:bg-[#1f2d21] text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          {cart > 0 ? `View Cart (${cart})` : 'Add to Cart'}
        </button>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-4 left-4 right-4 z-[9999] flex md:hidden items-center justify-between p-2.5 bg-[#FAF8F5]/95 backdrop-blur-md border border-stone-300/80 rounded-2xl shadow-xl transition-all duration-300">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/gallery/neeli-front.webp"
            alt="Neelibhringadi Keram bottle"
            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-stone-200/80"
          />
          <div className="flex flex-col text-left leading-tight">
            <h4 className="text-xs font-serif font-bold text-stone-900 leading-tight">
              Neelibhringadi Keram
            </h4>
            <p className="text-[11px] font-semibold text-stone-700 font-sans">
              ₹{currentPrice} <span className="text-[9px] text-stone-500 font-normal ml-0.5 font-sans">incl. taxes</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={buyState !== 'ready'}
          onClick={() => (cart > 0 ? openDrawer() : add('dock'))}
          className="bg-[#2C3E2E] hover:bg-[#1f2d21] text-white text-xs font-medium px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          {cart > 0 ? `View Cart (${cart})` : 'Add to Cart'}
        </button>
      </div>
    </div>

    <div className={`scrim ${drawer?'open':''}`} inert={!drawer} onMouseDown={e=>{if(e.target===e.currentTarget)closeDrawer()}} aria-hidden={!drawer}><section ref={drawerRef} className="drawer" role="dialog" aria-modal="true" aria-label="Your cart"><header><div><p>Your cart</p><h2>{cart?`${cart} item${cart>1?'s':''}`:'Your cart is empty'}</h2></div><button ref={closeRef} onClick={closeDrawer} aria-label="Close cart">×</button></header>{cart?<><div className="cart-item"><div className="cart-thumb"><img src="/assets/production/official-product.webp" alt="" width="609" height="1800"/></div><div><h3>Neelibhringadi Keram</h3><p>{selectedSize === '200ml' ? '200 ml' : '100 ml'}</p><strong>₹{currentPrice}</strong> <del>₹{currentMrp}</del></div><div className="quantity small"><button aria-label="Decrease quantity" onClick={()=>setCart(Math.max(0,cart-1))}>−</button><span>{cart}</span><button aria-label="Increase quantity" onClick={()=>setCart(cart+1)}>+</button></div></div><div className="subtotal"><span>Subtotal</span><strong>₹{currentPrice*cart}</strong></div><button className="checkout" onClick={()=>track('checkout_clicked',{experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current,cart_quantity:cart,value:currentPrice*cart,currency:'INR'})}>Checkout Now</button><small>Inclusive of all taxes</small></>:<p className="empty">Explore our range.</p>}</section></div>
  </>
}

export default App;
