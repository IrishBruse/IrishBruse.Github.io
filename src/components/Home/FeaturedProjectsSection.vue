<template>
    <h2 class="text-center">Featured Projects</h2>
    <VueCarousel :data="data" indicators="always" indicator-type="disc"> </VueCarousel>
</template>

<script>
import VueCarousel from "@chenfengyuan/vue-carousel";
import Projects from "@/assets/projects/projects.json";
import { h } from "vue";

export default {
    components: {
        VueCarousel,
    },
    setup() {
        // Only show filtered projects
        // then create an array of html slides
        const data = Projects.filter((project) => project.featured).map((project) => {
            const tags = project.tags.map((project) => {
                return h("a", { href: "tag/" + project + "/", class: "slideTag" }, project);
            });

            const openButton = h("a", { href: "projects/" + project.title + "/", class: "slideOpen" }, "More Details");

            const tagsContainer = h("div", { class: "slideTagsContainer" }, tags);
            const image = h("img", { src: require("@/assets/projects/" + project.title + "/" + "Thumbnail.png"), class: "slideImage" });
            return h("div", { class: "slide" }, [image, tagsContainer, openButton]);
        });
        return { data };
    },
};
</script>

<style>
.vue-carousel__indicator::before {
    box-shadow: 0px 1px 6px 1px black;
    border-radius: 1em;
}

.slide {
    height: fit-content;
    width: 90%;
    margin: 0 auto;
}

.slide:hover .slideTagsContainer,
.slide:hover .slideOpen {
    transition-timing-function: ease-in-out;
    opacity: 100%;
}

.slideTagsContainer {
    position: absolute;
    bottom: 0.75em;
    right: 5%;
    display: flex;
    width: fit-content;
    opacity: 0%;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
}

.slideImage {
    width: 100%;
}

.slideOpen {
    position: absolute;
    bottom: 0.75em;
    left: 5%;

    font-size: 1.5em;

    margin: 0 0.5em;
    background: var(--light-background);
    color: var(--link);
    text-decoration: none;
    padding: 0.4em;
    border-radius: 1em;
    cursor: pointer;

    opacity: 0%;
    transition-duration: 0.3s;
}

.slideTag {
    margin: 0 0.5em;
    background: var(--light-background);
    color: var(--link);
    text-decoration: none;
    padding: 0.4em;
    border-radius: 2em;
    transition-timing-function: ease-in-out;
    cursor: pointer;

    transition-duration: 0.3s;
}

.slideOpen:hover,
.slideTag:hover {
    transform: translateY(-0.3em);
    transition-duration: 0.2s;
    color: var(--link-hover);
}
</style>
