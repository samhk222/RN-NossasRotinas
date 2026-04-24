import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rotina} from '../types';

const KEYS = {
  TOKEN: '@nossas_rotinas:token',
  BASE_URL: '@nossas_rotinas:base_url',
  ROTINAS_CACHE: '@nossas_rotinas:rotinas_cache',
};

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.TOKEN);
}

export async function setToken(token: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.TOKEN, token);
}

export async function getBaseUrl(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.BASE_URL);
}

export async function setBaseUrl(url: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.BASE_URL, url);
}

export async function getCachedRotinas(): Promise<Rotina[] | null> {
  const data = await AsyncStorage.getItem(KEYS.ROTINAS_CACHE);
  if (data) {
    return JSON.parse(data) as Rotina[];
  }
  return null;
}

export async function setCachedRotinas(rotinas: Rotina[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.ROTINAS_CACHE, JSON.stringify(rotinas));
}

export async function clearRotinasCache(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.ROTINAS_CACHE);
}
