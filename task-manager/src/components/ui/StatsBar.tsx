// import { Button, Chip } from '@mui/joy'
// import Box from '@mui/joy/Box'
// import Card from '@mui/joy/Card'
// import Typography from '@mui/joy/Typography'

// interface StatsBarProps {
//   total: number
//   completed: number
//   pending: number
//   activeFilter?: 'all' | 'pending' | 'completed'
//   onFilterChange?: (filter: 'all' | 'pending' | 'completed') => void
// }

// export default function StatsBar({ 
//   total, 
//   completed, 
//   pending,
//   activeFilter = 'all',
//   onFilterChange 
// }: StatsBarProps) {
//   const percent = total > 0 ? Math.round((completed / total) * 100) : 0

//   const handleFilterClick = (filter: 'all' | 'pending' | 'completed') => {
//     if (onFilterChange) {
//       onFilterChange(filter)
//     }
//   }

//   const isActive = (filter: 'all' | 'pending' | 'completed') => activeFilter === filter

//   // Estadísticas con sus colores y filtros correspondientes
//   const stats = [
//     { 
//       id: 'stat-total',
//       label: 'Total', 
//       value: total, 
//       color: '#5b21b6',
//       filter: 'all' as const,
//       bgColor: isActive('all') ? 'rgba(91, 33, 182, 0.12)' : 'transparent',
//       borderColor: isActive('all') ? '#5b21b6' : '#e5e7eb'
//     },
//     { 
//       id: 'stat-pendientes',
//       label: 'Pendientes', 
//       value: pending, 
//       color: '#d97706',
//       filter: 'pending' as const,
//       bgColor: isActive('pending') ? 'rgba(217, 119, 6, 0.12)' : 'transparent',
//       borderColor: isActive('pending') ? '#d97706' : '#e5e7eb'
//     },
//     { 
//       id: 'stat-ompletados',
//       label: 'Completadas', 
//       value: completed, 
//       color: '#059669',
//       filter: 'completed' as const,
//       bgColor: isActive('completed') ? 'rgba(5, 150, 105, 0.12)' : 'transparent',
//       borderColor: isActive('completed') ? '#059669' : '#e5e7eb'
//     },
//   ]

//   return (
//     <Card
//       variant="soft"
//       sx={{
//         background: 'linear-gradient(135deg, #ede0ff 0%, #f5f0ff 100%)',
//         border: '1px solid #d9bfff',
//         mb: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: 2,
//           textAlign: 'center',
//         }}
//       >
//         {stats.map((stat) => (
//           <Button
//             key={stat.id}
//             size="sm"
//             variant={activeFilter === stat.filter ? 'solid' : 'outlined'}
//             color={activeFilter === stat.filter ? 'primary' : 'neutral'}
//             onClick={() => handleFilterClick(stat.filter)}
//             sx={{
//               borderRadius: 'xl',
//               minWidth: 80,
//               ...(activeFilter === stat.filter && {
//                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`,
//                   '&:hover': {
//                   background: `linear-gradient(90deg, ${stat.color}, ${stat.color}cc)`,
//                 }
//               })
//             }}
//           >
//               {stat.label}
//               <Chip
//                 size="sm"
//                 variant="soft"
//                 color={activeFilter === stat.filter ? 'primary' : 'neutral'}
//                 sx={{ ml: 1, minWidth: 20 }}
//               >
//                 {stat.value}
//               </Chip>
//             </Button>
//         ))}
//       </Box>

//       {/* Barra de progreso */}
//       {total > 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               mb: 0.5,
//             }}
//           >
//             <Typography level="body-xs" sx={{ color: 'neutral.500' }}>
//               Progreso general
//             </Typography>
//             <Typography level="body-xs" sx={{ color: 'primary.600', fontWeight: 600 }}>
//               {percent}%
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               height: 6,
//               borderRadius: 'xl',
//               backgroundColor: '#d9bfff',
//               overflow: 'hidden',
//             }}
//           >
//             <Box
//               sx={{
//                 height: '100%',
//                 width: `${percent}%`,
//                 background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
//                 borderRadius: 'xl',
//                 transition: 'width 0.4s ease',
//               }}
//             />
//           </Box>
//         </Box>
//       )}
//     </Card>
//   )
// }

import { Button, Chip } from '@mui/joy'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

interface StatsBarProps {
  total: number
  completed: number
  pending: number
  activeFilter?: 'all' | 'pending' | 'completed'
  onFilterChange?: (filter: 'all' | 'pending' | 'completed') => void
}

export default function StatsBar({ 
  total, 
  completed, 
  pending,
  activeFilter = 'all',
  onFilterChange 
}: StatsBarProps) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const handleFilterClick = (filter: 'all' | 'pending' | 'completed') => {
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  const stats = [
    { 
      id: 'stat-total',
      label: 'Total', 
      value: total, 
      color: '#5b21b6',
      filter: 'all' as const,
    },
    { 
      id: 'stat-pendientes',
      label: 'Pendientes', 
      value: pending, 
      color: '#d97706',
      filter: 'pending' as const,
    },
    { 
      id: 'stat-ompletados',
      label: 'Completadas', 
      value: completed, 
      color: '#059669',
      filter: 'completed' as const,
    },
  ]

  return (
    <Card
      variant="soft"
      sx={{
        background: 'linear-gradient(135deg, #ede0ff 0%, #f5f0ff 100%)',
        border: '1px solid #d9bfff',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // En móvil columna, en desktop fila
          gap: 1,
          width: '100%',
        }}
      >
        {stats.map((stat) => (
          <Button
            key={stat.id}
            size="sm"
            variant={activeFilter === stat.filter ? 'solid' : 'outlined'}
            color={activeFilter === stat.filter ? 'primary' : 'neutral'}
            onClick={() => handleFilterClick(stat.filter)}
            sx={{
              borderRadius: 'xl',
              width: { xs: '100%', sm: 'auto' }, // En móvil ocupa todo el ancho
              flex: { xs: 'none', sm: 1 },
              ...(activeFilter === stat.filter && {
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`,
                '&:hover': {
                  background: `linear-gradient(90deg, ${stat.color}, ${stat.color}cc)`,
                }
              })
            }}
          >
            {stat.label}
            <Chip
              size="sm"
              variant="soft"
              color={activeFilter === stat.filter ? 'primary' : 'neutral'}
              sx={{ ml: 1, minWidth: 20 }}
            >
              {stat.value}
            </Chip>
          </Button>
        ))}
      </Box>

      {total > 0 && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography level="body-xs" sx={{ color: 'neutral.500' }}>
              Progreso general
            </Typography>
            <Typography level="body-xs" sx={{ color: 'primary.600', fontWeight: 600 }}>
              {percent}%
            </Typography>
          </Box>
          <Box
            sx={{
              height: 6,
              borderRadius: 'xl',
              backgroundColor: '#d9bfff',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${percent}%`,
                background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                borderRadius: 'xl',
                transition: 'width 0.4s ease',
              }}
            />
          </Box>
        </Box>
      )}
    </Card>
  )
}