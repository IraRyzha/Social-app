"use client";
import { IProfile } from "@/entities/profile";
import BaseProfile from "./base-profile";
import ProfileItem from "./profile-item";
import DetailedProfile from "./detailed-profile";

interface Props {
  type: "base" | "detailed" | "item";
  profile?: IProfile;
  isOwn?: boolean;
}

export function Profile({ type, profile, isOwn }: Props) {
  return (
    <>
      {type === "base" && <BaseProfile />}
      {type === "item" && profile && <ProfileItem userProfile={profile} />}
      {type === "detailed" && profile && (
        <DetailedProfile userProfile={profile} isOwn={isOwn ?? false} />
      )}
    </>
  );
}
