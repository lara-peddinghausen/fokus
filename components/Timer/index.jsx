import { StyleSheet, Text } from "react-native"

// Componente de timer, utilizado para exibir o tempo restante durante a contagem regressiva.

export const Timer = ({ totalSeconds }) => {

    const date = new Date(totalSeconds * 1000) // converte os segundos para milissegundos, que é a unidade de tempo utilizada pelo objeto Date
    const options = { minute: "2-digit", second: "2-digit" } // formatação da exibição do tempo, mostrando apenas os minutos e segundos com dois dígitos

    return (
        <Text style={styles.timer}>
            {date.toLocaleTimeString("pt-BR", options)}
        </Text>
    )
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
}); 