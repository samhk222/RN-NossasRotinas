export interface Rotina {
  id: number;
  descricao: string;
  texto: string;
  trigger: string;
}

export interface RotinasResponse {
  items: Rotina[];
}
