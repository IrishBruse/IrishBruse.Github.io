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

    <div class="container repoContainer">
        <div class="cell50" v-for="repo in repos" :key="repo.id">
            <div class="githubRepo">
                <a :href="repo.html_url" class="repoTitle">
                    <img class="githubLogo" :src="require('@/assets/images/Github Logo.png')" alt="" />
                    {{ repo.name }}</a
                >
                <p class="repoDescription">{{ repo.description }}</p>
                <div class="repoDetails">
                    <p class="cell repoDetail">{{ repo.language }}</p>
                    <a class="cell repoDetail repoStarButton" :href="repo.html_url + '/stargazers'" v-if="repo.stargazers_count > 0"
                        >✰ {{ repo.stargazers_count }}</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Octokit } from "@octokit/rest";
import { onMounted, ref } from "vue";

export default {
    setup() {
        let profile = ref({});
        let repos = ref([]);
        let isFoundProfile = ref(true);

        onMounted(() => {
            let octokit = new Octokit({ auth: "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", baseUrl: "https://api.github.com" });
            let username = process.env.VUE_APP_GITHUB_USERNAME;
            // Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
            octokit.rest.users.getByUsername({ username }).then((data) => {
                if (data.status == "200") {
                    isFoundProfile.value = true;
                    profile.value = {
                        name: data.data.name,
                        username: data.data.login,
                        avatar: data.data.avatar_url,
                        location: data.data.location,
                        url: data.data.html_url,
                        repos: data.data.public_repos,
                        reposUrl: data.data.html_url + "?tab=repositories",
                        followers: data.data.followers,
                        followersUrl: data.data.html_url + "/followers",
                        following: data.data.following,
                        followingUrl: data.data.html_url + "/following",
                    };
                } else {
                    profile.value = {};
                    repos.value = [];
                    isFoundProfile.value = false;
                }
            });

            repos.value = octokit.rest.repos.listForUser({ username }).then((data) => {
                repos.value = data.data;
                console.log(repos.value);
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
