# Game Design Document (GDD) - Web Souls (Protótipo)

> **Versão:** 0.1.0 (Protótipo de Navegador)  
> **Gênero:** Point & Click / Roguelike Narrativo  
> **Inspiração:** Dark Souls: Remastered (FromSoftware)  
> **Plataforma:** Navegador Web (Desktop / Mobile Friendly)  
> **Tecnologia:** Vite + Vanilla JavaScript Moderno (ES Modules) + Vanilla CSS3  

---

## 1. Visão Geral e Conceito
**Web Souls** é uma recriação adaptada da jornada de *Dark Souls 1*, transformando o clássico RPG de ação em uma experiência narrativa e estratégica em turnos de **Point & Click com elementos de Roguelike**.

### Características Principais
1. **Fidelidade Visual & Atmosférica**: Estética sombria, paleta de cores gótica (dourado oxidado, cinzas de pedra, sangue e preto profundo), menus com tipografia cerimonial e efeitos sonoros ambientais.
2. **Assets Manuais & Modificáveis**: O usuário controla e adiciona todas as imagens diretamente nas pastas do projeto (`public/assets/`). O motor possui um sistema de *fallback visual* elegante caso algum asset ainda não tenha sido adicionado.
3. **Criação de Personagem Roguelike**: A cada nova jornada, o jogo sorteia **duas classes aleatórias** entre as 10 classes oficiais de Dark Souls 1. O jogador escolhe uma delas para ditar seus atributos iniciais e equipamentos.
4. **Interação por Cliques & "Itens no Chão"**: Cenários contam com caixas dedicadas para coletar itens visíveis no chão, painéis de ações contextuais e diálogos imersivos.
5. **Sistema de Salvamento Completo**:
   - Salvamento automático contínuo via `LocalStorage`.
   - Exportação e importação de arquivos de Save em formato `.json` ou `.txt`, permitindo backup e edição externa.

---

## 2. Fluxo de Telas do Protótipo

```
[Tela 1: Título 'Web Souls']
        │ (Clique / Tecla)
        ▼
[Tela 2: Menu Principal]
        ├──> [Novo Jogo] ──> [Tela 3: Sorteio de 2 Classes] ──> [Tela 4: Prisão do Refúgio]
        ├──> [Continuar (LocalStorage)] ────────────────────────> [Carregar Última Cena]
        ├──> [Importar Arquivo (.json / .txt)] ─────────────────> [Carregar Save Externo]
        └──> [Exportar Save Atual] ─────────────────────────────> [Download websouls_save.json]
```

---

## 3. As 10 Classes de Dark Souls 1
No início de cada novo jogo, o sistema seleciona **2 classes aleatórias** da lista abaixo:

| ID | Classe | Nível | Atributos Notáveis | Equipamento Inicial |
| :--- | :--- | :--- | :--- | :--- |
| `warrior` | **Guerreiro (Warrior)** | 4 | STR 13, DEX 13 | Espada Longa, Escudo Aquecedor, Conjunto Padrão |
| `knight` | **Cavaleiro (Knight)** | 5 | VIT 14, END 10, RES 10 | Espada Larga, Escudo de Pipa, Armadura de Cavaleiro |
| `wanderer` | **Andarilho (Wanderer)** | 3 | DEX 14, INT 11 | Cimitarra, Pequeno Escudo de Couro, Traje de Andarilho |
| `thief` | **Ladrão (Thief)** | 5 | DEX 15, Agilidade | Faca de Bandido, Escudo Alvo, Chave Mestra |
| `bandit` | **Bandido (Bandit)** | 4 | STR 14, END 14 | Machado de Batalha, Escudo Aranha, Traje de Bandido |
| `hunter` | **Caçador (Hunter)** | 4 | DEX 14, STR 12 | Arco Curto & Flechas, Espada Curta, Armadura de Couro |
| `sorcerer` | **Feiticeiro (Sorcerer)** | 3 | INT 15, ATT 15 | Adaga, Catalisador de Feiticeiro, Flecha de Alma |
| `pyromancer` | **Piromante (Pyromancer)** | 1 | ATT 12, STR 12 | Machado de Mão, Chama Piromântica, Bola de Fogo |
| `cleric` | **Clérigo (Cleric)** | 2 | FAI 14, STR 12 | Maça, Talismã de Lona, Milagre de Cura |
| `deprived` | **Desprovido (Deprived)** | 6 | Todos Atributos em 11 | Porrete, Escudo de Tábuas, Sem Armadura |

---

## 4. Primeira Cena: Prisão do Refúgio dos Mortos-Vivos
- **Cenário**: Uma cela fria de pedra no Refúgio dos Mortos-Vivos do Norte. No alto, um teto quebrado onde um cavaleiro misterioso joga um corpo.
- **Painel de "Itens no Chão"**:
  - Exibe a **Chave da Cela do Refúgio (Dungeon Cell Key)** caída no chão.
  - Ao clicar na chave: Adiciona ao inventário, esvazia o chão e exibe notificação clássica com efeito sonoro.
- **Interações**:
  - `[Examinar a Grade de Ferro da Cela]`: Trancada se não tiver a chave; destrancável se tiver a chave.
  - `[Examinar o Cadáver no Chão]`: Mostra detalhes do corpo jogado de cima.
  - `[Olhar para o Teto Quebrado]`: Vislumbra o cavaleiro de elite partindo.
  - `[Avançar para o Corredor]`: Disponível após destrancar a porta.

---

## 5. Estrutura do Arquivo de Save (`.json` ou `.txt`)
O save armazena o estado completo do jogador e do mundo:
```json
{
  "version": "0.1.0",
  "timestamp": 1729377600,
  "player": {
    "name": "Escolhido dos Mortos-Vivos",
    "classId": "knight",
    "level": 5,
    "souls": 0,
    "humanity": 0,
    "stats": { ... },
    "currentHp": 100,
    "maxHp": 100,
    "inventory": [ ... ],
    "equipped": { ... }
  },
  "worldState": {
    "currentScene": "asylum_cell",
    "sceneData": {
      "asylum_cell": {
        "doorUnlocked": false,
        "groundItems": ["dungeon_key"]
      }
    },
    "flags": {
      "cell_door_opened": false
    }
  }
}
```

---

## 6. Próximas Expansões
- Adição da fogueira do pátio do refúgio.
- Encontro com o Demônio do Refúgio (Asylum Demon) com escolhas de combate estratégico.
- Diálogo com Oscar de Astora para receber o Frasco de Estus.
- Chegada a Firelink Shrine (Santuário do Elo de Fogo).
