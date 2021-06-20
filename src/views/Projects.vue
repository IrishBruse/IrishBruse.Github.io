<template>
    <br />
    <h1>{{ projectTitle }}</h1>

    <div class="container">
        <div class="cell50">
            <div class="videoContainer">
                <!-- <iframe class="video" :src="projectVideo" frameborder="0" allow="accelerometer; autoplay; 
                clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                <div class="video">YouTube Temp</div>
            </div>
        </div>
        <div class="cell50">
            <div class="container">
                <div class="cell50">
                    <Markdown class="text-center" :source="markdownContents"></Markdown>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="cell50">
            <a class="downloadButton" :href="downloadLink">Download {{ projectTitle }} </a>
        </div>
        <div class="cell50"></div>
    </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
import { useRoute } from "vue-router";
import Projects from "@/assets/projects/projects.json";

export default {
    components: {
        Markdown,
    },
    setup() {
        const route = useRoute();
        var currentProject = Projects.find((project) => project.title == route.params.project);

        const projectTitle = currentProject.title;
        const projectVideo = currentProject.video;
        const markdownContents = require("@/assets/projects/" + currentProject.title + "/markdown.md").default;
        const downloadLink = currentProject.download;

        return { projectTitle, projectVideo, markdownContents, downloadLink };
    },
};
</script>

<style>
.videoContainer {
    position: relative;
    padding-bottom: 56.25%;
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
}

.downloadButton {
    background: var(--light-background);
    margin: 0.75em;
    padding: 0.75em;
    border-radius: 2em;

    text-decoration: none;
}
</style>
