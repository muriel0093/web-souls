/**
 * Catálogo de Itens do Web Souls
 */
export const ITEMS_DATA = {
  dungeon_key: {
    id: "dungeon_key",
    name: "Chave da Cela do Refúgio",
    originalName: "Dungeon Cell Key",
    type: "key",
    icon: "/assets/items/dungeon_key.png",
    description: "Chave de ferro maciço e desgastada pelo tempo. Abre a pesada porta da cela no Refúgio dos Mortos-Vivos do Norte.",
    lore: "No Refúgio dos Mortos-Vivos, os amaldiçoados são trancados à espera do fim do mundo. Mas uma alma desconhecida jogou este corpo e esta chave através da fresta do teto...",
    usable: false
  },
  straight_sword_hilt: {
    id: "straight_sword_hilt",
    name: "Cabo de Espada Reta",
    originalName: "Straight Sword Hilt",
    type: "weapon",
    icon: "/assets/items/broken_sword.png",
    description: "O resto quebrado de uma espada comum. A lâmina partiu-se há muito tempo. Dano irrisório, mas melhor do que punhos nus.",
    lore: "Uma arma lamentável empunhada por prisioneiros ocos que perderam o senso de propósito.",
    usable: true
  },
  estus_flask: {
    id: "estus_flask",
    name: "Frasco de Estus",
    originalName: "Estus Flask",
    type: "consumable",
    icon: "/assets/items/estus_flask.png",
    description: "Um frasco cor de esmeralda que contém o calor sagrado de uma fogueira. Restaura a vitalidade do morto-vivo.",
    lore: "Um tesouro dos Mortos-Vivos. O Estus é preenchido no calor das chamas da fogueira.",
    usable: true
  },
  master_key: {
    id: "master_key",
    name: "Chave Mestra",
    originalName: "Master Key",
    type: "key",
    icon: "/assets/items/dungeon_key.png",
    description: "Chave mágica que pode abrir praticamente qualquer fechadura mecânica simples em Lordran.",
    lore: "Embora abra portas com facilidade, algumas fechaduras requerem chaves dedicadas e não cederão à Chave Mestra.",
    usable: false
  }
};

export function getItemById(id) {
  return ITEMS_DATA[id] || {
    id,
    name: id,
    type: "item",
    icon: "/assets/items/default.png",
    description: "Um item misterioso encontrado na terra dos Lordes."
  };
}
