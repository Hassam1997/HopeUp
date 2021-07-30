import { ClassifiedsModel, Classifieds } from "./classifieds"

test("can be created", () => {
  const instance: Classifieds = ClassifiedsModel.create({})

  expect(instance).toBeTruthy()
})
