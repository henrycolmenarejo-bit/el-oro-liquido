
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EXPORT_STATS, IMAGES } from '../constants';

const COLORS = ['#3d5a25', '#d4af37', '#7c9070', '#b8c480', '#e5e7eb'];

const Stats: React.FC = () => {
  return (
    <section id="exportaciones" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-sm">Mercado Global</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-olive-dark">España: El Almacén del Mundo</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Con más de 340 millones de olivos, España no solo lidera la producción, sino que define los estándares de calidad mundial. Exportamos a más de 180 países, llevando la esencia de nuestra tierra a cada rincón del planeta.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-4xl font-bold text-olive-dark">45%</p>
                <p className="text-stone-500 text-sm mt-1">De la producción mundial media</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <p className="text-4xl font-bold text-gold">1.3M</p>
                <p className="text-stone-500 text-sm mt-1">Toneladas exportadas anualmente</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 min-h-[400px] flex flex-col items-center">
            <h3 className="text-xl font-bold mb-6 text-stone-800">Destino de las Exportaciones (%)</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPORT_STATS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="volume"
                    nameKey="region"
                  >
                    {EXPORT_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-sm text-stone-400 italic">Datos aproximados basados en campañas recientes (ICEX/ASOLIVA)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
