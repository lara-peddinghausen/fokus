import { Pressable, StyleSheet, Text } from "react-native";

// Componente de botão para as ações do Pomodoro (foco, pausa curta e pausa longa)

export const ActionButton = ({ active, onPress, display }) => {
    return (
        <Pressable
            style={active ? styles.contextButtonActive : null}
            onPress={onPress}>
            <Text style={styles.contextButtonText}>{display}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  contextButtonActive: {
    backgroundColor: "#144480",
    borderRadius: 8
  },
  contextButtonText: {
    fontSize: 14,
    color: "#fff",
    padding: 8
  }
});