import React, {useEffect, useMemo, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import p5 from 'p5';
import {
  ArrowDownRight, ArrowUpRight, AtSign, Music2, Play, X,
  Plus, Minus, Move, Mail, Phone, MapPin, Menu
} from 'lucide-react';
import './styles.css';

const clampValue=(min,value,max)=>Math.max(min,Math.min(value,max));
const cleanProse = value =>
  typeof value === 'string' ? value.replace(/[—–-]/g, ' ').replace(/\s{2,}/g, ' ').trim() : value;


function SpotifyMark({size=16}){
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M6.8 9.3c3.6-1 7.9-.7 10.8.9" stroke="#090909" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M7.5 12.3c3-.8 6.7-.55 9.25.7" stroke="#090909" strokeWidth="1.55" strokeLinecap="round"/>
    <path d="M8.2 15.15c2.45-.58 5.25-.4 7.35.58" stroke="#090909" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
}

function TikTokMark({size=16}){
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M14.2 3.2h2.55c.2 1.2.7 2.15 1.5 2.85.75.65 1.65 1.05 2.7 1.2v2.55c-1.7-.1-3.15-.62-4.35-1.55v6.05c0 3.75-2.55 6.45-6.15 6.45-3.45 0-5.9-2.45-5.9-5.62 0-3.4 2.65-5.92 6.35-5.92.42 0 .8.03 1.15.1v2.68a4.6 4.6 0 0 0-1.15-.15c-2.05 0-3.55 1.35-3.55 3.25 0 1.65 1.25 2.93 2.95 2.93 2.02 0 3.25-1.4 3.25-3.75V3.2h.65z"/>
  </svg>
}

const socials = {
  instagram: AtSign,
  youtube: Play,
  spotify: SpotifyMark,
  tiktok: TikTokMark
};

const uagSocials = {
  instagram:'https://www.instagram.com/uagentertainmentofficial/',
  tiktok:'https://www.tiktok.com/@uagentertainmentofficial'
};

const artists = [
  {name:'Stan Rittner', role:'Artist · Singer · Model · Dancer', social:{instagram:'https://www.instagram.com/sr_stanislas/?hl=en',youtube:'https://www.youtube.com/channel/UCJQ8R6vbwXLIvb2TjjOtX_A',spotify:'https://open.spotify.com/artist/7jF05ML7HuuI8B8dwMlz9b'}, bio:"French singer, songwriter, performer and creative based in Australia. Stan’s background spans music, dance, modelling and musical theatre, including appearances on Star Academy France and work with luxury fashion brands. His current work blends performance, storytelling and an upbeat international pop sensibility."},
  {name:'Joel Turner', role:'Beatbox Champion · Artist · Host · Singer', social:{instagram:'https://www.instagram.com/joelturneroffical/?hl=en',tiktok:'https://www.tiktok.com/@joelturnerofficial',youtube:'https://www.youtube.com/channel/UCVyVIbKYvkZ9wqplZIBSQnQ',spotify:'https://open.spotify.com/artist/6vqul5TIAmROh1DGussSOk'}, bio:"Australian beatboxer, singer, songwriter, instrumentalist and producer best known for “These Kids.” Joel rose to national attention through Australian Idol and went on to win the 2005 Beatbox Battle World Championship, building a career around live performance, vocal percussion, music and hosting."},
  {name:'Sam McGovern', role:'Singer · Artist · Guitarist', social:{instagram:'https://www.instagram.com/sam_mcgov/?hl=en'}, bio:"Singer-songwriter and guitarist with a passion for authentic storytelling through music. Whether performing with a guitar in hand or developing original material, he brings an honest and engaging presence to every performance."},
  {name:'Grace Choi', role:'Artist', social:{instagram:'https://www.instagram.com/gracechoiartist?stkn=dWhsMDR6OGloaTQw'}, bio:"Sydney-based artist bringing an expressive presence to the local creative scene. Her evolving artistry reflects a distinctive creative identity shaped by self-expression, connection and a love for her craft."},
  {name:'Javier Sarmiento', role:'Artist · Multi-Instrumentalist · Songwriter', social:{instagram:'https://www.instagram.com/javiers_music/?hl=en'}, bio:"Newcastle based multi instrumentalist, songwriter and country artist whose work spans guitar, bass and mandolin. Javier has performed across the Newcastle live circuit, appeared at the Tamworth Country Music Festival and shared stages with Australian and international artists."},
  {name:'Carlixe', role:'Singer · Songwriter · DJ · Producer', social:{instagram:'https://www.instagram.com/carlixe/?hl=en',tiktok:'https://www.tiktok.com/@carlixemusic',youtube:'https://www.youtube.com/channel/UCX8gKyBQ4XPD9tzH1e-uNOQ',spotify:'https://open.spotify.com/artist/2QPm4y6rPTKDW2cFCzeu9P'}, bio:"Singer songwriter whose work centres on emotive contemporary pop. His single “Quiet Place” reflects on love and the feeling of finding home in another person, with the song written on piano and produced in Singapore."},
  {name:'Arianna Shang', role:'Artist · Digital Creative', social:{instagram:'https://www.instagram.com/arianna_shang/?hl=en',tiktok:'https://www.tiktok.com/@ari.shang',youtube:'https://www.youtube.com/@ariannashang315',spotify:'https://open.spotify.com/user/31vygfeihbfvwa62sbkvcwxkdjjy'}, bio:"DJ and content creator building a dynamic cross platform presence through music, visual content and social media. Her creative identity is shaped by music, culture and a youth focused aesthetic, allowing her to connect with audiences through both performance and engaging digital content."},
  {name:'Phoebe Celeste', role:'Artist · Creative', social:{instagram:'https://www.instagram.com/phoebeceleste/?hl=en',tiktok:'https://www.tiktok.com/@phoebeceleste90'}, bio:"Opera singer with a captivating vocal presence and a passion for classical performance. Combining vocal artistry, expressive storytelling and refined stage presence, Phoebe brings a contemporary perspective to the world of opera. Her profile reflects a dedication to her craft while connecting the timeless beauty of classical music with modern audiences."},
  {name:'Amelia Cortese', role:'Artist', social:{instagram:'https://www.instagram.com/theameliaaofficial/?hl=en'}, bio:"Amelia Cortese is an emerging recording artist and performer with a natural presence across music and live performance. A main featured artist at NIDA Theatre for The McDonald College in 2026, Amelia brings a fresh creative identity and distinctive performance style to the stage."},
  {name:'BLVK DRGN', role:'Singer · Songwriter · Athlete', social:{instagram:'https://www.instagram.com/blkdrgn2211/?hl=en',spotify:'https://open.spotify.com/artist/5m3dyBeWA7nd4Nxn6SzRLg'}, bio:"Singer, songwriter and athlete, BLVK DRGN’s profile brings together music, intensity and performance, with upcoming material positioned around atmospheric press & media, emotional storytelling and a powerful new sound."},
  {name:'Jon Guetano', role:'DJ · Producer', social:{instagram:'https://www.instagram.com/jonguetano/?hl=en',tiktok:'https://www.tiktok.com/@jon.guetano',youtube:'https://www.youtube.com/channel/UCpX8JwYBfUsVuWePUAnteFQ',spotify:'https://open.spotify.com/artist/7dc34Tdazv2q27PjVPnQwE'}, bio:"Sydney based DJ and producer working in house and electronic music. His releases have received support from names including David Guetta, Don Diablo, Jamie Jones, Oliver Dollar and Ruben Mandolini, while tracks such as “I Do Believe” and “Time To Get Down” have developed his club and dance profile."},
  {name:'Georgie Martin', role:'Content Creator · Author', social:{instagram:'https://www.instagram.com/georgiee.martin/'}, bio:"Content creator and author of Veins of Gold, Georgie Martin blends fashion, creativity and storytelling, bringing a distinctive presence across modelling, digital content and writing. Her work reflects an expressive and multifaceted creative identity, connecting visual storytelling with her passion for the written word."}
];

const models = [
  {name:'Raina Ryan', role:'Model · Socialite', social:{instagram:'https://www.instagram.com/raina.ryan_/?hl=en'}, bio:"Model, socialite and bold creative personality known for her fearless energy and unapologetic individuality. Blending style, confidence and a larger-than-life presence, Raina embodies a modern superhero spirit that is powerful, inspiring and unmistakably her own. Whether in front of the camera, making an entrance or simply being herself, she brings a badass edge and magnetic energy that celebrates confidence, self-expression and owning exactly who you are."},
  {name:'Hayden', role:'Model · Lifestyle Content Creator', social:{instagram:'https://www.instagram.com/yeew/'}, bio:"Hayden is a Taiwanese model and lifestyle content creator bringing a fresh perspective to fashion and digital media. Combining a natural presence in front of the camera with an eye for style, culture and everyday experiences, Hayden creates engaging content that reflects his personality and modern lifestyle."},
  {name:'Steve Alpe', role:'Model · Lifestyle Content Creator', social:{instagram:'https://www.instagram.com/_steve.gets.around_/', tiktok:'https://www.tiktok.com/@stevegetsaround'}, bio:"Digital creator with a versatile presence across fashion, entertainment and lifestyle content. His work spans event coverage, interviews, product reviews and engaging social content, bringing an authentic and personable approach to every project. With his experience in digital storytelling, Steve creates content that connects brands, experiences and people with the audience."},
  {name:'Bree Moran', role:'Model', social:{instagram:'https://www.instagram.com/bree.moran/?hl=en'}, bio:"Bree is an internationally renowned Australian model, bringing an established presence and refined versatility to fashion, editorial and commercial work. With her striking 178 cm frame, blonde hair and blue eyes, Bree combines a distinctive look with a confident presence in front of the camera. Her international experience and timeless aesthetic make her a standout presence."},
  {name:'Elke Kahler', role:'Model · Actor · Presenter · Creator', social:{instagram:'https://www.instagram.com/elkekahler/?hl=en'}, bio:"Australian model, actor, presenter and creator with more than a decade of modelling experience. Raised in Noosa, Elke has worked across swimwear, fitness, beauty, lifestyle and commercial campaigns and has also built experience in screen acting and live hosting."},
  {name:'Pandora Bonsor', role:'Model · UGC Creator', social:{instagram:'https://www.instagram.com/pandorabonsorr/?hl=en'}, bio:"Australian model and UGC creator with a social first profile spanning lifestyle, fashion, fitness and branded content. Pandora’s creative presence combines modelling with upbeat digital storytelling and an audience focused approach to collaborations."},
  {name:'Christopher Rudolph', role:'Model', social:{instagram:'https://www.instagram.com/chrisreindeer/'}, bio:"Model positioned for fashion, editorial, commercial and campaign opportunities. His profile forms part of UAG’s broader talent network for local and international bookings."},
  {name:'Aiala Tang', role:'Model · Content Creator', social:{instagram:'https://www.instagram.com/aiala_tang/?hl=en'}, bio:"Sydney based creator and model with a substantial social media presence. Aiala works across lifestyle, fashion and digital content, bringing a polished creator led perspective to campaigns and brand collaborations."},
  {name:'Rona Mahfoud', role:'Model · Beauty & Lifestyle Creator', social:{instagram:'https://www.instagram.com/rona_mahfoud/?hl=en'}, bio:"Sydney based beauty and lifestyle content creator and model with a large engaged digital audience. Rona’s profile combines visual content, beauty, lifestyle storytelling and brand facing social media work."},
  {name:'Chloe Bishop Allin', role:'Model', social:{}, bio:"Sydney based professional represented on UAG Entertainment’s model roster. Chloe is developing her modelling profile alongside a broader professional background, with UAG positioning her for fashion, lifestyle and commercial opportunities."},
  {name:'Aurelie Franc', role:'Model', social:{instagram:'https://www.instagram.com/aureliefranc?stkn=aThzNjVteGJkOTAw'}, bio:"Model and creative talent with an elegant presence and distinctive sense of style. Her refined aesthetic allows her to move effortlessly across creative, editorial and lifestyle projects."},
  {name:'MJ', role:'Model · Host', social:{instagram:'https://www.instagram.com/thepowerofmj?stkn=MTI4dmtyanowN3RjeQ=='}, bio:"MJ is a model, content creator and host exploring conversations around sex, love, relationships and personal energy. Through her podcast, she brings an open and engaging approach to topics surrounding connection, intimacy and modern relationships."},
  {name:'Hannah Acheampong', role:'Model', social:{instagram:'https://www.instagram.com/hannah.achh/?hl=en'}, bio:"Australian model, with a contemporary profile suited to fashion, beauty, editorial and commercial work. Her representation forms part of UAG’s diverse Australian talent roster."},
  {name:'Noah Krstic', role:'Model', social:{instagram:'https://www.instagram.com/noah.krstic/?hl=en'}, bio:"Model with a distinctive presence and a naturally refined approach to fashion and style. Bringing confidence and individuality to every project, Noah creates a memorable presence both in front of the camera and beyond."},
  {name:'Lucia Fisher', role:'Model', social:{instagram:'https://www.instagram.com/looshfisher/'}, bio:"Model and the founder of @waxyapplesvintage, bringing her distinctive eye for vintage style into everything she does. Known for her effortlessly cool aesthetic, she embodies the spirit of #THATSSOWAV"}
];

const executives = [
  {name:'Priscilla Cortese', role:'Founder & CEO', desc:'Priscilla Cortese is a high level music executive and founder of UAG Entertainment, known for transforming talent into globally positioned brands through strategic vision and influential partnerships. She began as a touring artist at 15 and became Australia’s #1 Latin Artist by 18, before pivoting to the business side of the industry. With a background in real estate, law and international business, she brings over a decade of executive experience.', social:'https://www.instagram.com/priscillacorteseofficial_/?hl=en'},
  {name:'Gary Chow', role:'Chief Operating Officer — China | Partner', desc:'Gary has served in executive roles at Live Nation, Live Nation China, Kaisa Group Holdings, Baoneng International, Fosun Group and China OCT Group. During ten years in the United States he oversaw strategic planning, investment and acquisition of live performances and music festivals.'},
  {name:'Melanie Hillier', role:'PR Director', desc:'A French Australian Fashion PR expert based in Paris, with experience at fashion houses including Christian Louboutin, Tommy Hilfiger and Stella McCartney, as well as agency campaigns for brands such as Thomas Sabo and The Kooples.', social:'https://www.instagram.com/mel_hillier_mandran/?hl=en'},
  {name:'Maricel Dionisio', role:'Hair & Make-Up Director | Casting Manager', desc:'Maricel “Celle” Dionisio is a seasoned makeup artist and hairstylist based in Parramatta, Sydney, with over 14 years of experience. Her work has appeared at events including Australian Fashion Week, Pacific Runway and Miss Earth Australia.', social:'https://www.instagram.com/glamitupbycelle/?hl=en'},
  {name:'Jessica Maas', role:'Hair & Makeup Artist · Educator · Content Creator', desc:'Sydney based hair and makeup artist, educator and content creator with experience across bridal, television, celebrity, fashion and events. Jessica’s work combines polished beauty artistry with education, digital content and client focused creative direction.', social:null},
  {name:'Rachael Stagg', role:'Chief Staff Officer', desc:'Rachael has over two decades of experience in the creative industries, with expertise in operations, marketing, content press & media and client engagement. She focuses on team culture, communication and UAG’s strategic vision.', social:'https://www.instagram.com/rachaelstagg/?hl=en'},
  {name:'Steven Guzman', role:'Director of Videography & Photography', desc:'A Sydney based creative professional focused on storytelling, strategic branding and impactful visuals across videography, photography and startup development.', social:'https://www.instagram.com/stevenguzman_au/?hl=en'},
  {name:'Richard Sedin', role:'Events Director', desc:'Richard brings over 20 years of experience in events and hospitality, spanning luxury hotels, large scale venues and bespoke activations.', social:'https://www.instagram.com/ricsedin/?hl=en'},
  {name:'Joanne Colefax', role:'Transformation Coach', desc:'An elite coach who guides driven women entrepreneurs, professionals and high achievers through purposeful personal transformation.', social:'https://www.instagram.com/joannecolefax/?hl=en'}
];

const carolFerrone = {
  name:'Carol Ferrone',
  role:'TV and Media Personality · Writer · Producer',
  desc:'Carol Ferrone is an Australian television and media personality, writer and producer known for human centred storytelling across television, documentary, presenting, producing, speaking and live events.',
  social:{
    instagram:'https://www.instagram.com/carol_ferrone/',
    tiktok:'https://www.tiktok.com/@carolferrone'
  }
};


const eventNames = [
  'The Boys Season 5 — Amazon Premiere','Trinny London Masterclass','Tide Communications — Media Showings',
  'Tic Tac Festival','Ted Lasso — Apple Premiere','TCL Event','Stan Rittner — Euphoria Premiere',
  'Stan Rittner — AFW26','Spa Weekend Premiere','She Glam Event','Samsung Event','Nutella Good Morning',
  'Noobie Event — Stan','Neutrogena Event',"Macca’s Menu Heist",'Lion King Premiere — Stan',
  'John Frieda Event','Huda Beauty Event','Hollywood Reporter Launch','Napoleon Perdis Event',
  'Logitech MX Event','Weleda Event', 'Dr Goodes Launch Night', 
];
const eventMediaKeys = [
  'the-boys-season-5',
  'trinny-london-masterclass',
  'tide-communications',
  'tic-tac-festival',
  'ted-lasso-apple-premiere',
  'tcl',
  'euphoria-premiere',
  'afw26',
  'spa-weekend-premiere',
  'sheglam',
  'samsung',
  'nutella-good-morning',
  'noobie-stan',
  'neutrogena',
  'maccas-menu-heist',
  'lion-king-premiere',
  'john-frieda',
  'huda-beauty',
  'hollywood-reporter-launch',
  'napoleon-perdis',
  'logitech-mx',
  'weleda'
];

const events = eventNames.map((name,i)=>({
  name,
  mediaKey:eventMediaKeys[i],
  tag: i===0||i===4||i===6||i===8||i===15 ? 'Premiere' : i===7 ? 'Fashion' : 'Event',
  description: ({
    0:'UAG talent represented at the global premiere of The Boys Season 5, joining cast and creators on the red carpet.',
    7:'Stan Rittner walked the runway at Australian Fashion Week 2026, representing UAG Entertainment.',
    10:'Premium brand activation featuring UAG talent at a high-profile Samsung product launch.',
    13:'UAG talent joined Neutrogena for an exclusive beauty and skincare brand activation.',
    14:'A UAG event and brand activation moment connected to the Macca’s World Menu Heist campaign.',
    15:'Stan Rittner featured at the Sydney red carpet premiere of The Lion King.'
  }[i] || 'Event description, participating UAG talent, venue/date and approved credits to be supplied.'),
  x: [8,27,48,70,86,18,38,61,78,92,10,31,53,72,88,22,44,66,83,14,51,90][i],
  y: [18,8,20,11,26,42,38,34,48,56,68,59,71,67,78,87,88,83,92,30,52,73][i]
}));

const press = [
  ['Premiere','The Boys Season 5 — Red Carpet Premiere','Stan Rittner and Steve Alpe represented UAG Entertainment at the global premiere of The Boys Season 5, joining cast and creators on the red carpet.','press-the-boys-season-5.jpg'],
  ['Feature','Breaking Barriers with Grace: The Inspiring Journey of Hazel Barrientos','A feature highlighting Hazel Barrientos, a deaf model redefining beauty standards and challenging perceptions of disability in fashion.','press-hazel-barrientos.jpg'],
  ['Radio','Joel Turner’s “These Kids (Remix)” Featured on CADA','Joel Turner’s track “These Kids (Remix)” was added to the rotation on CADA FM in the Nights/Weekends lineup commencing October 21, 2024.','press-joel-turner-cada.jpg'],
  ['Fashion','Stan Walks the Runway at Australian Fashion Week for YEMAT','Stan walked the runway at Australian Fashion Week for YEMAT and was featured on national television.','press-stan-rittner-afw.jpg'],
  ['Television','Joel Turner and Priscilla Cortese Featured on Today Extra','Joel Turner and UAG founder Priscilla Cortese appeared on Today Extra for a feature celebrating Joel’s musical journey and upcoming live performance.','press-today-extra.jpg'],
  ['Press','Stan, Lauren, and Chris Shine in Exclusive Feature Across Australian Press','Rising models Stan, Lauren and Chris appeared in an Australian press feature showcasing their style, charisma and versatility.','press-stan-lauren-chris.jpg']
];

const services = [
  ['Modeling Management','World-class model representation, development and placement across fashion, editorial and commercial platforms globally.','30 min'],
  ['Artist Management','Full-spectrum artist management from brand strategy to touring, recording and global positioning.','30 min'],
  ['Public Relations','Strategic media outreach, press campaigns and brand story amplification across Australian and international platforms.','30 min'],
  ['Global Tours','End-to-end global tour management, logistics, booking and press & media for world-class performances.','1 hr'],
  ['Production & Distribution','Music and film press & media, distribution strategy and digital release management across major platforms.','30 min'],
  ['Videography & Photography','Cinematic, editorial-grade videography and photography for artists, brands and creative campaigns.','30 min'],
  ['Hair & Makeup','Professional hair and makeup artistry for fashion shoots, events, performances and editorial press & medias.','30 min']
];

const mediaSlug = value => value
  .toLowerCase()
  .replace(/&/g,'and')
  .replace(/[’']/g,'')
  .replace(/[^a-z0-9]+/g,'-')
  .replace(/^-|-$/g,'');

const pad2 = value => String(value).padStart(2,'0');

const IMAGE_EXTENSIONS = ['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];

function mediaCandidates(path=''){
  if(!path) return [];
  const match=path.match(/^(.*?)(?:\.(jpg|jpeg|png|webp))?$/i);
  if(!match) return [path];
  const base=match[1];
  const requested=(match[2]||'').toLowerCase();
  const ordered=requested
    ? [requested,...IMAGE_EXTENSIONS.filter(ext=>ext!==requested)]
    : IMAGE_EXTENSIONS;
  return ordered.map(ext=>`${base}.${ext}`);
}

function Placeholder({label,index=0,className='',src='',sources=[],alt=''}) {
  const requestedSources = sources.length ? sources : mediaCandidates(src);
  const expandedSources = [...new Set(
    requestedSources.flatMap(source=>mediaCandidates(source))
  )];
  const sourceKey = expandedSources.join('|');
  const [sourceIndex,setSourceIndex]=useState(0);

  useEffect(()=>{ setSourceIndex(0); },[sourceKey]);

  const rawSrc = expandedSources[sourceIndex] || '';
  const activeSrc = rawSrc.startsWith('/media/')
    ? `${import.meta.env.BASE_URL}${rawSrc.slice(1)}`
    : rawSrc;

  const hasImage=Boolean(activeSrc);

  const tryNextSource=()=>{
    setSourceIndex(current=>current+1<expandedSources.length ? current+1 : expandedSources.length);
  };

  return (
    <div className={`placeholder ph-${index%6} ${hasImage?'has-image':''} ${className}`}>
      {hasImage
        ? <img
            src={activeSrc}
            alt={alt||label||''}
            loading="lazy"
            decoding="async"
            onError={tryNextSource}
          />
        : <span>{label || 'IMAGE PLACEHOLDER'}</span>}
    </div>
  );
}


function useSequentialMedia(basePath,maxImages=30){
  const [sources,setSources]=useState([]);

  useEffect(()=>{
    let cancelled=false;
    if(!basePath){
      setSources([]);
      return;
    }

    const extensions=['jpg','jpeg','png','webp','JPG','JPEG','PNG','WEBP'];

    const findSource=index=>new Promise(resolve=>{
      const stem=`${basePath}-${pad2(index)}`;
      let extensionIndex=0;

      const tryNext=()=>{
        if(cancelled) return resolve(null);
        if(extensionIndex>=extensions.length) return resolve(null);

        const rawSrc=`${stem}.${extensions[extensionIndex++]}`;
        const src=rawSrc.startsWith('/media/')
          ? `${import.meta.env.BASE_URL}${rawSrc.slice(1)}`
          : rawSrc;        
        
          const probe=new Image();
        probe.onload=()=>resolve(src);
        probe.onerror=tryNext;
        probe.src=src;
      };

      tryNext();
    });

    (async()=>{
      const found=[];
      for(let index=1;index<=maxImages;index++){
        const source=await findSource(index);
        if(cancelled) return;
        if(!source) break;
        found.push(source);
      }
      if(!cancelled) setSources(found);
    })();

    return()=>{cancelled=true};
  },[basePath,maxImages]);

  return sources;
}


function CustomCursor(){
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(()=>{
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let x=0,y=0,rx=0,ry=0,raf;
    const move=e=>{
      x=e.clientX;y=e.clientY;
      if(dot.current) dot.current.style.transform=`translate3d(${x}px,${y}px,0)`;
    };
    const loop=()=>{
      rx+=(x-rx)*.13; ry+=(y-ry)*.13;
      if(ring.current) ring.current.style.transform=`translate3d(${rx}px,${ry}px,0)`;
      raf=requestAnimationFrame(loop);
    };
    const over=e=>{
      const interactive=e.target.closest('a,button,.talent-card,.event-node');
      ring.current?.classList.toggle('is-active',!!interactive);
    };
    window.addEventListener('mousemove',move);
    window.addEventListener('mouseover',over);
    loop();
    return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseover',over);cancelAnimationFrame(raf)};
  },[]);
  return <><div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/></>
}

function ScrollProgress(){
  const {scrollYProgress}=useScroll();
  return <motion.div className="scroll-progress" style={{scaleX:scrollYProgress}}/>
}

function SmoothMotion({active}){
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer=window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration:.82,
      smoothWheel:!reduceMotion,
      wheelMultiplier:1,
      touchMultiplier:1.05
    });

    const onLenisScroll=()=>ScrollTrigger.update();
    lenis.on('scroll',onLenisScroll);

    let rafId;
    const raf=time=>{
      lenis.raf(time);
      rafId=requestAnimationFrame(raf);
    };
    rafId=requestAnimationFrame(raf);

    const ctx=gsap.context(()=>{
      // One-time reveals only: no expensive blur and no scrubbed image animation.
      gsap.utils.toArray('[data-reveal]').forEach((el)=>{
        gsap.fromTo(el,
          {y:24,opacity:0},
          {y:0,opacity:1,duration:.78,ease:'power3.out',
           scrollTrigger:{trigger:el,start:'top 90%',once:true}}
        );
      });

      // Keep the small number of decorative floating-card scroll motions.
      if(!reduceMotion){
        gsap.utils.toArray('.float-card').forEach((el,i)=>{
          gsap.to(el,{
            y:i%2===0?-42:38,
            rotate:i%2===0?1:-1,
            ease:'none',
            scrollTrigger:{
              trigger:'.motion-canvas',
              start:'top bottom',
              end:'bottom top',
              scrub:.65
            }
          });
        });
      }

      // Hero mouse response only on desktop and only while the hero is being hovered.
      const hero=document.querySelector('.hero');
      if(hero&&!coarsePointer&&!reduceMotion){
        const orbitOne=gsap.quickTo('.orbit-one','x',{duration:.55,ease:'power2.out'});
        const orbitOneY=gsap.quickTo('.orbit-one','y',{duration:.55,ease:'power2.out'});
        const orbitTwo=gsap.quickTo('.orbit-two','x',{duration:.6,ease:'power2.out'});
        const orbitTwoY=gsap.quickTo('.orbit-two','y',{duration:.6,ease:'power2.out'});
        const indexX=gsap.quickTo('.floating-index','x',{duration:.5,ease:'power2.out'});
        const indexY=gsap.quickTo('.floating-index','y',{duration:.5,ease:'power2.out'});

        const move=e=>{
          const nx=e.clientX/window.innerWidth-.5;
          const ny=e.clientY/window.innerHeight-.5;
          orbitOne(nx*26); orbitOneY(ny*18);
          orbitTwo(nx*-20); orbitTwoY(ny*-15);
          indexX(nx*-12); indexY(ny*-10);
        };
        hero.addEventListener('mousemove',move,{passive:true});
        hero._uagMove=move;
      }
    });

    // Magnetic CTAs remain, but use GSAP quickTo rather than creating tweens on every mousemove.
    const magnetic=!coarsePointer&&!reduceMotion
      ? [...document.querySelectorAll('.magnetic')]
      : [];

    const cleanups=magnetic.map(el=>{
      const xTo=gsap.quickTo(el,'x',{duration:.28,ease:'power2.out'});
      const yTo=gsap.quickTo(el,'y',{duration:.28,ease:'power2.out'});
      const move=e=>{
        const r=el.getBoundingClientRect();
        xTo((e.clientX-r.left-r.width/2)*.10);
        yTo((e.clientY-r.top-r.height/2)*.12);
      };
      const leave=()=>{xTo(0);yTo(0)};
      el.addEventListener('mousemove',move,{passive:true});
      el.addEventListener('mouseleave',leave,{passive:true});
      return()=>{el.removeEventListener('mousemove',move);el.removeEventListener('mouseleave',leave)};
    });

    const refresh=()=>ScrollTrigger.refresh();
    window.addEventListener('load',refresh,{once:true});
    const refreshTimer=setTimeout(refresh,250);

    return()=>{
      const hero=document.querySelector('.hero');
      if(hero?._uagMove) hero.removeEventListener('mousemove',hero._uagMove);
      cleanups.forEach(fn=>fn());
      clearTimeout(refreshTimer);
      window.removeEventListener('load',refresh);
      ctx.revert();
      lenis.off?.('scroll',onLenisScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  },[active]);
  return null;
}

function FloatingIndex(){
  return <div className="floating-index" aria-hidden="true">
    <span>UNITED</span><span>ARTIST</span><span>GROUP</span>
  </div>
}


const UAG_LOGO_SOURCE = "https://storage.readdy-site.link/project_files/56609a57-ade3-43bb-8f84-37ffbca8387f/d1106f59-6d64-4807-877e-54c2a302a172_ChatGPT-Image-May-7-2026-05_06_02-PM.png?v=d4924c28d338ecbc826d745044ea3041";

function TransparentLogo(){
  const [src,setSrc]=useState(UAG_LOGO_SOURCE);
  useEffect(()=>{
    const img=new Image();
    img.crossOrigin='anonymous';
    img.onload=()=>{
      try{
        const c=document.createElement('canvas');
        c.width=img.naturalWidth; c.height=img.naturalHeight;
        const ctx=c.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(img,0,0);
        const data=ctx.getImageData(0,0,c.width,c.height);
        const px=data.data;
        const samples=[
          [0,0],[c.width-1,0],[0,c.height-1],[c.width-1,c.height-1]
        ].map(([x,y])=>{
          const i=(y*c.width+x)*4; return [px[i],px[i+1],px[i+2]];
        });
        const bg=samples.reduce((a,s)=>[a[0]+s[0]/4,a[1]+s[1]/4,a[2]+s[2]/4],[0,0,0]);
        for(let i=0;i<px.length;i+=4){
          const d=Math.hypot(px[i]-bg[0],px[i+1]-bg[1],px[i+2]-bg[2]);
          if(d<34) px[i+3]=0;
          else if(d<68) px[i+3]=Math.min(px[i+3],Math.round((d-34)/34*255));
        }
        ctx.putImageData(data,0,0);
        setSrc(c.toDataURL('image/png'));
      }catch(err){
        // Remote image can still render normally if its host blocks canvas access.
      }
    };
    img.src=UAG_LOGO_SOURCE;
  },[]);
  return <img className="uag-transparent-logo" src={src} alt="UAG Entertainment"/>;
}


function DynamicBackdrop(){
  const ref=useRef(null);
  useEffect(()=>{
    const move=e=>{
      if(!ref.current) return;
      ref.current.style.setProperty('--mx',`${e.clientX}px`);
      ref.current.style.setProperty('--my',`${e.clientY}px`);
    };
    window.addEventListener('mousemove',move);
    return()=>window.removeEventListener('mousemove',move);
  },[]);
  return <div ref={ref} className="dynamic-backdrop" aria-hidden="true"/>;
}

function Nav({active,setActive}){
  const items = ['Home','About','Artists','Models','Events','Press & Media','Live Now','Services'];
  const [open,setOpen]=useState(false);
  return <header className="nav">
    <button className="brand" onClick={()=>setActive('Home')} aria-label="UAG home">
      <TransparentLogo/>
      <span className="brand-fallback">UAG</span>
    </button>
    <nav className={open?'navlinks open':'navlinks'}>
      {items.map(x=><button key={x} className={active===x?'active':''} onClick={()=>{setActive(x);setOpen(false)}}>{x}</button>)}
    </nav>
    <button className="menu" onClick={()=>setOpen(!open)}><Menu/></button>
  </header>
}

function Shell({children,eyebrow,title,description}){
  return <main className="page">
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description&&<p className="page-description">{cleanProse(description)}</p>}
    </section>{children}
  </main>
}


function ContinuousMarquee({items, className=''}) {
  const renderGroup = (suffix='') => (
    <div className="marquee-group" aria-hidden={suffix ? 'true' : undefined}>
      {items.map((item,i)=><span key={`${item}-${i}-${suffix}`}>{item}<i>↗</i></span>)}
    </div>
  );
  return <div className={`continuous-marquee ${className}`} aria-label={items.join(', ')}>
    <div className="marquee-track">
      {renderGroup('a')}
      {renderGroup('b')}
      {renderGroup('c')}
      {renderGroup('d')}
    </div>
  </div>
}


function InteractiveUniverse({setActive}){
  const categories=[
    {
      label:'ARTISTS',
      index:'01',
      title:'Artists',
      description:'Music, performance, identity and long term career development shaped around distinctive creative voices.',
      page:'Artists',
      media:'artists',
      images:['ARTIST PORTRAIT','LIVE PERFORMANCE','EDITORIAL MOMENT','ARTIST CAMPAIGN']
    },
    {
      label:'MODELS',
      index:'02',
      title:'Models',
      description:'Distinctive faces and personalities presented across fashion, beauty, editorial and commercial opportunities.',
      page:'Models',
      media:'models',
      images:['MODEL PORTRAIT','FASHION FRAME','BEAUTY EDITORIAL','CAMPAIGN IMAGE']
    },
    {
      label:'EVENTS',
      index:'03',
      title:'Events',
      description:'Premieres, activations and cultural moments that place UAG talent inside conversations that matter.',
      page:'Events',
      media:'events',
      images:['RED CARPET','BRAND EVENT','GUEST MOMENT','EVENT DETAIL']
    },
    {
      label:'PRESS & MEDIA',
      index:'04',
      title:'Press & Media',
      description:'Editorial coverage, interviews and media moments that extend each story beyond the room and into culture.',
      page:'Press & Media',
      media:'press-media',
      images:['PRESS FEATURE','MEDIA MOMENT','EDITORIAL COVERAGE','INTERVIEW FRAME']
    }
  ];

  const ref=useRef(null);
  const triggerRef=useRef(null);
  const [active,setUniverseActive]=useState(0);
  const activeCategory=categories[active];

  const chooseUniverseCategory=(index)=>{
    setUniverseActive(index);
    const trigger=triggerRef.current;
    if(trigger){
      const target=trigger.start + (trigger.end-trigger.start)*(index/3);
      window.scrollTo({top:target,behavior:'smooth'});
    }
  };

  useEffect(()=>{
    const root=ref.current;
    if(!root) return;

    if(window.matchMedia('(max-width: 680px)').matches){
      triggerRef.current=null;

      // Mobile: use the section's own scroll distance as a four-step story.
      // CSS makes .universe-pin sticky, so the phone visually stops here while
      // the page scroll progresses Artists -> Models -> Events -> Press & Media.
      // After the fourth step, the sticky section releases naturally.
      let ticking=false;
      let displayedIndex=0;
      let targetIndex=0;
      let stepTimer=null;

      const commitNextStep=()=>{
        if(stepTimer || displayedIndex===targetIndex) return;

        stepTimer=window.setTimeout(()=>{
          stepTimer=null;

          if(displayedIndex<targetIndex) displayedIndex+=1;
          else if(displayedIndex>targetIndex) displayedIndex-=1;

          setUniverseActive(displayedIndex);

          // If a fast swipe moved across more than one scroll band, do NOT
          // jump to the destination. Walk through every category visibly.
          if(displayedIndex!==targetIndex) commitNextStep();
        },420);
      };

      const updateMobileUniverse=()=>{
        ticking=false;

        const rect=root.getBoundingClientRect();
        const scrollable=Math.max(1,root.offsetHeight-window.innerHeight);
        const travelled=Math.max(0,Math.min(scrollable,-rect.top));
        const progress=travelled/scrollable;

        if(progress>=0.75) targetIndex=3;
        else if(progress>=0.50) targetIndex=2;
        else if(progress>=0.25) targetIndex=1;
        else targetIndex=0;

        if(displayedIndex!==targetIndex) commitNextStep();
      };

      const onMobileScroll=()=>{
        if(ticking) return;
        ticking=true;
        window.requestAnimationFrame(updateMobileUniverse);
      };

      updateMobileUniverse();
      window.addEventListener('scroll',onMobileScroll,{passive:true});
      window.addEventListener('resize',onMobileScroll,{passive:true});

      return ()=>{
        if(stepTimer) window.clearTimeout(stepTimer);
        window.removeEventListener('scroll',onMobileScroll);
        window.removeEventListener('resize',onMobileScroll);
      };
    }

    const cards=gsap.utils.toArray('.universe-stack-card',root);
    const ctx=gsap.context(()=>{
      triggerRef.current=ScrollTrigger.create({
        trigger:root,
        start:'top top',
        end:`+=${window.innerHeight*3.4}`,
        pin:'.universe-pin',
        scrub:true,
        onUpdate:self=>{
          const p=self.progress;
          const segment=.82/3.4;
          const next=p<segment ? 0 : p<segment*2 ? 1 : p<segment*3 ? 2 : 3;
          setUniverseActive(current=>current===next?current:next);
        }
      });

      cards.forEach((card,i)=>{
        gsap.set(card,{zIndex:20-i,y:i*18,scale:1-i*.025,rotate:i%2?-.8:.8});
        if(i===0) gsap.set(card,{y:0,scale:1,rotate:0});

        if(i<cards.length-1){
          gsap.to(card,{
            y:-window.innerHeight*.42,
            scale:.82,
            rotate:i%2?-5:5,
            opacity:.04,
            ease:'none',
            scrollTrigger:{
              trigger:root,
              start:`top+=${i*window.innerHeight*.82} top`,
              end:`top+=${(i+1)*window.innerHeight*.82} top`,
              scrub:1
            }
          });
        }
      });
    },root);

    return()=>{
      triggerRef.current=null;
      ctx.revert();
    };
  },[]);

  return <section className="universe-scroll" ref={ref}>
    <div className="universe-pin">
      <div className="universe-selector-head">
        <span className="eyebrow">THE UAG UNIVERSE</span>
        <h2>Choose a world.<br/><em>Enter the story.</em></h2>
      </div>
<div className="universe-composition">
        <div className="universe-image-grid universe-left-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={`universe-left-${activeCategory.label}`}
              className="universe-image-pair"
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:.62,ease:"easeOut"}}
            >
              <div className="universe-image-frame frame-a">
                <Placeholder label={activeCategory.images[0]} index={active} src={`/media/universe/universe-${activeCategory.media}-01.jpg`} alt={`${activeCategory.title} universe image 1`}/>
              </div>
              <div className="universe-image-frame frame-b">
                <Placeholder label={activeCategory.images[1]} index={active+1} src={`/media/universe/universe-${activeCategory.media}-02.jpg`} alt={`${activeCategory.title} universe image 2`}/>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="universe-card-stack">
          {categories.map((c,i)=>
            <article className={`universe-stack-card ${i===active?'is-active':''}`} key={c.label}>
              <span className="universe-card-index">{c.index} / 04</span>
              <div>
                <h3>{c.title}</h3>
                <p>{cleanProse(c.description)}</p>
                <button onClick={()=>setActive(c.page)}>EXPLORE {c.label} <ArrowUpRight/></button>
              </div>
            </article>
          )}
        </div>

        <div className="universe-image-grid universe-right-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={`universe-right-${activeCategory.label}`}
              className="universe-image-pair"
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:.62,ease:"easeOut"}}
            >
              <div className="universe-image-frame frame-c">
                <Placeholder label={activeCategory.images[2]} index={active+2} src={`/media/universe/universe-${activeCategory.media}-03.jpg`} alt={`${activeCategory.title} universe image 3`}/>
              </div>
              <div className="universe-image-frame frame-d">
                <Placeholder label={activeCategory.images[3]} index={active+3} src={`/media/universe/universe-${activeCategory.media}-04.jpg`} alt={`${activeCategory.title} universe image 4`}/>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="universe-scroll-note">SCROLL TO MOVE THROUGH THE UAG UNIVERSE</div>
    </div>
  </section>
}


function StoryP5Effect({mode}){
  const mountRef=useRef(null);

  useEffect(()=>{
    const mount=mountRef.current;
    if(!mount) return;

    let instance;
    const sketch=p=>{
      let particles=[];
      let mx=.5;
      let my=.5;
      let smoothX=.5;
      let smoothY=.5;

      const makeParticles=()=>{
        particles=Array.from({length:58},()=>({
          a:p.random(p.TWO_PI),
          r:p.random(.08,.5),
          s:p.random(.25,1.25),
          phase:p.random(p.TWO_PI),
          size:p.random(1,2.8)
        }));
      };

      const resize=()=>{
        const r=mount.getBoundingClientRect();
        p.resizeCanvas(Math.max(1,r.width),Math.max(1,r.height));
      };

      p.setup=()=>{
        const r=mount.getBoundingClientRect();
        const canvas=p.createCanvas(Math.max(1,r.width),Math.max(1,r.height));
        canvas.parent(mount);
        p.pixelDensity(Math.min(window.devicePixelRatio||1,1.15));
        p.noFill();
        p.strokeCap(p.ROUND);
        makeParticles();
      };

      p.windowResized=()=>{
        resize();
        makeParticles();
      };

      p.mouseMoved=()=>{
        mx=p.constrain(p.mouseX/Math.max(1,p.width),0,1);
        my=p.constrain(p.mouseY/Math.max(1,p.height),0,1);
      };

      p.draw=()=>{
        const host=mount.closest('.uag-word-panel');
        if(!host) return;

        const rect=host.getBoundingClientRect();
        const vh=window.innerHeight||1;
        const progress=p.constrain((vh-rect.top)/(vh+rect.height),0,1);
        const visibility=p.constrain(1-Math.abs(.5-progress)*1.55,.18,1);
        const t=p.frameCount*.012;

        smoothX=p.lerp(smoothX,mx,.045);
        smoothY=p.lerp(smoothY,my,.045);

        p.clear();
        p.push();
        p.translate(p.width/2,p.height/2);

        const ctx=p.drawingContext;
        ctx.shadowColor='rgba(238,232,222,.38)';
        ctx.shadowBlur=12;

        if(mode==='ripples'){
          const base=Math.min(p.width,p.height);
          const driftX=(smoothX-.5)*90;
          const driftY=(smoothY-.5)*62;

          for(let i=0;i<16;i++){
            const phase=(progress*3.15+t*.12+i/16)%1;
            const radius=p.lerp(base*.035,base*.8,phase);
            const wobble=1+.055*Math.sin(t*2.2+i*.72);
            p.stroke(238,232,222,(1-phase)*175*visibility);
            p.strokeWeight(i%4===0?1.8:1);
            p.ellipse(
              driftX*Math.sin(i*.54),
              driftY*Math.cos(i*.48),
              radius*2*wobble,
              radius*2/wobble
            );
          }

          ctx.shadowBlur=10;
          particles.forEach((pt,i)=>{
            const rr=base*(pt.r+.036*Math.sin(t*pt.s+pt.phase));
            const a=pt.a+t*.22*pt.s+progress*1.05;
            const x=Math.cos(a)*rr+driftX*.58;
            const y=Math.sin(a)*rr*.62+driftY*.58;
            p.stroke(238,232,222,95*visibility);
            p.strokeWeight(pt.size);
            p.point(x,y);

            if(i%6===0){
              p.stroke(238,232,222,42*visibility);
              p.strokeWeight(.7);
              p.line(x,y,x*.88,y*.88);
            }
          });

          ctx.shadowBlur=8;
          for(let y=-base*.38;y<base*.38;y+=18){
            p.beginShape();
            p.stroke(238,232,222,43*visibility);
            p.strokeWeight(.75);
            for(let x=-p.width*.5;x<=p.width*.5;x+=15){
              const yy=y
                +Math.sin(x*.012+t*2.6+y*.012)*11
                +Math.sin(progress*9+x*.006)*7;
              p.vertex(x,yy);
            }
            p.endShape();
          }

          p.stroke(238,232,222,100*visibility);
          p.strokeWeight(1);
          p.ellipse(driftX*.35,driftY*.35,base*.13,base*.13);
        }

        if(mode==='kaleido'){
          const r=Math.min(p.width,p.height)*.48;
          const spokes=20;
          const pointerTurn=(smoothX-.5)*.5;

          p.rotate(progress*p.TWO_PI*.62+t*.1+pointerTurn);
          ctx.shadowBlur=9;

          for(let layer=0;layer<4;layer++){
            p.push();
            p.rotate(layer*.105+t*.028*(layer+1));
            for(let i=0;i<spokes;i++){
              p.push();
              p.rotate((p.TWO_PI/spokes)*i);

              const pulse=.58+.36*Math.sin(t*2.8+i*.72+progress*10.5+layer);
              const inner=r*(.07+layer*.045);
              const outer=r*(.5+layer*.115)*pulse;

              p.stroke(238,232,222,(92-layer*10)*visibility);
              p.strokeWeight(layer===0?1.6:.85);
              p.line(inner,0,outer,0);

              p.stroke(238,232,222,(58-layer*7)*visibility);
              p.quad(
                outer*.26,-outer*.07,
                outer*.52,-outer*.15,
                outer*.78,0,
                outer*.52,outer*.15
              );

              if(i%2===0){
                p.stroke(238,232,222,54*visibility);
                p.arc(outer*.47,0,outer*.32,outer*.32,-.92,.92);
              }
              p.pop();
            }
            p.pop();
          }

          for(let ring=1;ring<9;ring++){
            const rr=r*(ring*.095+.032*Math.sin(t*2.25+ring+progress*8));
            p.stroke(238,232,222,(72-ring*4.5)*visibility);
            p.strokeWeight(ring%3===0?1.4:.75);
            p.ellipse(0,0,rr*2,rr*2);
          }

          p.push();
          p.rotate(-t*.18-progress*.5);
          for(let i=0;i<8;i++){
            p.rotate(p.TWO_PI/8);
            p.stroke(238,232,222,80*visibility);
            p.strokeWeight(1);
            p.rectMode(p.CENTER);
            p.rect(r*.42,0,r*.11,r*.11);
          }
          p.pop();

          particles.slice(0,54).forEach(pt=>{
            const a=pt.a*2+t*.15+progress;
            const rr=r*(.18+pt.r);
            const x=Math.cos(a)*rr;
            const y=Math.sin(a)*rr;
            p.stroke(238,232,222,72*visibility);
            p.strokeWeight(pt.size*.8);
            p.point(x,y);
          });
        }

        if(mode==='zoom'){
          const maxR=Math.hypot(p.width,p.height);
          const cx=(smoothX-.5)*p.width*.16;
          const cy=(smoothY-.5)*p.height*.16;
          p.translate(cx,cy);

          ctx.shadowBlur=8;

          for(let i=0;i<30;i++){
            const phase=(progress*2.6+t*.062+i/30)%1;
            const size=p.lerp(10,maxR*.79,phase);
            p.stroke(238,232,222,(1-phase)*120*visibility);
            p.strokeWeight(i%5===0?1.7:.82);
            p.rectMode(p.CENTER);
            p.push();
            p.rotate((i%2?-1:1)*phase*.11 + Math.sin(t+i)*.015);
            p.rect(0,0,size,size*.61,4);
            p.pop();
          }

          for(let a=0;a<p.TWO_PI;a+=p.PI/16){
            const wobble=.84+.22*Math.sin(t*2.2+a*4);
            const inner=28;
            const outer=maxR*(.2+.43*progress)*wobble;
            p.stroke(238,232,222,72*visibility);
            p.strokeWeight(.85);
            p.line(
              Math.cos(a)*inner,
              Math.sin(a)*inner,
              Math.cos(a)*outer,
              Math.sin(a)*outer
            );
          }

          particles.forEach((pt,i)=>{
            const phase=(progress*1.9+t*.038*pt.s+pt.r)%1;
            const rr=p.lerp(34,maxR*.62,phase);
            const a=pt.a+(smoothX-.5)*.38;
            const x=Math.cos(a)*rr;
            const y=Math.sin(a)*rr*.68;
            p.stroke(238,232,222,(1-phase)*78*visibility);
            p.strokeWeight(pt.size*.9);
            p.point(x,y);

            if(i%9===0){
              p.stroke(238,232,222,(1-phase)*34*visibility);
              p.line(x*.94,y*.94,x,y);
            }
          });

          p.stroke(238,232,222,125*visibility);
          p.strokeWeight(1.25);
          p.ellipse(0,0,70+Math.sin(t*3)*10,70+Math.sin(t*3)*10);
        }

        ctx.shadowBlur=0;
        p.pop();
      };
    };

    instance=new p5(sketch);

    const observer=new IntersectionObserver(([entry])=>{
      if(!instance) return;
      if(entry.isIntersecting){
        instance.loop();
      }else{
        instance.noLoop();
      }
    },{rootMargin:'180px 0px',threshold:.01});

    observer.observe(mount);

    return()=>{
      observer.disconnect();
      instance&&instance.remove();
    };
  },[mode]);

  return <div className={`uag-story-p5 p5-${mode}`} ref={mountRef} aria-hidden="true"></div>;
}

function UAGWordStory(){
  const ref=useRef(null);

  useEffect(()=>{
    const root=ref.current;
    if(!root) return;

    const ctx=gsap.context(()=>{
      const panels=gsap.utils.toArray('.uag-word-panel',root);

      panels.forEach((panel,i)=>{
        const word=panel.querySelector('.uag-story-word');
        const copy=panel.querySelector('.uag-story-copy');
        const aura=panel.querySelector('.uag-story-aura');
        const rings=panel.querySelectorAll('.uag-ripple-ring');
        const shards=panel.querySelectorAll('.uag-kaleido-shard');

        if(i===0){
          gsap.fromTo(word,
            {opacity:1,scale:.62,y:150},
            {opacity:1,scale:1,y:0,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 75%',end:'center 48%',scrub:1}}
          );
          gsap.fromTo(rings,
            {scale:.25,opacity:0},
            {scale:1.65,opacity:.32,stagger:.08,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 70%',end:'bottom 25%',scrub:1}}
          );
          gsap.fromTo(aura,
            {scale:.6,opacity:0,rotate:-12},
            {scale:1.25,opacity:.9,rotate:8,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 72%',end:'bottom 28%',scrub:1}}
          );
        }

        if(i===1){
          gsap.fromTo(word,
            {opacity:1,scale:1.45,rotate:-4,clipPath:'inset(42% 0 42% 0)'},
            {opacity:1,scale:1,rotate:0,filter:'none',clipPath:'inset(0% 0 0% 0)',ease:'none',
             scrollTrigger:{trigger:panel,start:'top 72%',end:'center 46%',scrub:1}}
          );
          gsap.fromTo(shards,
            {opacity:0,rotate:(j)=>j%2?35:-35,scale:.5,x:(j)=>j%2?90:-90,y:(j)=>j*16},
            {opacity:.24,rotate:(j)=>j*28,scale:1,x:0,y:0,stagger:.04,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 68%',end:'bottom 30%',scrub:1}}
          );
          gsap.to(shards,{
            rotate:'+=120',
            transformOrigin:'50% 50%',
            ease:'none',
            scrollTrigger:{trigger:panel,start:'center 50%',end:'bottom top',scrub:1}
          });
        }

        if(i===2){
          gsap.fromTo(word,
            {opacity:1,scale:.78,rotateX:50,rotateY:-18,transformPerspective:900},
            {opacity:1,scale:1,rotateX:0,rotateY:0,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 73%',end:'center 46%',scrub:1}}
          );
          gsap.fromTo(aura,
            {opacity:0,scale:.5,filter:'blur(30px)'},
            {opacity:1,scale:1.55,filter:'blur(2px)',ease:'none',
             scrollTrigger:{trigger:panel,start:'top 72%',end:'bottom 30%',scrub:1}}
          );
          gsap.fromTo(rings,
            {scale:.45,opacity:.02,rotate:-30},
            {scale:1.35,opacity:.22,rotate:35,stagger:.08,ease:'none',
             scrollTrigger:{trigger:panel,start:'top 68%',end:'bottom 24%',scrub:1}}
          );
        }

        gsap.fromTo(copy,
          {opacity:0,y:65,filter:'blur(7px)'},
          {opacity:1,y:0,filter:'blur(0px)',ease:'none',
           scrollTrigger:{trigger:panel,start:'top 58%',end:'center 42%',scrub:1}}
        );

        if(i<panels.length-1){
          gsap.to(panel,{
            opacity:.22,
            scale:.95,
            filter:'saturate(.45)',
            ease:'none',
            scrollTrigger:{trigger:panel,start:'center 30%',end:'bottom top',scrub:1}
          });
        }
      });

      gsap.to('.uag-story-light',{xPercent:35,yPercent:-20,rotate:18,ease:'none',
        scrollTrigger:{trigger:root,start:'top bottom',end:'bottom top',scrub:1}
      });
    },root);

    return()=>ctx.revert();
  },[]);

  const words=[
    ['UNITED','One collective vision connecting talent, creative direction and opportunity across a global network.','ripples'],
    ['ARTIST','Individual identity comes first. UAG develops distinctive voices, careers and stories with intention.','kaleido'],
    ['GROUP','Management, media, events and partnerships move together so every part of the talent journey feels connected.','zoom']
  ];

  return <section className="uag-word-story" ref={ref}>
    <div className="uag-story-light" aria-hidden="true"></div>
    <div className="uag-story-rail" aria-hidden="true"><span></span></div>
    <div className="uag-story-intro"><span>UNITED ARTIST GROUP</span><small>SCROLL THROUGH THE IDEA</small></div>

    {words.map(([word,copy,mode],i)=>
      <article className={`uag-word-panel mode-${mode}`} key={word}>
        <StoryP5Effect mode={mode}/>
        <div className="uag-word-number">0{i+1}</div>
        <div className="uag-story-word">{word}</div>
        <p className="uag-story-copy">{cleanProse(copy)}</p>
      </article>
    )}
  </section>
}


function BrandCollaborations(){
  const brands=[
    'NEUTROGENA',
    'GARNIER',
    'AMAZON PRIME',
    'MOSCHINO',
    'VERSACE', 
    'HUDA BEAUTY',
    "MACCA'S",
    'SAMSUNG', 
    'TCL',
    'JOHN FRIEDA',
    'ANYTIME FITNESS',
    'DR SQ',
    'HOLLYWOOD REPORTER',
    'NUTELLA',
    'NOOBIE',
    "PAULA'S CHOICE",
    'SHEGLAM',
    'TIC TAC',
    'CASETIFY',
    'TRINNY LONDON',
    'LIME',
    'HBO',
    'DR GOODES', 
    'AFW',
  ];
  const [activeBrand,setActiveBrand]=useState(brands[0]);
  const [openBrand,setOpenBrand]=useState(null);
  const [brandImageIndex,setBrandImageIndex]=useState(0);
  const brandImages=useSequentialMedia(
    openBrand ? `/media/collaborations/collab-${mediaSlug(openBrand)}` : '',
    30
  );

  useEffect(()=>{ setBrandImageIndex(0); },[openBrand]);

  useEffect(()=>{
    if(brandImages.length && brandImageIndex>=brandImages.length){
      setBrandImageIndex(0);
    }
  },[brandImages.length,brandImageIndex]);

  const moveBrandImage=direction=>{
    if(brandImages.length<2) return;
    setBrandImageIndex(current=>(current+direction+brandImages.length)%brandImages.length);
  };

  const repeated=[...brands,...brands];

  return <section className="brand-collabs">
    <div className="brand-collabs-head">
      <div>
        <span className="eyebrow">BRAND COLLABORATIONS</span>
        <h2>UAG ×<br/><em>Culture.</em></h2>
      </div>
      <p>Creative partnerships, brand moments and cultural collaborations connected through the UAG universe.</p>
    </div>

    <div className="brand-collabs-stage">
      <div className="brand-preview" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            className="brand-preview-image"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:.7,ease:"easeOut"}}
          >
            <Placeholder label={`${activeBrand} / COLLABORATION IMAGE`} index={brands.indexOf(activeBrand)} src={`/media/collaborations/collab-${mediaSlug(activeBrand)}-01.jpg`} alt={`${activeBrand} UAG collaboration`}/>
          </motion.div>
        </AnimatePresence>
        <div className="brand-preview-meta">
          <span>ACTIVE COLLABORATION</span>
          <strong>{activeBrand}</strong>
        </div>
      </div>

      <div className="brand-streams">
        <div className="brand-stream brand-stream-forward">
          <div className="brand-stream-track">
            {repeated.map((brand,i)=>
              <button
                key={`brand-a-${brand}-${i}`}
                className={activeBrand===brand?'is-active':''}
                onMouseEnter={()=>setActiveBrand(brand)}
                onFocus={()=>setActiveBrand(brand)}
                onClick={()=>setOpenBrand(brand)}
              >
                {brand}<ArrowUpRight/>
              </button>
            )}
          </div>
        </div>

        <div className="brand-stream brand-stream-reverse">
          <div className="brand-stream-track">
            {[...repeated].reverse().map((brand,i)=>
              <button
                key={`brand-b-${brand}-${i}`}
                className={activeBrand===brand?'is-active':''}
                onMouseEnter={()=>setActiveBrand(brand)}
                onFocus={()=>setActiveBrand(brand)}
                onClick={()=>setOpenBrand(brand)}
              >
                {brand}<ArrowUpRight/>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="brand-collabs-foot">
      <span>HOVER TO PREVIEW</span>
      <span>CLICK TO OPEN</span>
    </div>

    <AnimatePresence>
      {openBrand&&
        <motion.div
          className="brand-collab-modal-backdrop"
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:.3}}
          onClick={()=>setOpenBrand(null)}
        >
          <motion.article
            className="brand-collab-modal"
            initial={{opacity:0,y:22}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:18}}
            transition={{duration:.5,ease:[.22,1,.36,1]}}
            onClick={e=>e.stopPropagation()}
          >
            <button className="brand-collab-close" onClick={()=>setOpenBrand(null)} aria-label="Close collaboration"><X/></button>
            <div className="brand-collab-modal-media brand-collab-slider">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${openBrand}-${brandImageIndex}-${brandImages[brandImageIndex]||'fallback'}`}
                  className="brand-collab-slide"
                  initial={{opacity:0,x:22}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-22}}
                  transition={{duration:.42,ease:[.22,1,.36,1]}}
                >
                  <Placeholder
                    label={`${openBrand} / COLLABORATION ${pad2(brandImageIndex+1)}`}
                    index={brandImageIndex}
                    src={brandImages[brandImageIndex] || `/media/collaborations/collab-${mediaSlug(openBrand)}-01.jpg`}
                    alt={`${openBrand} UAG collaboration image ${brandImageIndex+1}`}
                  />
                </motion.div>
              </AnimatePresence>

              {brandImages.length>1&&<>
                <button className="brand-gallery-arrow brand-gallery-prev" onClick={()=>moveBrandImage(-1)} aria-label="Previous collaboration image"><ArrowDownRight/></button>
                <button className="brand-gallery-arrow brand-gallery-next" onClick={()=>moveBrandImage(1)} aria-label="Next collaboration image"><ArrowUpRight/></button>
                <div className="brand-gallery-count">{pad2(brandImageIndex+1)} / {pad2(brandImages.length)}</div>
              </>}
            </div>
            <div className="brand-collab-modal-copy">
              <span className="eyebrow">BRAND COLLABORATION</span>
              <h3>{openBrand}</h3>
            </div>
          </motion.article>
        </motion.div>
      }
    </AnimatePresence>
  </section>
}

function Home({setActive}){
  const {scrollYProgress}=useScroll();
  const y=useTransform(scrollYProgress,[0,.35],[0,160]);
  return <main>
    <section className="hero">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-orbit orbit-one" aria-hidden="true"/>
      <div className="hero-orbit orbit-two" aria-hidden="true"/>
      <div className="hero-poster" aria-hidden="true">
        <Placeholder label="UAG HERO POSTER" src="/media/uag-hero-poster.jpg" alt=""/>
      </div>
      <video autoPlay muted loop playsInline className="hero-video">
        <source src={`${import.meta.env.BASE_URL}media/uag-hero.mp4`} type="video/mp4"/>
      </video>
      <div className="video-fallback"/>
      <motion.div style={{y}} className="hero-copy">
        <span>UAG ENTERTAINMENT — SYDNEY / GLOBAL</span>
        <h1>UNITED<br/><em>ARTIST</em> GROUP</h1>
        <p>Talent management, culture, press and media, and global experiences.</p>
      </motion.div>
      <button className="hero-scroll magnetic" onClick={()=>document.getElementById('home-intro')?.scrollIntoView({behavior:'smooth'})}>DISCOVER <ArrowDownRight/></button>
      <FloatingIndex/>
    </section>
    <UAGWordStory/>
    <section className="manifesto" id="home-intro">
      <div className="manifesto-small">UAG ENTERTAINMENT / 2026</div>
      <h2 data-reveal>WE DON’T JUST<br/><em>REPRESENT</em> TALENT.<br/>WE BUILD <span>CULTURE.</span></h2>
      <p>UAG Entertainment is a Sydney based global creative hub representing artists, models and talent across entertainment, casting, press and media, brand events, global tours and film.</p>
    </section>
    <InteractiveUniverse setActive={setActive}/>
    <BrandCollaborations/>
    <section className="home-grid">
      <button onClick={()=>setActive('Artists')}><span>01 / ROSTER</span><strong>Artists</strong><ArrowUpRight/></button>
      <button onClick={()=>setActive('Models')}><span>02 / TALENT</span><strong>Models</strong><ArrowUpRight/></button>
      <button onClick={()=>setActive('Events')}><span>03 / MOMENTS</span><strong>Events</strong><ArrowUpRight/></button>
      <button onClick={()=>setActive('Press & Media')}><span>04 / MEDIA</span><strong>Press & Media</strong><ArrowUpRight/></button>
    </section>
    <section className="feature-block">
      <div className="feature-copy"><span className="eyebrow">FEATURED MOMENT</span><h2>The Boys<br/>Season 5</h2><p>Red carpet premiere with UAG talent on the global stage.</p><button className="text-btn magnetic" onClick={()=>setActive('Events')}>EXPLORE EVENTS <ArrowUpRight/></button></div>
      <Placeholder label="FEATURED EVENT IMAGE" index={2} src="/media/home/home-featured-the-boys-season-5.jpg" alt="The Boys Season 5 featured UAG event"/>
    </section>
    <Footer/>
  </main>
}

function About(){
  return <Shell eyebrow="ABOUT / UAG ENTERTAINMENT" title={<>A GLOBAL CREATIVE<br/>POWERHOUSE.</>} description="UAG Entertainment is a full service global agency across music, modelling, casting, events, press and media, and film, building talent into internationally recognised brands through a global network spanning Sydney, Singapore, Paris and China.">
    <section className="ceo portrait-hover">
      <div className="portrait-media priscilla-portrait"><Placeholder label="PRISCILLA CORTESE PORTRAIT" index={4} src="/media/team/priscilla-cortese.jpg" alt="Priscilla Cortese"/></div>
      <div className="ceo-copy">
        <span className="eyebrow">FOUNDER & CEO</span>
        <h2>Priscilla<br/>Cortese</h2>
        <p className="ceo-description">{cleanProse(executives[0].desc)}</p>
        <a href={executives[0].social} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight/></a>
      </div>
    </section>
<section className="principles">
      {[
        ['01','Talent First','Every decision starts with the talent. We build careers, not transactions.'],
        ['02','Global Standard','Our roster competes on the world stage. Our expectations match that level.'],
        ['03','Long Term Vision','We invest in the full arc, from emergence to legacy.']
      ].map(x=>
        <div key={x[0]}>
          <span>{x[0]}</span>
          <h3>{x[1]}</h3>
          <p>{cleanProse(x[2])}</p>
        </div>
      )}
    </section>

    <section className="team">
      <div className="section-head">
        <span>LEADERSHIP</span>
        <h2>The Executive Team</h2>
      </div>
      <div className="team-grid">
        {executives.slice(1).map((x,i)=>
          <article className="portrait-hover" key={x.name}>
            <div className="portrait-media"><Placeholder label={x.name.toUpperCase()} index={i} src={`/media/team/${mediaSlug(x.name)}.jpg`} alt={x.name}/></div>
            <div>
              <span>{x.role}</span>
              <h3>{x.name}</h3>
              <p>{cleanProse(x.desc)}</p>
              {x.social&&<a href={x.social} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight/></a>}
            </div>
          </article>
        )}
      </div>
    </section>

    <section className="ceo carol-feature portrait-hover">
      <div className="ceo-copy">
        <span className="eyebrow">{carolFerrone.role}</span>
        <h2>Carol<br/>Ferrone</h2>
        <p className="ceo-description">{cleanProse(carolFerrone.desc)}</p>
        <div className="social-row carol-social-row">
          <a href={carolFerrone.social.instagram} target="_blank" rel="noreferrer"><AtSign/> INSTAGRAM</a>
          <a href={carolFerrone.social.tiktok} target="_blank" rel="noreferrer"><TikTokMark/> TIKTOK</a>
        </div>
      </div>
      <div className="portrait-media"><Placeholder label="CAROL FERRONE PORTRAIT" index={13} src="/media/team/carol-ferrone.jpg" alt="Carol Ferrone"/></div>
    </section>

<Footer/>
  </Shell>
}

function TalentGrid({type,data}){
  const [selected,setSelected]=useState(null);
  const [activeIndex,setActiveIndex]=useState(0);
  const total=data.length;

  const shift=dir=>setActiveIndex(v=>(v+dir+total)%total);

  const relative=idx=>{
    let d=idx-activeIndex;
    if(d>total/2) d-=total;
    if(d<-total/2) d+=total;
    return d;
  };

  const orbitSpacing=typeof window!=='undefined'
    ? clampValue(145,window.innerWidth*.105,205)
    : 175;

  return <Shell
    eyebrow={`UAG / ${type.toUpperCase()}`}
    title={<>OUR<br/>{type.toUpperCase()}.</>}
    description={type==='Artists'
      ? 'Our artists are storytellers, visionaries and trailblazers, each bringing a distinct presence to stage, screen and culture.'
      : 'Our models represent sophistication, diversity and global influence, selected for distinctive style and commanding presence.'}
  >
    <section className="talent-orbit-browser">
      <div className="talent-orbit-head">
        <span className="eyebrow">EXPLORE THE ROSTER</span>
        <h2>Move through<br/><em>the UAG circle.</em></h2>
      </div>

      <div className="talent-orbit-stage">
        <div className="talent-orbit-ring" aria-hidden="true"></div>

        {data.map((person,idx)=>{
          const d=relative(idx);
          const abs=Math.abs(d);
          const visible=abs<=3;
          const x=d*orbitSpacing;
          const y=Math.pow(abs,1.65)*30;
          const rotate=d*9.2;
          const scale=idx===activeIndex ? 1 : Math.max(.58,1-abs*.14);
          const opacity=visible ? (idx===activeIndex ? 1 : Math.max(.24,1-abs*.22)) : 0;

          return <motion.button
            key={person.name}
            className={`talent-orbit-card ${idx===activeIndex?'is-active':''}`}
            style={{zIndex:20-abs,pointerEvents:visible?'auto':'none'}}
            animate={{x,y,rotate,scale,opacity}}
            transition={{type:'spring',stiffness:150,damping:22,mass:.8}}
            onClick={()=>{
              if(idx===activeIndex) setSelected({...person,index:idx});
              else setActiveIndex(idx);
            }}
          >
            <Placeholder label={`${person.name} HEADSHOT`} index={idx} src={`/media/${type.toLowerCase()}/${mediaSlug(person.name)}-profile.jpg`} alt={`${person.name} profile`}/>
            <div className="talent-orbit-name">
              <strong>{person.name}</strong>
              <span>{String(idx+1).padStart(2,'0')}</span>
            </div>
          </motion.button>;
        })}

        <div className="talent-orbit-center-copy">
          <span>{String(activeIndex+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
          <p>{cleanProse(data[activeIndex].bio)}</p>
        </div>
      </div>

      <div className="talent-orbit-controls">
        <button onClick={()=>shift(-1)} aria-label={`Previous ${type}`}><ArrowDownRight className="prev-arrow"/></button>
        <button className="talent-profile-button" onClick={()=>setSelected({...data[activeIndex],index:activeIndex})}>OPEN PROFILE <Plus/></button>
        <button onClick={()=>shift(1)} aria-label={`Next ${type}`}><ArrowUpRight/></button>
      </div>
    </section>

    <AnimatePresence>
      {selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}>
        <motion.div className="profile-modal" initial={{y:70,opacity:0,scale:.9,rotateX:8}} animate={{y:0,opacity:1,scale:1,rotateX:0}} exit={{y:70,opacity:0,scale:.94}} transition={{duration:.5,ease:[.2,.8,.2,1]}} onClick={e=>e.stopPropagation()}>
          <button className="close" onClick={()=>setSelected(null)}><X/></button>
          <div className="profile-gallery">
            {[0,1,2,3].map((_,j)=><Placeholder key={j} label={`${selected.name.toUpperCase()} GALLERY ${j+1}`} index={selected.index+j} src={`/media/${type.toLowerCase()}/${mediaSlug(selected.name)}-${pad2(j+1)}.jpg`} alt={`${selected.name} gallery ${j+1}`}/>)}
          </div>
          <div className="profile-info">
            <span className="eyebrow">{selected.role}</span>
            <h2>{selected.name}</h2>
            <p>{cleanProse(selected.bio || `UAG ${type.slice(0,-1).toLowerCase()} profile. Approved biography, measurements, selected work and booking information to be supplied.`)}</p>
            {selected.note&&<p className="muted">{cleanProse(selected.note)}</p>}
            <div className="social-row">
              {Object.entries(selected.social||{}).map(([k,v])=>{
                const Icon=socials[k]||Music2;
                return <a key={k} href={v} target="_blank" rel="noreferrer"><Icon/> {k.toUpperCase()}</a>;
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
    <Footer/>
  </Shell>
}


function P5EventUniverse({onSelect,focusedEvent}){
  const host=useRef(null);
  useEffect(()=>{
    if(!host.current) return;
    const sketch=p=>{
      let nodes=[];
      let camX=0,camY=0,targetX=0,targetY=0,zoom=1,targetZoom=1;
      const worldW=1700,worldH=1050;
      const baseW=1800,baseH=1120;

      p.setup=()=>{
        const c=p.createCanvas(host.current.clientWidth,host.current.clientHeight);
        c.parent(host.current);
        p.pixelDensity(Math.min(window.devicePixelRatio||1,1.25));
        p.textFont('Manrope');
        nodes=events.map((e,i)=>({
          ...e,
          wx:(e.x/100-.5)*baseW,
          wy:(e.y/100-.5)*baseH,
          seed:i*1.73,
          r:8
        }));
      };

      p.windowResized=()=>{
        if(host.current) p.resizeCanvas(host.current.clientWidth,host.current.clientHeight);
      };

      p.draw=()=>{
        p.background(12,12,12);
        const mx=p.constrain(p.mouseX/p.width,0,1)-.5;
        const my=p.constrain(p.mouseY/p.height,0,1)-.5;
        targetX=mx*650;
        targetY=my*420;
        camX=p.lerp(camX,targetX,.035);
        camY=p.lerp(camY,targetY,.035);
        zoom=p.lerp(zoom,targetZoom,.08);

        // subtle atmosphere
        p.noStroke();
        for(let i=0;i<4;i++){
          const gx=p.width*(.15+i*.24)+Math.sin(p.frameCount*.004+i)*22;
          const gy=p.height*(.25+(i%2)*.42)+Math.cos(p.frameCount*.003+i)*18;
          p.fill(90,86,81,10);
          p.circle(gx,gy,240+i*45);
        }

        p.push();
        p.translate(p.width/2-camX,p.height/2-camY);
        p.scale(zoom);

        // Connect close nodes so the network feels organic rather than diagrammatic.
        p.strokeWeight(1.18/zoom);
        for(let i=0;i<nodes.length;i++){
          for(let j=i+1;j<nodes.length;j++){
            const a=nodes[i],b=nodes[j];
            const ax=a.wx+Math.sin(p.frameCount*.008+a.seed)*8;
            const ay=a.wy+Math.cos(p.frameCount*.007+a.seed)*7;
            const bx=b.wx+Math.sin(p.frameCount*.008+b.seed)*8;
            const by=b.wy+Math.cos(p.frameCount*.007+b.seed)*7;
            const d=p.dist(ax,ay,bx,by);
            if(d<410){
              const alpha=p.map(d,70,410,120,24,true);
              p.stroke(225,221,215,alpha);
              p.line(ax,ay,bx,by);
            }
          }
        }

        nodes.forEach((n,i)=>{
          const x=n.wx+Math.sin(p.frameCount*.008+n.seed)*8;
          const y=n.wy+Math.cos(p.frameCount*.007+n.seed)*7;
          const sx=(x*zoom+p.width/2-camX);
          const sy=(y*zoom+p.height/2-camY);
          const hover=p.dist(p.mouseX,p.mouseY,sx,sy)<58;

          p.noStroke();
          p.fill(hover?238:204,hover?235:201,hover?230:196,hover?245:190);
          p.circle(x,y,hover?17:10);

          p.noFill();
          p.stroke(218,214,208,hover?100:35);
          p.strokeWeight(.8/zoom);
          p.circle(x,y,hover?52:31);

          p.noStroke();
          p.fill(235,232,227,hover?240:150);
          p.textSize((hover?12:10)/zoom);
          p.textStyle(p.NORMAL);
          p.text(String(i+1).padStart(2,'0'),x+13/zoom,y-4/zoom);

          p.fill(235,232,227,hover?255:180);
          p.textSize((hover?14:11)/zoom);
          p.textStyle(hover?p.BOLD:p.NORMAL);
          const label=n.name.length>27?n.name.slice(0,27)+'…':n.name;
          p.text(label,x+13/zoom,y+13/zoom);
        });
        p.pop();

        p.noStroke();
        p.fill(235,232,227,100);
        p.textSize(9);
        p.text('MOVE CURSOR TO EXPLORE  /  WHEEL TO ZOOM  /  CLICK A NODE',20,p.height-22);
      };

      p.mouseWheel=e=>{
        if(focusedEvent) return false;
        if(p.mouseX>=0&&p.mouseX<=p.width&&p.mouseY>=0&&p.mouseY<=p.height){
          targetZoom=p.constrain(targetZoom*(e.delta>0?.92:1.08),.72,1.6);
          return false;
        }
      };

      const selectNodeAtPointer=()=>{
        if(focusedEvent) return false;

        for(let i=nodes.length-1;i>=0;i--){
          const n=nodes[i];
          const x=n.wx+Math.sin(p.frameCount*.008+n.seed)*8;
          const y=n.wy+Math.cos(p.frameCount*.007+n.seed)*7;
          const sx=x*zoom+p.width/2-camX;
          const sy=y*zoom+p.height/2-camY;

          if(p.dist(p.mouseX,p.mouseY,sx,sy)<72){
            onSelect({...n,index:i});
            return false;
          }
        }
        return false;
      };

      p.mousePressed=selectNodeAtPointer;
      p.touchStarted=selectNodeAtPointer;
    };
    const instance=new p5(sketch);

    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        instance.loop();
      }else{
        instance.noLoop();
      }
    },{rootMargin:'220px 0px',threshold:.01});

    observer.observe(host.current);

    return()=>{
      observer.disconnect();
      instance.remove();
    };
  },[onSelect, focusedEvent]);
  return <div ref={host} className="p5-event-canvas"/>;
}

function EventWeb(){
  const [selected,setSelected]=useState(null);
  const [eventImageIndex,setEventImageIndex]=useState(0);
  const eventImages=useSequentialMedia(
    selected ? `/media/events/event-${selected.mediaKey}` : '',
    40
  );
  const eventImageCount=eventImages.length;

  const selectEvent=(event)=>{
    setSelected(event);
    setEventImageIndex(0);
  };

  useEffect(()=>{
    if(eventImageCount && eventImageIndex>=eventImageCount){
      setEventImageIndex(0);
    }
  },[eventImageCount,eventImageIndex]);

  const moveEventImage=(direction)=>{
    if(eventImageCount<2) return;
    setEventImageIndex(current=>(current+direction+eventImageCount)%eventImageCount);
  };

  return <section className={`event-stage event-stage-full ${selected?'event-focused':''}`}>
    <div className="event-web-shell">
      <P5EventUniverse onSelect={selectEvent} focusedEvent={selected}/>
      <div className="event-web-corner event-web-corner-left"><span>UAG EVENT NETWORK</span><small>MOVE / ZOOM / SELECT</small></div>
      <div className="event-web-corner event-web-corner-right"><span>{events.length.toString().padStart(2,'0')} EVENTS</span></div>
      {selected&&createPortal(<div className="event-focus-panel event-profile-slider">
          <button className="event-focus-close" onClick={()=>setSelected(null)} aria-label="Close event"><X/></button>

          <div className="event-slider-media">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${selected.name}-${eventImageIndex}`}
                className="event-slider-image"
                initial={{opacity:0,x:22,scale:.985}}
                animate={{opacity:1,x:0,scale:1}}
                exit={{opacity:0,x:-22,scale:.985}}
                transition={{duration:.5,ease:[.22,1,.36,1]}}
              >
                <Placeholder label={`${selected.name} / ${eventImageIndex+1}`} index={eventImageIndex} src={eventImages[eventImageIndex] || `/media/events/event-${selected.mediaKey}-01.jpg`} alt={`${selected.name} image ${eventImageIndex+1}`}/>
              </motion.div>
            </AnimatePresence>

            {eventImageCount>1&&<>
              <button
                className="event-slider-arrow event-slider-prev"
                onClick={(e)=>{
                  e.stopPropagation();
                  moveEventImage(-1);
                }}
                aria-label="Previous event image"
              >
                <ArrowDownRight/>
              </button>
              <button
                className="event-slider-arrow event-slider-next"
                onClick={(e)=>{
                  e.stopPropagation();
                  moveEventImage(1);
                }}
                aria-label="Next event image"
              >
                <ArrowUpRight/>
              </button>
            </>}

            {eventImageCount>0&&<div className="event-slider-count">
              {String(eventImageIndex+1).padStart(2,'0')} / {String(eventImageCount).padStart(2,'0')}
            </div>}
          </div>

          <div className="event-profile-copy">
            <div className="event-focus-index">SELECTED EVENT</div>
            <h3>{selected.name}</h3>
          </div>
        </div>, document.body)}
    </div>
  </section>
}

function Press(){
  return <Shell eyebrow="PRESS ROOM / UAG" title={<>PRESS &<br/>MEDIA.</>} description="Press releases, media coverage and assets documenting UAG’s work, milestones and collaborations.">
    <section className="press-list">{press.map((p,i)=><article key={p[1]}><div className="press-no">{String(i+1).padStart(2,'0')}</div><Placeholder label="PRESS IMAGE" index={i} src={`/media/press/${p[3]}`} alt={p[1]}/><div><span>{p[0]}</span><h3>{p[1]}</h3><p>{cleanProse(p[2])}</p><button className="magnetic" onClick={()=>document.getElementById('media-contact')?.scrollIntoView({behavior:'smooth'})}>MEDIA ENQUIRY <ArrowUpRight/></button></div></article>)}</section>
    <section className="media-contact" id="media-contact"><span>MEDIA ENQUIRIES</span><h2>Press & Media<br/>Contact</h2><p>For press enquiries, media assets, interview requests or accreditation, our PR team is available to assist.</p><a href="mailto:info@uagentertainment.com">info@uagentertainment.com <ArrowUpRight/></a></section><Footer/>
  </Shell>
}

function LiveNow(){
  return <Shell eyebrow="LIVE NOW / PODCAST" title={<>UNSCRIPTED<br/>WITH PRISCILLA.</>} description="Real stories and unscripted conversations with people shaping entertainment, culture and creativity.">
    <section className="podcast">
      <div className="podcast-art podcast-photo">
        <Placeholder
          label="UNSCRIPTED WITH PRISCILLA PHOTO"
          index={3}
          sources={[
            '/media/podcast/unscripted-with-priscilla.jpg',
            '/media/podcast/unscripted-with-priscilla-cover.jpg'
          ]}
          alt="Unscripted with Priscilla"
        />
      </div>
      <div><span className="eyebrow">HOSTED BY PRISCILLA CORTESE</span><h2>Real stories.<br/>Raw Conversations.<br/>No filters.</h2><p>An intimate podcast from UAG CEO Priscilla Cortese, built around unscripted conversations with people shaping entertainment, culture and creativity.</p>
      <a className="cta magnetic" href="https://www.instagram.com/unscriptedwithpriscilla/" target="_blank"><AtSign/> FOLLOW UNSCRIPTED <ArrowUpRight/></a></div>
    </section>
    <section className="episode-placeholder"><span>EPISODE FEED</span><h3>Episode titles, guests, platform links and release dates to be supplied.</h3></section><Footer/>
  </Shell>
}

function ContactBlock({selectedService,setSelectedService}){
  const serviceNames=services.map(s=>s[0]);
  return <section className="contact-block" id="work-with-uag">
    <div className="contact-intro">
      <span className="eyebrow">WORK WITH UAG</span>
      <h2>Start the<br/><em>conversation.</em></h2>
      <p>Your selected service carries into this enquiry automatically. Change it here anytime before sending.</p>
      {selectedService&&<div className="contact-selection"><span>SELECTED SERVICE</span><strong>{selectedService}</strong></div>}
      <div className="contact-lines">
        <a href="mailto:info@uagentertainment.com"><Mail/> info@uagentertainment.com <ArrowUpRight/></a>
        <a href="tel:+61452096882"><Phone/> +61 452 096 882 <ArrowUpRight/></a>
        <a href={uagSocials.instagram} target="_blank" rel="noreferrer"><AtSign/> UAG INSTAGRAM <ArrowUpRight/></a>
        <a href={uagSocials.tiktok} target="_blank" rel="noreferrer"><Music2/> UAG TIKTOK <ArrowUpRight/></a>
        <span><MapPin/> Sydney NSW, Australia</span>
      </div>
    </div>
    <form onSubmit={e=>{
      e.preventDefault();
      const fd=new FormData(e.currentTarget);
      const subject=encodeURIComponent(`UAG Enquiry — ${fd.get('service')||'General'}`);
      const body=encodeURIComponent(`Name: ${fd.get('first')} ${fd.get('last')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nService: ${fd.get('service')}\n\n${fd.get('message')||''}`);
      window.location.href=`mailto:info@uagentertainment.com?subject=${subject}&body=${body}`;
    }}>
      <div className="field-row">
        <label>FIRST NAME<input name="first" required placeholder="Your first name"/></label>
        <label>LAST NAME<input name="last" required placeholder="Your last name"/></label>
      </div>
      <label>EMAIL<input name="email" type="email" required placeholder="you@email.com"/></label>
      <label>PHONE<input name="phone" placeholder="+61"/></label>
      <label>I’M INTERESTED IN
        <select name="service" value={selectedService||serviceNames[0]} onChange={e=>setSelectedService(e.target.value)}>
          {serviceNames.map(name=><option key={name}>{name}</option>)}
          <option>Events / Casting</option><option>Other</option>
        </select>
      </label>
      <label>MESSAGE<textarea name="message" rows="4" placeholder="Tell us about your project"/></label>
      <button className="submit magnetic">SEND ENQUIRY <ArrowUpRight/></button>
    </form>
  </section>
}

function Services(){
  const [selectedService,setSelectedService]=useState(services[0][0]);
  const [hovered,setHovered]=useState(0);

  const enquire=(name)=>{
    setSelectedService(name);
    window.setTimeout(()=>document.getElementById('work-with-uag')?.scrollIntoView({behavior:'smooth',block:'start'}),50);
  };

  return <Shell eyebrow="WHAT WE DO / UAG" title={<>SERVICES FOR<br/>THE <em>WHOLE</em> STORY.</>} description="Strategy, representation and execution under one roof. Explore a service and enquire without losing your selection.">

    <section className="service-world">
      <div className="service-world-sticky">
        <span className="eyebrow">CURRENT FOCUS / {String(hovered+1).padStart(2,'0')}</span>
        <AnimatePresence mode="sync">
          <motion.div key={services[hovered][0]} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:.35}}>
            <h2>{services[hovered][0]}</h2>
            <p>{services[hovered][1]}</p>
            <button className="service-focus-cta magnetic" onClick={()=>enquire(services[hovered][0])}>ENQUIRE ABOUT THIS <ArrowUpRight/></button>
          </motion.div>
        </AnimatePresence>
        <div className="service-orbit-label">UAG / {services[hovered][2]} SESSION</div>
      </div>

      <div className="services services-dark">
        {services.map((s,i)=><article key={s[0]} onMouseEnter={()=>setHovered(i)} onFocus={()=>setHovered(i)} className={hovered===i?'is-active':''}>
          <span>{String(i+1).padStart(2,'0')} / {s[2]}</span>
          <h2>{s[0]}</h2>
          <p>{cleanProse(s[1])}</p>
          <button className="magnetic" onClick={()=>enquire(s[0])}>BOOK / ENQUIRE <ArrowUpRight/></button>
        </article>)}
      </div>
    </section>

    <ContinuousMarquee className="service-marquee" items={services.map(s=>s[0])}/>

    <ContactBlock selectedService={selectedService} setSelectedService={setSelectedService}/>
    <Footer/>
  </Shell>
}

function Footer(){
  return <footer className="site-footer">
    <div className="footer-brand">
      <div className="footer-logo-wrap"><TransparentLogo/></div>
      
    </div>

    <div className="footer-links-grid">
      <div className="footer-link-col">
        <span className="footer-col-label">SOCIAL</span>
        <a href={uagSocials.instagram} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight/></a>
        <a href={uagSocials.tiktok} target="_blank" rel="noreferrer">TIKTOK <ArrowUpRight/></a>
      </div>
      <div className="footer-link-col">
        <span className="footer-col-label">CONTACT</span>
        <a href="mailto:info@uagentertainment.com">EMAIL <ArrowUpRight/></a>
        <a href="tel:+61452096882">CALL <ArrowUpRight/></a>
      </div>
      <div className="footer-location">
        <span>Sydney NSW, Australia</span>
      </div>
    </div>

    <div className="footer-line"><span>UNITED ARTIST GROUP</span><span>ARTISTS / MODELS / EVENTS / PRESS & MEDIA</span><span>© 2026</span></div>
  </footer>
}

function App(){
  const [active,setActive]=useState('Home');
  useEffect(()=>{ window.scrollTo({top:0,behavior:'auto'}); },[active]);
  const page={Home:<Home setActive={setActive}/>,About:<About/>,Artists:<TalentGrid type="Artists" data={artists}/>,Models:<TalentGrid type="Models" data={models}/>,Events:<EventWeb/>, 'Press & Media':<Press/>, 'Live Now':<LiveNow/>, Services:<Services/>}[active];
  return <><DynamicBackdrop/><CustomCursor/><ScrollProgress/><SmoothMotion active={active}/><Nav active={active} setActive={setActive}/><AnimatePresence mode="sync"><motion.div key={active} initial={{opacity:0,clipPath:'inset(0 0 5% 0)'}} animate={{opacity:1,clipPath:'inset(0 0 0% 0)'}} exit={{opacity:0,clipPath:'inset(0 0 4% 0)'}} transition={{duration:.52,ease:[.22,.61,.36,1]}}>{page}</motion.div></AnimatePresence></>
}

createRoot(document.getElementById('root')).render(<App/>);