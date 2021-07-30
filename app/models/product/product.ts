import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { Alert } from "react-native"
import { RootNavigation } from "../../navigation"
import { Environment } from "../environment"
/**
 * Model description here for TypeScript hints.
 */
const UserData = {
  first_name: types.string,
  last_name: types.string,
  profile_picture: types.maybeNull(types.string),
  username: types.string,
  _id: types.identifier,
}

const Product = types.model({
  description: types.string,
  price: types.number,
  title: types.string,
  weight: types.string,
  likes: types.array(types.optional(types.string, "")),
  images: types.array(types.optional(types.string, "")),
  tags: types.array(types.optional(types.string, "")),
  user_id: types.model(UserData),
  createdAt: types.string,
  updatedAt: types.string,
  deleted: types.boolean,
  _id: types.identifier,
})

const tag = types.model({
  _id: types.string,
  tag: types.string,
})

const MyProduct = types.model({
  // images: types.optional(types.array(images), []),
  images: types.array(types.optional(types.string, "")),
  tags: types.optional(types.array(tag), []),
  title: types.string,
  price: types.number,
  _id: types.identifier,
  description: types.string,
  user_id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  weight: types.string,
})

const Product_ID = {
  images: types.array(types.optional(types.string, "")),
  title: types.string,
  price: types.number,
  _id: types.identifier,
  description: types.string,
  user_id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  weight: types.string,
}

const Video_ID = {
  title: types.string,
  _id: types.identifier,
  description: types.string,
  user_id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  likes: types.array(types.optional(types.string, "")),
  tags: types.array(types.optional(types.string, "")),
  video: types.string,
  views: types.array(types.optional(types.string, ""))
}

const Adv_ID = {
  category: types.string,
  city: types.string,
  createdAt: types.string,
  description: types.string,
  expired: types.boolean,
  images: types.array(types.optional(types.string, "")),
  likes: types.array(types.optional(types.string, "")),
  price: types.optional(types.number, 0),
  state: types.string,
  sub_category: types.string,
  tags: types.array(types.optional(types.string, "")),
  title: types.string,
  updatedAt: types.string,
  user_id: types.string,
  views: types.array(types.optional(types.string, "")),
  _id: types.identifier
}

const favourite_product = {
  createdAt: types.string,
  favourite_type: types.string,
  product_id: types.model(Product_ID),
  user_id: types.model(UserData),
  _id: types.identifier,
}

const favourite_video = {
  createdAt: types.string,
  favourite_type: types.string,
  video_id: types.model(Video_ID),
  user_id: types.model(UserData),
  _id: types.identifier
}

const favourite_ad = {
  adv_id: types.model(Adv_ID),
  createdAt: types.string,
  favourite_type: types.string,
  user_id: types.model(UserData),
  _id: types.identifier
}

const MyFav = {
  product: types.array(types.model(favourite_product)),
  video: types.array(types.model(favourite_video)),
  adv: types.array(types.model(favourite_ad))
}

// const searchtag = types.model({
//   _id: types.string,
//   tag: types.string,
// })

const _ID = {
  first_name: types.string,
  last_name: types.string,
  username: types.string,
  _id: types.identifier,
}

const searchBar = types.model({
  // images: types.optional(types.array(images), []),
  images: types.array(types.optional(types.string, "")),
  //tags: types.optional(types.array(searchtag), []),
  title: types.string,
  price: types.number,
  _id: types.identifier,
  description: types.string,
  user_id: types.model(_ID),
  createdAt: types.string,
  updatedAt: types.string,
  weight: types.string,
})

const commentBar = types.model({
  product_id: types.optional(types.string, ""),
  _id: types.optional(types.string, ""),
  review: types.optional(types.string, ""),
  user_id: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  review_type: types.optional(types.string, ""),
})
// const MyData = types.model({
//   data: types.optional(types.array(MyProduct, [])),
// })

export const ProductModel = types
  .model("Product")
  .props({
    title: types.optional(types.string, ""),

    description: types.optional(types.string, ""),

    weight: types.optional(types.string, ""),

    price: types.optional(types.string, ""),

    tags: types.optional(types.string, ""),

    images: types.optional(types.string, ""),

    user_id: types.optional(types.string, ""),

    data: types.optional(types.array(Product), []),

    MyProductData: types.optional(types.array(MyProduct), []),

    MyFavourite: types.optional(types.model(MyFav), {}),

    searchBar: types.optional(types.array(searchBar), []),

    comment: types.optional(commentBar, {}),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },

    get ProductData() {
      return self.data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title
    },

    setDescription(description: string) {
      self.description = description
    },

    setWeight(weight: string) {
      self.weight = weight
    },

    setPrice(price: string) {
      self.price = price
    },

    setImages(images: string) {
      self.images = images
    },

    setUserId(user_id: any) {
      self.user_id = user_id
    },

    setStoreProducts(data: any) {
      self.data = data
    },

    setMyProductData(data: any) {
      self.MyProductData = data
    },

    setMyFav(data: any) {
      self.MyFavourite = data
    },

    setsearch(data: any) {
      self.searchBar = data
    },

    setcomment(data: any) {
      self.comment = data
    },

    async getAllProduct() {
      const response = await self.environment.api.getProducts()
      if (response?.status === 200) {
        console.log(response.data, "Products")
        this.setStoreProducts(response.data)
      }
    },

    async getSpecificProduct(product_id: any) {
      const response = await self.environment.api.getSpecificProduct(product_id)
      if (response?.status === 200) return response
    },

    async uploadProduct(product: any) {
      const response = await self.environment.api.uploadProduct(product)
      return response
    },

    async getMyProduct(userId: any) {
      const response = await self.environment.api.getMyProducts(userId)
      if (response?.status === 200) {
        this.setMyProductData(response.data)
      }
    },

    async deleteProduct(product_id: any, token: any) {
      const response = await self.environment.api.deleteProduct(product_id, token)
      if (response?.status === 200) {
        console.log("successfully deleted", response.data)
      }
    },

    async editProduct(product: any) {
      const response = await self.environment.api.editProduct(product)
      console.log("tttttt", response)
      if (response.status === 200) {
        this.getAllProduct()
        return response
      }
    },

    async createFavourite(product: any) {
      const response = await self.environment.api.createFavourite(product)
      return response
    },

    async getMyFavourites(userId: any) {
      const response = await self.environment.api.getMyFavourite(userId)

      if (response?.status === 200) {
        console.log("Likes", response.data.product)
        this.setMyFav(response.data)
      }
    },

    async postReport(product: any) {
      let report = {
        user_id: product.user_id,
        product_id: product.product_id,
        flag_type: product.flag_type,
        category: product.category,
      }
      const response = await self.environment.api.getMyReport(product.tokken, report)
      if (response.status === 200) {
        Alert.alert("Thank you", "Thankyou for your feedback", [
          {
            text: "Ok",
            style: "default",
          },
        ])
      }
    },

    async search(keyword: any) {
      const response = await self.environment.api.searchKeyword(keyword)
      if (response?.status === 200) {
        console.log("Likes", response.data)
        this.setsearch(response.data)
      }
    },

    async productComment(product: any) {
      const response = await self.environment.api.commentProduct(product)
      console.log("3", response)
      if (response?.status === 200) {
        console.log("Comments", response.data)
        this.setcomment(response.data)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ProductType = Instance<typeof ProductModel>
export interface Product extends ProductType { }
type ProductSnapshotType = SnapshotOut<typeof ProductModel>
export interface ProductSnapshot extends ProductSnapshotType { }
