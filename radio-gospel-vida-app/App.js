import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Linking,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playRadio = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.stopAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: 'https://stream.radioweb.app.br/gospel-vida' },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Erro ao reproduzir:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir a rádio');
    }
  };

  const openWebsite = () => {
    Linking.openURL('https://radiogospelvida.com.br');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a Rádio Gospel Vida');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0d0a" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('./assets/icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Rádio Gospel Vida ♥</Text>
        <Text style={styles.subtitle}>Louvor, adoração e palavra 24h</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Player Principal */}
        <View style={styles.playerContainer}>
          <TouchableOpacity 
            style={[styles.playButton, isPlaying && styles.playingButton]} 
            onPress={playRadio}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={40} 
              color="#fff" 
            />
          </TouchableOpacity>
          <Text style={styles.playerText}>
            {isPlaying ? "Reproduzindo ao vivo" : "Clique para ouvir"}
          </Text>
        </View>

        {/* Programação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📻 Programação</Text>
          <View style={styles.programItem}>
            <Text style={styles.programTime}>06:00 - 08:00</Text>
            <Text style={styles.programName}>Manhã de Louvor</Text>
          </View>
          <View style={styles.programItem}>
            <Text style={styles.programTime}>12:00 - 14:00</Text>
            <Text style={styles.programName}>Palavra e Adoração</Text>
          </View>
          <View style={styles.programItem}>
            <Text style={styles.programTime}>18:00 - 20:00</Text>
            <Text style={styles.programName}>Vesperal Gospel</Text>
          </View>
        </View>

        {/* Versículo do Dia */}
        <View style={styles.verseContainer}>
          <Text style={styles.verseTitle}>📖 Versículo do Dia</Text>
          <Text style={styles.verseText}>
            "O Senhor é o meu pastor, nada me faltará."{'\n'}
            <Text style={styles.verseReference}>Salmo 23:1</Text>
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
            <Ionicons name="globe" size={24} color="#fff" />
            <Text style={styles.actionText}>Website</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Rádio Gospel Vida{'\n'}
            Todos os direitos reservados
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0d0a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2d1407',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffe6b3',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ffe6b3',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  playerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#a85b1a',
    borderRadius: 15,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a0d0a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  playingButton: {
    backgroundColor: '#d32f2f',
  },
  playerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#2d1407',
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffe6b3',
    marginBottom: 15,
  },
  programItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a85b1a',
  },
  programTime: {
    color: '#a85b1a',
    fontWeight: '600',
  },
  programName: {
    color: '#ffe6b3',
    flex: 1,
    textAlign: 'right',
  },
  verseContainer: {
    backgroundColor: '#ffe6b3',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  verseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a0d0a',
    marginBottom: 10,
  },
  verseText: {
    fontSize: 16,
    color: '#1a0d0a',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  verseReference: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: '#a85b1a',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#ffe6b3',
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.8,
  },
});
