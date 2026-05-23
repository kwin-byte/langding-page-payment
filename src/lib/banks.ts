export type BankOption = {
  id: string;
  name: string;
  suffix: string;
};

export const BANK_OPTIONS: BankOption[] = [
  { id: "aba", name: "ABA Bank", suffix: "aba" },
  { id: "acleda", name: "ACLEDA Bank", suffix: "acleda" },
  { id: "wing", name: "Wing Bank", suffix: "wing" },
  { id: "canadia", name: "Canadia Bank", suffix: "canadia" },
  { id: "sathapana", name: "Sathapana Bank", suffix: "sathapana" },
  { id: "ppcb", name: "PPCBank", suffix: "ppcb" },
  { id: "chipmong", name: "Chip Mong Bank", suffix: "chipmong" },
  { id: "bkrt", name: "Bakong / BKRT", suffix: "bkrt" },
];
