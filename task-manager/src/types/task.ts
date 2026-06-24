export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateTaskDto {
  title: string
  description?: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  completed?: boolean
}
