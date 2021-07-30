import { ProductModel, Product } from "./product"

test("can be created", () => {
  const instance: Product = ProductModel.create({})

  expect(instance).toBeTruthy()
})
