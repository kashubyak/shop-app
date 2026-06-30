import { AuthForm } from '@/components/auth/AuthForm'
import { LoggedInView } from '@/components/auth/LoggedInView'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useAuthStore } from '@/store/useAuthStore'

export default function ProfileScreen() {
	const { token, logout } = useAuthStore()
	const authLogic = useAuthForm()
	if (token) return <LoggedInView onLogout={logout} />
	return <AuthForm {...authLogic} />
}
