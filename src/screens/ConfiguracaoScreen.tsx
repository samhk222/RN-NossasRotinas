import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  getToken,
  setToken as saveToken,
  getBaseUrl,
  setBaseUrl as saveBaseUrl,
  clearRotinasCache,
} from '../services/storage';
import {showToast} from '../components/Toast';

interface Props {
  onConfigSaved?: () => void;
  isSetup?: boolean;
}

export default function ConfiguracaoScreen({onConfigSaved, isSetup}: Props) {
  const [token, setToken] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [savedToken, savedUrl] = await Promise.all([
        getToken(),
        getBaseUrl(),
      ]);
      if (savedToken) {
        setToken(savedToken);
      }
      if (savedUrl) {
        setBaseUrl(savedUrl);
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    if (!token.trim() || !baseUrl.trim()) {
      showToast('Preencha todos os campos', 'error');
      return;
    }

    const cleanUrl = baseUrl.trim().replace(/\/+$/, '');

    await Promise.all([
      saveToken(token.trim()),
      saveBaseUrl(cleanUrl),
      clearRotinasCache(),
    ]);

    showToast('Configuracoes salvas com sucesso!');
    onConfigSaved?.();
  };

  if (loading) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        {isSetup && (
          <View style={styles.header}>
            <Text style={styles.title}>Nossas Rotinas</Text>
            <Text style={styles.subtitle}>
              Configure seu acesso para continuar
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.label}>URL Base</Text>
          <TextInput
            style={styles.input}
            value={baseUrl}
            onChangeText={setBaseUrl}
            placeholder="http://app.samuca.com.test"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          <Text style={[styles.label, styles.labelSpacing]}>Token</Text>
          <TextInput
            style={[styles.input, styles.tokenInput]}
            value={token}
            onChangeText={setToken}
            placeholder="Cole seu token aqui"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  labelSpacing: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#f7f7f8',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#e8e8ed',
  },
  tokenInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#1a1a2e',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
