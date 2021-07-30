import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { Environment } from "../environment"

/**
 * Model description here for TypeScript hints.
 */
export const MessengerModel = types
  .model("Messenger")
  .props({})
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async getConversations(user_id: any, token: any) {
      const response = await self.environment.api.getConversation(user_id, token)
      console.log(response, "RRR")
      return response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type MessengerType = Instance<typeof MessengerModel>
export interface Messenger extends MessengerType {}
type MessengerSnapshotType = SnapshotOut<typeof MessengerModel>
export interface MessengerSnapshot extends MessengerSnapshotType {}
