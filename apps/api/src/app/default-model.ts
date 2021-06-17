import {Role, User} from "@seba/models";
import {UserService} from "@seba/services";

export async function fill_default_model() {
  const userService = new UserService();

  await userService.create(new User({
    username: "testStudent",
    role: Role.STUDENT
  }));
  await userService.create(new User({
    username: "testLecturer",
    role: Role.LECTURER
  }));
}

export function delete_model() {
  User.remove({}, () => console.log("Deleted all users"));
}

export async function reset_model() {
  delete_model();
  await fill_default_model();
}
