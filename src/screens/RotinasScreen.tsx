import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Rotina } from '../types';
import { fetchRotinas, triggerRotina } from '../services/api';
import {
  getToken,
  getBaseUrl,
  getCachedRotinas,
  setCachedRotinas,
  clearRotinasCache,
} from '../services/storage';
import { showToast } from '../components/Toast';

export default function RotinasScreen() {
  const [rotinas, setRotinas] = useState<Rotina[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [triggeringId, setTriggeringId] = useState<number | null>(null);

  const loadRotinas = useCallback(async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cached = await getCachedRotinas();
        if (cached) {
          console.log('[Rotinas] Usando cache, items:', cached.length);
          setRotinas(cached);
          setLoading(false);
          return;
        }
      }

      const [token, baseUrl] = await Promise.all([getToken(), getBaseUrl()]);
      console.log('[Rotinas] token existe:', !!token, '| baseUrl:', baseUrl);
      if (!token || !baseUrl) {
        console.log('[Rotinas] Token ou baseUrl ausente, abortando');
        return;
      }

      if (forceRefresh) {
        await clearRotinasCache();
      }

      const response = await fetchRotinas(baseUrl, token);
      console.log('[Rotinas] Response items:', response.items?.length);
      setRotinas(response.items);
      await setCachedRotinas(response.items);
    } catch (error: any) {
      console.log('[Rotinas] ERRO:', error?.message || error);
      showToast('Erro ao carregar rotinas', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRotinas();
  }, [loadRotinas]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadRotinas(true);
  }, [loadRotinas]);

  const handleTrigger = useCallback(async (rotina: Rotina) => {
    console.log('[Rotinas] Trigger clicado:', JSON.stringify(rotina));
    try {
      setTriggeringId(rotina.id);
      const baseUrl = await getBaseUrl();
      if (!baseUrl) {
        return;
      }
      await triggerRotina(baseUrl, rotina.trigger);
      showToast(`${rotina.trigger} executada com sucesso!`);
    } catch (error) {
      showToast(`Erro ao executar ${rotina.descricao}`, 'error');
    } finally {
      setTriggeringId(null);
    }
  }, []);

  // Expose refresh for navigation header button
  React.useEffect(() => {
    (RotinasScreen as any).refresh = handleRefresh;
  }, [handleRefresh]);

  const renderItem = ({ item }: { item: Rotina }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={[styles.card, triggeringId === item.id && styles.cardPressed]}
        onPress={() => handleTrigger(item)}
        activeOpacity={0.7}
        disabled={triggeringId !== null}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.descricao}
          </Text>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.texto}
          </Text>
        </View>
        {triggeringId === item.id && (
          <ActivityIndicator
            size="small"
            color="#fff"
            style={styles.cardLoader}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1a1a2e" />
      </View>
    );
  }

  if (rotinas.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhuma rotina encontrada</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={rotinas}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#1a1a2e"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  list: {
    padding: 12,
    backgroundColor: '#f7f7f8',
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 18,
    minHeight: 140,
    justifyContent: 'space-between',
    shadowColor: '#1a1a2e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    lineHeight: 18,
  },
  cardLoader: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
