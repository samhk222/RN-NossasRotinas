import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

let toastId = 0;
let showToastFn: ((text: string, type?: 'success' | 'error') => void) | null =
  null;

export function showToast(text: string, type: 'success' | 'error' = 'success') {
  showToastFn?.(text, type);
}

export function ToastProvider({children}: {children: React.ReactNode}) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addMessage = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = ++toastId;
    setMessages(prev => [...prev, {id, text, type}]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    showToastFn = addMessage;
    return () => {
      showToastFn = null;
    };
  }, [addMessage]);

  return (
    <>
      {children}
      {messages.map(msg => (
        <ToastItem key={msg.id} message={msg} />
      ))}
    </>
  );
}

function ToastItem({message}: {message: ToastMessage}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.toast,
        message.type === 'error' ? styles.toastError : styles.toastSuccess,
        {opacity},
      ]}>
      <Text style={styles.toastText}>{message.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  toastSuccess: {
    backgroundColor: '#1a1a2e',
  },
  toastError: {
    backgroundColor: '#dc3545',
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
