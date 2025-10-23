import Modal from '@/components/ui/Modal'
import { cookies } from 'next/headers'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function Login() {
  const cookiesStore = await cookies()

  const error = cookiesStore.get('loginError')

  const getErrorMessage = (errorCode: string) => {
    const errors = {
      n_u: 'Usuario no encontrado',
      w_p: 'Contraseña incorrecta',
    }
    return errors[errorCode as keyof typeof errors]
  }

  return (
    <Modal>
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
            {getErrorMessage(error.value)}
          </div>
        )}
        
        <form
          action='/api/login'
          method='post'
          className='space-y-5'
        >
          <div className="space-y-2">
            <label htmlFor="mail" className="text-sm font-medium text-foreground">Correo electrónico</label>
            <Input
              type='email'
              id='mail'
              placeholder='tu@email.com'
              name='mail'
              required
              className="w-full py-5 px-4"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Contraseña</label>
            <Input
              type='password'
              id='password'
              placeholder='••••••••'
              name='password'
              required
              className="w-full py-5 px-4"
            />
          </div>
          <Button type='submit' className="w-full py-5 text-base">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </Modal>
  )
}
