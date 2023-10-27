const config_form = {
  bookOptions: [
    { label: "Origin", value: ["Mook", "Professional", "Villain", "Monster"] },
    { label: "Hero", value: ["Foe", "Rival", "Nemesis", "Titanspawn"] },
    { label: "Demigod", value: ["Paragon", "Mythic", "Transcendent", "Avatar"] },
  ],
  pantheonOptions: [
    { label: "Aesir", value: "aesir" },
    { label: "Annuna", value: "annuna" },
    { label: "Apu", value: "apu" },
    { label: "Atua", value: "atua" },
    { label: "Bogovi", value: "bogovi" },
    { label: "Deva", value: "deva" },
    { label: "Kami", value: "kami" },
    { label: "Manitou", value: "manitou" },
    { label: "Netjer", value: "netjer" },
    { label: "Orisha", value: "orisha" },
    { label: "Shen", value: "shen" },
    { label: "Tengri", value: "tengri" },
    { label: "Teotl", value: "teotl" },
    { label: "Theoi", value: "theoi" },
    { label: "Tuatha", value: "tuatha" },
  ],
  human: [{ label: "Human", value: ["yes", "no"] }],

  nameGeneric: [{ label: "Name", value: ["yes", "no"] }],
  npcFavoredArena: [
    {
      label: "NPC Favored Arena",
      value: ["Combat", "Social", "Combat_focused", "Social_focused"],
    },
  ],
};

export default config_form;
