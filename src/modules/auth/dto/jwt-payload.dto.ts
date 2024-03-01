export interface JwtPayload {
  sub: string; // 用户标识符，例如用户的 ID
  email: string; // 用户名
  iat?: number; // 发行时间（issued at），UNIX 时间戳
  exp?: number; // 过期时间（expiration time），UNIX 时间戳
}
