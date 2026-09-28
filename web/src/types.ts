export interface Product{
  id: string
  title: string
  category: string
  image: string
  price: number
  oldPrice?: number
  discount?: number
  rating?: number
  available?: boolean
  description?: string
}
