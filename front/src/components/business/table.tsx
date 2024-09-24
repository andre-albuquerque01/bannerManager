'use client'
import { Pencil } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { DeleteBusinessComponent } from './deleteBusiness'
import { BusinessInterface } from '@/data/type/business'

export const CardBusinessComponent = ({
  data,
}: {
  data: BusinessInterface[]
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.length > 0 &&
        data.map((business, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-bold mb-2">{business.campanha}</h3>
            <p className="text-sm mb-1">
              <span className="font-semibold">Cliente: </span>
              {business.cliente}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Agência: </span>
              {business.agencia}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Destaque: </span>
              {business.destaque === 1 ? 'Sim' : 'Não'}
            </p>
            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/business/update/${business.idBusiness}`}
                className="text-blue-500 hover:underline flex items-center"
              >
                <Pencil size={20} className="mr-1" />
                Editar
              </Link>
              <DeleteBusinessComponent id={business.idBusiness} />
            </div>
          </div>
        ))}
    </div>
  )
}
