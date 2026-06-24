import { useState } from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Checkbox from '@mui/joy/Checkbox'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import type { Task } from '../../types/task'
import TaskEditModal from './TaskEditModal'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, data: { title: string; description?: string }) => void
}

export default function TaskCard({ task, onToggle, onDelete, onUpdate }: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false)

  const formattedDate = task.created_at
    ? new Date(task.created_at).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          transition: 'all 0.2s ease',
          borderColor: task.completed ? 'neutral.200' : 'neutral.300',
          opacity: task.completed ? 0.75 : 1,
          '&:hover': {
            borderColor: 'primary.400',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.12)',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              color="primary"
              sx={{ mt: 0.3, flexShrink: 0 }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                level="title-md"
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'neutral.500' : 'neutral.800',
                  wordBreak: 'break-word',
                }}
              >
                {task.title}
              </Typography>

              {task.description && (
                <Typography
                  level="body-sm"
                  sx={{
                    mt: 0.5,
                    color: 'neutral.500',
                    wordBreak: 'break-word',
                  }}
                >
                  {task.description}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                <Chip
                  size="sm"
                  variant="soft"
                  color={task.completed ? 'success' : 'warning'}
                  sx={{ fontSize: '0.7rem' }}
                >
                  {task.completed ? 'Completada' : 'Pendiente'}
                </Chip>
                {formattedDate && (
                  <Typography level="body-xs" sx={{ color: 'neutral.400' }}>
                    {formattedDate}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() => setEditOpen(true)}
                sx={{ '&:hover': { color: 'primary.500' } }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() => onDelete(task.id)}
                sx={{ '&:hover': { color: 'danger.500' } }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <TaskEditModal
        open={editOpen}
        task={task}
        onClose={() => setEditOpen(false)}
        onSave={(data) => {
          onUpdate(task.id, data)
          setEditOpen(false)
        }}
      />
    </>
  )
}
