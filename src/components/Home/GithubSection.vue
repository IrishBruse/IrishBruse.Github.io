<template>
    <div class="seperator" />
    <h1 class="text-center">Github</h1>

    <div class="githubProfile" v-if="isFoundProfile">
        <img :src="profile.avatar" alt="" class="githubProfileImage" />

        <div class="profileInfo">
            <h2>{{ profile.name }}</h2>
            <div class="container">
                <p class="cell profileInfoItems">{{ profile.followers }} followers</p>
                <p class="cell profileInfoItems">{{ profile.following }} following</p>
            </div>
        </div>
    </div>
    <div class="text-center" v-else>
        <p>Github Api Request Failed</p>
        <p>Refresh page to retry</p>
    </div>

    <div class="container repoContainer">
        <div class="cell50" v-for="repo in repos" :key="repo.id">
            <div class="githubRepo">
                <a :href="repo.html_url" class="repoTitle">
                    <img class="githubLogo" :src="require('@/assets/images/Github Logo.png')" alt="" />
                    {{ repo.name }}
                </a>
                <p class="repoDescription">{{ repo.description }}</p>
                <div class="repoDetails">
                    <p class="cell repoDetail">{{ repo.language }}</p>
                    <a class="cell repoDetail repoStarButton" :href="repo.html_url + '/stargazers'" v-if="repo.stargazers_count > 0">
                        ✰ {{ repo.stargazers_count }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GitHub from "github-api";
import { onMounted, ref } from "vue";

export default {
    setup() {
        let profile = ref({});
        let repos = ref([]);
        let isFoundProfile = ref(false);

        onMounted(() => {
            var gh = new GitHub({
                token: "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",
            });

            var user = gh.getUser("IrishBruse");

            user.getProfile((error, result) => {
                if (!error) {
                    isFoundProfile.value = true;
                    profile.value = {
                        name: result.name,
                        username: result.login,
                        avatar: result.avatar_url,
                        location: result.location,
                        url: result.html_url,
                        repos: result.public_repos,
                        reposUrl: result.html_url + "?tab=repositories",
                        followers: result.followers,
                        followersUrl: result.html_url + "/followers",
                        following: result.following,
                        followingUrl: result.html_url + "/following",
                    };
                } else {
                    isFoundProfile.value = false;
                    profile.value = {};
                }
            });

            user.listRepos(function (error, result) {
                if (!error) {
                    repos.value = result;
                }
            });
        });

        return { profile, repos, isFoundProfile };
    },
};
</script>

<style>
.githubLogo {
    height: 1em;
}
.repoContainer {
    width: 75%;
    margin: 0 auto;
}

.githubProfile {
    display: flex;
    margin: 0 auto;
    width: fit-content;
}

.githubProfileImage {
    border-radius: 50%;
}

.profileInfo {
    margin: auto;
    padding: 1em;
}
.profileInfoItems {
    margin: 0 1em 0 0;
}

.githubRepo {
    padding: 1em;
    margin: 0.5em 0;

    border-width: 1px;
    border-color: var(--input-border);
    border-style: solid;
    border-radius: 0.75em;
}

.repoTitle {
    margin: 0;
    text-decoration: none;
}

.repoDescription {
    margin: 0.5em 0;
}

.repoStar {
    height: 1em;
    fill: red;
}

.repoStarButton {
    cursor: pointer;
    text-decoration: none;
    color: var(--paragraph);
    height: fit-content;
    padding: 0;
}

.repoStarButton:hover {
    color: var(--pallet-blue);
}

.repoStarButton:hover .repoStar {
    background-image: url("/static/burger.png");
}

.repoDetails {
    display: flex;
    flex-direction: row;
    padding: 0.5em 0;
}

.repoDetail {
    margin: 0 1em 0 0;
}
</style>
