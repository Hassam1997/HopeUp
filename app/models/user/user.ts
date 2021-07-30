import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { Alert } from "react-native"
import { RootNavigation } from "../../navigation"
import { Environment } from "../environment"

/**
 * Model description here for TypeScript hints.
 */

const User_ID = types.model({
  first_name: types.optional(types.string, ""),
  last_name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  _id: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  profile_picture: types.maybeNull(types.string),
  deleted: types.optional(types.boolean, false),
  verified: types.optional(types.boolean, false),
})

export const UserModel = types
  .model("User")
  .props({
    firstName: types.optional(types.string, ""),

    lastName: types.optional(types.string, ""),

    username: types.optional(types.string, ""),

    email: types.optional(types.string, ""),

    password: types.optional(types.string, ""),

    gender: types.optional(types.string, ""),

    birthDate: types.optional(types.Date, new Date()),

    user_id: types.optional(types.string, ""),

    token: types.optional(types.string, ""),

    myProfile: types.optional(User_ID, {}),

    deviceToken: types.optional(types.string, ""),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setFirstName(name: string) {
      self.firstName = name.trim()
    },

    setLastName(name: string) {
      self.lastName = name.trim()
    },

    setUserName(username: string) {
      self.username = username.trim()
    },

    setEmailAddress(email: string) {
      self.email = email
    },

    setPassword(password: any) {
      self.password = password
    },

    setGender(gender: any) {
      self.gender = gender
    },

    setBirthDate(date: any) {
      self.birthDate = date
    },

    setUserId(id: any) {
      self.user_id = id
    },

    setAuthTokken(token: any) {
      self.token = token
    },

    setDeviceToken(messaging_token: string) {
      self.deviceToken = messaging_token
    },

    setAuthProfile(data: any) {
      self.myProfile = data
    },

    reset() {
      ;(self.firstName = ""),
        (self.lastName = ""),
        (self.email = ""),
        (self.password = ""),
        (self.username = ""),
        (self.user_id = ""),
        (self.token = ""),
        (self.deviceToken = ""),
        (self.myProfile = {
          first_name: "",
          last_name: "",
          profile_picture: "",
          username: "",
          _id: "",
          email: "",
          createdAt: "",
          deleted: false,
          verified: false,
        })
    },

    async Signup() {
      const { email, password, firstName, lastName, username } = self
      const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
      if (email === "" || password === "" || firstName === "" || lastName === "") {
        Alert.alert(`Hey ${firstName}`, "You're required to fill all fields")
      } else {
        if (result) {
          let data = {
            email: email.toLowerCase().trim(),
            password: password,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: username.trim(),
          }

          const res = await self.environment.api.Signup(data)
          console.log(res, "resinmodel")
          if (res.status === 200) {
            Alert.alert(
              "Account Created Successfully!",
              "Please Check your Email to verify your Account",
              [
                {
                  text: "Cancel",
                  style: "destructive",
                },
                {
                  text: "OK",
                  style: "default",
                  onPress: () => RootNavigation.navigate("login"),
                },
              ],
            )
          } else {
            console.log("ERROR", res)
            Alert.alert("An Error Occurred!", `${res.data.message}`)
          }
        } else {
          Alert.alert("Hey User", "Please Enter a Valid Email Address")
        }
      }
    },

    async login() {
      const { email, password } = self
      if (email === "" || password === "") {
        Alert.alert("Message", "You're required to fill all the fields")
        return
      } else {
        const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email,
        )

        if (result) {
          let data = {
            email: self.email.toLowerCase(),
            password: self.password,
            token: self.deviceToken,
          }
          const res = await self.environment.api.signIn(data)
          console.log(res, "resinmodelogin")
          switch (res.status) {
            case 401:
              Alert.alert("Incorrect Password", "Hey User you have entered incorrect password.")
              break
            case 404:
              Alert.alert("No User Found", "Please provide correct credentials")
              break
            case 422:
              Alert.alert(
                "Your Account is not Verified",
                "Please Verify Your Email First then try Again.",
              )
              break
            case 410:
              Alert.alert("Your Account has been deleted by Admin , Please Contact Customer Care")
              break
            case 200:
              this.setUserId(res.data.data._id)
              this.setAuthTokken(res.data.token)
              this.setAuthProfile(res.data.data)
              return res
            default:
              return res
          }
        } else {
          Alert.alert("Hey User", "Please Enter a Valid Email Address")
          return
        }
      }
    },

    async sendForgetMail(email: any) {
      console.log(email)
      const res = await self.environment.api.forgetPassword(email)
      if (res.status === 200) {
        return res
      }
    },

    async changePassword(data: any) {
      let obj = { password: data.password, reset_password_token: data.code }
      const res = await self.environment.api.changePassword(obj)
      if (res.status === 200) {
        return res
      }
    },

    async editProfile(user_id: any, token: any, data: any) {
      const res = await self.environment.api.editProfile(user_id, token, data)
      console.log(res, "modelres")
      return res
    },

    async editProfileImage(user_id: any, token: any, image: any) {
      const res = await self.environment.api.editUserProfileImage(user_id, token, image)
      console.log(res, "userpic")
      this.setAuthProfile(res.data)
      return res
    },

    async getUser(user_id: any) {
      const res = await self.environment.api.getUser(user_id)
      console.log(res, "modelres")
      return res
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
