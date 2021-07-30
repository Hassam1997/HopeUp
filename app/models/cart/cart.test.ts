import { CartModel, Cart } from "./cart"

test("can be created", () => {
  const instance: Cart = CartModel.create({})

  expect(instance).toBeTruthy()
})
