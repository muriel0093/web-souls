/**
 * Lista oficial das 10 classes de Dark Souls 1 Remastered
 * com atributos, equipamentos e descrições em português.
 */
export const CLASSES_DATA = [
  {
    id: "warrior",
    name: "Guerreiro",
    originalName: "Warrior",
    level: 4,
    description: "Guerreiro destemido com treinamento com armas versáteis. Possui alta Força e Destreza, excelente equilíbrio físico e empunha uma espada longa com escudo aquecedor.",
    portrait: "/assets/classes/Warrior-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 11,
      attunement: 8,
      endurance: 12,
      strength: 13,
      dexterity: 13,
      resistance: 11,
      intelligence: 9,
      faith: 9,
      humanity: 0
    },
    hp: 554,
    stamina: 93,
    startingGear: [
      { name: "Espada Longa", type: "Arma Principal" },
      { name: "Escudo Aquecedor", type: "Escudo" },
      { name: "Conjunto de Guerreiro Padrão", type: "Armadura" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "knight",
    name: "Cavaleiro",
    originalName: "Knight",
    level: 5,
    description: "Um cavaleiro nobre com armadura pesada de placas. Possui altíssima Vitalidade e Resistência, capaz de absorver grande quantidade de dano desde os primeiros momentos.",
    portrait: "/assets/classes/Knight-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 14,
      attunement: 10,
      endurance: 10,
      strength: 11,
      dexterity: 11,
      resistance: 10,
      intelligence: 9,
      faith: 11,
      humanity: 0
    },
    hp: 597,
    stamina: 89,
    startingGear: [
      { name: "Espada Larga", type: "Arma Principal" },
      { name: "Escudo de Pipa de Cavaleiro", type: "Escudo" },
      { name: "Conjunto Completo de Cavaleiro", type: "Armadura Pesada" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "wanderer",
    name: "Andarilho",
    originalName: "Wanderer",
    level: 3,
    description: "Nômade viajante ágil. Especialista em ataques rápidos com armas cortantes graças à sua alta Destreza. Veste um casaco leve e capuz de andarilho.",
    portrait: "/assets/classes/Wanderer-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 10,
      attunement: 11,
      endurance: 10,
      strength: 10,
      dexterity: 14,
      resistance: 12,
      intelligence: 11,
      faith: 8,
      humanity: 0
    },
    hp: 524,
    stamina: 89,
    startingGear: [
      { name: "Cimitarra Curva", type: "Arma Principal" },
      { name: "Pequeno Escudo de Couro", type: "Escudo Leve" },
      { name: "Conjunto de Andarilho", type: "Armadura Leve" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "thief",
    name: "Ladrão",
    originalName: "Thief",
    level: 5,
    description: "Ladrão veloz que busca golpes críticos e punhaladas pelas costas. Começa naturalmente com a cobiçada Chave Mestra, além de alta Destreza e agilidade.",
    portrait: "/assets/classes/Thief-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 9,
      attunement: 11,
      endurance: 9,
      strength: 9,
      dexterity: 15,
      resistance: 10,
      intelligence: 12,
      faith: 11,
      humanity: 0
    },
    hp: 510,
    stamina: 87,
    startingGear: [
      { name: "Faca de Bandido (Sangramento)", type: "Arma Principal" },
      { name: "Escudo Alvo (Parry Facilitado)", type: "Escudo" },
      { name: "Conjunto de Couro Negro", type: "Armadura Leve" }
    ],
    startingItems: [
      { id: "master_key", name: "Chave Mestra Universal", quantity: 1 },
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "bandit",
    name: "Bandido",
    originalName: "Bandit",
    level: 4,
    description: "Bandido brutal das montanhas com Força massiva e resistência física excepcional. Empunha um devastador Machado de Batalha e o lendário Escudo Aranha.",
    portrait: "/assets/classes/Bandit-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 12,
      attunement: 8,
      endurance: 14,
      strength: 14,
      dexterity: 9,
      resistance: 11,
      intelligence: 8,
      faith: 10,
      humanity: 0
    },
    hp: 575,
    stamina: 97,
    startingGear: [
      { name: "Machado de Batalha", type: "Arma Principal" },
      { name: "Escudo Aranha (Anti-Veneno)", type: "Escudo" },
      { name: "Conjunto de Bandido de Peles", type: "Armadura" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "hunter",
    name: "Caçador",
    originalName: "Hunter",
    level: 4,
    description: "Caçador habilidoso em combate à distância e corpo a corpo. Inicia com um Arco Curto e flechas, espada curta e armadura de couro flexível.",
    portrait: "/assets/classes/Hunter-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 11,
      attunement: 9,
      endurance: 11,
      strength: 12,
      dexterity: 14,
      resistance: 11,
      intelligence: 9,
      faith: 9,
      humanity: 0
    },
    hp: 554,
    stamina: 91,
    startingGear: [
      { name: "Espada Curta", type: "Arma Primária" },
      { name: "Arco Curto + 30 Flechas Padrão", type: "Arma à Distância" },
      { name: "Escudo Redondo de Couro Grande", type: "Escudo" },
      { name: "Conjunto de Couro de Caçador", type: "Armadura" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "sorcerer",
    name: "Feiticeiro",
    originalName: "Sorcerer",
    level: 3,
    description: "Erudito das artes arcanas da Escola de Vinheim. Inicia com altíssima Inteligência, feitiço de Flecha de Alma e Catalisador para conjurações à distância.",
    portrait: "/assets/classes/Sorcerer-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 8,
      attunement: 15,
      endurance: 8,
      strength: 9,
      dexterity: 11,
      resistance: 8,
      intelligence: 15,
      faith: 8,
      humanity: 0
    },
    hp: 498,
    stamina: 85,
    startingGear: [
      { name: "Adaga de Feiticeiro", type: "Arma Principal" },
      { name: "Catalisador de Feiticeiro", type: "Foco Mágico" },
      { name: "Pequeno Escudo de Couro", type: "Escudo" },
      { name: "Manto Preto de Feiticeiro", type: "Manto" }
    ],
    startingItems: [
      { id: "spell_soul_arrow", name: "Feitiço: Flecha de Alma (30 Usos)", quantity: 1 },
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "pyromancer",
    name: "Piromante",
    originalName: "Pyromancer",
    level: 1,
    description: "Xamã do Grande Pântano que manipula o fogo primordial. Começa no Nível 1 com grande potencial de customização, empunhando a Chama Piromântica e Bola de Fogo.",
    portrait: "/assets/classes/Pyromancer-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 10,
      attunement: 12,
      endurance: 11,
      strength: 12,
      dexterity: 9,
      resistance: 12,
      intelligence: 10,
      faith: 8,
      humanity: 0
    },
    hp: 533,
    stamina: 91,
    startingGear: [
      { name: "Machado de Mão", type: "Arma Principal" },
      { name: "Chama Piromântica", type: "Chama Mágica" },
      { name: "Escudo Redondo Rachado", type: "Escudo" },
      { name: "Traje de Piromante Esfarrapado", type: "Traje" }
    ],
    startingItems: [
      { id: "spell_fireball", name: "Piromancia: Bola de Fogo (8 Usos)", quantity: 1 },
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "cleric",
    name: "Clérigo",
    originalName: "Cleric",
    level: 2,
    description: "Guerreiro sagrado em peregrinação. Conjurador de milagres devoto com alta Fé, equipado com Maça de impacto contundente, Talismã e Milagre de Cura.",
    portrait: "/assets/classes/Cleric-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 11,
      attunement: 11,
      endurance: 9,
      strength: 12,
      dexterity: 8,
      resistance: 11,
      intelligence: 8,
      faith: 14,
      humanity: 0
    },
    hp: 554,
    stamina: 87,
    startingGear: [
      { name: "Maça de Ferro", type: "Arma Contundente" },
      { name: "Talismã de Lona", type: "Foco Sagrado" },
      { name: "Escudo Leste-Oeste", type: "Escudo" },
      { name: "Roupagem Santa de Clérigo", type: "Armadura" }
    ],
    startingItems: [
      { id: "miracle_heal", name: "Milagre: Cura Sagrada (5 Usos)", quantity: 1 },
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  },
  {
    id: "deprived",
    name: "Desprovido",
    originalName: "Deprived",
    level: 6,
    description: "Um morto-vivo sem posses, vestimentas ou memórias. Todos os atributos começam rigorosamente em 11. Para os bravos que desejam forjar seu próprio destino do zero.",
    portrait: "/assets/classes/Deprived-starting-class-male-dark-souls.avif",
    stats: {
      vitality: 11,
      attunement: 11,
      endurance: 11,
      strength: 11,
      dexterity: 11,
      resistance: 11,
      intelligence: 11,
      faith: 11,
      humanity: 0
    },
    hp: 554,
    stamina: 91,
    startingGear: [
      { name: "Porrete Rústico de Madeira", type: "Arma Bruta" },
      { name: "Escudo de Tábuas Frágil", type: "Escudo de Madeira" },
      { name: "Tangas Esfarrapadas", type: "Vestimenta" }
    ],
    startingItems: [
      { id: "straight_sword_hilt", name: "Cabo de Espada Reta", quantity: 1 }
    ]
  }
];

/**
 * Função utilitária para sortear 2 classes distintas aleatórias (Roguelike Draft)
 */
export function getRandomTwoClasses() {
  const shuffled = [...CLASSES_DATA].sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

export function getClassById(id) {
  return CLASSES_DATA.find(c => c.id === id) || CLASSES_DATA[0];
}
