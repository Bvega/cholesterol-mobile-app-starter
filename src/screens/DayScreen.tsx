import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { loadPlanWeek } from '../lib/planLoader';
import type { RootStackParamList } from '../navigation';
import { useAppStore } from '../store/useAppStore';

export default function DayScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Day'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const week = useMemo(() => loadPlanWeek(), []);
  const day = week.days.find((d) => d.dayId === route.params.dayId);
  const largeTextMode = useAppStore((s) => s.largeTextMode);
  const toggleMeal = useAppStore((s) => s.toggleMeal);
  const toggledMeals = useAppStore((s) => s.toggledMeals);

  if (!day) return <View style={styles.container}><Text>Día no encontrado.</Text></View>;

  const renderMealCard = (label: string, mealId: string, desc: string) => {
    const key = `${day.dayId}:${mealId}`;
    const done = toggledMeals[key] ?? false;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, largeTextMode && styles.cardTitleLarge]}>{label}</Text>
          <Pressable
            style={[styles.checkBtn, done && styles.checkBtnOn]}
            onPress={() => toggleMeal(day.dayId, mealId)}
          >
            <Text style={[styles.checkText, largeTextMode && styles.checkTextLarge]}>{done ? 'Hecho' : 'Marcar'}</Text>
          </Pressable>
        </View>

        <Text style={[styles.desc, largeTextMode && styles.descLarge]}>{desc}</Text>

        <Pressable
          style={styles.detailBtn}
          onPress={() => nav.navigate('Meal', { dayId: day.dayId, mealId, title: label, description: desc })}
        >
          <Text style={[styles.detailText, largeTextMode && styles.detailTextLarge]}>Ver detalle</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, largeTextMode && styles.titleLarge]}>{day.dayName}</Text>

      {renderMealCard('Desayuno', day.meals.breakfast.mealId, day.meals.breakfast.description)}
      {renderMealCard('Comida', day.meals.lunch.mealId, day.meals.lunch.description)}
      {renderMealCard('Cena', day.meals.dinner.mealId, day.meals.dinner.description)}

      <View style={styles.tips}>
        <Text style={[styles.tipsTitle, largeTextMode && styles.tipsTitleLarge]}>Consejos</Text>
        {week.additionalTips.slice(0, 3).map((t) => (
          <Text key={t} style={[styles.tip, largeTextMode && styles.tipLarge]}>• {t}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  titleLarge: { fontSize: 28 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardTitleLarge: { fontSize: 22 },
  desc: { fontSize: 13, opacity: 0.9 },
  descLarge: { fontSize: 18 },
  checkBtn: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderRadius: 999 },
  checkBtnOn: { opacity: 0.85 },
  checkText: { fontSize: 12, fontWeight: '600' },
  checkTextLarge: { fontSize: 16 },
  detailBtn: { paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  detailText: { fontSize: 12, fontWeight: '600' },
  detailTextLarge: { fontSize: 16 },
  tips: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 6 },
  tipsTitle: { fontSize: 16, fontWeight: '700' },
  tipsTitleLarge: { fontSize: 22 },
  tip: { fontSize: 12 },
  tipLarge: { fontSize: 16 }
});
