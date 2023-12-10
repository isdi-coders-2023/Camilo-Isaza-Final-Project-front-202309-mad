import { Helmet } from '../../model/helmet';

export class RepoHelmets {
  url = 'http://localhost:2800/helmets';
  constructor(public token: string) {}

  async getHelmets(): Promise<Helmet[]> {
    const response = await fetch(this.url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async createHelmet(newHelmet: FormData): Promise<Helmet> {
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
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(updatedHelmet),
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteHelmet(id: Helmet['id']): Promise<Helmet[]> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
