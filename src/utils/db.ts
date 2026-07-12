export interface HistoryItem {
  id: string;
  timestamp: string;
  calcName: string;
  input: string;
  output: string;
}

export interface CommentItem {
  slug: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const zdb = {
  async addHistory(calcName: string, input: string, output: string): Promise<HistoryItem> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.addHistory(calcName, input, output);
    }
    throw new Error('Database is not initialized');
  },

  async getHistory(): Promise<HistoryItem[]> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.getHistory();
    }
    return [];
  },

  async deleteHistory(id: string): Promise<void> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.deleteHistory(id);
    }
  },

  async clearHistory(): Promise<void> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.clearHistory();
    }
  },

  async addComment(slug: string, name: string, rating: number, text: string): Promise<CommentItem> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.addComment(slug, name, rating, text);
    }
    throw new Error('Database is not initialized');
  },

  async addReply(commentId: number, name: string, text: string): Promise<any> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.addReply(commentId, name, text);
    }
    throw new Error('Database is not initialized');
  },

  async getComments(slug: string): Promise<CommentItem[]> {
    if (typeof window !== 'undefined' && (window as any).zdb) {
      return (window as any).zdb.getComments(slug);
    }
    return [];
  }
};
