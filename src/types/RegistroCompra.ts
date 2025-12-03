export interface RegistroCompra {
  id: string;
  data: string;                   // formato YYYY-MM-DD
  infoCompra: string;
  valor: number;
  local: string;
  documento?: string;             // opcional
  comprovante: boolean;           // switch
}
