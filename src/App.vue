<template>
    <Navbar />
    <div class="mainPage">
        <router-view />
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar,
    },
};
</script>
