import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableWithoutFeedback, View } from "react-native";
import { IconSave } from "../../components/Icons";
import useTaskContext from "../../components/context/useTaskContext";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

// Tela de edição de tarefa

export default function EditTask() {

    const { id } = useLocalSearchParams() // aqui a gente consegue acessar os parâmetros da rota, ou seja, o id da tarefa que queremos editar

    const taskId = Number(id)

    const { tasks, editTask } = useTaskContext()

    const task = tasks.find(t => t.id === taskId)

    const [description, setDescription] = useState('')

    useEffect(() => {
        if (task) {
            setDescription(task.description)
        }
    }, [task])

    const submitTask = () => {
        editTask(taskId, description)
        setDescription('')
        router.navigate('/tasks')
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.inner}>
                    <Text style={styles.text}>
                        Editar tarefa:
                    </Text>

                    <TextInput
                        style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={styles.actions}>
                        <Pressable style={styles.button} onPress={() => router.navigate('/tasks')}>
                            <Text style={styles.label}>Cancelar</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={submitTask}>
                            <IconSave />
                            <Text style={styles.label}>Salvar</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021123',
        gap: 16,
        alignItems: 'center'
    },
    text: {
        color: '#021123',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    },
    inner: {
        backgroundColor: '#98A0A8',
        width: '90%',
        borderRadius: 8,
        padding: 16,
        gap: 32
    },
    label: {
        fontSize: 18,
        fontWeight: 600
    },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        height: 100,
        textAlignVertical: 'top'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    }
})