<template>
    <h1>Email</h1>
    <form @submit.prevent="submit" @reset="onReset">
        <input placeholder="Name" v-model="name" /><br />
        <input placeholder="Email" v-model="email" /><br />
        <input placeholder="Subject" v-model="subject" /><br />
        <textarea rows="6" placeholder="Body" v-model="message" /><br />
        <button type="submit">Submit</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
    },
    computed: {
        formValid() {
            const { name, email, subject, message } = this;
            return name.length > 0 && /(.+)@(.+){2,}\.(.+){2,}/.test(email) && subject.length > 0 && message.length > 0;
        },
    },
    methods: {
        submit() {
            if (!this.formValid) {
                return;
            }
            if (!localStorage.getItem("messages")) {
                localStorage.setItem("messages", JSON.stringify([]));
            }
            const { name, subject, message } = this;

            window.open("mailto:Econn50@outlook.com?subject=" + subject + "&body=" + message + "%0A%0A" + name);
        },
    },
};
</script>

<style>
::placeholder {
    padding: 0 0.5em;
    color: var(--input-placeholder);
    font-weight: bolder;
}

input,
textarea {
    padding: 0.5em 0;
    width: 100%;
    border-radius: 0.5em;
    border-width: 2px;
    border-style: solid;
    border-color: var(--input-border);
    outline: 0;
    background: var(--input-background);

    margin: 1em 0;
}

button {
    padding: 0.5em 0;
    border-radius: 2em;
    border-width: 0;
    border-style: none;
    outline: 0;
    background: var(--light-background);
    color: var(--link);
    width: 10em;
    font-size: 1em;
    cursor: pointer;
}

button:hover {
    color: var(--link-hover);
}

@media only screen and (min-width: 800px) {
    input,
    textarea {
        width: 20em;
    }

    textarea {
        resize: none;
    }
}
</style>
