import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export interface Products {
  data?: []
}

export type GetAllProducts = { kind: "ok"; products: Products[] } | GeneralApiProblem

export interface Videos {
  data?: []
}

export type GetAllVideos = { kind: "ok"; products: Videos[] } | GeneralApiProblem
