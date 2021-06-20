<template>
    <FeaturedProjects />
    <Knowledge />
    <Github />
</template>

<script>
import FeaturedProjects from "../components/Home/FeaturedProjectsSection";
import Knowledge from "../components/Home/KnowledgeSection";
import Github from "../components/Home/GithubSection";

export default {
    components: { FeaturedProjects, Knowledge, Github },
};
</script>
