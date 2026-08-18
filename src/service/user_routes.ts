import { db } from "../db/index"
import { users } from "../db/schema"
import { eq } from "drizzle-orm"

export default async function CreateUser() {
  const user = await db.create(users, {
    name: "",
    email: "",
    password: "",
  })
  return user
}

export async function GetUserById(id: number) {
  const user = await db.select(users, { where: eq(users.id, id) })
  return user
}

export async function UpdateUser(id: number, data: Partial<typeof users>) {
  const user = await db.update(users, { where: eq(users.id, id), set: data })
  return user
}

export async function DeleteUser(id: number) {
  const user = await db.delete(users, {
    where: eq(users.id, id),
  })
  return user
}
