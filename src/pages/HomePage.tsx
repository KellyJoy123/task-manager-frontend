import { useState, useMemo } from 'react'
import Box from '@mui/joy/Box'
import Alert from '@mui/joy/Alert'
import Typography from '@mui/joy/Typography'
import { useTasks } from '../hooks/useTasks'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import { type FilterStatus } from '../components/tasks/TaskFilters'
import Sidebar from '../components/ui/Sidebar'
import StatsBar from '../components/ui/StatsBar'
import { Divider } from '@mui/joy'

export default function HomePage() {
  const { tasks, loading, error, createTask, toggleTask, deleteTask, updateTask } = useTasks()
  const [filter, setFilter] = useState<FilterStatus>('all')

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }), [tasks])

  const filtered = useMemo(() => {
    if (filter === 'pending')   return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) =>  t.completed)
    return tasks
  }, [tasks, filter])

    const today = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
    const titleMap: Record<FilterStatus, string> = {
      all: 'Todas las tareas',
      pending: 'Pendientes',
      completed: 'Completadas',
    }

  return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar filter={filter} onChange={setFilter} counts={counts} />

        <Box
          component="main"
          sx={{
            flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
            pt: { xs: '56px', sm: 0 }, 
          }}
        >
          <Box sx={{
            px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 },
            borderBottom: '0.5px solid var(--color-border-tertiary)',
          }}>
            <Typography level="title-lg" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
              {titleMap[filter]}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'var(--color-text-secondary)', mt: 0.3, textTransform: 'capitalize' }}>
              {today}
            </Typography>
          </Box>

          <Box sx={{
            flex: 1,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
            maxWidth: 680,
            width: '100%',
          }}>
            {error && <Alert color="danger" variant="soft" sx={{ mb: 2 }}>{error}</Alert>}
            <TaskForm onSubmit={createTask} />
          <StatsBar
            total={counts.all}
            completed={counts.completed}
            pending={counts.pending}
            activeFilter={filter}
            onFilterChange={setFilter} />
          <Divider sx={{mb: 2}}/>
            <TaskList 
              tasks={filtered}
              loading={loading}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask} />
          </Box>
        </Box>
      </Box>
  )

}
