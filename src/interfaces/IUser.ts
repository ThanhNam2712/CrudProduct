export interface IUser {
    id: number; // ID duy nhất của người dùng
    username: string; // Tên đăng nhập của người dùng
    email: string; // Địa chỉ email của người dùng
    password: string; // Mật khẩu của người dùng (nên được mã hóa trong thực tế)
  }