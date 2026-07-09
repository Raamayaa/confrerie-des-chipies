import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // UUID de la table profiles
      id: string;

      // Même valeur que id
      profileId: string;

      // ID Discord
      discordId: string;

      // Pièces du joueur
      coins: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profileId: string;
    discordId: string;
    coins: number;
  }
}