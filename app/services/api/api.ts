import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { Platform } from "react-native"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  setAuth = (userAuth: any) => {
    if (!userAuth) return
    const bearer = this.apisauce.setHeader("Authorization", "Bearer " + userAuth)
    console.log(bearer, "Bearer Token")
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(user_id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/user/${user_id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async signIn(user: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post("user/login", user)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log(response, "not okay")
      if (problem) return response
    }

    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getSpecificProduct(product_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`product/${product_id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getSpecificVideo(video_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`video/${video_id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async uploadProduct(product: any): Promise<any> {
    this.setAuth(product.tokken)
    let data = {
      title: product.title,
      description: product.description,
      details: product.details,
      weight: product.weight,
      images: product.images,
      price: product.price,
      user_id: product.user_id,
      tags: product.tags,
      postal_code: product.postal_code
    }
    const response: ApiResponse<any> = await this.apisauce.post("product/", data)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async uploadVideo(video: any): Promise<any> {
    console.log(video, "API")
    this.setAuth(video.tokken)
    let data = {
      title: video.title,
      description: video.description,
      tags: video.tags,
      video: video.video[0],
      user_id: video.user_id,
      poster: video.poster
    }
    console.log(data, "DATA")
    const response: ApiResponse<any> = await this.apisauce.post(`video/`, data)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async uploadClassified(classified: any): Promise<any> {
    console.log(classified, "CAPI")
    this.setAuth(classified.tokken)
    let advertise = {
      state: classified.State,
      city: classified.City,
      category: classified.category.toLowerCase(),
      title: classified.title,
      price: classified.price,
      description: classified.description,
      sub_category: classified.sub_category,
      images: classified.images,
      user_id: classified.userId,
    }

    const response: ApiResponse<any> = await this.apisauce.post("adv/", advertise)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async editProduct(product: any): Promise<any> {
    this.setAuth(product.tokken)
    let data = {
      images: product.images,
      title: product.title,
      weight: product.weight,
      price: product.price,
      description: product.description,
      user_id: product.user_id,
      id: product.id,
    }
    const response: ApiResponse<any> = await this.apisauce.put(`product/${product.id}`, data)
    console.log("ID", response)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async editVideos(video: any): Promise<any> {
    this.setAuth(video.tokken)

    let data = {
      title: video.title,
      description: video.description,
      // tags: video.tags,
      video: video.video[0],
      user_id: video.user_id,
    }

    const response: ApiResponse<any> = await this.apisauce.put(`video/${video._id}`, data)
    console.log("ID", response)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async deleteProduct(product_id: any, token: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.delete(`product/${product_id}`)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async deleteVideo(video_id: any, token: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.delete(`video/${video_id}`)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async deleteAds(adv_id: any, token: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.delete(`adv/${adv_id}`)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async Signup(user: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post("user/signup", user)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return response
    }

    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async forgetPassword(email: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post("user/forget_password", {
      email: email,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log(problem, "ERROR")
      if (problem) return problem
    }

    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async changePassword(data: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.post("user/change_password", data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      console.log(problem, "ERROR")
      if (problem) return problem
    }

    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getProducts(): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get("product/")
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getVideos(): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get("video/")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getClassifieds(
    city: string,
    state: string,
    category: string,
    sub_category: string,
  ): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `adv/classified?state=${state}&city=${city}&category=${category}&sub_category=${sub_category}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMyProducts(user_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`product/my_product/${user_id}`)
    console.log(response, "CHECK", user_id)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMyVideo(user_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`video/my_video/${user_id}`)
    console.log(response, "CHECK", user_id)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMyClassifieds(user_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`adv/my_adv/${user_id}`)
    console.log(response, "CHECK", user_id)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async createFavourite(product: any): Promise<any> {
    console.log(product)
    this.setAuth(product.tokken)
    let data = {}
    switch (product.favourite_type) {
      case "product":
        data = {
          user_id: product.user_id,
          product_id: product.product_id,
          favourite_type: product.favourite_type,
        }
        break
      case "video":
        data = {
          user_id: product.user_id,
          video_id: product.video_id,
          favourite_type: product.favourite_type,
        }
        break
      case "advertise":
        data = {
          user_id: product.user_id,
          adv_id: product.adv_id,
          favourite_type: product.favourite_type,
        }
        break
      default:
        return null
    }
    console.log(data, "DD")
    const response: ApiResponse<any> = await this.apisauce.post("favourite/", data)
    console.log("res", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMyFavourite(user_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`favourite/my_fav/${user_id}`)
    console.log(response, "CHECK", user_id)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getMyReport(token: any, data: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.post("flag", data)
    console.log(response, "CHECK")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async addToCart(product: any): Promise<any> {
    this.setAuth(product.tokken)
    let data = {
      user_id: product.user_id,
      product_id: product.product_id,
      quantity: product.quantity,
    }
    const response: ApiResponse<any> = await this.apisauce.post("cart/", data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }
  async searchKeyword(keyword: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`product?tag=${keyword}`)
    console.log(response, "CHECK", keyword)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getCartItems(user_id: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`cart/${user_id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async searchVideo(keyword: any): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`video?tag=${keyword}`)
    console.log(response, "CHECK", keyword)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async searchClassifieds(
    city: string,
    state: string,
    category: string,
    sub_category: string,
    keyword: string
  ): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`adv/classified?state=${state}&city=${city}&category=${category}&sub_category=${sub_category}&tag=${keyword}`)
    console.log(response, "class", keyword)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  //set quantity for cart items
  async addQuantity(action: any, item: any): Promise<any> {
    console.log(item)
    if (action === "add") {
      this.setAuth(item.tokken)
      const response: ApiResponse<any> = await this.apisauce.put(`cart/${item.item._id}`, {
        quantity: item.item.quantity + 1,
      })
      console.log(response, "addItemsuccessfully")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      try {
        console.log(response, "SUCCESS")
        if (response.status === 200) return response
      } catch {
        return { kind: "bad-data" }
      }
    } else if (item.item.quantity != 1) {
      this.setAuth(item.tokken)
      const response: ApiResponse<any> = await this.apisauce.put(`cart/${item.item._id}`, {
        quantity: item.item.quantity - 1,
      })
      console.log(response, "itemremove succesffuly")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      try {
        console.log(response, "SUCCESS")
        if (response.status === 200) return response
      } catch {
        return { kind: "bad-data" }
      }
    } else {
      this.setAuth(item.tokken)
      const response: ApiResponse<any> = await this.apisauce.delete(`cart/${item.item._id}`)
      console.log(response, "updated cart")
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      try {
        console.log(response, "SUCCESS")
        if (response.status === 200) return response
      } catch {
        return { kind: "bad-data" }
      }
    }
  }

  async editProfile(user_id: any, token: any, data: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.put(`user/${user_id}`, data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async editUserProfileImage(user_id: any, token: any, image: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.put(`user/${user_id}`, {
      profile_picture: image,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async commentProduct(product: any): Promise<any> {
    this.setAuth(product.tokken)
    let data = {
      product_id: product.product_id,
      user_id: product.user_id,
      review: product.review,
    }
    const response: ApiResponse<any> = await this.apisauce.post("review/", data)
    console.log("API", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async commentVideo(product: any): Promise<any> {
    this.setAuth(product.tokken)
    let data = {
      video_id: product.video_id,
      user_id: product.user_id,
      review: product.review,
    }
    const response: ApiResponse<any> = await this.apisauce.post("review/", data)
    console.log("API", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getConversation(user_id: any, token: any): Promise<any> {
    this.setAuth(token)
    const response: ApiResponse<any> = await this.apisauce.get(`chat/all_message/${user_id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      console.log(response, "SUCCESS")
      if (response.status === 200) return response
    } catch {
      return { kind: "bad-data" }
    }
  }
}
