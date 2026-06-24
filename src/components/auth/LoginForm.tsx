import { useState } from 'react'
import Box from '@mui/joy/Box'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Alert from '@mui/joy/Alert'
import { useAuth } from '../../context/AuthContext'

interface LoginFormProps {
  onSwitch: () => void
  onSuccess?: () => void
}

export default function LoginForm({ onSwitch, onSuccess }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciales inválidas')
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
        <FormLabel sx={{ fontSize: 12 }}>Correo electrónico</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@ejemplo.com"
          startDecorator={<i className="ti ti-mail" style={{ fontSize: 15 }} aria-hidden="true" />}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </FormControl>

      <FormControl>
        <FormLabel sx={{ fontSize: 12 }}>Contraseña</FormLabel>
        <Input
          type={showPwd ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
          startDecorator={<i className="ti ti-lock" style={{ fontSize: 15 }} aria-hidden="true" />}
          endDecorator={
            <Box
              onClick={() => setShowPwd((v) => !v)}
              sx={{ cursor: 'pointer', color: 'neutral.400', '&:hover': { color: '#7c3aed' }, lineHeight: 1 }}
            >
              <i className={`ti ${showPwd ? 'ti-eye-off' : 'ti-eye'}`} style={{ fontSize: 15 }} aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'} />
            </Box>
          }
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <FormHelperText sx={{ justifyContent: 'flex-end', mt: 0.5 }}>
          <Typography
            level="body-xs"
            sx={{ color: '#9b6dff', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </FormHelperText>
      </FormControl>

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!email || !password}
        sx={{
          mt: 0.5,
          background: '#7c3aed',
          '&:hover': { background: '#6d28d9' },
          '&:disabled': { background: '#c4a8ff' },
        }}
      >
        Iniciar sesión
      </Button>

      <Typography level="body-sm" sx={{ textAlign: 'center', color: 'neutral.500' }}>
        ¿No tienes cuenta?{' '}
        <Typography
          component="span"
          level="body-sm"
          onClick={onSwitch}
          sx={{ color: '#7c3aed', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          Regístrate
        </Typography>
      </Typography>
    </Box>
  )
}