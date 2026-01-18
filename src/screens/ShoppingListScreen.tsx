import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

import { loadPlanWeek } from '../lib/planLoader';
import { buildShoppingList, groupShoppingList } from '../lib/shoppingList';
import { useAppStore } from '../store/useAppStore';

export default function ShoppingListScreen() {
  const week = useMemo(() => loadPlanWeek(), []);
  const largeTextMode = useAppStore((s) => s.largeTextMode);
  const shoppingChecked = useAppStore((s) => s.shoppingChecked);
  const toggleShoppingItem = useAppStore((s) => s.toggleShoppingItem);
  const resetShoppingChecks = useAppStore((s) => s.resetShoppingChecks);

  const [selected, setSelected] = useState<string[]>(week.days.map((d) => d.dayId));

  const items = useMemo(() => buildShoppingList(week, selected), [week, selected]);
  const grouped = useMemo(() => groupShoppingList(items), [items]);

  const toggleDay = (dayId: string) => {
    setSelected((prev) => (prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, largeTextMode && styles.titleLarge]}>Lista de compras</Text>

      <View style={styles.chipsRow}>
        {week.days.map((d) => {
          const on = selected.includes(d.dayId);
          return (
            <Pressable
              key={d.dayId}
              style={[styles.chip, on && styles.chipOn]}
              onPress={() => toggleDay(d.dayId)}
            >
              <Text style={[styles.chipText, largeTextMode && styles.chipTextLarge]}>{d.dayName.slice(0, 2)}</Text>
            </Pressable>
          );
        })}

        <Pressable style={styles.resetBtn} onPress={resetShoppingChecks}>
          <Text style={[styles.resetText, largeTextMode && styles.resetTextLarge]}>Reset</Text>
        </Pressable>
      </View>

      {Object.keys(grouped).length === 0 ? (
        <Text style={[styles.empty, largeTextMode && styles.emptyLarge]}>Selecciona días para generar la lista.</Text>
      ) : (
        Object.entries(grouped).map(([category, catItems]) => (
          <View key={category} style={styles.section}>
            <Text style={[styles.sectionTitle, largeTextMode && styles.sectionTitleLarge]}>{category}</Text>
            {catItems.map((it) => {
              const checked = shoppingChecked[it.ingredientId] ?? false;
              return (
                <Pressable
                  key={it.ingredientId}
                  style={styles.itemRow}
                  onPress={() => toggleShoppingItem(it.ingredientId)}
                >
                  <Text style={[styles.itemText, largeTextMode && styles.itemTextLarge]}>
                    {checked ? '✅' : '⬜'} {it.name}
                  </Text>
                  <Text style={[styles.count, largeTextMode && styles.countLarge]}>x{it.count}</Text>
                </Pressable>
              );
            })}
          </View>
        ))
      )}

      <Text style={[styles.note, largeTextMode && styles.noteLarge]}>
        Nota MVP: los “x#” son conteos de aparición en el plan (sin cantidades). Próxima mejora: cantidades exactas.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  titleLarge: { fontSize: 28 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  chip: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderRadius: 999 },
  chipOn: { opacity: 0.85 },
  chipText: { fontSize: 12, fontWeight: '600' },
  chipTextLarge: { fontSize: 16 },
  resetBtn: { marginLeft: 'auto', paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderRadius: 10 },
  resetText: { fontSize: 12, fontWeight: '700' },
  resetTextLarge: { fontSize: 16 },
  empty: { fontSize: 13, opacity: 0.8 },
  emptyLarge: { fontSize: 18 },
  section: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionTitleLarge: { fontSize: 22 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { fontSize: 13 },
  itemTextLarge: { fontSize: 18 },
  count: { fontSize: 12, opacity: 0.75 },
  countLarge: { fontSize: 16 },
  note: { fontSize: 12, opacity: 0.8 },
  noteLarge: { fontSize: 16 }
});
