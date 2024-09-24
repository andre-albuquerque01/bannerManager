'use client'
import { DeleteBusiness } from '@/action/business/delete'
import { Trash } from 'lucide-react'

export const DeleteBusinessComponent = ({ id }: { id: string }) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Tem certeza que quer excluir?')) await DeleteBusiness(id)
  }
  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline cursor-pointer rounded"
      title="Excluir"
    >
      <Trash size={20} />
    </button>
  )
}
