import content from './defaultContent';

const defaultInitialState: FilterInitialState = {
  ruleIndex: 0,
  contents: JSON.parse(content),
  rules: [
    {
      Show: {
        LinkedSockets: { operator: '>', numValues: [5] },
        Rarity: { operator: '>', textValues: ['Magic'] },
        ArchnemesisMod: { textValues: ['Steel-infused', 'Toxic'] },
        HasExplicitMod: {
          operator: '>=',
          numValues: [2],
          textValues: ['of Haast', 'of Tzteosh', 'of Ephij'],
        },
        SocketGroup: {
          operator: '>=',
          numValues: [5],
          sockets: {
            R: 1,
            G: 3,
            B: 0,
            A: 0,
            D: 0,
            W: 0,
          },
        },
        PlayAlertSound: { numValues: [1, 100] },
      },
    },
  ],
};

export default defaultInitialState;
