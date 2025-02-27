export const HumanTypeDef = {
    Store: 5,
    Binding: 12,
    Text: 128,
} as const;

export type HumanType = keyof typeof HumanTypeDef;

export type StanzaType = typeof HumanTypeDef[HumanType];