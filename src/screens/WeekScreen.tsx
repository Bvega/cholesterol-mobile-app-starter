import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { loadPlanWeek } from '../lib/planLoader';
import type { RootStackParamList } from '../navigation';
import { useAppStore } from '../store/useAppStore';

export default function WeekScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const week = useMemo(() => loadPlanWeek(), []);
  const largeTextMode = useAppStore((s) => s.largeTextMode);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, largeTextMode && styles.titleLarge]}>{week.title}</Text>
      <Text style={[styles.subtitle, largeTextMode && styles.subtitleLarge]}>
        Objetivo calórico: {week.kcalTarget.min}-{week.kcalTarget.max} kcal/día
      </Text>

      <View style={styles.grid}>
        {week.days.map((d) => (
          <Pressable
            key={d.dayId}
            style={styles.dayCard}
            onPress={() => nav.navigate('Day', { dayId: d.dayId })}
          >
            <Text style={[styles.dayName, largeTextMode && styles.dayNameLarge]}>{d.dayName}</Text>
            <Text style={[styles.dayHint, largeTextMode && styles.dayHintLarge]} numberOfLines={2}>
              {d.meals.breakfast.description}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.tipsBox}>
        <Text style={[styles.sectionTitle, largeTextMode && styles.sectionTitleLarge]}>
          Consejos adicionales
        </Text>
        {week.additionalTips.map((t) => (
          <Text key={t} style={[styles.tip, largeTextMode && styles.tipLarge]}>• {t}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 20, fontWeight: '700' },
  titleLarge: { fontSize: 26 },
  subtitle: { fontSize: 14, opacity: 0.8 },
  subtitleLarge: { fontSize: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  dayCard: { width: '48%', padding: 12, borderWidth: 1, borderRadius: 12 },
  dayName: { fontSize: 16, fontWeight: '600' },
  dayNameLarge: { fontSize: 20 },
  dayHint: { marginTop: 6, fontSize: 12, opacity: 0.8 },
  dayHintLarge: { fontSize: 16 },
  tipsBox: { marginTop: 14, padding: 12, borderWidth: 1, borderRadius: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  sectionTitleLarge: { fontSize: 20 },
  tip: { fontSize: 12, marginBottom: 6 },
  tipLarge: { fontSize: 16 }
});
