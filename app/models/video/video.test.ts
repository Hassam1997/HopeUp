import { VideoModel, Video } from "./video"

test("can be created", () => {
  const instance: Video = VideoModel.create({})

  expect(instance).toBeTruthy()
})
