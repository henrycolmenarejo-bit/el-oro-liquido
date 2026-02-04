
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AISommelier from './components/AISommelier';
import { IMAGES, HISTORY_TIMELINE, VARIETIES, ADVANTAGES_DATA, REGIONS_DATA, NUTRITION_STATS, OFFICIAL_TREE_STATS, OTHER_PRODUCERS } from './constants';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300" onClick={e => e.stopPropagation()}>
        <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h3 className="text-3xl font-bold font-serif text-olive-dark">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-400 hover:text-stone-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string; img: string; icon: string; onLearnMore: () => void }> = ({ title, desc, img, icon, onLearnMore }) => (
  <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl border border-stone-100">
    <div className="h-64 overflow-hidden relative">
      <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 left-8 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
         <span className="text-white text-[10px] font-black uppercase tracking-widest">Contenido Verificado</span>
      </div>
    </div>
    <div className="p-10">
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/10 text-gold transform group-hover:rotate-12 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner">
        <span dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <h3 className="mb-4 text-2xl font-bold text-olive-dark group-hover:text-gold transition-colors font-serif">{title}</h3>
      <p className="text-stone-500 leading-relaxed mb-8 text-lg font-light">{desc}</p>
      <button 
        onClick={onLearnMore}
        className="group/btn inline-flex items-center gap-3 text-stone-900 font-black text-sm uppercase tracking-[0.2em] hover:text-gold transition-all"
      >
        <span>Ver Análisis Detallado</span>
        <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover/btn:border-gold transition-colors">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{ type: string; data: any } | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const addToCart = (product: any) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === productId);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const openBuyModal = () => {
    setActiveModal({
      type: 'store',
      data: {
        title: "Boutique Oro Líquido",
        products: [
          { id: 1, name: "Picual Reserva Familiar (500ml)", price: 24.95, img: IMAGES.store_picual, tag: "Cosecha Temprana", detail: "Acidez < 0.1%. Notas de higuera y tomate." },
          { id: 2, name: "Arbequina Selección Gourmet", price: 19.50, img: IMAGES.store_arbequina, tag: "Suave Premium", detail: "Ideal para crudo y pescados blancos." },
          { id: 3, name: "Coupage Gran Selección 2024", price: 45.00, img: IMAGES.store_premium, tag: "Edición Limitada", detail: "Mezcla secreta del maestro almazarero." }
        ]
      }
    });
  };

  const openRegionsModal = () => {
    setActiveModal({
      type: 'regions',
      data: { title: "Geografía del Olivar", regions: REGIONS_DATA }
    });
  };

  const openOfficialStatsModal = () => {
    setActiveModal({
      type: 'official-stats',
      data: { title: "Cifras Oficiales del Olivar", stats: OFFICIAL_TREE_STATS, others: OTHER_PRODUCERS }
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-gold selection:text-white">
      <Navbar onBuyClick={openBuyModal} cartCount={cart.length} />
      <Hero />

      {/* Ventajas Section - Developed & Expanded */}
      <section id="ventajas" className="py-32 px-4 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 skew-x-12 translate-x-32 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-end mb-24">
            <div className="lg:w-2/3">
              <span className="text-gold font-black tracking-[0.4em] uppercase text-xs mb-6 block">Análisis Nutricional y Científico</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-2 mb-8 text-olive-dark font-serif leading-tight">Mucho más que <br />una grasa saludable</h2>
              <p className="text-stone-500 text-2xl leading-relaxed font-light">
                El Aceite de Oliva Virgen Extra (AOVE) español es considerado por médicos de todo el mundo como un auténtico <span className="text-olive-dark font-bold italic">superalimento</span> biodisponible.
              </p>
            </div>
            <div className="lg:w-1/3 grid grid-cols-2 gap-4 w-full">
               {NUTRITION_STATS.map(stat => (
                 <div key={stat.label} className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 hover:border-gold transition-colors group">
                    <p className="text-3xl font-black text-olive-dark group-hover:text-gold transition-colors">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest mt-1">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <FeatureCard 
              title="Vitalidad Celular"
              desc="Un escudo molecular que combate el estrés oxidativo y protege el sistema nervioso central."
              img={IMAGES.health}
              onLearnMore={() => setActiveModal({ type: 'rich-feature', data: ADVANTAGES_DATA.salud })}
              icon='<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
            />
            <FeatureCard 
              title="Garantía de Calidad"
              desc="Certificación total desde el origen. Solo el 10% del aceite mundial cumple estos estándares."
              img={IMAGES.bottling}
              onLearnMore={() => setActiveModal({ type: 'rich-feature', data: ADVANTAGES_DATA.calidad })}
              icon='<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
            />
            <FeatureCard 
              title="Alta Gastronomía"
              desc="El ingrediente que define la cocina de vanguardia y la tradición más pura de España."
              img={IMAGES.landscape}
              onLearnMore={() => setActiveModal({ type: 'rich-feature', data: ADVANTAGES_DATA.gastronomia })}
              icon='<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>'
            />
          </div>

          <div className="mt-24 p-12 bg-olive-dark rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-gold/20 transition-all"></div>
            <div className="md:w-1/4">
               <img src={IMAGES.cta_why} className="w-full aspect-square object-cover rounded-[2rem] shadow-lg border-2 border-gold/30" alt="Cata" />
            </div>
            <div className="md:w-3/4">
               <h3 className="text-3xl font-bold font-serif mb-4">¿Por qué el Aceite de España es Diferente?</h3>
               <p className="text-stone-300 text-lg mb-8 leading-relaxed font-light">
                 Nuestra geografía única, con más de 260 variedades de aceituna, permite perfiles organolépticos imposibles de replicar en otros climas. Desde la potencia del Picual de Jaén hasta la delicadeza frutal de la Arbequina catalana, ofrecemos un abanico infinito para la salud y el paladar.
               </p>
               <button onClick={openRegionsModal} className="bg-gold hover:bg-white text-olive-dark px-10 py-4 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105">
                 Explorar el Mapa Oleícola
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Variedades Section */}
      <section className="py-32 bg-stone-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-5xl font-bold text-olive-dark font-serif mb-4">Mosaico de Sabores</h2>
              <p className="text-stone-500 text-xl font-light">Descubre por qué España no solo produce cantidad, sino la mayor diversidad varietal del mundo.</p>
            </div>
            <button 
              onClick={openBuyModal}
              className="bg-olive-dark text-gold px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-stone-900 transition-all shadow-xl hover:-translate-y-1"
            >
              Cata Profesional
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VARIETIES.map((v) => (
              <div 
                key={v.name} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg group cursor-pointer border-2 border-transparent hover:border-gold transition-all duration-500"
                onClick={() => setActiveModal({ type: 'variety', data: v })}
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] font-black uppercase tracking-widest text-olive-dark">{v.region.split(',')[0]}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-olive-dark mb-2 group-hover:text-gold transition-colors font-serif">{v.name}</h3>
                  <p className="text-stone-500 text-sm italic mb-6 line-clamp-2 leading-relaxed">{v.flavor}</p>
                  <div className="flex items-center gap-3 text-gold font-black text-[11px] uppercase tracking-widest">
                    <span>Ficha Técnica</span>
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Producción - Sección Dinámica */}
      <section id="produccion" className="relative py-32 overflow-hidden bg-olive-dark text-white">
        <div className="absolute inset-0 opacity-20 scale-110">
          <img src={IMAGES.harvest} alt="Paisaje" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-gold font-black uppercase tracking-[0.4em] text-xs mb-6 block">Potencia Global de Exportación</span>
              <h2 className="text-6xl md:text-8xl font-bold mb-10 font-serif leading-none tracking-tighter">La Almazara <br />del Mundo</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-8 group">
                   <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-gold transition-all group-hover:rotate-6">
                      <span className="text-4xl">🇪🇸</span>
                   </div>
                   <div>
                     <h4 className="text-2xl font-bold mb-3">Soberanía Alimentaria</h4>
                     <p className="text-stone-400 leading-relaxed text-lg">Más del 45% de todo el aceite que se consume en el planeta nace bajo el sol español. Somos la referencia absoluta.</p>
                   </div>
                </div>
                <div className="flex items-start gap-8 group">
                   <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-gold transition-all group-hover:rotate-6">
                      <span className="text-4xl">🌿</span>
                   </div>
                   <div>
                     <h4 className="text-2xl font-bold mb-3">Vanguardia Ecológica</h4>
                     <p className="text-stone-400 leading-relaxed text-lg">Lideramos el mundo en producción sostenible y trazabilidad por blockchain para el consumidor final.</p>
                   </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={openRegionsModal} className="bg-gold text-olive-dark px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl">
                  Mapa de Cultivos
                </button>
                <button onClick={openOfficialStatsModal} className="border-2 border-white/20 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                  Cifras Oficiales
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 hover:bg-white/10 transition-all group text-center shadow-2xl">
                  <p className="text-7xl font-black text-gold mb-3 group-hover:scale-110 transition-transform">1.3M</p>
                  <p className="text-stone-400 text-xs font-black uppercase tracking-widest">Tn. Exportadas / Año</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 mt-16 hover:bg-white/10 transition-all group text-center shadow-2xl">
                  <p className="text-7xl font-black text-gold mb-3 group-hover:scale-110 transition-transform">340M</p>
                  <p className="text-stone-400 text-xs font-black uppercase tracking-widest">Olivos Registrados</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Historia - Línea del tiempo interactiva */}
      <section id="historia" className="py-32 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
             <span className="text-gold font-black tracking-[0.4em] uppercase text-xs mb-4 block">Herencia Milenaria</span>
             <h2 className="text-5xl md:text-7xl font-bold text-olive-dark font-serif">Nuestra Huella</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-1 bg-stone-100 -translate-x-1/2"></div>
            <div className="space-y-32">
              {HISTORY_TIMELINE.map((event, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-16 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-gold rounded-2xl rotate-45 flex items-center justify-center z-10 shadow-xl transition-transform hover:rotate-90">
                    <span className="text-[10px] font-black text-olive-dark -rotate-45">{event.year.split(' ')[0]}</span>
                  </div>
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h4 className="text-gold font-black uppercase tracking-[0.3em] text-xs mb-4">{event.year}</h4>
                    <h3 className="text-4xl font-bold text-olive-dark mb-6 font-serif">{event.title}</h3>
                    <p className="text-stone-500 leading-relaxed text-xl font-light">{event.description}</p>
                  </div>
                  <div className="w-full md:w-1/2 group relative">
                    <div className="absolute inset-0 bg-gold/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                    <img src={event.image} alt={event.title} className="rounded-[3rem] shadow-2xl w-full h-80 object-cover transform transition-all group-hover:scale-105" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto - Formulario con Estados Reales */}
      <section id="contacto" className="py-32 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-stone-100 flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-olive-dark p-20 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 translate-y-32 blur-3xl"></div>
              <div>
                <h2 className="text-6xl font-bold mb-10 font-serif leading-tight">Conecta con <br /> la <span className="text-gold">Esencia</span></h2>
                <p className="text-stone-300 text-xl mb-16 font-light leading-relaxed">
                  ¿Eres distribuidor, chef o apasionado del AOVE? Nuestro equipo técnico te asesorará sobre las mejores selecciones de cada campaña.
                </p>
                <div className="space-y-12">
                  <div className="flex gap-8 items-center group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-olive-dark transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-stone-500 tracking-widest mb-1">Central de Atención</p>
                      <p className="text-2xl font-bold">+34 912 345 678</p>
                    </div>
                  </div>
                  <div className="flex gap-8 items-center group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-olive-dark transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-stone-500 tracking-widest mb-1">Hub Tecnológico</p>
                      <p className="text-2xl font-bold text-white">Madrid, España</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-24 pt-10 border-t border-white/10 text-xs text-stone-500 font-black uppercase tracking-[0.3em]">
                Patrimonio Agrícola de la Humanidad
              </div>
            </div>

            <div className="lg:w-3/5 p-20">
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95">
                  <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-5xl font-bold text-olive-dark font-serif mb-4">¡Consulta Recibida!</h3>
                    <p className="text-stone-500 text-xl font-light">Nuestros sumilleres están revisando tu petición. En breve tendrás una respuesta detallada.</p>
                  </div>
                  <button onClick={() => setFormStatus('idle')} className="text-gold font-black uppercase tracking-[0.2em] text-sm hover:underline border-b-2 border-transparent hover:border-gold transition-all pb-1">Enviar Nueva Consulta</button>
                </div>
              ) : (
                <form className="space-y-10" onSubmit={handleContactSubmit}>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-stone-400 tracking-[0.2em]">Identidad / Empresa</label>
                      <input type="text" required className="w-full bg-stone-50 border-2 border-stone-100 focus:border-gold focus:bg-white rounded-[1.5rem] px-8 py-5 text-stone-900 outline-none transition-all shadow-sm" placeholder="Ej. Restaurante Arzak" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-stone-400 tracking-[0.2em]">Canal de Respuesta</label>
                      <input type="email" required className="w-full bg-stone-50 border-2 border-stone-100 focus:border-gold focus:bg-white rounded-[1.5rem] px-8 py-5 text-stone-900 outline-none transition-all shadow-sm" placeholder="compras@arzak.es" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-stone-400 tracking-[0.2em]">Categoría de Consulta</label>
                    <div className="relative">
                      <select className="w-full bg-stone-50 border-2 border-stone-100 focus:border-gold focus:bg-white rounded-[1.5rem] px-8 py-5 text-stone-900 outline-none transition-all appearance-none cursor-pointer shadow-sm font-bold">
                        <option>Exportación Mayorista</option>
                        <option>Cursos de Sumillería</option>
                        <option>Sello de Calidad DOP</option>
                        <option>Investigación y Desarrollo</option>
                      </select>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-stone-400 tracking-[0.2em]">Detalle de tu petición</label>
                    <textarea rows={6} required className="w-full bg-stone-50 border-2 border-stone-100 focus:border-gold focus:bg-white rounded-[2rem] px-8 py-5 text-stone-900 outline-none transition-all resize-none shadow-sm text-lg" placeholder="Describe brevemente tus necesidades o preguntas..."></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className="w-full bg-olive-dark hover:bg-black text-gold py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-lg transition-all shadow-2xl flex items-center justify-center gap-4 group"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-6 h-6 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>Establecer Contacto</span>
                        <div className="w-10 h-10 rounded-full bg-gold text-olive-dark flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Pro */}
      <footer className="bg-stone-950 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-olive-dark to-gold opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-20 border-b border-white/5 pb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-10 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-16 h-16 bg-gold rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
                <span className="text-olive-dark font-serif font-black text-4xl">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif font-bold tracking-tighter">Oro Líquido</span>
                <span className="text-xs font-black text-gold uppercase tracking-[0.5em] mt-1">Sabor de España</span>
              </div>
            </div>
            <p className="text-stone-500 max-w-md leading-relaxed text-xl mb-12 font-light">
              Fomentamos la excelencia oleícola española a través de la educación técnica, el apoyo a la producción sostenible y la exportación de calidad suprema.
            </p>
            <div className="flex gap-6">
               {['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK'].map(s => (
                 <div key={s} className="group relative overflow-hidden px-4 py-2 rounded-lg border border-white/10 hover:border-gold transition-colors cursor-pointer">
                    <span className="text-[9px] font-black tracking-widest text-stone-500 group-hover:text-white transition-colors">{s}</span>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold translate-y-1 group-hover:translate-y-0 transition-transform"></div>
                 </div>
               ))}
            </div>
          </div>
          <div>
            <h4 className="font-black mb-10 text-white uppercase tracking-[0.2em] text-xs flex items-center gap-3">
               <span className="w-8 h-px bg-gold"></span> Directorio
            </h4>
            <ul className="space-y-6 text-stone-500 font-bold text-sm tracking-widest">
              <li><a href="#ventajas" className="hover:text-gold transition-colors block">ANÁLISIS DE SALUD</a></li>
              <li><a href="#produccion" className="hover:text-gold transition-colors block">INFRAESTRUCTURA</a></li>
              <li><a href="#historia" className="hover:text-gold transition-colors block">ARCHIVO NACIONAL</a></li>
              <li><a href="#contacto" className="hover:text-gold transition-colors block">SALA DE PRENSA</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-10 text-white uppercase tracking-[0.2em] text-xs flex items-center gap-3">
               <span className="w-8 h-px bg-gold"></span> Soporte Técnico
            </h4>
            <ul className="space-y-6 text-stone-500 font-bold text-sm tracking-widest">
              <li><a href="#" className="hover:text-gold transition-colors block">GUÍA DE CATA DOP</a></li>
              <li><a href="#" className="hover:text-gold transition-colors block">CERTIFICADO BIO</a></li>
              <li><a href="#" className="hover:text-gold transition-colors block">GESTIÓN LOGÍSTICA</a></li>
              <li><a href="#" className="hover:text-gold transition-colors block">AYUDA EXPORTACIÓN</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-stone-700 text-xs font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} INTERPROFESIONAL DEL ACEITE DE OLIVA DE ESPAÑA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-10 text-stone-700 text-[9px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">POLÍTICA PRIVACIDAD</a>
            <a href="#" className="hover:text-white transition-colors">SISTEMA COOKIES</a>
            <a href="#" className="hover:text-white transition-colors">ESTÁNDARES LEGALES</a>
          </div>
        </div>
      </footer>

      {/* Modals Implementation - Enhanced Detail */}
      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal?.data.title || ""}
      >
        {activeModal?.type === 'variety' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
            <div className="relative rounded-[2.5rem] overflow-hidden h-80 shadow-2xl">
              <img src={activeModal.data.image} alt={activeModal.data.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-10">
                <span className="text-[10px] bg-gold text-white px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-xl">Variedad Noble de España</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-3">Zona Geográfica</p>
                <p className="font-bold text-olive-dark text-2xl font-serif">{activeModal.data.region}</p>
              </div>
              <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-3">Perfil Aromático</p>
                <p className="font-bold text-olive-dark text-2xl font-serif">{activeModal.data.flavor}</p>
              </div>
            </div>
            <div className="prose prose-stone max-w-none">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-px grow bg-stone-100"></div>
                 <h4 className="text-gold font-black uppercase tracking-[0.3em] text-xs shrink-0">Análisis Organoléptico</h4>
                 <div className="h-px grow bg-stone-100"></div>
              </div>
              <p className="text-stone-600 leading-relaxed text-xl font-light italic">{activeModal.data.description}</p>
            </div>
            <div className="bg-olive-dark text-gold p-10 rounded-[3rem] shadow-2xl border-4 border-gold/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex gap-8 items-start relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2.5"></path></svg>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Recomendación Gastronómica</h5>
                    <p className="text-white font-bold text-2xl leading-tight font-serif">{activeModal.data.bestFor}</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeModal?.type === 'rich-feature' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="h-64 rounded-[3rem] overflow-hidden shadow-2xl relative">
               <img src={activeModal.data.image} alt={activeModal.data.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/30 flex items-end p-10">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] border border-white/30 px-6 py-2 rounded-full backdrop-blur-md">{activeModal.data.scientific_name}</span>
               </div>
            </div>
            <div className="space-y-8">
              {activeModal.data.content.map((item: string, idx: number) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0 font-black text-xl group-hover:bg-gold group-hover:text-white transition-all shadow-inner">
                    {idx + 1}
                  </div>
                  <p className="text-stone-600 leading-relaxed text-xl font-light">{item}</p>
                </div>
              ))}
            </div>

            {activeModal.data.secondary_image && (
              <div className="rounded-[3rem] overflow-hidden shadow-2xl h-64 group relative">
                <img src={activeModal.data.secondary_image} alt="Imagen descriptiva" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/60 to-transparent flex items-end p-8">
                  <p className="text-white font-serif font-bold text-xl">Calidad y Esencia Garantizada</p>
                </div>
              </div>
            )}

            <div className="bg-stone-50 p-10 rounded-[3rem] border-2 border-dashed border-stone-200">
               <div className="flex items-center gap-4 mb-4">
                  <span className="text-gold text-2xl">💡</span>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Sabías que...</h5>
               </div>
               <p className="text-stone-800 font-bold text-lg leading-relaxed">{activeModal.data.did_you_know}</p>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full py-6 bg-olive-dark text-gold rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all">Regresar al Portal</button>
          </div>
        )}

        {activeModal?.type === 'store' && (
          <div className="space-y-12">
            <p className="text-stone-500 text-xl font-light leading-relaxed">Solo las partidas más exclusivas de la última cosecha son seleccionadas para nuestra boutique.</p>
            <div className="space-y-6">
              {activeModal.data.products.map((p: any) => {
                const count = cart.filter(item => item.id === p.id).length;
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row items-center gap-8 bg-stone-50 p-8 rounded-[3rem] border border-stone-100 hover:border-gold transition-all group relative shadow-sm">
                    <div className="w-40 h-40 overflow-hidden rounded-[2rem] shrink-0 shadow-lg">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <h4 className="font-bold text-olive-dark text-2xl font-serif">{p.name}</h4>
                        <span className="text-gold font-black text-3xl">{p.price.toFixed(2)}€</span>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
                        <span className="text-[9px] bg-olive-dark text-white px-4 py-1.5 rounded-full uppercase font-black tracking-widest">{p.tag}</span>
                      </div>
                      <p className="text-stone-400 text-lg font-light italic leading-snug">{p.detail}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <div className="flex items-center bg-white rounded-2xl shadow-inner border border-stone-100 p-1">
                        <button 
                          onClick={() => removeFromCart(p.id)}
                          disabled={count === 0}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${count > 0 ? 'bg-stone-100 text-stone-900 hover:bg-red-50 hover:text-red-600' : 'text-stone-300 opacity-50 cursor-not-allowed'}`}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"></path></svg>
                        </button>
                        <div className="w-12 text-center font-black text-olive-dark text-xl">{count}</div>
                        <button 
                          onClick={() => addToCart(p)}
                          className="w-12 h-12 bg-gold hover:bg-black text-white rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                      </div>
                      {count > 0 && <span className="text-[10px] font-black uppercase text-gold tracking-widest animate-pulse">En el Carrito</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-stone-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
               <div>
                 <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Resumen del Pedido</p>
                 <p className="text-4xl font-bold font-serif">{cart.length} Ítems Seleccionados</p>
               </div>
               <button className="w-full md:w-auto bg-gold text-olive-dark px-16 py-6 rounded-3xl font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-gold/20 relative z-10">
                 Finalizar Pedido
               </button>
            </div>
          </div>
        )}

        {activeModal?.type === 'regions' && (
          <div className="space-y-10">
            <div className="grid gap-8">
              {activeModal.data.regions.map((r: any, idx: number) => (
                <div key={idx} className="p-10 rounded-[3.5rem] bg-stone-50 border border-stone-100 flex flex-col sm:flex-row items-center gap-10 hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shrink-0 ${r.color} group-hover:rotate-12 transition-transform shadow-2xl shadow-stone-200`}>
                    {r.name[0]}
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-olive-dark text-3xl mb-2 font-serif">{r.name}</h4>
                    <p className="text-[11px] font-black text-gold mb-4 uppercase tracking-[0.3em] border-b border-gold/20 pb-2 inline-block">{r.stats}</p>
                    <p className="text-stone-500 leading-relaxed text-lg font-light">{r.desc}</p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-stone-100/50 rounded-full group-hover:bg-gold/5 transition-all"></div>
                </div>
              ))}
            </div>
            <p className="text-center text-stone-400 text-[10px] font-black uppercase tracking-[0.4em]">Fuente Estadística: Ministerio de Agricultura, Pesca y Alimentación 2024</p>
          </div>
        )}

        {activeModal?.type === 'official-stats' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid gap-8">
              {activeModal.data.stats.map((s: any, idx: number) => (
                <div key={idx} className={`p-8 rounded-[3rem] border-2 transition-all group ${s.highlight ? 'bg-olive-dark text-white border-gold shadow-2xl scale-105' : 'bg-stone-50 border-stone-100 text-stone-900 shadow-sm'}`}>
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{s.icon}</span>
                    <div>
                      <h4 className={`text-2xl font-bold font-serif ${s.highlight ? 'text-gold' : 'text-olive-dark'}`}>{s.country}</h4>
                      <p className={`text-xl font-black ${s.highlight ? 'text-white' : 'text-gold'}`}>{s.trees}</p>
                    </div>
                  </div>
                  <p className={`leading-relaxed text-lg font-light ${s.highlight ? 'text-stone-300' : 'text-stone-500'}`}>{s.details}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-stone-100 p-10 rounded-[3rem] border border-stone-200">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-6">Otros Productores Principales</h5>
              <div className="grid sm:grid-cols-2 gap-6">
                {activeModal.data.others.map((o: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                    <div>
                      <p className="font-bold text-olive-dark">{o.name}</p>
                      <p className="text-sm text-stone-500">{o.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gold text-olive-dark p-8 rounded-[2.5rem] text-center shadow-xl">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-2 opacity-60">Estimación Global</p>
               <p className="text-4xl font-black font-serif">1.5 Mil Millones</p>
               <p className="font-bold uppercase text-xs tracking-widest mt-1">de olivos en todo el mundo</p>
            </div>
            
            <button onClick={() => setActiveModal(null)} className="w-full py-6 bg-olive-dark text-gold rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all">Cerrar Análisis</button>
          </div>
        )}
      </Modal>

      <AISommelier />
    </div>
  );
};

export default App;
