import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../navigation';
import { useAppStore } from '../store/useAppStore';

export default function MealScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Meal'>>();
  const largeTextMode = useAppStore((s) => s.largeTextMode);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, largeTextMode && styles.titleLarge]}>{route.params.title}</Text>
      <Text style={[styles.desc, largeTextMode && styles.descLarge]}>{route.params.description}</Text>

      <View style={styles.noteBox}>
        <Text style={[styles.noteTitle, largeTextMode && styles.noteTitleLarge]}>Notas</Text>
        <Text style={[styles.note, largeTextMode && styles.noteLarge]}>
          MVP: este plan está basado en descripciones. La siguiente mejora será convertir cada comida en ingredientes + cantidades
          para una lista de compras exacta.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  titleLarge: { fontSize: 28 },
  desc: { fontSize: 14, opacity: 0.9 },
  descLarge: { fontSize: 18 },
  noteBox: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  noteTitle: { fontSize: 16, fontWeight: '700' },
  noteTitleLarge: { fontSize: 22 },
  note: { fontSize: 12, opacity: 0.9 },
  noteLarge: { fontSize: 16 }
});
