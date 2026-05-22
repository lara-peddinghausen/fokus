import { useContext } from "react";
import { TaskContext } from "./TaskProvider";

// Hook para acessar o contexto de tarefas. Verifica se o contexto está disponível e lança um erro se não estiver, garantindo que os componentes só possam acessar o contexto se estiverem dentro do TaskProvider.

export default function useTaskContext() {
    const context = useContext(TaskContext)
    if (!context) { 
        throw new Error('Tentando acessar o contexto fora do TasksProvider')
    }
    return context
}