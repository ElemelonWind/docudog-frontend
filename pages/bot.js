import Bot from '../components/Bot';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SignIn() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const id = router.query.id;

    useEffect(() => {
        if (status === 'loading') return
        if (!session) router.push('/login')
    }, [status])

    if (status === 'loading') return <p>Loading...</p>

  return <Bot id={id} session={session} />;
}