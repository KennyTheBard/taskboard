<template>
    <form @submit="createCard">
        <p>New card:</p>
        <label>Name: </label>
        <input type="text" v-model="name"/>
        <br/>
        <label>Description: </label>
        <input type="text" v-model="description"/>
        <br/>
        <input type="submit" value="Create"/>
        <p v-if="error">
            <b>{{ error }}</b>
        </p>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Card',
    props: ['boardId', 'listId'],
    data() {
        return {
            name: null,
            description: null,
            error: null,
        } 
    },
    methods: {
        createCard: function(e) {
            e.preventDefault();

            this.error = null;

            if (!this.name) {
                this.error = 'No name provided for the card';
                return;
            }

            if (!this.description) {
                this.error = 'No description provided for the card';
                return;
            }

            if (!this.error) {
                axios
                .post(`http://localhost:3000/api/${this.listId}/card`, {
                    name: this.name,
                    description: this.description,
                })
                .then(response => {
                    if (response.status === 201) {
                        this.$router.push({ path: `/board/${this.boardId}` });
                    }
                });
            }
        },
  }
}
</script>
