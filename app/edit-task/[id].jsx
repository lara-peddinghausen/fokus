import { useLocalSearchParams } from "expo-router";
import { use } from "react";
import { View, Text } from "react-native";

export default function EditTask() {

     const {id} = useLocalSearchParams() // aqui a gente consegue acessar os parâmetros da rota, ou seja, o id da tarefa que queremos editar


    return (
        <View>
            <Text>
                Precisamos editar essa tarefa com id: {id}
            </Text>
        </View>
    )
}