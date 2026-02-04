
import React from 'react';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMAGES.hero} 
          alt="Olivares españoles" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          El Corazón de la <br /> <span className="text-gold">Dieta Mediterránea</span>
        </h1>
        <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          España produce más de la mitad del aceite de oliva del mundo. Un legado milenario de sabor, salud y excelencia que viaja desde nuestros campos a tu mesa.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
