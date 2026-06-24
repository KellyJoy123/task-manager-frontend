import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import Typography from '@mui/joy/Typography'

export type FilterStatus = 'all' | 'pending' | 'completed'

interface TaskFiltersProps {
  filter: FilterStatus
  onChange: (filter: FilterStatus) => void
  counts: { all: number; pending: number; completed: number }
}

const options: { label: string; value: FilterStatus }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Completadas', value: 'completed' },
]

export default function TaskFilters({ filter, onChange, counts }: TaskFiltersProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      <Typography level="body-sm" sx={{ color: 'neutral.500', mr: 0.5 }}>
        Filtrar:
      </Typography>
      {options.map((opt) => (
        <Chip
          key={opt.value}
          variant={filter === opt.value ? 'solid' : 'soft'}
          color={filter === opt.value ? 'primary' : 'neutral'}
          onClick={() => onChange(opt.value)}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          endDecorator={
            <Typography
              level="body-xs"
              sx={{
                ml: 0.5,
                color: filter === opt.value ? 'primary.100' : 'neutral.500',
              }}
            >
              {counts[opt.value]}
            </Typography>
          }
        >
          {opt.label}
        </Chip>
      ))}
    </Box>
  )

  //   return (
  //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
  //     <Typography level="body-sm" sx={{ color: 'neutral.500', mr: 0.5 }}>
  //       Filtrar:
  //     </Typography>
  //     {options.map((opt) => (
  //       <Chip
  //         key={opt.value}
  //         variant={filter === opt.value ? 'solid' : 'soft'}
  //         color={filter === opt.value ? 'primary' : 'neutral'}
  //         onClick={() => onChange(opt.value)}
  //         sx={{ cursor: 'pointer', userSelect: 'none' }}
  //         endDecorator={
  //           <Typography
  //             level="body-xs"
  //             sx={{
  //               ml: 0.5,
  //               color: filter === opt.value ? 'primary.100' : 'neutral.500',
  //             }}
  //           >
  //             {counts[opt.value]}
  //           </Typography>
  //         }
  //       >
  //         {opt.label}
  //       </Chip>
  //     ))}
  //   </Box>
  // )
}
