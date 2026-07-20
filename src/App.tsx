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

const slides = [
  {src:'/assets/production/product-presence-poster.webp',mobileSrc:'/assets/production/product-presence-poster.webp',alt:'Official Neelibhringadi Keram bottle with Amla and coconut in warm natural light',label:'The complete hair recovery oil',eyebrow:'Complete hair recovery',shortLabel:'Oil',frameClass:'frame-product'},
  {src:'/assets/production/ingredients.webp',mobileSrc:'/assets/production/ingredients-mobile.webp',alt:'Amla, Neeli, Bhringaraj and coconut used in the formula',label:'Four powerful ingredients',eyebrow:'Key ingredients',shortLabel:'Ingredients',frameClass:'frame-ingredients'},
  {src:'/assets/production/oil-texture.webp',mobileSrc:'/assets/production/oil-texture-mobile.webp',alt:'Deep violet-brown herbal oil flowing from a spoon',label:'The medicated oil texture',eyebrow:'The coconut oil base',shortLabel:'Texture',frameClass:'frame-texture'},
  {src:'/assets/production/triple-milk.webp',mobileSrc:'/assets/production/triple-milk-mobile.webp',alt:'Cow milk, goat milk and coconut milk in three bowls',label:'The triple-milk formula',eyebrow:'The special base',shortLabel:'Three milks',frameClass:'frame-milks'},
  {src:'/assets/production/ritual.webp',mobileSrc:'/assets/production/ritual-mobile.webp',alt:'Woman receiving a gentle fingertip scalp massage',label:'The massage ritual',eyebrow:'The ritual guide',shortLabel:'Ritual',frameClass:'frame-ritual'},
  {src:'/assets/production/hair-result.webp',mobileSrc:'/assets/production/hair-result-mobile.webp',alt:'Woman with long dark hair holding Neelibhringadi Keram',label:'The honest results sequence',eyebrow:'What to expect',shortLabel:'Results',frameClass:'frame-results'},
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
  ['01','Warm','Warm oil penetrates—cold oil sits on the surface.'],
  ['02','Apply','Apply adequate amount gently onto the scalp and hair.'],
  ['03','Massage','Circular motion, 5 minutes. Fingertips, not nails.'],
  ['04','Wash','Rinse after 30 minutes to 1 hour with a mild shampoo.'],
];

const faqItems = [
  ['What is the full ingredients list?',<><b>Oil base:</b> Coconut oil (Cocos nucifera). <b>Primary ingredients:</b> Amla (Emblica officinalis), Bhringaraj (Eclipta alba), Neeli (Indigofera tinctoria), Karnasphota (Cardiospermum halicacabum). <b>Triple-milk base:</b> Cow milk (Dhenukshira), Goat milk (Ajakshira), and Coconut milk (Nalikerakshira). <b>Supporting herbs:</b> Yashtimadhu (Glycyrrhiza glabra), Dhatriphala (Phyllanthus emblica), Gunjamoola (Abrus precatorius), and Anjana.</>],
  ['How is it prepared?','Each bottle of Neelibhringadi Oil follows a 7-day process of preparation. It is prepared in small batches following the Thaila Paaka Vidhi process—a classical method requiring up to 48 hours of slow-heat extraction. Herbs are processed into a kashaya (decoction), and kalka (paste), then combined with the coconut oil base. The mixture is heated on low flame, stirred by hand, until the water content fully evaporates and the herbal essence binds to the oil.'],
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

function PurchaseAction({cart,buyState,onAdd,onDecrease,onIncrease,onViewCart,className='',price=338}:{cart:number;buyState:'ready'|'adding'|'added';onAdd:()=>void;onDecrease:()=>void;onIncrease:()=>void;onViewCart:()=>void;className?:string;price?:number}){
  if(cart>0)return <div className={`quantity purchase-action ${className}`}><button aria-label="Decrease quantity" onClick={onDecrease}>−</button><span aria-label={`${cart} in cart`}>{cart}</span><button aria-label="Increase quantity" onClick={onIncrease}>+</button><button className="viewbag" onClick={onViewCart}>View Bag <span className="viewbag-total">· ₹{price*cart}</span></button></div>;
  return <button className={`add ${buyState} ${className}`} disabled={buyState!=='ready'} onClick={onAdd}>{buyState==='ready'?'ADD TO BAG':buyState==='adding'?'Adding…':<><Check/> Added to Bag</>}</button>;
}

function ProductIdentity(){
  return <div className="product-identity">
    <p className="identity-overline">Kerala Ayurveda · Authentic Formulation</p>
    <h1>Neelibhringadi <span>Keram</span></h1>
    <p className="identity-subtitle">Ayurvedic scalp &amp; hair oil</p>
    
    <div className="identity-social-proof">
      <a className="identity-rating" href="#reviews" aria-label="4.8 out of 5, 137 reviews">
        <strong>4.8</strong>
        <span className="stars" aria-hidden="true">★★★★★</span>
        <u>137 reviews</u>
      </a>
      <span className="proof-pill">40,000+ bought last year</span>
    </div>

    <ul className="identity-benefits-list">
      <li><span className="check">✓</span> Reduced hair fall due to breakage</li>
      <li><span className="check">✓</span> Nourished scalp &amp; root strength</li>
      <li><span className="check">✓</span> Softer, healthier-looking hair</li>
    </ul>
  </div>
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
      }else if(entry.isIntersecting&&entry.intersectionRatio>=.4&&video.paused&&motionState==='playing'){
        void video.play().catch(()=>{});
      }
    },{threshold:[0,.4]});
    observer.observe(region);
    return()=>observer.disconnect();
  },[motionState,reducedMotion]);
  const alt='Official Neelibhringadi Keram bottle with Amla and coconut in warm natural light';
  if(reducedMotion)return <img className="story-image" src="/assets/production/product-presence-poster.webp" alt={alt} width="936" height="1248" loading="eager" fetchPriority="high"/>;
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
  return <div className="story-gallery" role="region" aria-roledescription="carousel" aria-label="Six-frame product story" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft')previous();if(event.key==='ArrowRight')next()}} onTouchStart={event=>{touchStartX.current=event.touches[0].clientX}} onTouchEnd={event=>{if(touchStartX.current===null)return;const distance=event.changedTouches[0].clientX-touchStartX.current;if(Math.abs(distance)>45)(distance<0?next:previous)();touchStartX.current=null}}>
    <div className={`story-frame story-${direction} ${slides[slide].frameClass}`} key={slide}>{slides[slide].frameClass==='frame-product'?<ProductPresenceMotion/>:slides[slide].frameClass==='frame-texture'?<ProductTextureMotion autoPlayOnce={!textureHasPlayed.current} onAutoPlay={()=>{textureHasPlayed.current=true}} experiment={experiment}/>:<ResponsiveImage className="story-image" src={slides[slide].src} mobileSrc={slides[slide].mobileSrc} alt={slides[slide].alt} priority={slide===0}/>}<div className="story-counter" aria-hidden="true"><span>{String(slide+1).padStart(2,'0')}</span><i/><span>{String(slides.length).padStart(2,'0')}</span></div><div className="story-arrows"><button onClick={previous} aria-label="Previous gallery frame"><Arrow left/></button><button onClick={next} aria-label="Next gallery frame"><Arrow/></button></div></div>
    <div className="story-caption" aria-live="polite"><span>{String(slide+1).padStart(2,'0')}</span><div><small>{slides[slide].eyebrow}</small><strong>{slides[slide].label}</strong></div></div>
    <div className="story-selector" aria-label="Choose a gallery frame">{slides.map((frame,index)=><button key={frame.src} className={index===slide?'selected':''} aria-label={`${index+1}: ${frame.label}`} aria-current={index===slide?'true':undefined} onClick={()=>{setDirection(index<slide?'previous':'next');track('gallery_navigated',{interaction:'selector',from_frame:slide+1,to_frame:index+1,experiment_id:experiment.id,experiment_variant:experiment.variant});setSlide(index)}}><span>{String(index+1).padStart(2,'0')}</span><b>{frame.shortLabel}</b></button>)}</div>
  </div>
}

function ConfidenceStrip(){
  return <section className="confidence-strip" aria-label="Product confidence"><div><strong>4.7 / 5</strong><span>from 137 reviews</span></div><div><strong>40,000+</strong><span>bought this year</span></div><div><strong>Since 1945</strong><span>rooted in authentic Ayurveda</span></div></section>
}

function ResultsSection(){
  return <section className="results section adapted-results" id="results">
    <header className="results-intro">
      <div>
        <p className="kicker">What to expect</p>
        <h2>The honest sequence.</h2>
      </div>
      <div className="results-intro-desc">
        <p>Based on consistent use as directed. Individual results may vary.</p>
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

function FormulaSection({v3=false}:{v3?:boolean}){
  const [activeIngredient,setActiveIngredient]=useState(0);
  const compactIngredients=useMediaQuery('(max-width: 699px)');
  const ingredientSource=v3?ingredientsV3:ingredients;
  return <section className="formula section adapted-formula" id="formula">
    <div className="formula-story">
      <div className="formula-heading"><p className="kicker">Key ingredients</p><h2>Three milks. One complete formula.</h2><p>{v3?'Five hero ingredients lead the formula. Cow, goat and coconut milks form its classical extraction platform, helping process water- and lipid-soluble herbal constituents into the coconut-oil base.':'Four hero ingredients lead the formula. Cow, goat and coconut milks form its classical extraction platform, helping process water- and lipid-soluble herbal constituents into the coconut-oil base.'}</p></div>
      <div className="formula-editorial" aria-label="Formula imagery">
        <figure className="formula-material ingredients-material"><div><ResponsiveImage src="/assets/production/ingredients.webp" mobileSrc="/assets/production/ingredients-mobile.webp" alt="Amla, Bhringaraj, Neeli and coconut oil"/></div><figcaption>{v3?'Four pictured ingredients · Karnasphota detailed in the index':'Four powerful ingredients'}</figcaption></figure>
        <figure className="formula-material milks-material"><div><ResponsiveImage src="/assets/production/triple-milk.webp" mobileSrc="/assets/production/triple-milk-mobile.webp" alt="Cow milk, goat milk and coconut milk"/></div><figcaption>The triple-milk base</figcaption></figure>
      </div>
      <figure className="formula-method"><div><ResponsiveImage src="/assets/production/slow-cooking.webp" mobileSrc="/assets/production/slow-cooking-mobile.webp" alt="Herbal oil prepared over low heat using Thaila Paaka Vidhi" width={1600} height={1067}/></div><figcaption>Slow-heat extraction through Thaila Paaka Vidhi</figcaption></figure>
    </div>
    <div className="ingredient-explorer"><div className="ingredient-heading"><span>Ingredient index</span>{compactIngredients&&<p>Tap an ingredient to read its role.</p>}</div><div className="ingredient-grid">{ingredientSource.map(([name,copy],i)=>{const label=<><span>0{i+1}</span><h3>{name}</h3>{compactIngredients&&<b aria-hidden="true">{activeIngredient===i?'−':'+'}</b>}</>;return <article key={name} className={`ingredient-entry ${activeIngredient===i?'active':''}`}>{compactIngredients?<button aria-expanded={activeIngredient===i} aria-controls={`ingredient-${i}`} onClick={()=>setActiveIngredient(activeIngredient===i?-1:i)}>{label}</button>:<div className="ingredient-label">{label}</div>}<div className="ingredient-copy" id={`ingredient-${i}`}><p>{copy}</p></div></article>})}</div><details className="full-ingredients"><summary>See the full ingredients list <span>+</span></summary><p><b>Oil base:</b> Coconut oil (Cocos nucifera). <b>Primary ingredients:</b> Amla (Emblica officinalis), Bhringaraj (Eclipta alba), Neeli (Indigofera tinctoria), Karnasphota (Cardiospermum halicacabum). <b>Triple-milk base:</b> Cow milk (Dhenukshira), Goat milk (Ajakshira), and Coconut milk (Nalikerakshira). <b>Supporting herbs:</b> Yashtimadhu (Glycyrrhiza glabra), Dhatriphala (Phyllanthus emblica), Gunjamoola (Abrus precatorius), and Anjana.</p></details></div>
  </section>
}

function RitualSection(){
  return <section className="ritual section adapted-ritual" id="ritual">
    <div className="ritual-intro"><p className="kicker">The ritual guide</p><h2>Warm. Apply.<br/>Massage. Wash.</h2><p>Use 2× weekly. Massage into the scalp and hair, leave for 30–60 minutes, then rinse with a mild shampoo.</p></div>
    <figure className="ritual-media"><div><ResponsiveImage src="/assets/production/ritual.webp" mobileSrc="/assets/production/ritual-mobile.webp" alt="Gentle fingertip scalp massage" width={1600} height={1200}/></div><figcaption>2× weekly · 30–60 minutes · wash out</figcaption></figure>
    <ol className="ritual-steps">{ritualSteps.map(([index,title,copy])=><li key={index}><span>{index}</span><div><b>{title}</b><p>{copy}</p></div></li>)}</ol>
    <div className="ritual-guidance-grid">
      <aside className="ritual-reassurance-card" aria-label="What to expect from the ritual">
        <div className="ritual-card-badge">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          <span>Dosage & Application</span>
        </div>
        <strong>Rich by design. Easier with the right amount.</strong>
        <p>This is a pre-wash oil, so it will feel richer than a leave-in serum. Start small and adjust for your hair density. Consistency matters more than vigorous rubbing or leaving it on overnight.</p>
        <div className="ritual-card-chips">
          <span>Start with 5–10 ml</span>
          <span>Focus on scalp roots</span>
          <span>Consistency over intensity</span>
        </div>
      </aside>
      <div className="ritual-temperature-card" aria-label="Seasonal care advice">
        <div className="ritual-card-badge">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          <span>Seasonal Care</span>
        </div>
        <strong>In cooler weather, the coconut oil base may solidify.</strong>
        <p>Because Neelibhringadi Keram uses pure, unrefined coconut oil as its base, it naturally solidifies below 24°C. Warm the bottle gently in a bowl of warm water before use to restore its smooth fluid flow.</p>
        <div className="ritual-card-chips">
          <span>100% Pure Coconut Base</span>
          <span>Warm gently in water</span>
          <span>Preserves herbal potency</span>
        </div>
      </div>
    </div>
  </section>
}

function ReviewsSection(){
  return <section className="reviews section adapted-reviews verified-reviews" id="reviews">
    <div className="review-score"><p className="kicker">Customer reviews</p><div><strong>4.7</strong><span>/ 5.0</span></div><p className="review-stars" aria-label="4.7 out of 5">★★★★★</p><p>137 reviews</p></div>
    <blockquote><span className="quote-mark" aria-hidden="true">“</span><p>This oil exceeded my expectation. I used it 2/3 times a week for a month, my hair fall has reduced drastically.</p><footer><div><strong>Lipika</strong><span><Check/> Verified purchase</span></div><small>Review shortened</small></footer></blockquote>
    <div className="review-proof"><strong>40,000+</strong><span>Bought this year</span></div>
  </section>
}

function FaqSection(){
  const [openItem,setOpenItem]=useState<number|null>(0);
  return <section className="faq section adapted-faq" id="faq"><header><p className="kicker">Product questions</p><h2>FAQs</h2><p>{String(faqItems.length).padStart(2,'0')} questions</p></header><div className="faq-list">{faqItems.map(([question,answer],index)=>{const open=openItem===index;return <article className={open?'open':''} key={question}><h3><button aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={()=>setOpenItem(open?null:index)}><span>{String(index+1).padStart(2,'0')}</span><b>{question}</b><i aria-hidden="true">{open?'−':'+'}</i></button></h3><div id={`faq-answer-${index}`} className="faq-answer" role="region" aria-label={question} hidden={!open}><p>{answer}</p></div></article>})}</div></section>
}

function ProductDetailsSection(){
  const dialogRef=useRef<HTMLDialogElement>(null);
  const openerRef=useRef<HTMLButtonElement>(null);
  const closeZoom=()=>dialogRef.current?.close();
  return <section className="pack-facts adapted-pack" id="details"><div className="pack-heading"><p className="kicker">Product details</p><h2>200 ml</h2><p>Neelibhringadi Keram</p></div><dl className="pack-list"><div><dt>Size</dt><dd>200 ml</dd></div><div><dt>Administration</dt><dd>External use only</dd></div><div><dt>In cooler weather</dt><dd>The coconut oil base may solidify.</dd></div><div><dt>Price</dt><dd><del>₹375</del> ₹338 · Inclusive of all taxes</dd></div></dl><figure className="pack-image"><button ref={openerRef} type="button" className="pack-zoom-trigger" onClick={()=>dialogRef.current?.showModal()} aria-haspopup="dialog"><img src="/assets/gallery/neeli-back.webp" alt="Back of the Neelibhringadi Keram carton showing product information" width="1080" height="1080" loading="lazy"/><span><b aria-hidden="true">＋</b> Zoom pack label</span></button><figcaption>Pack information · Select to enlarge</figcaption></figure><dialog ref={dialogRef} className="pack-zoom-dialog" aria-labelledby="pack-zoom-title" onClick={event=>{if(event.target===event.currentTarget)closeZoom()}} onClose={()=>openerRef.current?.focus()}><div className="pack-zoom-panel"><header><div><p className="kicker">Pack information</p><h2 id="pack-zoom-title">Back-label detail</h2></div><button type="button" onClick={closeZoom} aria-label="Close enlarged pack label">×</button></header><div className="pack-zoom-image" tabIndex={0} aria-label="Scrollable enlarged pack label"><img src="/assets/gallery/neeli-back.webp" alt="Enlarged back of the Neelibhringadi Keram carton" width="1080" height="1080"/></div><p>Scroll to inspect the label. Use the current physical pack as the final authority for ingredients, directions and cautions.</p></div></dialog></section>
}

function HeritageSection(){
  return <section className="heritage adapted-heritage"><div className="heritage-title"><p className="kicker">Kerala Ayurveda</p><h2>Rooted in Authentic Ayurveda.</h2></div><div className="heritage-metrics"><div><strong>1945</strong><span>Established</span></div><div><strong>350+</strong><span>Products</span></div><div><strong>Expert led</strong><span>Clinics &amp; Academy</span></div></div><div className="heritage-spectrum"><p>Full Spectrum</p><span>Classical and Proprietary Ayurvedic Products (350+ Products) · Therapies and Ayurvedic Retreats · Academy and Education Initiatives · Pioneering Ayurvedic R&amp;D</span></div><div className="heritage-patents"><p>Globally Recognized</p><h3>Patented formulations</h3><span>Patented products in the United States, Japan and Korea.</span></div></section>
}

function SiteFooter(){
  const groups = [
    { title: 'Quick Links', links: [['Shop', '#product'], ['Results', '#results'], ['Formula', '#formula'], ['How to use', '#ritual']] },
    { title: 'Policies', links: [['Shipping & returns', '#faq'], ['Privacy policy', '#faq'], ['Terms of service', '#faq']] },
    { title: 'Our Network', links: [['Kerala Ayurveda', 'https://keralaayurveda.com'], ['Journal', '#science'], ['Consult an expert', '#consultation']] },
  ] as const;
  return <footer className="theme-footer">
    <div className="theme-footer__wrap">
      <div className="theme-footer__grid">
        <div className="theme-footer__brand"><img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="130" height="130"/><span>Kerala Ayurveda</span></div>
        {groups.map(group => <div className="theme-footer__column" key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></div>)}
      </div>
      <div className="theme-footer__social"><strong>Follow Us</strong><div><a href="https://www.instagram.com/keralaayurvedaltd/?hl=en" aria-label="Instagram">◎</a><a href="https://www.youtube.com/@KeralaAyurvedalimited" aria-label="YouTube">▶</a><a href="https://www.facebook.com/keralaayurvedaltd/" aria-label="Facebook">f</a><a href="https://in.linkedin.com/company/kerala-ayurveda" aria-label="LinkedIn">in</a></div></div>
      <p className="theme-footer__tagline">Rooted in authentic Ayurveda.</p>
    </div>
    <div className="theme-footer__decoration" aria-hidden="true" />
  </footer>
}

function App(){
  // V3 is the canonical PDP. Keep the earlier composition available only for
  // deliberate regression checks via ?version=v2, so the root URL cannot
  // silently render a different product experience.
  const useV3=typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('version')!=='v2';
  const [slide,setSlide]=useState(0), [cart,setCart]=useState(0), [buyState,setBuyState]=useState<'ready'|'adding'|'added'>('ready');
  const [motionExperiment]=useState(getMotionExperiment);
  const [drawer,setDrawer]=useState(false);
  const [landscapeMenu,setLandscapeMenu]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [searchTerm,setSearchTerm]=useState('');
  const [searchStatus,setSearchStatus]=useState('');
  const [activeSection,setActiveSection]=useState('product');
  const [dockVisible,setDockVisible]=useState(false);
  const [scienceDockHidden,setScienceDockHidden]=useState(false);
  const [selectedSize,setSelectedSize]=useState<'100ml'|'200ml'>('200ml');
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
  useEffect(()=>{if(!drawer){document.body.classList.remove('locked');return}document.body.classList.add('locked');closeRef.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){closeDrawer();return}if(e.key!=='Tab'||!drawerRef.current)return;const controls=Array.from(drawerRef.current.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};addEventListener('keydown',key);return()=>{removeEventListener('keydown',key);document.body.classList.remove('locked')}},[drawer]);
  useEffect(()=>{if(!searchOpen)return;searchRef.current?.focus();const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setSearchOpen(false)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[searchOpen]);
  useEffect(()=>observeWebVitals(motionExperiment),[motionExperiment]);
  useEffect(()=>{const sections=navItems.map(([id])=>document.getElementById(id)).filter(Boolean) as HTMLElement[];const observer=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActiveSection(visible.target.id)},{rootMargin:'-28% 0px -58% 0px',threshold:[0,.2,.5]});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect()},[]);
  useEffect(()=>{const commerce=heroCommerceRef.current;if(!commerce)return;const observer=new IntersectionObserver(([entry])=>setDockVisible(!entry.isIntersecting&&entry.boundingClientRect.bottom<0),{threshold:[0,.15]});observer.observe(commerce);return()=>observer.disconnect()},[]);
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
    <header className={`header ${searchOpen?'searching':''}`}><a className="brand" href="#main" aria-label="Kerala Ayurveda home"><img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="130" height="130"/></a><nav className="header-primary-nav" aria-label="Primary navigation"><a href="#product">Shop</a><a href="#formula">Ayurveda</a><a href="#science">Our approach</a><a href="#reviews">Journal</a></nav>{searchOpen&&<form className="header-search" role="search" onSubmit={submitSearch}><Search/><label className="visually-hidden" htmlFor="site-search">Search this product page</label><input ref={searchRef} id="site-search" value={searchTerm} onChange={event=>setSearchTerm(event.target.value)} placeholder="Search results, ingredients, how to use…" autoComplete="off"/><button className="search-submit" type="submit"><span className="search-submit-desktop">Search</span><span className="search-submit-mobile">Go</span></button><button className="search-close" type="button" onClick={()=>setSearchOpen(false)} aria-label="Close search">×</button></form>}<div className="header-actions"><button className="search-button" onClick={()=>setSearchOpen(true)} aria-expanded={searchOpen} aria-label="Open search"><Search/></button><button className="header-bag" type="button" onClick={()=>cart?openDrawer():document.getElementById('product')?.scrollIntoView({behavior:'smooth'})} aria-label={cart?`Open bag, ${cart} item${cart>1?'s':''}`:'View product purchase options'}>Bag{cart>0&&<span>{cart}</span>}</button></div><p className="live" aria-live="polite">{searchStatus}</p></header>
    {useV3?<PdpSectionNavV3/>:<nav className="anchorbar" aria-label="Product sections">{navItems.map(([id,label])=><a key={id} href={`#${id}`} className={`standard-nav-link ${activeSection===id?'active':''}`} aria-current={activeSection===id?'location':undefined}>{label}</a>)}<button className="landscape-trigger" aria-expanded={landscapeMenu} aria-controls="landscape-sections" onClick={()=>setLandscapeMenu(open=>!open)}>Sections <span>{landscapeMenu?'−':'+'}</span></button><div id="landscape-sections" className={`landscape-menu ${landscapeMenu?'open':''}`}>{navItems.map(([id,label])=><a key={id} href={`#${id}`} className={activeSection===id?'active':''} onClick={()=>setLandscapeMenu(false)}>{label}</a>)}</div></nav>}
    <main id="main" className={scienceDockHidden?'science-is-active':undefined}>
      <section className="hero checkpoint-hero" id="product">
        <ProductIdentity/>
        <StoryGallery slide={slide} setSlide={setSlide} experiment={motionExperiment} onTextureExposure={markTextureExposure}/>
        <section ref={heroCommerceRef} className="hero-commerce" aria-label="Purchase details">
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
          <PurchaseAction cart={cart} buyState={buyState} price={currentPrice} onAdd={()=>add('hero')} onDecrease={()=>setCart(Math.max(0,cart-1))} onIncrease={()=>setCart(cart+1)} onViewCart={()=>viewCart('hero')} className="hero-purchase-action"/>
          <div className="hero-reassurance-strip">
            <span>✓ Free shipping above ₹499</span>
            <span>✓ COD available</span>
            <span>✓ 100% Authentic Ayurveda</span>
          </div>
          <p className="live" aria-live="polite">{buyState==='added'?'Product added to the cart':''}</p>
        </section>
      </section>
      <ConfidenceStrip/>

      <section className="statement">
        <div className="statement-header">
          <p className="kicker">Formulation Purity &amp; Sourcing</p>
          <h2>What’s in it.<br/>What is not in it.</h2>
          <p className="statement-location">Herbs sourced from their natural habitats. Neeli from Kerala’s wetlands, Bhringraj from the Western Ghats, Amla from Chhattisgarh.</p>
        </div>
        <div className="statement-split">
          <div className="statement-positive">
            <h3>WHAT’S IN IT</h3>
            <ul>
              <li><b>21 Ayurvedic ingredients</b> slow-cooked in unrefined coconut oil</li>
              <li><b>Bhringraj</b> — Traditionally used for scalp &amp; root care</li>
              <li><b>Amla</b> — Natural Vitamin C &amp; antioxidant support</li>
              <li><b>Neeli &amp; Karnasphota</b> — Deep scalp cooling &amp; hair fibre protection</li>
              <li><b>Three milks</b> — Coconut, Cow &amp; Goat milk nourishment</li>
            </ul>
          </div>
          <div className="statement-exclusion">
            <h3>WHAT’S NOT IN IT</h3>
            <div className="statement-free-from">
              <span>✕ No mineral oil</span>
              <span>✕ No artificial fragrance</span>
              <span>✕ No silicones</span>
              <span>✕ No parabens</span>
              <span>✕ No synthetic colours</span>
            </div>
          </div>
        </div>
      </section>

      <ResultsSection/>

      <FormulaSection v3={useV3}/>

      {useV3?<ScienceStoryV3 onSceneChange={trackScienceChapter}/>:<ScienceRecoveryStory onChapterChange={trackScienceChapter}/>}

      {useV3?<ComparisonV3 consultHref={`https://wa.me/919995559842?text=${encodeURIComponent("I am viewing Neelibhringadi Keram and would like guidance on whether my hair-fall concern needs an Ayurveda consultation.")}`} onConsultClick={()=>track('consultation_cta_clicked',{source:'v3_comparison',channel:'whatsapp',product_id:'neelibhringadi_keram_200ml'})}/>:<RecoveryComparison/>}

      {!useV3&&<ConsultationCTA consultHref={`https://wa.me/919995559842?text=${encodeURIComponent("I am viewing Neelibhringadi Keram and would like guidance on whether my hair-fall concern needs an Ayurveda consultation.")}`} onConsultClick={()=>track('consultation_cta_clicked',{source:'post_comparison',channel:'whatsapp',product_id:'neelibhringadi_keram_200ml'})}/>}

      <RitualSection/>

      <ReviewsSection/>

      <FaqSection/>

      <ProductDetailsSection/>
      <HeritageSection/>
    </main>
    <SiteFooter />

    <aside className={`purchase contextual-purchase ${dockVisible&&!scienceDockHidden?'visible':''}`} aria-label="Purchase Neelibhringadi Keram" aria-hidden={!(dockVisible&&!scienceDockHidden)} inert={!(dockVisible&&!scienceDockHidden)}>
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

    <div className={`scrim ${drawer?'open':''}`} inert={!drawer} onMouseDown={e=>{if(e.target===e.currentTarget)closeDrawer()}} aria-hidden={!drawer}><section ref={drawerRef} className="drawer" role="dialog" aria-modal="true" aria-label="Your bag"><header><div><p>Your bag</p><h2>{cart?`${cart} item${cart>1?'s':''}`:'Your cart is empty'}</h2></div><button ref={closeRef} onClick={closeDrawer} aria-label="Close bag">×</button></header>{cart?<><div className="cart-item"><div className="cart-thumb"><img src="/assets/production/official-product.webp" alt="" width="609" height="1800"/></div><div><h3>Neelibhringadi Keram</h3><p>200 ml</p><strong>₹338</strong> <del>₹375</del></div><div className="quantity small"><button aria-label="Decrease quantity" onClick={()=>setCart(Math.max(0,cart-1))}>−</button><span>{cart}</span><button aria-label="Increase quantity" onClick={()=>setCart(cart+1)}>+</button></div></div><div className="subtotal"><span>Subtotal</span><strong>₹{338*cart}</strong></div><button className="checkout" onClick={()=>track('checkout_clicked',{experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current,cart_quantity:cart,value:338*cart,currency:'INR'})}>Checkout Now</button><small>Inclusive of all taxes</small></>:<p className="empty">Explore our range.</p>}</section></div>
  </>
}

export default App;
