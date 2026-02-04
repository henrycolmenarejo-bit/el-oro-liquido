
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1920",
  harvest: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=800",
  health: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
  health_secondary: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800",
  bottling: "https://images.unsplash.com/photo-1505923155372-421f1fdf4009?auto=format&fit=crop&q=80&w=800",
  quality_control: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=800",
  history_ancient: "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&q=80&w=800",
  history_modern: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
  export_global: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  landscape: "https://images.unsplash.com/photo-1550505393-5c46f1a09115?auto=format&fit=crop&q=80&w=1920",
  gastronomia_secondary: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
  store_picual: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
  store_arbequina: "https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&q=80&w=400",
  store_premium: "https://images.unsplash.com/photo-1494202580552-475960098f99?auto=format&fit=crop&q=80&w=400",
  cta_why: "https://images.unsplash.com/photo-1543157145-f78c636d023d?auto=format&fit=crop&q=80&w=400"
};

export const NUTRITION_STATS = [
  { label: "Ácido Oleico", value: "75%", desc: "Grasa monoinsaturada cardiosaludable" },
  { label: "Vitamina E", value: "12mg", desc: "Potente antioxidante natural" },
  { label: "Polifenoles", value: "500+", desc: "Compuestos protectores antiinflamatorios" },
  { label: "Punto de Humo", value: "210°C", desc: "Máxima estabilidad en cocina" }
];

export const VARIETIES: any[] = [
  {
    name: "Picual",
    region: "Jaén, Córdoba, Granada",
    flavor: "Intenso, amargo y picante",
    bestFor: "Guisos, carnes rojas y conservas",
    description: "Es la variedad más importante del mundo. Su alto contenido en polifenoles lo hace el más estable y resistente a la oxidación.",
    image: "https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Arbequina",
    region: "Cataluña, Aragón",
    flavor: "Dulce, frutado y fluido",
    bestFor: "Ensaladas, pescados y repostería",
    description: "Aceite muy aromático con notas de manzana y plátano. Ideal para quienes buscan un sabor suave y delicado.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Hojiblanca",
    region: "Málaga, Córdoba, Sevilla",
    flavor: "Equilibrado, hierba fresca",
    bestFor: "Aliños, marinados y pastas",
    description: "Se caracteriza por su regusto final almendrado y un picor localizado en la garganta muy característico.",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Cornicabra",
    region: "Castilla-La Mancha",
    flavor: "Frutos secos y manzana",
    bestFor: "Fritos, salteados y masas",
    description: "Es la segunda variedad en superficie cultivada. Muy aromático y con gran resistencia a las altas temperaturas.",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=400"
  }
];

export const ADVANTAGES_DATA = {
  salud: {
    title: "Salud Cardiovascular y Cerebral",
    image: IMAGES.health,
    secondary_image: IMAGES.health_secondary,
    scientific_name: "Evidencia Médica PREDIMED",
    content: [
      "El ácido oleico representa el 70-80% de su composición, ayudando a reducir el colesterol LDL (malo) y aumentar el HDL (bueno).",
      "Contiene Oleocanthal, un compuesto orgánico con propiedades antiinflamatorias similares al ibuprofeno.",
      "Sus polifenoles protegen las neuronas contra el daño oxidativo, previniendo enfermedades como el Alzheimer.",
      "Rico en Vitamina E, un potente antioxidante que retrasa el envejecimiento celular."
    ],
    did_you_know: "Tomar dos cucharadas de AOVE en ayunas mejora la absorción de vitaminas y la salud digestiva."
  },
  calidad: {
    title: "Garantía de Excelencia y Origen",
    image: IMAGES.bottling,
    secondary_image: IMAGES.quality_control,
    scientific_name: "Normativa UE 1151/2012",
    content: [
      "España cuenta con 29 Denominaciones de Origen Protegidas (DOP) que aseguran la máxima calidad.",
      "Procesos de extracción en frío (menos de 27°C) que preservan todas las vitaminas y aromas naturales.",
      "Trazabilidad garantizada desde el árbol hasta el embotellado por laboratorios oficiales.",
      "Certificación europea de agricultura sostenible en más del 30% de los olivares."
    ],
    did_you_know: "El color del aceite no indica su calidad. Por eso, los catadores profesionales usan copas de cristal azul."
  },
  gastronomia: {
    title: "El Alma de la Cocina Mediterránea",
    image: IMAGES.landscape,
    secondary_image: IMAGES.gastronomia_secondary,
    scientific_name: "Estabilidad Oxidativa Superior",
    content: [
      "Estabilidad térmica superior: El AOVE es el aceite más seguro para freír ya que su punto de humo es muy alto (210°C).",
      "Realce de sabores: No oculta el sabor de los alimentos, los potencia gracias a sus notas herbáceas y frutadas.",
      "Maridaje perfecto: Existen más de 260 variedades de aceituna en España, cada una para un plato diferente.",
      "Repostería saludable: Sustituye grasas saturadas por grasas insaturadas con resultados excepcionales en bizcochos y panes."
    ],
    did_you_know: "El AOVE es el único aceite que penetra menos en los alimentos durante la fritura, haciéndolos menos calóricos."
  }
};

export const REGIONS_DATA = [
  { name: "Andalucía", stats: "80% de la producción nacional", desc: "Jaén y Córdoba son el motor mundial del sector.", color: "bg-olive-dark" },
  { name: "Castilla-La Mancha", stats: "7% de la producción nacional", desc: "Destaca por la variedad Cornicabra de gran estabilidad.", color: "bg-gold" },
  { name: "Extremadura", stats: "4% de la producción nacional", desc: "Especialistas en la variedad Manzanilla de Cáceres.", color: "bg-stone-600" },
  { name: "Cataluña", stats: "3% de la producción nacional", desc: "Cuna de la exquisita variedad Arbequina.", color: "bg-yellow-500" }
];

export const OFFICIAL_TREE_STATS = [
  {
    country: "España",
    trees: "≈ 340 millones de olivos",
    details: "Más de 2,8 millones de hectáreas plantadas. Es el líder indiscutible en superficie y densidad de cultivo a nivel mundial.",
    icon: "🇪🇸",
    highlight: true
  },
  {
    country: "Italia",
    trees: "≈ 237,9 millones de olivos",
    details: "De los cuales unos 229,2 millones están en cultivo productivo activo.",
    icon: "🇮🇹",
    highlight: false
  },
  {
    country: "Grecia",
    trees: "Alta densidad",
    details: "Importante número de olivos con una superficie de cultivo muy significativa en relación a su territorio.",
    icon: "🇬🇷",
    highlight: false
  },
  {
    country: "Túnez",
    trees: "Extensión masiva",
    details: "Gran productor mediterráneo con olivares extensos en superficie, clave para el mercado africano.",
    icon: "🇹🇳",
    highlight: false
  }
];

export const OTHER_PRODUCERS = [
  { name: "Turquía", desc: "Crecimiento constante en los últimos años." },
  { name: "Marruecos", desc: "Gran apuesta por la modernización de almazaras." }
];

export const EXPORT_STATS = [
  { region: 'Unión Europea', volume: 65 },
  { region: 'EEUU', volume: 15 },
  { region: 'Reino Unido', volume: 8 },
  { region: 'China', volume: 5 },
  { region: 'Otros', volume: 7 }
];

export const HISTORY_TIMELINE = [
  {
    year: "Siglo III a.C.",
    title: "El Imperio del Aceite",
    description: "La Bética (actual Andalucía) enviaba millones de ánforas de aceite a Roma. El Monte Testaccio en Roma está formado en gran parte por ánforas de aceite hispano.",
    image: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&q=80&w=400"
  },
  {
    year: "Siglo VIII-XV",
    title: "Al-Ándalus",
    description: "Los árabes expandieron los cultivos y perfeccionaron la palabra 'al-zait' (jugo de aceituna), de donde proviene nuestra palabra aceite.",
    image: "https://images.unsplash.com/photo-1543157145-f78c636d023d?auto=format&fit=crop&q=80&w=400"
  },
  {
    year: "Siglo XIX",
    title: "Revolución Industrial",
    description: "Se fundan las primeras grandes empresas exportadoras en Sevilla y Córdoba, abriendo mercados en América y el resto de Europa.",
    image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=400"
  },
  {
    year: "Hoy",
    title: "Liderazgo Tecnológico",
    description: "España lidera la investigación en genómica del olivo y sistemas de extracción en frío de máxima pureza (AOVE).",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
  }
];
