import { IProfile } from "@/entities/profile";
import BaseProfile from "./base-profile";
import DetailedProfile from "./detailed-profile";

interface Props {
  type: "base" | "detailed";
  profile?: IProfile;
  isOwn?: boolean;
}

export function Profile({ type, profile, isOwn }: Props) {
  return (
    <>
      {type === "base" && <BaseProfile />}
      {type === "detailed" && profile && (
        <DetailedProfile profile={profile} isOwn={isOwn ?? false} />
      )}
    </>
  );
}
