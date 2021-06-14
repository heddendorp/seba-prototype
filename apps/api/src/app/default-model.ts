import UserModel, {Role} from "../../../../libs/models/src/lib/user";
import {createUser} from "../../../../libs/controllers/src/lib/user-controller";

export async function fill_default_model() {
  await createUser(new UserModel({
    username: "testStudent",
    role: Role.STUDENT
  }));
  await createUser(new UserModel({
    username: "testLecturer",
    role: Role.LECTURER
  }));
}

export function delete_model() {
  UserModel.remove({}, () => console.log("Deleted all users"));
}

export async function reset_model() {
  delete_model();
  await fill_default_model();
}
