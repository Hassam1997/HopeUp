import api from "@storybook/addon-storyshots"
import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { UploadVideoScreen } from "../../screens"
import { Environment } from "../environment"
import { Alert } from "react-native"
import { RootNavigation } from "../../navigation"

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

const Video = types.model({
  title: types.string,
  description: types.string,
  video: types.string,
  poster: types.string,
  tags: types.array(types.optional(types.string, "")),
  views: types.array(types.optional(types.string, "")),
  user_id: types.model(UserData),
  createdAt: types.string,
  updatedAt: types.string,
  deleted: types.boolean,
  _id: types.identifier,
})

const tags = {
  tag: types.string,
  _id: types.identifier,
}

const MyVideos = types.model({
  title: types.string,
  description: types.string,
  video: types.string,
  poster: types.string,
  tags: types.array(types.model(tags)),
  views: types.array(types.optional(types.string, "")),
  user_id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  deleted: types.boolean,
  _id: types.identifier,
})

const _ID = {
  first_name: types.string,
  last_name: types.string,
  profile_picture: types.string,
  username: types.string,
  _id: types.identifier,
}

const searchBar = types.model({
  // images: types.optional(types.array(images), []),
  images: types.array(types.optional(types.string, "")),
  //tags: types.optional(types.array(searchtag), []),
  title: types.string,
  _id: types.identifier,
  description: types.string,
  user_id: types.model(_ID),
  createdAt: types.string,
  updatedAt: types.string,
})

const commentBar = types.model({
  video_id: types.optional(types.string, ""),
  _id: types.optional(types.string, ""),
  review: types.optional(types.string, ""),
  user_id: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
  review_type: types.optional(types.string, ""),
})

export const VideoModel = types
  .model("Video")
  .props({
    data: types.optional(types.array(Video), []),

    videos: types.optional(types.array(MyVideos), []),

    searchBar: types.optional(types.array(searchBar), []),

    comment: types.optional(commentBar, {}),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    SetVideos(video: any) {
      self.data = video
    },

    setMyVideos(data: any) {
      self.videos = data
    },

    setsearch(data: any) {
      self.searchBar = data
    },

    setcomment(data: any) {
      self.comment = data
    },

    async getAllVideos() {
      const response = await self.environment.api.getVideos()
      console.log(response.data, "Videos")
      this.SetVideos(response.data)
    },

    async getMyVideo(userId: any) {
      const response = await self.environment.api.getMyVideo(userId)
      console.log("Video Data", response.data)
      if (response?.status === 200) {
        this.setMyVideos(response.data)
      }
    },

    async UploadVideo(video: any) {
      const response = await self.environment.api.uploadVideo(video)
      if (response.status === 200) {
        Alert.alert("Successfully Uploaded", "Tap ok to see your Video in Hope Up", [
          {
            text: "cancel",
            style: "destructive",
          },
          {
            text: "Ok",
            style: "default",
            onPress: () => RootNavigation.navigate("videoHome"),
          },
        ])
      }
    },

    async likeVideo(video: any) {
      const response = await self.environment.api.createFavourite(video)
      console.log(response, "VIDEOLIKE")
    },

    async deleteVideo(video_id: any, token: any) {
      const response = await self.environment.api.deleteVideo(video_id, token)
      if (response?.status === 200) {
        console.log("successfully deleted", response.data)
      }
    },

    async searchVideo(keyword: any) {
      const response = await self.environment.api.searchVideo(keyword)
      if (response?.status === 200) {
        console.log("Likes", response.data)
        this.setsearch(response.data)
      }
    },

    async editVideo(video: any) {
      const response = await self.environment.api.editVideos(video)
      console.log("tttttt", response)
      if (response.status === 200) {
        Alert.alert("Successfully Edited", "Tap ok to see your Video in Hope Up Videos", [
          {
            text: "cancel",
            style: "destructive",
          },
          {
            text: "Ok",
            style: "default",
            onPress: () => RootNavigation.navigate('videoHome')
          },
        ])
      }
    },

    async videoComment(product: any) {
      const response = await self.environment.api.commentVideo(product)
      if (response?.status === 200) {
        console.log("Comments", response.data)
        this.setcomment(response.data)
      }
    },

    async getSpecificVideo(video_id: any) {
      const response = await self.environment.api.getSpecificVideo(video_id)
      if (response?.status === 200) return response
    },

    async postReport(video: any) {
      let report = {
        user_id: video.user_id,
        video_id: video.video_id,
        flag_type: video.flag_type,
        category: video.category,
      }
      const response = await self.environment.api.getMyReport(video.tokken, report)
      if (response.status === 200) {
        Alert.alert("Thank you", "Thankyou for your feedback", [
          {
            text: "Ok",
            style: "default",
          },
        ])
      }
    },
  }))

// eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type VideoType = Instance<typeof VideoModel>
export interface Video extends VideoType {}
type VideoSnapshotType = SnapshotOut<typeof VideoModel>
export interface VideoSnapshot extends VideoSnapshotType {}
