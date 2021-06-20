<template>
    <div class="seperator" />

    <h1 class="text-center">Knowledge</h1>
    <div class="container justify-center">
        <div class="cell33">
            <h2 class="mainColor">Web</h2>
            <p class="text-justify">
                I am both self taught and have studied web development in College. I know HTML, CSS and Javascript. I also know vue its what this is written
                using.
            </p>
        </div>

        <div class="cell33">
            <h2 class="mainColor">C#</h2>
            <p class="text-justify">
                I am self taught in C# and have used it in many ways from Unity to Monogame to a
                <Router-link to="/projects/Monoboy">Gameboy Emulator</Router-link> and mobile apps. I have been programming in C# for {{ yearsCSharp }} years
                and I am well adversed with its tool chain and the dotnet workflow in general.
            </p>
        </div>

        <div class="cell33">
            <h2 class="mainColor">Java</h2>
            <p class="text-justify">I have studied Java in College. I know HTML, CSS and Javascript. I also know vue its what this is written using.</p>
        </div>

        <div class="cell33">
            <h2 class="mainColor">GitHub/Git</h2>
            <p class="text-justify">
                I have studied git in collage and have been using it for many years as source control for my projects and have gotten a good understanding of it
                from both the command line and the gui interfaces.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const yearsCSharp = new Date(Date.now()).getFullYear() - 2014;

        return { yearsCSharp };
    },
};
</script>

<style>
.mainColor {
    color: var(--link);
}

.githubLogo {
    height: 0.9em;
    padding: 0 0.5em;
    filter: hue-rotate() var(--link);
}
</style>
