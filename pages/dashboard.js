import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Loading from '@/components/Loading'

export default function Main() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [status])


  if (status === 'loading') return <Loading />
  return <Dashboard session={session} />
}