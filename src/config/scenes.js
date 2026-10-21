/**
 * Definição dos Cenários (Salas) do Web Souls
 */
export const SCENES_DATA = {
  asylum_cell: {
    id: "asylum_cell",
    title: "Refúgio dos Mortos-Vivos - Cela",
    originalTitle: "Northern Undead Asylum - Dungeon Cell",
    background: "/assets/backgrounds/prisao-undead.png",
    initialGroundItems: ["dungeon_key"],
    narrative: "Você desperta com a mente anuviada no piso gélido de uma cela de pedra úmida. O eco distante de correntes e goteiras permeia a escuridão. Lá no alto, o teto foi quebrado.",
    details: {
      examine_corpse: "Um cadáver com vestes de prisioneiro repousa inerte. Ele foi arremessado lá de cima há poucos instantes por uma figura enigmática.",
      examine_ceiling: "No alto da cela, uma fresta nas pedras revela o céu tempestuoso. Por um instante, você jurou ver o vislumbre de um cavaleiro com armadura de elite se afastando.",
      door_locked_msg: "A pesada grade de ferro maciço está firmemente trancada por uma fechadura enferrujada. Você precisará de uma chave para abri-la.",
      door_unlocked_msg: "A fechadura foi desarmada. A porta de ferro agora está entreaberta, revelando o corredor escuro do Refúgio."
    }
  },
  asylum_corridor: {
    id: "asylum_corridor",
    title: "Refúgio dos Mortos-Vivos - Corredor",
    originalTitle: "Northern Undead Asylum - Prison Hallway",
    background: "/assets/backgrounds/asylum_corridor.jpg",
    initialGroundItems: [],
    narrative: "Você empurra as pesadas grades e ganha a liberdade no corredor úmido. Outros mortos-vivos esqueléticos vagam cabisbaixos pelas celas vizinhas, desprovidos de sanidade. Mais à frente, runas laranjas brilham no chão de pedra.",
    details: {
      read_soapstone: "Inscrição de Pedra Laranja no chão: 'Siga em frente. O destino dos Mortos-Vivos espera nas terras altas de Lordran.'",
      look_ahead: "No fim deste corredor há um pátio com uma bacia circular de cinzas onde repousa uma espada cravada... Uma Fogueira ancestral.",
      door_unlocked_msg: "O caminho livre para o corredor."
    }
  }
};

export function getSceneById(id) {
  return SCENES_DATA[id] || SCENES_DATA.asylum_cell;
}
