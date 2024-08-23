'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetAllBanner(page: number) {
  try {
    const response = await ApiRoute(`/bannerIndex?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 60,
        tags: ['banner'],
      },
    })

    const datas = await response.json()

    const data = datas.data
    const countPage = datas.meta.last_page
    const perPage = datas.meta.per_page
    const totalItems = datas.meta.total

    return { data, countPage, perPage, totalItems }
  } catch (e) {
    return { data: [], countPage: 0 }
  }
}
