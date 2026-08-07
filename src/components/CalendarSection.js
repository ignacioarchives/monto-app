import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useSubscriptions } from '../context/SubscriptionContext';

// Días de la semana para la cabecera de las columnas
const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CalendarSection() {
  const { subscriptions, deleteSubscription } = useSubscriptions(); 
  const [selectedDay, setSelectedDay] = useState(10);

  // Estados para controlar el Modal y el item seleccionado
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  // Filtramos qué suscripciones caen en el día seleccionado
  const selectedDaySubscriptions = subscriptions.filter(
    (sub) => sub.day === selectedDay
  );

  // Función para abrir el modal con la suscripción tocada
  const handleOpenModal = (sub) => {
    setSelectedSub(sub);
    setModalVisible(true);
  };

  // Manejador al tocar un día del calendario
  const handleDayPress = (dayNumber) => {
    setSelectedDay(dayNumber);
    
    // Buscamos si hay suscripciones en este día específico
    const subsOnThisDay = subscriptions.filter((s) => s.day === dayNumber);
    
    // Si hay cobros en este día, abrimos automáticamente el modal con el primero de ellos
    if (subsOnThisDay.length > 0) {
      setSelectedSub(subsOnThisDay[0]);
      setModalVisible(true);
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSub(null);
  };

  // Función para eliminar desde el modal
  const handleDelete = (id) => {
    deleteSubscription(id);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      
      {/* ===== CONTENEDOR GENERAL DEL CALENDARIO ===== */}
      <View style={styles.calendarWrapper}>

        {/* 1. CABECERA DE LOS DÍAS DE LA SEMANA */}
        <View style={styles.weekHeaderRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 2. GRILLA DE LOS 31 DÍAS */}
        <View style={styles.gridContainer}>
          {monthDays.map((dayNumber) => {
            const isSelected = dayNumber === selectedDay;
            
            // Buscamos si hay cobros este día para poner el indicador
            const subsOnThisDay = subscriptions.filter((s) => s.day === dayNumber);
            const hasSubscription = subsOnThisDay.length > 0;

            return (
              <TouchableOpacity 
                key={dayNumber} 
                style={[
                  styles.dayCell, 
                  isSelected && styles.dayCellSelected
                ]}
                onPress={() => handleDayPress(dayNumber)} // 👈 Ahora abre el modal si hay cobros
                activeOpacity={0.7}
              >
                {/* Espacio central: Indicador de Suscripción */}
                {hasSubscription && (
                  <View style={[styles.indicatorDot, isSelected && styles.indicatorDotSelected]}>
                     <Ionicons 
                       name="card" 
                       size={12} 
                       color={isSelected ? '#0088FF' : '#FFFFFF'} 
                     />
                  </View>
                )}

                {/* Número del día anclado bien abajo */}
                <Text style={[
                  styles.dateNumber, 
                  isSelected && styles.dateNumberSelected
                ]}>
                  {dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ===== DETALLE DEL DÍA SELECCIONADO ===== */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>Cobros del día {selectedDay}</Text>
          {selectedDaySubscriptions.length > 0 && (
            <Text style={styles.countBadge}>
              {selectedDaySubscriptions.length}
            </Text>
          )}
        </View>

        {selectedDaySubscriptions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-clear-outline" size={28} color="#CBD5E1" />
            <Text style={styles.emptyText}>Día libre de cobros</Text>
          </View>
        ) : (
          selectedDaySubscriptions.map((sub) => (
            <TouchableOpacity 
              key={sub.id} 
              style={styles.subCard}
              activeOpacity={0.8}
              onPress={() => handleOpenModal(sub)}
            >
              <View style={styles.subCardLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="sparkles" size={18} color="#2563EB" />
                </View>
                <View>
                  <Text style={styles.subName}>{sub.name}</Text>
                  <Text style={styles.subTag}>{sub.tag || 'Suscripción'}</Text>
                </View>
              </View>
              <Text style={styles.subPrice}>${sub.price}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* ===== MODAL / POPUP DE DETALLE ===== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Cabecera del Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="shield-checkmark" size={24} color="#2563EB" />
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Información de la Suscripción */}
            {selectedSub && (
              <View style={styles.modalBody}>
                <Text style={styles.modalSubName}>{selectedSub.name}</Text>
                <Text style={styles.modalSubTag}>{selectedSub.tag || 'Suscripción mensual'}</Text>
                
                <View style={styles.priceContainerModal}>
                  <Text style={styles.priceLabel}>Monto a debitar</Text>
                  <Text style={styles.modalSubPrice}>${selectedSub.price}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color="#64748B" />
                  <Text style={styles.infoText}>Fecha de cobro: Día {selectedSub.day} de cada mes</Text>
                </View>

                {/* Acciones del Modal */}
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => handleDelete(selectedSub.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" style={{ marginRight: 6 }} />
                    <Text style={styles.deleteButtonText}>Eliminar suscripción</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',    
    paddingHorizontal: 16,  
  },

  /* --- CONTENEDOR PRINCIPAL DEL CALENDARIO --- */
  calendarWrapper: {
    width: 364,              
    alignSelf: 'center',    
    marginLeft: 15,
  },

  /* --- CABECERA DE DÍAS DE LA SEMANA --- */
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,                 
    marginBottom: 8,
  },
  weekDayCell: {
    width: 44,              
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    fontSize: 13,           
    fontWeight: 'bold',     
    color: '#2563EB',       
  },

  /* --- GRILLA DEL CALENDARIO --- */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',       
    gap: 7,                 
  },
  
  dayCell: {
    width: 44,              
    height: 52,             
    position: 'relative',   
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dayCellSelected: {
    backgroundColor: '#E0F0FF', 
    borderColor: '#DBEDFF',     
    borderWidth: 1,
  },

  /* --- INDICADOR DE SUSCRIPCIÓN --- */
  indicatorDot: {
    marginTop: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563EB', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorDotSelected: {
    backgroundColor: '#FFFFFF', 
  },

  dateNumber: {
    position: 'absolute',
    bottom: 4,              
    fontSize: 15,           
    fontWeight: '500',      
    color: colors.textPrimary,
  },
  dateNumberSelected: {
    color: '#0088FF',    
    fontWeight: 'bold',  
  },

  /* --- DETALLES DEL DÍA --- */
  detailsContainer: {
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  countBadge: {
    backgroundColor: '#DBEDFF',
    color: '#0088FF',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: '#94A3B8',
  },
  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  subCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  subTag: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  subPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  /* --- ESTILOS DEL MODAL --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    alignItems: 'flex-start',
  },
  modalSubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalSubTag: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 20,
  },
  priceContainerModal: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  modalSubPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0284C7',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#475569',
  },
  modalActions: {
    width: '100%',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
});