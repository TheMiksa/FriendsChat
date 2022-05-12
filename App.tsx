import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDhQbnYErbsQe37RAkDY-1jXo1xNswakIw",
  authDomain: "miksa-friends-chat.firebaseapp.com",
  projectId: "miksa-friends-chat",
  storageBucket: "miksa-friends-chat.appspot.com",
  messagingSenderId: "649844966884",
  appId: "1:649844966884:web:b8be7f42863209e1af73f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  set(reference, {
    highscore: score,
  });
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity
        onPress={() => storeHighScore(123123, 5414124)}
      >
        <Text>Set score</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
