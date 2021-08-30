import * as bcrypt from 'bcrypt'

export const comparePassword = async (
  userPassword: string,
  currentPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(currentPassword, userPassword)
}
