import { TokenStorage } from "../../shared/services";
import { AuthAdapter } from "../adapters/AuthAdapter";
import type { User } from "../models";


export class AuthService {
  private authAdapter = new AuthAdapter();

  async login(email: string, password: string): Promise<User> {
    const token = await this.authAdapter.login(email, password)
    TokenStorage.setToken(token)

    const user: User = TokenStorage.decodeToken(token)
    return user;
  }

  async register(email: string, password: string): Promise<void> {
    await this.authAdapter.register(email, password)
  }

  logout(): void {
    TokenStorage.removeToken();
  }

  getUser(): User | null {
    const token = TokenStorage.getToken();

    if (token) {
      try {
        return TokenStorage.decodeToken(token)
      } catch (error) {
        console.error("Token es inválido", error)
        TokenStorage.removeToken()
        return null;
      }
    }

    return null
  }
}