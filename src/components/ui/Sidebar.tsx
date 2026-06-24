import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import type { FilterStatus } from '../../components/tasks/TaskFilters'
import { useState } from 'react'
import { IconButton } from '@mui/joy'
import { useAuth } from '../../context/AuthContext' 
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  filter?: FilterStatus
  onChange: (f: FilterStatus) => void
  counts: { all: number; pending: number; completed: number }
}

const NAV = [
  { label: 'Todas las tareas', value: 'all' as FilterStatus, icon: 'ti-layout-list' },
  { label: 'Cerrar sesión', icon: 'ti-logout' }
]

export default function Sidebar({ filter, onChange, counts }: SidebarProps) {
  const { logout } = useAuth() 
  const navigate = useNavigate() 
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (item: typeof NAV[0]) => {
    if (!item.value) {
      logout() 
      navigate('/login')
      setMobileOpen(false)
      return
    }

    onChange(item.value as FilterStatus)
    setMobileOpen(false)
  }

    const SidebarContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 2.5 }}>
      <Box sx={{ px: 2.5, pb: 3, borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 34, height: 34, borderRadius: '8px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-checklist" style={{ fontSize: 18, color: '#fff' }} aria-hidden="true" />
          </Box>
          <Box>
            <Typography sx={{ color: '#e0d4ff', fontWeight: 600, fontSize: 15, lineHeight: 1.1 }}>GoList</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>Tareas personales </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{ display: { xs: 'flex', sm: 'none' }, color: 'rgba(255,255,255,0.5)', '--IconButton-size': '32px' }}
        >
          <i className="ti ti-x" style={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 1.5, pt: 2.5, flex: 1 }}>
        <Typography sx={{ fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', px: 1, mb: 1, textTransform: 'uppercase' }}>
          Menú
        </Typography>
        {NAV.map((item) => (
          <Box
            key={item.value || item.label}
            onClick={() => handleNav(item)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1.1,
              borderRadius: '8px',
              mb: 0.5,
              cursor: 'pointer',
              background: filter === item.value ? 'rgba(124,58,237,0.35)' : 'transparent',
              color: filter === item.value ? '#c4a8ff' : 'rgba(255,255,255,0.5)',
              '&:hover': {
                background: 'rgba(124,58,237,0.18)',
                color: '#c4a8ff'
              },
              transition: 'all 0.15s',
            }}
          >
            <i className={`ti ${item.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
            <Typography sx={{ fontSize: 13, color: 'inherit', flex: 1 }}>{item.label}</Typography>
            {item?.value && (
            <Box sx={{ background: '#7c3aed', color: '#fff', fontSize: 10, px: 1, py: 0.2, borderRadius: '20px', lineHeight: 1.6 }}>
              {counts[item.value]}
            </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box> 
    )

  return (
    <>
      <Box
        component="aside"
        sx={{
          width: 230, flexShrink: 0, background: '#1a0f2e',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column', minHeight: '100vh',
        }}
      >
        <SidebarContent />
      </Box>

      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          background: '#1a0f2e', px: 2, py: 1.5,
          alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
           <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'rgba(255,255,255,0.7)', '--IconButton-size': '36px' }}>
          <i className="ti ti-menu-2" style={{ fontSize: 20 }} aria-label="Abrir menú" />
        </IconButton>
          <Box sx={{ width: 28, height: 28, borderRadius: '7px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-checklist" style={{ fontSize: 15, color: '#fff' }} aria-hidden="true" />
          </Box>
          <Typography sx={{ color: '#e0d4ff', fontWeight: 600, fontSize: 14 }}>GoList</Typography>
        </Box>
       
      </Box>

      {mobileOpen && (
        <Box
          onClick={() => setMobileOpen(false)}
          sx={{
            display: { xs: 'block', sm: 'none' },
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      )}

      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 260, background: '#1a0f2e',
          zIndex: 400,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
        }}
      >
        <SidebarContent />
      </Box>
    </>
  )
}
