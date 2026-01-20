import { db } from './db';

export interface Deal {
  id: number;
  title: string;
  client_name: string;
  amount: number;
  description?: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateDealData {
  title: string;
  client_name: string;
  amount: number;
  description?: string;
}

export interface UpdateDealData {
  title?: string;
  client_name?: string;
  amount?: number;
  description?: string;
  status?: Deal['status'];
}

export const dealDb = {
  create: (data: CreateDealData): Deal => {
    const result = db
      .prepare(
        `
      INSERT INTO deals (title, client_name, amount, description)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(data.title, data.client_name, data.amount, data.description || null);

    return dealDb.findById(result.lastInsertRowid as number)!;
  },

  findAll: (): Deal[] => {
    const stmt = db.prepare('SELECT * FROM deals ORDER BY created_at DESC');
    return stmt.all() as Deal[];
  },

  findById: (id: number): Deal | null => {
    const stmt = db.prepare('SELECT * FROM deals WHERE id = ?');
    return stmt.get(id) as Deal | null;
  },

  update: (id: number, data: UpdateDealData): Deal | null => {
    const fields = Object.keys(data).filter((key) => data[key as keyof UpdateDealData] !== undefined);

    if (fields.length === 0) {
      return dealDb.findById(id);
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = fields.map((field) => data[field as keyof UpdateDealData]);

    const stmt = db.prepare(`
      UPDATE deals 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);

    stmt.run(...values, id);

    return dealDb.findById(id);
  },

  delete: (id: number): boolean => {
    const stmt = db.prepare('DELETE FROM deals WHERE id = ?');
    const result = stmt.run(id);

    return result.changes > 0;
  },
};
