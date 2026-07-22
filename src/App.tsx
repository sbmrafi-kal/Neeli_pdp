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
  {src:'/assets/production/product-presence-poster.webp',mobileSrc:'/assets/production/product-presence-poster.webp',alt:'Official Neelibhringadi Keram bottle with Amla and coconut in warm natural light',label:'The complete hair recovery oil',eyebrow:'Complete hair recovery',shortLabel:'Bottle',frameClass:'frame-product'},
  {src:'/assets/production/oil-texture.webp',mobileSrc:'/assets/production/oil-texture-mobile.webp',alt:'Deep violet-brown herbal oil flowing from a spoon',label:'The medicated oil texture',eyebrow:'The coconut oil base',shortLabel:'Texture',frameClass:'frame-texture'},
  {src:'/assets/production/ritual.webp',mobileSrc:'/assets/production/ritual-mobile.webp',alt:'Woman receiving a gentle fingertip scalp massage',label:'Fingertip scalp massage',eyebrow:'Ritual use',shortLabel:'Massage',frameClass:'frame-ritual'},
  {src:'/assets/production/ingredients.webp',mobileSrc:'/assets/production/ingredients-mobile.webp',alt:'Amla, Neeli, Bhringaraj and coconut used in the formula',label:'Four powerful ingredients',eyebrow:'Key ingredients',shortLabel:'Herbs',frameClass:'frame-ingredients'},
  {src:'/assets/production/triple-milk.webp',mobileSrc:'/assets/production/triple-milk-mobile.webp',alt:'Cow milk, goat milk and coconut milk in three bowls',label:'The triple-milk formula',eyebrow:'The special base',shortLabel:'Milks',frameClass:'frame-milks'},
  {src:'/assets/production/hair-result.webp',mobileSrc:'/assets/production/hair-result-mobile.webp',alt:'Woman with long dark hair holding Neelibhringadi Keram',label:'The honest results sequence',eyebrow:'What to expect',shortLabel:'Video',frameClass:'frame-results'},
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

function PurchaseAction({cart,buyState,onAdd,onDecrease,onIncrease,onViewCart,className='',price=338}:{cart:number;buyState:'ready'|'adding'|'added';onAdd:()=>void;onDecrease:()=>void;onIncrease:()=>void;onViewCart:()=>void;className?:string;price?:number}){
  if(cart>0)return <div className={`quantity purchase-action ${className}`}><button aria-label="Decrease quantity" onClick={onDecrease}>−</button><span aria-label={`${cart} in cart`}>{cart}</span><button aria-label="Increase quantity" onClick={onIncrease}>+</button><button className="viewbag" onClick={onViewCart}>View Cart <span className="viewbag-total">· ₹{price*cart}</span></button></div>;
  return <button className={`add ${buyState} ${className}`} disabled={buyState!=='ready'} onClick={onAdd}>{buyState==='ready'?'ADD TO CART':buyState==='adding'?'Adding…':<><Check/> Added to Cart</>}</button>;
}

function ProductIdentity(){
  return <div className="product-identity">
    <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
      <a href="#shop">Shop</a>
      <span className="separator">/</span>
      <a href="#hair-care">Hair Care</a>
      <span className="separator hide-mobile">/</span>
      <a href="#hair-oils" className="hide-mobile">Hair Oils</a>
      <span className="separator hide-mobile">/</span>
      <span className="current hide-mobile">Neelibhringadi Keram</span>
    </nav>
    <h1>Neelibhringadi <span>Keram</span></h1>
    <p className="identity-subtitle">
      Traditional 48-hour slow-cooked Ayurvedic hair oil infused with Bhringraj, Neeli, and triple milks—formulated to strengthen roots, reduce hair fall, and nourish the scalp.
    </p>
  </div>
}

function ProductProof(){
  return <div className="product-proof">
    <div className="identity-social-proof">
      <span className="proof-pill">40,000+ bought last year</span>
    </div>
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

  return <div className="story-gallery" role="region" aria-roledescription="carousel" aria-label="Six-frame product story" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft')previous();if(event.key==='ArrowRight')next()}} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} style={{ touchAction: 'pan-y' }}>
    <div className={`story-frame story-${direction} ${slides[slide].frameClass}`} key={slide}>{slides[slide].frameClass==='frame-product'?<ProductPresenceMotion/>:slides[slide].frameClass==='frame-texture'?<ProductTextureMotion autoPlayOnce={!textureHasPlayed.current} onAutoPlay={()=>{textureHasPlayed.current=true}} experiment={experiment}/>:<ResponsiveImage className="story-image" src={slides[slide].src} mobileSrc={slides[slide].mobileSrc} alt={slides[slide].alt} priority={slide===0}/>}<div className="story-counter" aria-hidden="true"><span>{String(slide+1).padStart(2,'0')}</span><i/><span>{String(slides.length).padStart(2,'0')}</span></div><div className="story-arrows"><button onClick={previous} aria-label="Previous gallery frame"><Arrow left/></button><button onClick={next} aria-label="Next gallery frame"><Arrow/></button></div></div>
    <div className="story-selector" aria-label="Choose a gallery frame">{slides.map((frame,index)=><button key={frame.src} className={index===slide?'selected':''} aria-label={`${index+1}: ${frame.label}`} aria-current={index===slide?'true':undefined} onClick={()=>{setDirection(index<slide?'previous':'next');track('gallery_navigated',{interaction:'selector',from_frame:slide+1,to_frame:index+1,experiment_id:experiment.id,experiment_variant:experiment.variant});setSlide(index)}}><span>{String(index+1).padStart(2,'0')}</span><b>{frame.shortLabel}</b></button>)}</div>
  </div>
}

function ConfidenceStrip(){
  return <section className="confidence-strip" aria-label="Product confidence">
    <div className="confidence-strip-inner">
      <div><strong>4.7 / 5</strong><span>from 137 reviews</span></div>
      <div><strong>40,000+</strong><span>bought this year</span></div>
      <div><strong>Since 1945</strong><span>rooted in authentic Ayurveda</span></div>
    </div>
  </section>
}

function ResultsSection(){
  const sectionRef=useRef<HTMLElement>(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
  const [activeStage,setActiveStage]=useState(0);
  const [isVisible,setIsVisible]=useState(false);
  const [isPlaying,setIsPlaying]=useState(true);
  const [cycleToken,setCycleToken]=useState(0);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(([entry])=>setIsVisible(entry.isIntersecting&&entry.intersectionRatio>=.28),{threshold:[0,.28,.7]});
    observer.observe(section);
    return()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    if(reducedMotion||!isVisible||!isPlaying)return;
    const timeout=window.setTimeout(()=>setActiveStage(stage=>(stage+1)%resultStages.length),4600);
    return()=>window.clearTimeout(timeout);
  },[activeStage,cycleToken,isPlaying,isVisible,reducedMotion]);

  const pauseSequence=()=>setIsPlaying(false);
  const resumeSequence=()=>{setCycleToken(token=>token+1);setIsPlaying(true)};
  const chooseStage=(index:number)=>{setActiveStage(index);setCycleToken(token=>token+1)};

  return <section
    ref={sectionRef}
    className={`results section adapted-results results-motion-rail${isVisible&&isPlaying&&!reducedMotion?' is-running':''}`}
    id="results"
    data-active-stage={activeStage+1}
    onMouseEnter={pauseSequence}
    onMouseLeave={resumeSequence}
    onFocusCapture={pauseSequence}
    onBlurCapture={resumeSequence}
  >
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
        {resultStages.map(([index,time,title,copy],stageIndex)=>(
          <article
            key={index}
            className={`results-sequence-card${activeStage===stageIndex?' is-active':' is-muted'}${activeStage>stageIndex?' is-complete':''}`}
            aria-current={activeStage===stageIndex?'step':undefined}
            onMouseEnter={()=>chooseStage(stageIndex)}
          >
            <button type="button" className="result-marker" aria-label={`Show stage ${index}: ${title}`} onClick={()=>chooseStage(stageIndex)}>
              <b>{index}</b>
            </button>
            <div className="results-sequence-content">
              <span className="results-stage-time">{time}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <span className="result-stage-progress" aria-hidden="true"><i key={`${activeStage}-${cycleToken}-${stageIndex}`}/></span>
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
      <div className="formula-heading">
        <p className="kicker">Key ingredients</p>
        <h2>Three milks. One complete formula.</h2>
      </div>
      <div className="formula-materials-grid" aria-label="Formula imagery">
        <figure className="formula-material">
          <div><ResponsiveImage src="/assets/production/ingredients.webp" mobileSrc="/assets/production/ingredients-mobile.webp" alt="Amla, Bhringaraj, Neeli and coconut oil"/></div>
          <figcaption>Four powerful herbal ingredients</figcaption>
        </figure>
        <figure className="formula-material">
          <div><ResponsiveImage src="/assets/production/triple-milk.webp" mobileSrc="/assets/production/triple-milk-mobile.webp" alt="Cow milk, goat milk and coconut milk"/></div>
          <figcaption>The nourishing triple-milk base</figcaption>
        </figure>
        <figure className="formula-material">
          <div><ResponsiveImage src="/assets/production/slow-cooking.webp" mobileSrc="/assets/production/slow-cooking-mobile.webp" alt="Herbal oil prepared over low heat using Thaila Paaka Vidhi"/></div>
          <figcaption>Slow-heat Thaila Paaka Vidhi extraction</figcaption>
        </figure>
      </div>
    </div>
    <div className="ingredient-explorer"><div className="ingredient-heading"><span>Ingredient index</span>{compactIngredients&&<p>Tap an ingredient to read its role.</p>}</div><div className="ingredient-grid">{ingredientSource.map(([name,copy],i)=>{const label=<><span>0{i+1}</span><h3>{name}</h3>{compactIngredients&&<b aria-hidden="true">{activeIngredient===i?'−':'+'}</b>}</>;return <article key={name} className={`ingredient-entry ${activeIngredient===i?'active':''}`}>{compactIngredients?<button aria-expanded={activeIngredient===i} aria-controls={`ingredient-${i}`} onClick={()=>setActiveIngredient(activeIngredient===i?-1:i)}>{label}</button>:<div className="ingredient-label">{label}</div>}<div className="ingredient-copy" id={`ingredient-${i}`}><p>{copy}</p></div></article>})}</div><details className="full-ingredients"><summary>See the full ingredients list <span>+</span></summary><p><b>Oil base:</b> Coconut oil (Cocos nucifera). <b>Primary ingredients:</b> Amla (Emblica officinalis), Bhringaraj (Eclipta alba), Neeli (Indigofera tinctoria), Karnasphota (Cardiospermum halicacabum). <b>Triple-milk base:</b> Cow milk (Dhenukshira), Goat milk (Ajakshira), and Coconut milk (Nalikerakshira). <b>Supporting herbs:</b> Yashtimadhu (Glycyrrhiza glabra), Dhatriphala (Phyllanthus emblica), Gunjamoola (Abrus precatorius), and Anjana.</p></details></div>
  </section>
}

function RitualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        const current = -rect.top;
        const progress = Math.min(Math.max(current / totalScrollable, 0), 1);
        setScrollProgress(progress);
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stepThresholds = [0, 0.20, 0.48, 0.72];

  return (
    <>
      <section 
        ref={sectionRef} 
        className={`ritual section adapted-ritual ${isVisible ? 'is-visible' : ''}`} 
        id="ritual"
      >
        <div className="ritual-sticky-container">
          <div className="ritual-intro">
            <h2>The Ritual Guide</h2>
            <p className="ritual-intro-sub">Massage into the scalp and hair, leave for 30–60 minutes, then rinse with a mild shampoo.</p>
          </div>

          <div className="ritual-track-wrapper">
            <ol className="ritual-steps">
              {ritualSteps.map(([index, title, copy], idx) => {
                const isActive = !isVisible || scrollProgress >= stepThresholds[idx];

                return (
                  <li 
                    key={index} 
                    className={`ritual-step-item ${isActive ? 'step-active' : ''}`}
                  >
                    <div className={`ritual-step-title-above ${isActive ? 'title-visible' : ''}`}>{title}</div>
                    <div className="ritual-step-image-wrapper">
                      <img 
                        src={`/assets/production/ritual-step-${idx + 1}.webp`} 
                        alt={title} 
                        loading="lazy"
                      />
                    </div>
                    <div className="ritual-step-bar-row">
                      <span className="ritual-step-badge">{index}</span>
                    </div>
                    <div className="ritual-step-content">
                      <p>{copy}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="ritual-single-live-track">
              <div 
                className="ritual-single-live-fill" 
                style={{ width: `${Math.min(1, Math.max(0, scrollProgress)) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ritual-guidance-section" aria-label="Ritual guidance & seasonal care">
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
    </>
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
      <header className="difference-header">
        <span className="diff-eyebrow">OUR HERITAGE</span>
        <h2>The Kerala Ayurveda Difference</h2>
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
          <p className="diff-lede">Why this traditional formula is difficult to replicate with modern assembly lines.</p>
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
      className="testimonials-section"
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

function ReviewsSection(){
  const sectionRef=useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible,setIsVisible]=useState(false);
  const [cycleToken,setCycleToken]=useState(0);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const reducedMotion=useMediaQuery('(prefers-reduced-motion: reduce)');
  const reviewDuration=5200;
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
    const section=sectionRef.current;
    if(!section)return;
    const observer=new IntersectionObserver(([entry])=>setIsVisible(entry.isIntersecting&&entry.intersectionRatio>=.3),{threshold:[0,.3,.75]});
    observer.observe(section);
    return()=>observer.disconnect();
  },[]);

  useEffect(() => {
    if (!isPlaying||reducedMotion) return;
    const timeout = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, reviewDuration);
    return () => window.clearTimeout(timeout);
  }, [currentSlide,cycleToken,isPlaying,reducedMotion,reviews.length]);

  const pauseReviews=()=>setIsPlaying(false);
  const resumeReviews=()=>{setCycleToken(token=>token+1);setIsPlaying(true)};
  const chooseReview=(index:number)=>{setCurrentSlide(index);setCycleToken(token=>token+1)};

  return <section 
    ref={sectionRef}
    className={`reviews section adapted-reviews verified-reviews combined-reviews-section review-carousel${isPlaying&&!reducedMotion?' is-running':''}`}
    id="reviews"
    data-review-index={currentSlide+1}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
    style={{ touchAction: 'pan-y' }}
    aria-label="Customer Reviews"
  >
    <div className="testimonials-inner review-carousel__stage" key={currentSlide}>
      <p className="review-carousel__eyebrow">Customer stories</p>
      <div className="testimonials-stars" aria-label="5 out of 5 stars">{reviews[currentSlide].rating}</div>
      <blockquote>
        <p>“{reviews[currentSlide].quote}”</p>
      </blockquote>
      <div className="testimonials-author">
        <strong>{reviews[currentSlide].author}</strong>
        <span>Verified Buyer • {reviews[currentSlide].variant} • {reviews[currentSlide].duration}</span>
      </div>
    </div>
    <div className="review-progress-controls" role="tablist" aria-label="Choose a customer review">
      {reviews.map((review,index)=><button
        type="button"
        role="tab"
        key={review.author}
        aria-label={`Show review ${index+1} from ${review.author}`}
        aria-selected={currentSlide===index}
        onClick={()=>chooseReview(index)}
      ><span aria-hidden="true"><i key={`${currentSlide}-${cycleToken}-${index}`} style={{animationDuration:`${reviewDuration}ms`}}/></span></button>)}
    </div>
    <p className="visually-hidden" aria-live="polite">Showing review {currentSlide+1} of {reviews.length}, by {reviews[currentSlide].author}.</p>
  </section>;
}

function FaqSection(){
  const [openItem,setOpenItem]=useState<number|null>(0);
  return <section className="faq section adapted-faq" id="faq"><header><h2>FAQs</h2></header><div className="faq-list">{faqItems.map(([question,answer],index)=>{const open=openItem===index;return <article className={open?'open':''} key={question}><h3><button aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={()=>setOpenItem(open?null:index)}><b>{question}</b><i aria-hidden="true">{open?'−':'+'}</i></button></h3><div id={`faq-answer-${index}`} className="faq-answer" role="region" aria-label={question} hidden={!open}><p>{answer}</p></div></article>})}</div></section>
}

function ProductDetailsSection(){
  const dialogRef=useRef<HTMLDialogElement>(null);
  const openerRef=useRef<HTMLButtonElement>(null);
  const closeZoom=()=>dialogRef.current?.close();
  return <section className="pack-facts adapted-pack" id="details">
    <div className="pack-heading">
      <p className="kicker">Product details</p>
      <h2>Neelibhringadi Keram</h2>
      <p>Official formulation &amp; packaging information</p>
    </div>
    
    <div className="pack-details-grid">
      <div className="pack-detail-card">
        <h3>Product Specifications</h3>
        <dl className="pack-list">
          <div><dt>Available Sizes</dt><dd>200 ml &amp; 100 ml bottles</dd></div>
          <div><dt>Administration</dt><dd>External scalp &amp; hair application</dd></div>
          <div><dt>Formula Lineage</dt><dd>Sahasrayogam classical Ayurvedic reference</dd></div>
        </dl>
      </div>

      <div className="pack-detail-card">
        <h3>Pricing &amp; Value</h3>
        <dl className="pack-list">
          <div><dt>200 ml Price</dt><dd>₹338 <del>₹375</del> (Save ₹37)</dd></div>
          <div><dt>100 ml Price</dt><dd>₹195</dd></div>
          <div><dt>Taxes &amp; Shipping</dt><dd>Inclusive of taxes • Free shipping over ₹299</dd></div>
        </dl>
      </div>

      <div className="pack-detail-card">
        <h3>Usage &amp; Care Cautions</h3>
        <dl className="pack-list">
          <div><dt>Recommended Ritual</dt><dd>2× weekly, 30–60 min before wash-out</dd></div>
          <div><dt>Cool Weather Care</dt><dd>Coconut oil base solidifies below 24°C. Warm bottle in warm water before use.</dd></div>
          <div><dt>Precautions</dt><dd>External application only. Avoid direct eye contact.</dd></div>
        </dl>
      </div>
    </div>

    <figure className="pack-image">
      <button ref={openerRef} type="button" className="pack-zoom-trigger" onClick={()=>dialogRef.current?.showModal()} aria-haspopup="dialog">
        <img src="/assets/gallery/neeli-back.webp" alt="Back of the Neelibhringadi Keram carton showing product information" width="1080" height="1080" loading="lazy"/>
        <span><b aria-hidden="true">＋</b> Zoom pack label</span>
      </button>
      <figcaption>Pack information · Select to enlarge</figcaption>
    </figure>
    <dialog ref={dialogRef} className="pack-zoom-dialog" aria-labelledby="pack-zoom-title" onClick={event=>{if(event.target===event.currentTarget)closeZoom()}} onClose={()=>openerRef.current?.focus()}>
      <div className="pack-zoom-panel">
        <header>
          <div><p className="kicker">Pack information</p><h2 id="pack-zoom-title">Back-label detail</h2></div>
          <button type="button" onClick={closeZoom} aria-label="Close enlarged pack label">×</button>
        </header>
        <div className="pack-zoom-image" tabIndex={0} aria-label="Scrollable enlarged pack label">
          <img src="/assets/gallery/neeli-back.webp" alt="Enlarged back of the Neelibhringadi Keram carton" width="1080" height="1080"/>
        </div>
        <p>Scroll to inspect the label. Use the current physical pack as the final authority for ingredients, directions and cautions.</p>
      </div>
    </dialog>
  </section>
}

function HeritageSection() {
  return (
    <section className="authentic-ayurveda-banner-section" id="heritage">
      <div className="authentic-banner-container">
        {/* Column 1: Visual Image (Seals baked into asset) */}
        <div className="authentic-col-visual">
          <img 
            src="/assets/production/Rooted in Authentic Ayurveda.webp" 
            alt="Hand holding Bhringraj plant" 
            className="authentic-bg-img"
          />
        </div>

        {/* Column 2: Content (Full Spectrum & Patented Formulations) */}
        <div className="authentic-col-content">
          <div className="authentic-block">
            <h2 className="authentic-heading-serif">FULL SPECTRUM</h2>
            <p className="authentic-desc">
              Classical and Proprietary Ayurvedic Products (350+ Products) | Therapies and Ayurvedic Retreats | Academy and Education Initiatives | Pioneering Ayurvedic R&amp;D
            </p>
          </div>

          <div className="authentic-divider-line" />

          <div className="authentic-block">
            <span className="authentic-gold-eyebrow">Globally Recognized</span>
            <h2 className="authentic-heading-serif">PATENTED FORMULATIONS</h2>
            <p className="authentic-desc">
              Patented products in the United States, Japan and Korea.
            </p>
          </div>
        </div>

        {/* Column 3: Brand Emblem & Tagline */}
        <div className="authentic-col-brand">
          <div className="authentic-brand-emblem">
            <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="90" height="90" className="authentic-gold-logo" />
          </div>
          <p className="authentic-brand-tagline">Rooted in Authentic Ayurveda.</p>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="official-site-footer">
      <div className="official-footer-inner">
        <div className="official-footer-brand-col">
          <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="140" height="54" className="official-footer-logo" />
          <p className="official-footer-tagline">Rooted in Authentic Ayurveda.</p>
          <p className="official-footer-copy">© 2026, Kerala Ayurveda India.</p>
        </div>

        <div className="official-footer-nav-grid">
          <div className="official-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="https://keralaayurveda.com/pages/about-us-1" target="_blank" rel="noopener noreferrer">About Kerala Ayurveda</a></li>
              <li><a href="https://keralaayurveda.com/pages/clinics" target="_blank" rel="noopener noreferrer">Clinics</a></li>
              <li><a href="https://keralaayurveda.com/pages/academy" target="_blank" rel="noopener noreferrer">Ayurveda Academy</a></li>
              <li><a href="https://keralaayurveda.com/pages/investors" target="_blank" rel="noopener noreferrer">Investors</a></li>
              <li><a href="https://keralaayurveda.com/pages/research-and-development" target="_blank" rel="noopener noreferrer">Research &amp; Development</a></li>
              <li><a href="https://keralaayurveda.com/pages/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://keralaayurveda.com/blogs/news" target="_blank" rel="noopener noreferrer">Blogs</a></li>
              <li><a href="https://keralaayurveda.com/pages/our-editorial-team" target="_blank" rel="noopener noreferrer">Our Editorial Team</a></li>
              <li><a href="https://keralaayurveda.com/pages/contact" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
            </ul>
          </div>

          <div className="official-footer-col">
            <h4>Policies</h4>
            <ul>
              <li><a href="https://keralaayurveda.com/pages/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of use</a></li>
              <li><a href="https://keralaayurveda.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://keralaayurveda.com/pages/shipping-and-delivery-policy" target="_blank" rel="noopener noreferrer">Shipping and Delivery Policy</a></li>
              <li><a href="https://keralaayurveda.com/pages/return-cancellation-policy" target="_blank" rel="noopener noreferrer">Return/Cancellation Policy</a></li>
              <li><a href="https://keralaayurveda.com/pages/faq" target="_blank" rel="noopener noreferrer">FAQs</a></li>
            </ul>
          </div>

          <div className="official-footer-col">
            <h4>Our Network</h4>
            <ul>
              <li><a href="https://www.ayurvedagram.com/" target="_blank" rel="noopener noreferrer">Ayurvedagram Bengaluru</a></li>
              <li><a href="https://www.ayurvedagrambali.com/" target="_blank" rel="noopener noreferrer">Ayurvedagram Bali</a></li>
              <li><a href="https://www.thehealthvillage.biz/" target="_blank" rel="noopener noreferrer">The Health Village</a></li>
              <li><a href="https://keralaayurvedaacademy.in/" target="_blank" rel="noopener noreferrer">Kerala Ayurveda India - Academy</a></li>
              <li><a href="https://keralaayurveda.store/" target="_blank" rel="noopener noreferrer">Kerala Ayurveda USA - Store</a></li>
              <li><a href="https://www.keralaayurveda.us/wellnesscenter/" target="_blank" rel="noopener noreferrer">Kerala Ayurveda USA - Wellness</a></li>
              <li><a href="https://www.keralaayurveda.us/courses/" target="_blank" rel="noopener noreferrer">Kerala Ayurveda USA - Academy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="official-footer-bottom-bar">
        <span>© 2026, Kerala Ayurveda India.</span>
        <div className="official-footer-social">
          <a href="https://www.instagram.com/keralaayurvedaltd/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
          <a href="https://www.youtube.com/@KeralaAyurvedalimited" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
          <a href="https://www.facebook.com/keralaayurvedaltd/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
          <a href="https://in.linkedin.com/company/kerala-ayurveda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

function ChatGPTRightNav({ activeSection }: { activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`chatgpt-expanding-nav ${isOpen ? 'is-open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="navigation"
      aria-label="Section navigation menu"
    >
      <div className="expanding-nav-list">
        {navItems.map(([id, label]) => {
          const isActive = activeSection === id;

          if (!isOpen && !isActive) return null;

          return (
            <button
              key={id}
              type="button"
              className={`expanding-nav-item ${isActive ? 'active' : 'inactive'}`}
              onClick={() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
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
    <header className="official-site-header">
      <div className="official-main-header">
        <div className={`header-col-left ${searchOpen ? 'search-is-active' : ''}`}>
          <form className="header-search-pill" role="search" onSubmit={submitSearch}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input 
              ref={searchRef} 
              id="site-search" 
              value={searchTerm} 
              onChange={event => setSearchTerm(event.target.value)} 
              placeholder="Search..." 
              autoComplete="off"
            />
          </form>
        </div>
        <div className="header-col-center">
          <a className="brand" href="#main" aria-label="Kerala Ayurveda home">
            <img src="/assets/ka-logo.avif" alt="Kerala Ayurveda" width="140" height="54"/>
          </a>
        </div>
        <div className="header-col-right">
          <a href="https://keralaayurveda.com/pages/clinics" target="_blank" rel="noopener noreferrer">Clinics</a>
          <span className="nav-pipe">|</span>
          <a href="https://keralaayurveda.com/pages/resorts" target="_blank" rel="noopener noreferrer">Resorts</a>
          <span className="nav-pipe">|</span>
          <a href="https://keralaayurveda.com/pages/hospitals" target="_blank" rel="noopener noreferrer">Hospitals</a>
          <span className="nav-pipe">|</span>
          <a href="https://keralaayurveda.com/pages/academy" target="_blank" rel="noopener noreferrer">Academy</a>
          <span className="nav-pipe">|</span>
          <button type="button" className="header-icon-btn mobile-search-trigger" onClick={() => setSearchOpen(prev => !prev)} aria-label="Toggle search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
          <button type="button" className="header-icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button type="button" className="header-icon-btn cart-icon-btn" onClick={() => cart ? openDrawer() : document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Cart">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cart > 0 && <span className="cart-badge-pill">{cart}</span>}
          </button>
        </div>
      </div>
    </header>
    <ChatGPTRightNav activeSection={activeSection} />
    <main id="main" className={scienceDockHidden?'science-is-active':undefined}>
      <section className="hero checkpoint-hero" id="product">
        <div className="hero-overview">
          <ProductIdentity/>
          <ProductProof/>
        </div>
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
            <p className="price-note">Inclusive of all taxes • Free delivery above ₹299</p>
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
              <li><b>Bhringraj</b> - Traditionally used for scalp &amp; root care</li>
              <li><b>Amla</b> - Natural Vitamin C &amp; antioxidant support</li>
              <li><b>Neeli &amp; Karnasphota</b> - Deep scalp cooling &amp; hair fibre protection</li>
              <li><b>Three milks</b> - Coconut, Cow &amp; Goat milk nourishment</li>
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

      <KeralaAyurvedaDifference />
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

    <div className={`scrim ${drawer?'open':''}`} inert={!drawer} onMouseDown={e=>{if(e.target===e.currentTarget)closeDrawer()}} aria-hidden={!drawer}><section ref={drawerRef} className="drawer" role="dialog" aria-modal="true" aria-label="Your cart"><header><div><p>Your cart</p><h2>{cart?`${cart} item${cart>1?'s':''}`:'Your cart is empty'}</h2></div><button ref={closeRef} onClick={closeDrawer} aria-label="Close cart">×</button></header>{cart?<><div className="cart-item"><div className="cart-thumb"><img src="/assets/production/official-product.webp" alt="" width="609" height="1800"/></div><div><h3>Neelibhringadi Keram</h3><p>{selectedSize === '200ml' ? '200 ml' : '100 ml'}</p><strong>₹{currentPrice}</strong> <del>₹{currentMrp}</del></div><div className="quantity small"><button aria-label="Decrease quantity" onClick={()=>setCart(Math.max(0,cart-1))}>−</button><span>{cart}</span><button aria-label="Increase quantity" onClick={()=>setCart(cart+1)}>+</button></div></div><div className="subtotal"><span>Subtotal</span><strong>₹{currentPrice*cart}</strong></div><button className="checkout" onClick={()=>track('checkout_clicked',{experiment_id:motionExperiment.id,experiment_variant:motionExperiment.variant,texture_exposed:textureExposed.current,cart_quantity:cart,value:currentPrice*cart,currency:'INR'})}>Checkout Now</button><small>Inclusive of all taxes</small></>:<p className="empty">Explore our range.</p>}</section></div>
  </>
}

export default App;
