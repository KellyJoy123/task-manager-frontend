import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import CircularProgress from '@mui/joy/CircularProgress'
import TaskCard from './TaskCard'
import type { Task, UpdateTaskDto } from '@/types/task'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, dto: UpdateTaskDto) => void
}

export default function TaskList({ tasks, loading, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ '--CircularProgress-trackColor': '#ede0ff', '--CircularProgress-progressColor': '#7c3aed' }} />
      </Box>
    )
  }

  const pending   = tasks.filter((t) => !t.completed)
  const completed = tasks.filter((t) =>  t.completed)

  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <i className="ti ti-clipboard-list" style={{ fontSize: 48, color: '#c4a8ff', opacity: 0.5 }} aria-hidden="true" />
        <Typography sx={{ mt: 1.5, color: 'var(--color-text-secondary)', fontSize: 14 }}>
          No hay tareas aquí todavía
        </Typography>
        <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: 12, opacity: 0.7 }}>
          Agrega una nueva tarea para comenzar
        </Typography>
      </Box>
    )
  }

  const SectionLabel = ({ label, count }: { label: string; count: number }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25, mt: 0.5 }}>
      <Typography sx={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
        {label} · {count}
      </Typography>
      <Box sx={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }} />
    </Box>
  )

  return (
    <Box>
      {pending.length > 0 && (
        <>
          <SectionLabel label="Pendientes" count={pending.length} />
          {pending.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </>
      )}
      {completed.length > 0 && (
        <Box sx={{ mt: pending.length > 0 ? 2.5 : 0 }}>
          <SectionLabel label="Completadas" count={completed.length} />
          {completed.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </Box>
      )}
    </Box>
  )
}
