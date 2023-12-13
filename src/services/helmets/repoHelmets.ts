import { Helmet } from '../../model/helmet';
import { helmetCategory } from '../../types/helmetCategory';

export class RepoHelmets {
  url = 'http://localhost:2800/helmets';

  constructor(public token: string) {}

  async getInitialHelmets(): Promise<Helmet[]> {
    const initialCategories = await this.fetchInitialCategories();
    const initialHelmets = await this.fetchHelmetsByCategories(
      initialCategories
    );

    return initialHelmets;
  }

  async getMoreHelmets(loadedCategories: string[]): Promise<helmetCategory> {
    console.log(loadedCategories);
    try {
      const response = await fetch(`${this.url}/moreHelmets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loadedCategories: loadedCategories,
        }),
      });
      console.log('hola');
      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error('Error fetching more helmets: ');
    }
  }

  private async fetchInitialCategories(): Promise<string[]> {
    const response = await fetch(`${this.url}/initialCategories`);
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    const data = await response.json();

    return data;
  }

  private async fetchHelmetsByCategories(
    categories: string[]
  ): Promise<Helmet[]> {
    const response = await fetch(
      `${this.url}/helmetsByCategories?categories=${categories.join(',')}`
    );
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    const data = await response.json();
    return data.helmets;
  }

  async getHelmets(): Promise<Helmet[]> {
    const response = await fetch(this.url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async createHelmet(newHelmet: FormData): Promise<Helmet> {
    console.log(newHelmet);
    const response = await fetch(this.url, {
      method: 'POST',
      body: newHelmet,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateHelmet(
    id: Helmet['id'],
    updatedHelmet: FormData
  ): Promise<Helmet> {
    console.log(id, updatedHelmet);
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: updatedHelmet,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteHelmet(id: Helmet['id']): Promise<void> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
  }
}
