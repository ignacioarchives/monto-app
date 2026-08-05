import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddSubscriptionModal({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Agregar Nueva Suscripción</Text>
        
        {/* Aquí irá el formulario */}

        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  modalContent: { 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    padding: 24, 
    height: '60%', 
    alignItems: 'center' 
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  closeButton: { marginTop: 'auto', padding: 12, backgroundColor: '#E2E8F0', borderRadius: 12, width: '100%', alignItems: 'center' },
  closeText: { fontWeight: 'bold', color: '#1C1C1E' }
});