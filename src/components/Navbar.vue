<template>
    <div class="navbar text-center">
        <router-link to="/" class="navbarLink">Home</router-link>
        <router-link to="/contact" class="navbarLink">Contact me</router-link>
    </div>
</template>

<style>
.navbar {
    background: var(--background);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);

    padding: 20px 0;
}

.navbarLink {
    font-size: 20px;
    margin: 0 15px;
    color: var(--link);
    text-decoration: none;
}

.navbarLink:hover {
    color: var(--link-hover);
    border-bottom: 0.1em solid var(--link);
}
</style>
