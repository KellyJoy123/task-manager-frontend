import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'

export default function Header() {
    return (
    <Box
      component="header"
      sx={{
        background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 60%, #a855f7 100%)',
        color: 'white',
        px: { xs: 2, sm: 4 },
        py: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: '0 4px 24px rgba(124, 58, 237, 0.35)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <ChecklistRtlIcon sx={{ fontSize: 32 }} />
      <Box>
        <Typography level="h4" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.1 }}>
          GoList
        </Typography>
        <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Gestiona tus tareas personales
        </Typography>
      </Box>
    </Box>
    )
}
