import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import { useAppStore } from '../store/useAppStore';

export default function SettingsScreen() {
  const largeTextMode = useAppStore((s) => s.largeTextMode);
  const setLargeTextMode = useAppStore((s) => s.setLargeTextMode);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, largeTextMode && styles.titleLarge]}>Ajustes</Text>

      <View style={styles.row}>
        <Text style={[styles.label, largeTextMode && styles.labelLarge]}>Modo texto grande</Text>
        <Switch value={largeTextMode} onValueChange={setLargeTextMode} />
      </View>

      <Text style={[styles.note, largeTextMode && styles.noteLarge]}>
        Consejo: activa texto grande para una experiencia más cómoda.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  titleLarge: { fontSize: 28 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 12 },
  label: { fontSize: 14, fontWeight: '600' },
  labelLarge: { fontSize: 18 },
  note: { fontSize: 12, opacity: 0.8 },
  noteLarge: { fontSize: 16 }
});
