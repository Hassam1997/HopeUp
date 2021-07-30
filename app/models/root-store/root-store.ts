import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CartModel } from "../cart/cart"
import { ClassifiedsModel } from "../classifieds/classifieds"
import { MessengerModel } from "../messenger/messenger"
import { ProductModel } from "../product/product"
import { UserModel } from "../user/user"
import { VideoModel } from "../video/video"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  user: types.optional(UserModel, {}),
  products: types.optional(ProductModel, {}),
  Videos: types.optional(VideoModel, {}),
  cart: types.optional(CartModel, {}),
  classifieds: types.optional(ClassifiedsModel, {}),
  messenger: types.optional(MessengerModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
