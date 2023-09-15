import {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
  Schema,
  model,
} from "mongoose";
import config from "config";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserModel extends Model<UserDocument> {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, res) {
        res.id = res._id;
        delete res._id;
        delete res.password;
      },
    },
  }
);

usersSchema.pre("save", async function (next) {
  const self = this as UserDocument;
  if (!self.isModified("password")) {
    return next;
  }
  const saltWorkFactor = config.get<number>("saltWorkFactor");
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = bcrypt.hashSync(self.password, salt);
  self.password = hash;
  return next();
});

usersSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (err) {
    return false;
  }
};

const Users = model<UserDocument, UserModel>("User", usersSchema);

export default Users;
