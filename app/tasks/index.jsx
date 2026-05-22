import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "../../components/TaskItem";
import { FokusButton } from "../../components/FokusButton";
import { IconPlus } from "../../components/Icons";
import { router } from "expo-router";
import useTaskContext from "../../components/context/useTaskContext";

// Tela para exibir a lista de tarefas e para adicionar novas tarefas.

export default function Tasks() {

    const { tasks, deleteTask, toggleTaskCompleted } = useTaskContext() // usa funções definidas no TaskProvider para manipular as tarefas

    return (
        <View style={styles.container}>

            <View style={styles.wrapper}>

                <View style={styles.inner}>
                    
                    <FlatList
                        data={tasks}
                        renderItem={({ item }) => <TaskItem
                            completed={item.completed}
                            text={item.description}
                            onPressDelete={() => deleteTask(item.id)}
                            onToggleComplete={() => toggleTaskCompleted(item.id)} 
                            onPressEdit={() => router.navigate(`/edit-task/${item.id}`)}
                        />}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                        ListHeaderComponent={<Text style={styles.text}>Listas de tarefas:</Text>}
                        ListFooterComponent={<View style={{marginTop: 16}}>
                            <FokusButton
                                title="Adicionar nova tarefa"
                                icon={<IconPlus outline />}
                                outline
                                onPress={() => router.navigate('/add-task')} 
                            />
                        </View>}
                    />
                </View>


            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021123",
        alignItems: 'center'
    },
    wrapper: {
        gap: 40,
        width: '90%',

    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 26,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    inner: {
        gap: 8
    }

})