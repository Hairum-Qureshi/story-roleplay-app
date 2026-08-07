import { useCurrentUser } from "../hooks/useCurrentUser";
import useRolePlayAds from "../hooks/useRolePlayAds";
import useUser from "../hooks/useUser";
import type { RolePlayAd } from "../interfaces";
import ProfileAdCard from "../components/ProfileAdCard";
import { Link } from "react-router-dom";
import BlockedUserCard from "../components/BlockedUserCard";

export default function Profile() {
  // after a day, your ad is removed from the main feed, however, it's still displayed on your profile page and there will be a button on each of your ads to 'repost' it so it'll appear again in the main feed (that way, you won't have to re-create the ad from scratch)

  const { data: currUserData } = useCurrentUser();
  const { deleteProfile, allBlockedUsers } = useUser();
  const { currUserRoleplayAds } = useRolePlayAds();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* USER INFO */}
        <section className="flex items-center gap-6 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
          <img
            src={currUserData?.profilePicture}
            alt="User avatar"
            className="h-24 w-24 rounded-full border border-slate-700 object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-100">
              @{currUserData?.username}
            </h1>
            <h1 className="text-xl font-semibold text-slate-400">
              {currUserData?.firstName} {currUserData?.lastName}
            </h1>

            <p className="text-sm text-slate-400">{currUserData?.email}</p>

            <p className="text-xs italic text-slate-500">
              Your email and full name are only visible to you
            </p>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Your Role-play Ads
          </h2>

          <div>
            {currUserRoleplayAds?.length === 0 ? (
              <p className="text-base text-sky-400 text-center">
                You currently have no active role-play ads
              </p>
            ) : (
              currUserRoleplayAds?.map((ad: RolePlayAd) => (
                <div className="my-5" key={ad._id}>
                  <Link to={`/role-play-ad/${ad._id}`}>
                    <ProfileAdCard ad={ad} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Your Characters
          </h2>
          <div
            className={`${currUserData?.characterBios?.length !== 0 ? "grid gap-4 sm:grid-cols-2" : "w-full"}`}
          >
            {currUserData?.characterBios?.length === 0 ? (
              <p className="text-base text-sky-400 text-center">
                You currently have no character bios
              </p>
            ) : (
              // currUserData?.characterBios?.map((char: CharacterBio) => (
              // 	<ProfileAdCard key={char._id} ad={char} />
              // ))
              <></>
            )}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Blocked Users
          </h2>
          <div className="w-full">
            {!allBlockedUsers?.length ? (
              <p className="text-base text-sky-400 text-center">
                You currently have not blocked any users
              </p>
            ) : (
              <ul className="list-disc list-inside">
                {allBlockedUsers?.map(
                  (blockedUser: {
                    _id: string;
                    username: string;
                    profilePicture: string;
                  }) => (
                    <div key={blockedUser._id}>
                      <BlockedUserCard
                        userID={blockedUser._id}
                        username={blockedUser.username}
                        profilePicture={blockedUser.profilePicture}
                      />
                    </div>
                  ),
                )}
              </ul>
            )}
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Account Deletion
          </h2>
          <p className="text-sm text-slate-400">
            Deleting your account will remove all your data from our servers,
            including your role-play ads and character bios. This action is
            irreversible. Please ensure you have downloaded any role-plays you
            want to keep.
          </p>
          {currUserData?.isAdmin ? (
            <p className="text-sm text-white text-center border border-sky-600 p-3 bg-sky-900/50 rounded-md">
              As an admin, you cannot delete your account. Please contact the
              development team if you wish to delete your account.
            </p>
          ) : (
            <button
              className="rounded-md border border-red-800 bg-red-700/20 px-4 py-2 text-sm text-red-400 hover:bg-red-950 hover:cursor-pointer"
              onClick={deleteProfile}
            >
              Delete Account
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
