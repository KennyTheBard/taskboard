<template>
  <div class="card">
    <div v-if="!editMode">
        <p><b>{{ truncate(card.name, 50) }}</b></p>
        <p>{{ truncate(card.description, 100) }}</p>
    </div>
    <div v-if="!editMode && !moveMode">
        <button @click="editCard">
            Edit
        </button>
        <button @click="moveCard">
            Move
        </button>
        <button @click="deleteCard">
            Delete
        </button>
        <button @click="seeMore">
            See more
        </button>
    </div>
    <div v-if="editMode">
        <input type="text" v-model="card.name"/>
        <input type="text" v-model="card.description"/>
        <button @click="saveEdit">
            Save
        </button>
        <button @click="cancelEdit">
            Cancel
        </button>
    </div>
    <div v-if="moveMode">
        <label>Move to:</label>
        <b-form-select v-model="selected" :options="options" />
        <button @click="saveMove">
            Save
        </button>
        <button @click="cancelMove">
            Cancel
        </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Card',
    props: ['card', 'listId', 'otherLists'],
    data() {
        return {
            editMode: false,
            moveMode: false,
            selected: null,
            options: null,
        }
    },
    methods: {
        editCard: function () {
            this.editMode = true;
        },
        saveEdit: function () {
            axios
                .put(`http://localhost:3000/api/${this.listId}/card/${this.card.id}`, {
                    name: this.card.name,
                    description: this.card.description,
                })
                .then(response => this.$emit('updated'));
        },
        cancelEdit: function () {
            this.editMode = false;
        },
        deleteCard: function() {
            axios
                .delete(`http://localhost:3000/api/${this.listId}/card/${this.card.id}`)
                .then(response => this.$emit('updated'));
        },
        moveCard: function() {
            this.options = this.otherLists.map(l => {
                return {
                    value: l.id,
                    text: l.name
                };
            });
            this.moveMode = true;
        },
        saveMove: function() {
            console.log(this.selected);
            axios
                .put(`http://localhost:3000/api/${this.listId}/card/move/${this.card.id}`, {
                    listId: this.selected
                })
                .then(response => this.$emit('updated'));
        },
        cancelMove: function() {
            this.moveMode = false;
        },
        seeMore: function() {
            this.$emit('seeMore');
        },
        truncate: function(text, maxLen) {
            return text.length > maxLen ? text.substring(0, maxLen - 3) + '...' : text;
        }
    }
}
</script>

<style>
.card {
    width: 300px;
    border-radius: 0px;
    border: 3px solid rgba(0, 0, 0, 0.5);
    padding: 30px;
}
</style>