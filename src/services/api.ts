import {RotinasResponse} from '../types';

export async function fetchRotinas(
  baseUrl: string,
  token: string,
): Promise<RotinasResponse> {
  const url = `${baseUrl}/api/utils/rotinas`;
  console.log('[API] fetchRotinas URL:', url);
  console.log('[API] fetchRotinas token:', token.substring(0, 20) + '...');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('[API] fetchRotinas status:', response.status);

    if (!response.ok) {
      const body = await response.text();
      console.log('[API] fetchRotinas error body:', body);
      throw new Error(`Erro ao buscar rotinas: ${response.status}`);
    }

    const data = await response.json();
    console.log('[API] fetchRotinas response:', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('[API] fetchRotinas exception:', error);
    throw error;
  }
}

export async function triggerRotina(
  baseUrl: string,
  trigger: string,
): Promise<void> {
  const url = `${baseUrl}/api/mkzense/${trigger}/trigger`;
  console.log('[API] triggerRotina URL:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    console.log('[API] triggerRotina status:', response.status);

    if (!response.ok) {
      const body = await response.text();
      console.log('[API] triggerRotina error body:', body);
      throw new Error(`Erro ao executar rotina: ${response.status}`);
    }

    const body = await response.text();
    console.log('[API] triggerRotina response:', body);
  } catch (error: any) {
    console.log('[API] triggerRotina exception:', error?.message || error);
    throw error;
  }
}
