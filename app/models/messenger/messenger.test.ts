import { MessengerModel, Messenger } from "./messenger"

test("can be created", () => {
  const instance: Messenger = MessengerModel.create({})

  expect(instance).toBeTruthy()
})
