import UserModel, {IUser} from "../../../models/src/lib/user";

export async function createUser(new_user: IUser) {
  if (await getUserByUsername(new_user.username) == null)
    await new_user.save();
}

export async function getUserByUsername(username: string) {
  return UserModel.findOne({username: username});
}

export async function updateUser(username: string, updated_user: IUser) {
  return getUserByUsername(username).then(user => {
    user.username = updated_user.username;
    user.role = updated_user.role;

    user.save();
    return user;
  })
}
