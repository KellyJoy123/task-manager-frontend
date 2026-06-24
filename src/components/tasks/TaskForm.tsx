import { useRef, useState } from 'react'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import type { CreateTaskDto } from '../../types/task'
import { Box } from '@mui/joy'

interface TaskFormProps {
  onSubmit: (dto: CreateTaskDto) => Promise<void>
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (!title.trim()) return
    setLoading(true)
    await onSubmit({ title: title.trim(), description: description.trim() || undefined })
    setTitle('')
    setDescription('')
    setLoading(false)
  }

  return (
    // <Card
    //   variant="outlined"
    //   sx={{
    //     borderColor: 'primary.200',
    //     background: 'linear-gradient(135deg, #f5f0ff 0%, #fafafa 100%)',
    //   }}
    // >
    //   <CardContent>
    //     <Typography level="title-md" sx={{ mb: 2, color: 'primary.700' }}>
    //       Nueva tarea
    //     </Typography>
    //     <Stack spacing={1.5}>
    //       <FormControl required>
    //         <FormLabel>Título *</FormLabel>
    //         <Input
    //           value={title}
    //           onChange={(e) => setTitle(e.target.value)}
    //           placeholder="¿Qué necesitas hacer?"
    //           onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
    //         />
    //       </FormControl>

    //       <FormControl>
    //         <FormLabel>Descripción</FormLabel>
    //         <Textarea
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //           placeholder="Detalles opcionales..."
    //           minRows={2}
    //         />
    //       </FormControl>

    //       <Button
    //         startDecorator={<AddIcon />}
    //         onClick={handleSubmit}
    //         loading={loading}
    //         disabled={!title.trim()}
    //         color="primary"
    //         sx={{ alignSelf: 'flex-end' }}
    //       >
    //         Agregar tarea
    //       </Button>
    //     </Stack>
    //   </CardContent>
    // </Card>
       <Box
      sx={{
        mb: 3,
        border: expanded ? '1.5px solid #a855f7' : '1.5px dashed #c4a8ff',
        borderRadius: '10px',
        background: expanded ? 'var(--color-background-primary)' : '#f5f0ff',
        overflow: 'hidden',
        transition: 'all 0.2s',
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, cursor: 'text' }}
        onClick={() => { setExpanded(true); setTimeout(() => inputRef.current?.focus(), 50) }}
      >
        <i className="ti ti-plus" style={{ fontSize: 18, color: '#7c3aed', flexShrink: 0 }} aria-hidden="true" />
        {!expanded ? (
          <Typography sx={{ fontSize: 13, color: '#9b6dff' }}>
            Escribe una nueva tarea y presiona Enter…
          </Typography>
        ) : (
          <Input
            slotProps={{ input: { ref: inputRef } }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit() }}
            placeholder="Título de la tarea"
            variant="plain"
            sx={{ flex: 1, fontSize: 13, '--Input-focusedHighlight': 'transparent', px: 0 }}
          />
        )}
      </Box>

      {expanded && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción opcional…"
            minRows={2}
            variant="soft"
            sx={{ fontSize: 12, mb: 1.5, background: 'var(--color-background-secondary)' }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              size="sm" variant="plain" color="neutral"
              onClick={() => { setExpanded(false); setTitle(''); setDescription('') }}
            >
              Cancelar
            </Button>
            <Button
              size="sm" loading={loading}
              disabled={!title.trim()}
              onClick={handleSubmit}
              sx={{ background: '#7c3aed', '&:hover': { background: '#6d28d9' } }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      )}
    </Box> 
  )
}
