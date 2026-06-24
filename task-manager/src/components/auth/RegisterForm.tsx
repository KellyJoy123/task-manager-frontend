import { useState } from 'react'
import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Alert from '@mui/joy/Alert'
import { useAuth } from '@/context/AuthContext'

interface RegisterFormProps {
  onSwitch: () => void
  onSuccess?: () => void
}

export default function RegisterForm({ onSwitch, onSuccess }: RegisterFormProps) {
  const { register } = useAuth()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!name || !email || !password) return
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await register(name, email, password)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
      {error && (
        <Alert color="danger" variant="soft" sx={{ fontSize: 13, py: 1 }}>
          <i className="ti ti-alert-circle" style={{ fontSize: 15 }} aria-hidden="true" />
          {error}
        </Alert>
      )}

      <FormControl>
        <FormLabel sx={{ fontSize: 12 }}>Nombre</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          startDecorator={<i className="ti ti-user" style={{ fontSize: 15 }} aria-hidden="true" />}
        />
      </FormControl>

      <FormControl>
        <FormLabel sx={{ fontSize: 12 }}>Correo electrónico</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@ejemplo.com"
          startDecorator={<i className="ti ti-mail" style={{ fontSize: 15 }} aria-hidden="true" />}
        />
      </FormControl>

      <FormControl>
        <FormLabel sx={{ fontSize: 12 }}>Contraseña</FormLabel>
        <Input
          type={showPwd ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          startDecorator={<i className="ti ti-lock" style={{ fontSize: 15 }} aria-hidden="true" />}
          endDecorator={
            <Box
              onClick={() => setShowPwd((v) => !v)}
              sx={{ cursor: 'pointer', color: 'neutral.400', '&:hover': { color: '#7c3aed' }, lineHeight: 1 }}
            >
              <i className={`ti ${showPwd ? 'ti-eye-off' : 'ti-eye'}`} style={{ fontSize: 15 }} aria-label={showPwd ? 'Ocultar' : 'Mostrar'} />
            </Box>
          }
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </FormControl>

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!name || !email || !password}
        sx={{
          mt: 0.5,
          background: '#7c3aed',
          '&:hover': { background: '#6d28d9' },
          '&:disabled': { background: '#c4a8ff' },
        }}
      >
        Crear cuenta
      </Button>

      <Typography level="body-sm" sx={{ textAlign: 'center', color: 'neutral.500' }}>
        ¿Ya tienes cuenta?{' '}
        <Typography
          component="span"
          level="body-sm"
          onClick={onSwitch}
          sx={{ color: '#7c3aed', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          Inicia sesión
        </Typography>
      </Typography>
    </Box>
  )
}
