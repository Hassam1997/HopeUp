import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { Alert } from "react-native"
import { Environment } from "../environment"

/**
 * Model description here for TypeScript hints.
 */
export const CartModel = types
  .model("Cart")
  .props({
    quantity: types.optional(types.number, 0),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    reset() {
      self.quantity = 0
    },

    async addToCart(product: any) {
      const response = await self.environment.api.addToCart(product)
      if (response.status === 200) {
        // console.log("Item has been successfully added to your cart", response)
        Alert.alert("Added Successfull", "Item has been successfully added to your cart")
        return response
      }
    },

    async getCartItems(user_id: any) {
      const response = await self.environment.api.getCartItems(user_id)
      console.log(response, "cartItems")
      return response
    },

    async updateCart(action: any, item: any) {
      const response = await self.environment.api.addQuantity(action, item)
      console.log(response)
      return response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CartType = Instance<typeof CartModel>
export interface Cart extends CartType {}
type CartSnapshotType = SnapshotOut<typeof CartModel>
export interface CartSnapshot extends CartSnapshotType {}
