'use client'
import { ShowUser } from '@/action/user/show'
import { UpdateUserComponent } from '@/components/user/updateUser'
import { UserInterface } from '@/data/type/user'
import { useEffect, useState } from 'react'

export default function UpdateUser() {
  const [data, setData] = useState<UserInterface>()
  useEffect(() => {
    const handleData = async () => {
      const data = (await ShowUser()) as UserInterface
      setData(data)
    }
    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center items-center h-screen mt-[-80px]">
      <UpdateUserComponent data={data} />
    </div>
  )
}
