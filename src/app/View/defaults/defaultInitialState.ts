import content from './defaultContent';

const contents = JSON.parse(content);

const defaultInitialState: any = {
  ruleIndex: 0,
  contents: contents,
  rules: [
    {
      Show: {
//        LinkedSockets: { operator: '>', numValues: [5] },
//        Rarity: { operator: '>', value: 'Magic' },
//        ArchnemesisMod: { values: ['Steel-infused', 'Toxic'] },
        HasExplicitMod: {
          operator: '>=',
          numValues: [2],
          textValues: ['"of Haast"', '"of Tzteosh"', '"of Ephij"'],
        },
//        SocketGroup: {
//          operator: '>=',
//          value: 5,
//          sockets: { R: 1, G: 3, B: 0, A: 0, D: 0, W: 0 },
//        },
//        PlayAlertSound: { values: [1, 100] },
      },
    },
  ],
};

export default defaultInitialState;
