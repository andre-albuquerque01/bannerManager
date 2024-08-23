'use client'

import { LogoutUser } from '@/action/user/logout'

export const LogoutComponent = () => {
  async function handleLogout() {
    await LogoutUser()
  }

  return (
    <button
      onClick={handleLogout}
      className="transform duration-500 rounded-md hover:bg-zinc-600 p-2 uppercase"
    >
      Sair
    </button>
  )
}
