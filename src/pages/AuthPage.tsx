import { useState } from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const navigate = useNavigate()

  const headings = {
    login:    { title: 'Bienvenido de vuelta',       sub: 'Ingresa tus credenciales para continuar' },
    register: { title: 'Crea tu cuenta',             sub: 'Empieza a gestionar tus tareas hoy'     },
  }

  const handleSuccess = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f0ff',
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 'lg',
          overflow: 'hidden',
          border: '0.5px solid',
          borderColor: 'neutral.200',
          boxShadow: '0 8px 40px rgba(124,58,237,0.12)',
        }}
      >
        <Box
          sx={{
            background: '#1a0f2e',
            px: 3,
            pt: 3.5,
            pb: 4,
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box sx={{
              width: 34, height: 34, borderRadius: '8px', background: '#7c3aed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="ti ti-checklist" style={{ fontSize: 18, color: '#fff' }} aria-hidden="true" />
            </Box>
            <Typography sx={{ color: '#e0d4ff', fontWeight: 600, fontSize: 17 }}>
              GoList
            </Typography>
          </Box>

          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 20, mb: 0.5 }}>
            {headings[mode].title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            {headings[mode].sub}
          </Typography>
        </Box>

       <Box sx={{ background: 'white', px: 3, py: 3.5 }}>
          {mode === 'login'
            ? <LoginForm onSwitch={() => setMode('register')} onSuccess={handleSuccess} />
            : <RegisterForm onSwitch={() => setMode('login')} onSuccess={handleSuccess} />
          }
        </Box>
      </Box>
    </Box>
  )
}
