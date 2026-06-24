import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { tasksApi } from '../../src/api/endpoints/tasks'
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await tasksApi.getAll()
      setTasks(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar tareas'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = async (dto: CreateTaskDto) => {
    const toastId = toast.loading('Creando tarea...')
    try {
      const newTask = await tasksApi.create(dto)
      setTasks((prev) => [newTask, ...prev])
      toast.success('Tarea creada', { id: toastId })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear tarea'
      toast.error(message, { id: toastId })
    }
  }

  const updateTask = async (id: string, dto: UpdateTaskDto) => {
    const toastId = toast.loading('Actualizando...')
    try {
      const updated = await tasksApi.update(id, dto)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      toast.success('Tarea actualizada', { id: toastId })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar'
      toast.error(message, { id: toastId })
    }
  }

  const toggleTask = useCallback(async (id: string) => {
    try {
      const updated = await tasksApi.toggle(id)
      setTasks(prev => prev.map(task =>
        task.id === id ? updated : task
      ))
      toast.success(updated.completed ? '✅ Tarea completada' : '📌 Tarea pendiente')
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cambiar estado'
      toast.error(message)
      throw err
    }
  }, [])

  const deleteTask = async (id: string) => {
    const toastId = toast.loading('Eliminando...')
    try {
      await tasksApi.delete(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      toast.success('Tarea eliminada', { id: toastId })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar'
      toast.error(message, { id: toastId })
    }
  }

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
  }
}
