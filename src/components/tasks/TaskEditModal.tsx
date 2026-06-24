import { useState, useEffect } from 'react'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Stack from '@mui/joy/Stack'
import type { Task } from '../../types/task'

interface TaskEditModalProps {
  open: boolean
  task: Task
  onClose: () => void
  onSave: (data: { title: string; description?: string }) => void
}

export default function TaskEditModal({ open, task, onClose, onSave }: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  useEffect(() => {
    if (open) {
      setTitle(task.title)
      setDescription(task.description || '')
    }
  }, [open, task])

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave({ title: title.trim(), description: description.trim() || undefined })
  }

  // return (
  //   <Modal open={open} onClose={onClose}>
  //     <ModalDialog
  //       sx={{
  //         width: { xs: '90vw', sm: 480 },
  //         borderRadius: 'lg',
  //       }}
  //     >
  //       <ModalClose />
  //       <Typography level="title-lg" sx={{ mb: 2 }}>
  //         Editar tarea
  //       </Typography>

  //       <Stack spacing={2}>
  //         <FormControl required>
  //           <FormLabel>Título</FormLabel>
  //           <Input
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //             placeholder="Título de la tarea"
  //             autoFocus
  //           />
  //         </FormControl>

  //         <FormControl>
  //           <FormLabel>Descripción</FormLabel>
  //           <Textarea
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             placeholder="Descripción opcional..."
  //             minRows={3}
  //           />
  //         </FormControl>

  //         <Button
  //           onClick={handleSubmit}
  //           disabled={!title.trim()}
  //           color="primary"
  //         >
  //           Guardar cambios
  //         </Button>
  //       </Stack>
  //     </ModalDialog>
  //   </Modal>
  // )

    return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: { xs: '90vw', sm: 480 },
          borderRadius: 'lg',
        }}
      >
        <ModalClose />
        <Typography level="title-lg" sx={{ mb: 2 }}>
          Editar tarea
        </Typography>

        <Stack spacing={2}>
          <FormControl required>
            <FormLabel>Título</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
              autoFocus
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción opcional..."
              minRows={3}
            />
          </FormControl>

          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            color="primary"
          >
            Guardar cambios
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
   
}
