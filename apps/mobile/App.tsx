import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1020' }}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
        <Text style={{ color: '#A2FFCB', fontSize: 12 }}>Watch. Learn. Earn.</Text>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: '700' }}>
          Find your path. Build real skills. Get rewarded for learning.
        </Text>
        <Text style={{ color: '#CAD2E2', fontSize: 16 }}>
          AILVA (AI Learning Voyage Assistant) helps you pick interests, unlock Level 2, and track Learneum Credits.
        </Text>

        <View style={{ backgroundColor: '#121A31', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Onboarding with AILVA</Text>
          <Text style={{ color: '#C4D0EE', marginTop: 8 }}>
            Favorite fashion line? Favorite YouTubers? Deep space or deep sea?
          </Text>
          <Pressable style={{ backgroundColor: '#5B8CFF', marginTop: 12, padding: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Start AI onboarding</Text>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#121A31', padding: 16, borderRadius: 12 }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Credits disclaimer</Text>
          <Text style={{ color: '#C4D0EE', marginTop: 6 }}>
            Learneum Credits are learning incentives and NOT guaranteed income. Terms vary; transparency matters.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
