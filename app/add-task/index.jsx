import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableWithoutFeedback, View } from "react-native";
import { IconSave } from "../../components/Icons";
import useTaskContext from "../../components/context/useTaskContext";
import { useState } from "react";
import { router } from "expo-router";

// Tela para adicionar novas tarefas 

export default function AddTask() {

    const [description, setDescription] = useState()

    const { addTask } = useTaskContext()

    const submitTask = () => {
        if (!description) {
            return
        }
        addTask(description)
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
                        Adicionar uma tarefa:
                    </Text>
                    <Text style={styles.label}>
                        Em que você está trabalhando?
                    </Text>
                    <TextInput
                        style={styles.input}
                        numberOfLines={10}
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={styles.actions}>
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
        fontWeight: 600,
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
        justifyContent: 'flex-end'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    }
})