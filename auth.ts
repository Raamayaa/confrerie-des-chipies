import NextAuth from "next-auth";
import Discord, {
  type DiscordProfile,
} from "next-auth/providers/discord";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, profile, account }) {
      if (account && profile) {
        const discordProfile = profile as DiscordProfile;

        const discordId = String(discordProfile.id);

        const username =
          discordProfile.global_name ??
          discordProfile.username ??
          token.name ??
          "";

        const avatar = token.picture ?? "";

        const { data: existing } = await supabase
          .from("profiles")
          .select("id, coins")
          .eq("discord_id", discordId)
          .maybeSingle();

        let profileId: string;
        let coins = 1000;

        if (!existing) {
          const { data: created, error } = await supabase
            .from("profiles")
            .insert({
              discord_id: discordId,
              username,
              avatar,
            })
            .select("id, coins")
            .single();

          if (error) {
            throw error;
          }

          profileId = created.id;
          coins = created.coins;
        } else {
          profileId = existing.id;
          coins = existing.coins;

          await supabase
            .from("profiles")
            .update({
              username,
              avatar,
            })
            .eq("id", profileId);
        }

        token.profileId = profileId;
        token.discordId = discordId;
        token.coins = coins;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.profileId as string;
        session.user.profileId = token.profileId as string;
        session.user.discordId = token.discordId as string;
        session.user.coins = (token.coins as number) ?? 0;
      }

      return session;
    },
  },
});