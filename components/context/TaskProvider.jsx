import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

// Contexto para gerenciar as tarefas da aplicação, incluindo a persistência dos dados usando AsyncStorage.

export const TaskContext = createContext()

const TASKS_STORAGE_KEY = 'fokus-tasks'

export function TasksProvider({ children }) {

    const [tasks, setTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => { // carrega as tarefas do AsyncStorage quando o componente é montado
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
                const loadedData = jsonValue != null ? JSON.parse(jsonValue) : [];
                setTasks(loadedData)
                setIsLoaded(true)
            } catch (e) {
                // error reading value
            }
        };
        getData()
    }, [])

    useEffect(() => { // salva as tarefas no AsyncStorage sempre que a lista de tarefas é atualizada
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
            } catch (e) {
                // saving error
            }
        };
        if (isLoaded) {
            storeData(tasks)
        }
    }, [tasks])

    const addTask = (description) => {
        console.log('Tarefa vai ser adicionada')
        setTasks(oldState => {
            return [
                ...oldState, // mantém as tarefas antigas e adiciona a nova tarefa no final da lista
                {
                    description,
                    id: oldState.length + 1
                }
            ]
        })
    }

    const toggleTaskCompleted = (id) => {
        setTasks(oldState => {
            return oldState.map(t => {
                if (t.id == id) {
                    t.completed = !t.completed
                }
                return t
            })
        })
    }

    const deleteTask = (id) => {
        setTasks(oldState => {
            return oldState.filter(t => t.id != id)
        })
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            toggleTaskCompleted,
            deleteTask

        }}>
            {children}
        </TaskContext.Provider>
    )
}