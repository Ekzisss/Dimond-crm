export interface CreateDealArgs {
  title: string;
  clientName: string;
  amount: number;
  description?: string;
}

export interface UpdateDealArgs {
  id: number;
  title?: string;
  clientName?: string;
  amount?: number;
  description?: string;
  status?: 'new' | 'in_progress' | 'completed' | 'cancelled';
}

export interface DeleteDealArgs {
  id: number;
}
