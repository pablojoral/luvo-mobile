import { apiClient } from '../apiClient';
import { BaseService } from '../BaseService';

export interface Content {
  id: number;
  key: string;
  title: string;
  body: string;
  updatedAt: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

class ContentService extends BaseService {
  async getContent(key: string): Promise<Content> {
    const res = await this.apiClient.get<Content>(`/content/${key}`);
    return res.data;
  }

  async getFAQ(): Promise<FAQItem[]> {
    const res = await this.apiClient.get<FAQItem[]>('/faq');
    return res.data;
  }
}

export const contentService = new ContentService();
