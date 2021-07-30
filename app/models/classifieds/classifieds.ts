import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { Environment } from "../environment"
import { Alert } from "react-native"

/**
 * Model description here for TypeScript hints.
 */
const tags = {
  tag: types.string,
  _id: types.identifier,
}

const MyAds = types.model({
  title: types.string,
  category: types.string,
  city: types.string,
  description: types.string,
  images: types.array(types.optional(types.string, "")),
  expired: types.boolean,
  deleted: types.boolean,
  tags: types.array(types.model(tags)),
  views: types.array(types.optional(types.string, "")),
  user_id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  _id: types.identifier,
  price: types.number,
  state: types.string,
  sub_category: types.string,
})

export const ClassifiedsModel = types
  .model("Classifieds")
  .props({
    acion: types.optional(types.string, ""),

    Ads: types.optional(types.array(MyAds), []),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAction(action: string) {
      self.acion = action
    },

    setAdv(data: any) {
      self.Ads = data
    },

    async uploadAd(classified: any) {
      const response = await self.environment.api.uploadClassified(classified)
      console.log("modelad", response)
      return response
    },

    async deleteAdv(adv_id: any, token: any) {
      const response = await self.environment.api.deleteAds(adv_id, token)
      if (response?.status === 200) {
        console.log("successfully deleted", response.data)
      }
    },

    async getMyClassifieds(user_id: any) {
      const response = await self.environment.api.getMyClassifieds(user_id)
      console.log("modelad", response)
      if (response?.status === 200) {
        return response
      }
    },

    async getClassifieds(city: string, state: string, category: string, sub_category: string) {
      const response = await self.environment.api.getClassifieds(
        city,
        state,
        category.toLowerCase(),
        sub_category,
      )
      console.log("modelad", response)
      return response
    },

    async searchClassifieds(city: string, state: string, category: string, sub_category: string, tags: string) {
      const response = await self.environment.api.searchClassifieds(
        city,
        state,
        category.toLowerCase(),
        sub_category,
        tags
      )
      console.log("modelad", response)
      return response
    },

    async createFavourite(adv: any) {
      const response = await self.environment.api.createFavourite(adv)
      console.log(response, "likes")
      return response
    },

    async postReport(adv: any) {
      let report = {
        user_id: adv.user_id,
        adv_id: adv.adv_id,
        flag_type: adv.flag_type,
        category: adv.category,
      }
      const response = await self.environment.api.getMyReport(adv.tokken, report)
      if (response.status === 200) {
        Alert.alert("Thank you", "Thankyou for your feedback", [
          {
            text: "Ok",
            style: "default",
          },
        ])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ClassifiedsType = Instance<typeof ClassifiedsModel>
export interface Classifieds extends ClassifiedsType { }
type ClassifiedsSnapshotType = SnapshotOut<typeof ClassifiedsModel>
export interface ClassifiedsSnapshot extends ClassifiedsSnapshotType { }
